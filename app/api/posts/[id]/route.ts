import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
// TODO: Import your custom database client here
// import { db } from "@/lib/db";

const updateSchema = z.object({
  title: z.string().min(4).max(120).optional(),
  content: z.string().min(20).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  // TODO: Replace with your custom database query
  // Example: const post = await db.query('SELECT * FROM posts WHERE id = $1', [params.id]);
  const post = null;

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

  // TODO: Replace with your custom database query
  // Example: const existing = await db.query('SELECT * FROM posts WHERE id = $1', [params.id]);
  const existing: any = null;

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (session.user.role !== "ADMIN" && existing.authorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // TODO: Replace with your custom database query
  // Example:
  // const publishedAt = data.data.status === "PUBLISHED"
  //   ? new Date()
  //   : data.data.status === "DRAFT"
  //     ? null
  //     : undefined;
  // const post = await db.query(
  //   'UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), status = COALESCE($3, status), published_at = COALESCE($4, published_at) WHERE id = $5 RETURNING *',
  //   [data.data.title, data.data.content, data.data.status, publishedAt, params.id]
  // );
  const post = null;

  return NextResponse.json(post);
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: Replace with your custom database query
  // Example: const existing = await db.query('SELECT * FROM posts WHERE id = $1', [params.id]);
  const existing: any = null;

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (session.user.role !== "ADMIN" && existing.authorId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // TODO: Replace with your custom database query
  // Example: await db.query('DELETE FROM posts WHERE id = $1', [params.id]);

  return NextResponse.json({ success: true });
}
