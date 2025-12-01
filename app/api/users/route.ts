import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
// TODO: Import your custom database client here
// import { db } from "@/lib/db";

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

    // TODO: Replace with your custom database query
    // Example: const users = await db.query('SELECT id, email, name, role, status, created_at FROM users ORDER BY created_at DESC');
    const users: any[] = [];

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

    // TODO: Replace with your custom database query
    // Example:
    // const user = await db.query(
    //   'INSERT INTO users (email, name, role, status) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [data.data.email, data.data.name, data.data.role, 'INVITED']
    // );
    const user = null;

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
