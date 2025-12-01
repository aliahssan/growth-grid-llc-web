"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/lib/auth";

type LoginState = {
  status: "idle" | "error";
  message?: string;
};

export const initialLoginState: LoginState = {
  status: "idle",
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        status: "error",
        message: "Invalid credentials.",
      };
    }
    return {
      status: "error",
      message: "Unable to sign in right now.",
    };
  }

  redirect("/dashboard");
}

