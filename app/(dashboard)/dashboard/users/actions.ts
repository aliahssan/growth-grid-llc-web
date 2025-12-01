"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
// TODO: Import your custom database client here
// import { db } from "@/lib/db";

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["USER", "ADMIN"]),
});

export type InviteFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string[]>;
};

const initialState: InviteFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export async function inviteUserAction(
  prevState: InviteFormState,
  formData: FormData,
): Promise<InviteFormState> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return {
        ...initialState,
        status: "error",
        message: "You don't have permission to invite users.",
      };
    }

    const rawData = {
      email: formData.get("email"),
      role: formData.get("role") ?? "USER",
    };

    const result = inviteSchema.safeParse(rawData);
    if (!result.success) {
      return {
        ...initialState,
        status: "error",
        message: "Please check the form for errors.",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    // TODO: Replace with your custom database query
    // Example: const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [result.data.email]);
    const existingUser: any = null;

    if (existingUser && existingUser.status !== "INVITED") {
      return {
        ...initialState,
        status: "error",
        message: "This user is already active on the platform.",
      };
    }

    // TODO: Replace with your custom database query
    // Example:
    // if (existingUser) {
    //   await db.query('UPDATE users SET role = $1, status = $2 WHERE email = $3', [result.data.role, 'INVITED', result.data.email]);
    // } else {
    //   await db.query('INSERT INTO users (email, role, status) VALUES ($1, $2, $3)', [result.data.email, result.data.role, 'INVITED']);
    // }

    revalidatePath("/dashboard/users");

    return {
      ...initialState,
      status: "success",
      message: "Invite sent successfully!",
    };
  } catch (error) {
    console.error("Failed to invite user:", error);
    return {
      ...initialState,
      status: "error",
      message: "Failed to send invite. Please try again.",
    };
  }
}
