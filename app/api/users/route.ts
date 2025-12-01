import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const createSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Users fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const data = createSchema.safeParse(json);

    if (!data.success) {
      return NextResponse.json({ errors: data.error.flatten() }, { status: 422 });
    }

    const user = await prisma.user.create({
      data: {
        email: data.data.email,
        name: data.data.name,
        role: data.data.role,
        status: "INVITED",
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}