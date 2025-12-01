import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { contactSchema, sendContactEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, message: "Too many requests" },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const data = contactSchema.parse(body);
    await sendContactEmail(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 422 },
      );
    }
    console.error("Contact API error", error);
    return NextResponse.json(
      { success: false, message: "Unable to send message" },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    {
      message: "Submit a POST request with name, email, company, and message fields.",
    },
    { status: 405 },
  );
}

