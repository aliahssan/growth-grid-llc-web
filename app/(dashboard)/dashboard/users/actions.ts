"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    const existingUser = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    if (existingUser && existingUser.status !== "INVITED") {
      return {
        ...initialState,
        status: "error",
        message: "This user is already active on the platform.",
      };
    }

    await prisma.user.upsert({
      where: { email: result.data.email },
      update: {
        role: result.data.role,
        status: "INVITED",
      },
      create: {
        email: result.data.email,
        role: result.data.role,
        status: "INVITED",
      },
    });

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