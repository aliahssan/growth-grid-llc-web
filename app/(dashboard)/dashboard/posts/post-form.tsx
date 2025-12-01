"use client";

import { useActionState, useEffect, useRef } from "react";

import { createPostAction } from "./actions";
import { LoadingSpinner } from "@/components/ui/loading";
import { Field } from "@/components/ui/field";

const initialState = {
  status: "idle" as "idle" | "success" | "error",
  message: "",
  fieldErrors: {} as Record<string, string[]>,
};

export function CreatePostForm() {
  const [state, formAction, pending] = useActionState(
    createPostAction,
    initialState,
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <section className="rounded-2xl border bg-background/80 p-6 shadow-sm">
      <h2 className="text-lg font-semibold">New post</h2>
      <p className="text-sm text-muted-foreground">
        Publish updates for the marketing site or admin announcements.
      </p>
      <form ref={formRef} className="mt-6 space-y-4" action={formAction}>
        <Field
          label="Title"
          name="title"
          required
          minLength={4}
          maxLength={120}
          placeholder="Launch update"
          error={state.fieldErrors?.title}
        />

        <Field
          label="Content"
          name="content"
          as="textarea"
          rows={6}
          required
          minLength={20}
          placeholder="Share what changed..."
          error={state.fieldErrors?.content}
        />

        <div>
          <label className="space-y-2 text-sm font-medium">
            Status
            <select
              name="status"
              className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </label>
          {state.fieldErrors?.status && (
            <p className="mt-1 text-xs text-red-500">
              {state.fieldErrors.status.join(", ")}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
        >
          {pending && <LoadingSpinner className="h-4 w-4" />}
          {pending ? "Saving..." : "Save post"}
        </button>

        {state.status === "success" && (
          <p className="text-sm text-green-600">Post created successfully!</p>
        )}
        {state.status === "error" && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </form>
    </section>
  );
}