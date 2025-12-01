import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const bodySchema = z.object({
  title: z.string().min(4).max(120),
  content: z.string().min(20),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { email: true } } },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Posts fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const limiter = rateLimit(`posts:${session.user.id}`, 10, 60_000);
    if (!limiter.success) {
      return NextResponse.json({ error: "Rate limit" }, { status: 429 });
    }

    const json = await request.json();

    const data = bodySchema.safeParse(json);
    if (!data.success) {
      return NextResponse.json({ errors: data.error.flatten() }, { status: 422 });
    }

    const post = await prisma.post.create({
      data: {
        title: data.data.title,
        content: data.data.content,
        status: data.data.status,
        authorId: session.user.id,
        publishedAt:
          data.data.status === "PUBLISHED" ? new Date() : undefined,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}