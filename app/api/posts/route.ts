import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
// TODO: Import your custom database client here
// import { db } from "@/lib/db";
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

    // TODO: Replace with your custom database query
    // Example:
    // const posts = await db.query(`
    //   SELECT p.*, u.email as author_email
    //   FROM posts p
    //   JOIN users u ON p.author_id = u.id
    //   ORDER BY p.created_at DESC
    // `);
    const posts: any[] = [];

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

    // TODO: Replace with your custom database query
    // Example:
    // const publishedAt = data.data.status === "PUBLISHED" ? new Date() : null;
    // const post = await db.query(
    //   'INSERT INTO posts (title, content, status, author_id, published_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    //   [data.data.title, data.data.content, data.data.status, session.user.id, publishedAt]
    // );
    const post = null;

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
