"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
// TODO: Import your custom database client here
// import { db } from "@/lib/db";

const postSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters").max(120),
  content: z.string().min(20, "Content must be at least 20 characters"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type PostFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string[]>;
};

const initialState: PostFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export async function createPostAction(
  prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return {
        ...initialState,
        status: "error",
        message: "You don't have permission to create posts.",
      };
    }

    const rawData = {
      title: formData.get("title"),
      content: formData.get("content"),
      status: formData.get("status") ?? "DRAFT",
    };

    const result = postSchema.safeParse(rawData);
    if (!result.success) {
      return {
        ...initialState,
        status: "error",
        message: "Please check the form for errors.",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    // TODO: Replace with your custom database query
    // Example:
    // const publishedAt = result.data.status === "PUBLISHED" ? new Date() : null;
    // await db.query(
    //   'INSERT INTO posts (title, content, status, author_id, published_at) VALUES ($1, $2, $3, $4, $5)',
    //   [result.data.title, result.data.content, result.data.status, session.user.id, publishedAt]
    // );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/posts");

    return {
      ...initialState,
      status: "success",
      message: "Post created successfully!",
    };
  } catch (error) {
    console.error("Failed to create post:", error);
    return {
      ...initialState,
      status: "error",
      message: "Failed to create post. Please try again.",
    };
  }
}
