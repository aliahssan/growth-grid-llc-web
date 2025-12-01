"use server";

import { ZodError } from "zod";

import { contactSchema, sendContactEmail } from "@/lib/email";

type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export const initialContactState: ContactFormState = {
  status: "idle",
};

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const data = contactSchema.parse(payload);
    await sendContactEmail(data);

    return {
      status: "success",
      message: "Thanks! We’ll reply within one business day.",
    };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      error.issues.forEach((issue) => {
        const field = issue.path[0]?.toString() ?? "form";
        fieldErrors[field] = [...(fieldErrors[field] ?? []), issue.message];
      });
      return {
        status: "error",
        message: "Please review the highlighted fields.",
        fieldErrors,
      };
    }

    console.error("Contact action failed", error);
    return {
      status: "error",
      message: "We couldn’t send your message. Please try again.",
    };
  }
}

