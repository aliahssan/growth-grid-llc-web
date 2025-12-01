import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Rate limiting
    const limiter = rateLimit(`dashboard:${session.user.id}`, 30, 60_000);
    if (!limiter.success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const [users, posts] = await Promise.all([
      prisma.user.count(),
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { author: { select: { name: true } } },
      }),
    ]);

    const published = posts.filter((post) => post.publishedAt).length;

    return NextResponse.json({
      users,
      posts: posts.map(post => ({
        id: post.id,
        title: post.title,
        status: post.status,
        createdAt: post.createdAt.toISOString(),
        author: post.author,
      })),
      published,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
