import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  title: z.string().min(4).max(120).optional(),
  content: z.string().min(20).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const data = updateSchema.safeParse(json);

  if (!data.success) {
    return NextResponse.json({ errors: data.error.flatten() }, { status: 422 });
  }

  const existing = await prisma.post.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (session.user.role !== "ADMIN" && existing.authorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const post = await prisma.post.update({
    where: { id: params.id },
    data: {
      ...data.data,
      publishedAt:
        data.data.status === "PUBLISHED"
          ? new Date()
          : data.data.status === "DRAFT"
            ? null
            : undefined,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.post.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (session.user.role !== "ADMIN" && existing.authorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.post.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}

