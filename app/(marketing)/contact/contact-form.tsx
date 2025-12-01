"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  initialContactState,
  submitContactAction,
} from "./actions";
import { LoadingSpinner } from "@/components/ui/loading";
import { Field } from "@/components/ui/field";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactAction,
    initialContactState,
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 rounded-3xl border bg-background/70 p-8 shadow-sm"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          placeholder="Alex Rivera"
          required
          error={state.fieldErrors?.name}
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          placeholder="alex@company.com"
          required
          error={state.fieldErrors?.email}
        />
      </div>
      <Field
        label="Company / project"
        name="company"
        placeholder="Product launch, rebrand, etc."
        error={state.fieldErrors?.company}
      />
      <Field
        label="What do you want to build?"
        name="message"
        as="textarea"
        rows={5}
        placeholder="Share goals, success metrics, or deadlines."
        required
        error={state.fieldErrors?.message}
      />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
      >
        {pending && <LoadingSpinner className="h-4 w-4" />}
        {pending ? "Sending..." : "Submit inquiry"}
      </button>
      {state.status === "success" && (
        <p className="text-center text-sm text-green-600">{state.message}</p>
      )}
      {state.status === "error" && (
        <p className="text-center text-sm text-red-500">{state.message}</p>
      )}
    </form>
  );
}