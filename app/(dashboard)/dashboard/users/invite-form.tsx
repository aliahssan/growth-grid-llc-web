"use client";

import { useActionState, useEffect, useRef } from "react";

import { inviteUserAction } from "./actions";
import { LoadingSpinner } from "@/components/ui/loading";

const initialState = {
  status: "idle" as "idle" | "success" | "error",
  message: "",
  fieldErrors: {} as Record<string, string[]>,
};

export function InviteUserForm() {
  const [state, formAction, pending] = useActionState(
    inviteUserAction,
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
      <h2 className="text-lg font-semibold">Invite teammate</h2>
      <p className="text-sm text-muted-foreground">
        Creates a placeholder account and emails the invitee separately.
      </p>

      <form
        ref={formRef}
        className="mt-4 space-y-4"
        action={formAction}
      >
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <input
              type="email"
              name="email"
              required
              placeholder="founder@example.com"
              className="w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {state.fieldErrors?.email && (
              <p className="mt-1 text-xs text-red-500">
                {state.fieldErrors.email.join(", ")}
              </p>
            )}
          </div>

          <div>
            <select
              name="role"
              className="rounded-xl border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
          >
            {pending && <LoadingSpinner className="h-4 w-4" />}
            {pending ? "Inviting..." : "Send invite"}
          </button>
        </div>

        {state.status === "success" && (
          <p className="text-sm text-green-600">Invite sent successfully!</p>
        )}
        {state.status === "error" && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </form>
    </section>
  );
}