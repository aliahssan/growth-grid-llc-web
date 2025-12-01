"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Container } from "@/components/ui/container";

import { initialLoginState, loginAction } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialLoginState,
  );

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20">
      <div className="w-full max-w-md space-y-6 rounded-3xl border bg-background/80 p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Admin Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Use your Growth Grid admin credentials to access the dashboard.
          </p>
        </div>
        <form action={formAction} className="space-y-4">
          <label className="space-y-2 text-sm font-medium">
            Email
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-border bg-transparent px-4 py-3"
              placeholder="you@growthgrid.dev"
              autoComplete="email"
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Password
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-xl border border-border bg-transparent px-4 py-3"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
        {state.status === "error" && (
          <p className="text-center text-sm text-red-500">{state.message}</p>
        )}
        <p className="text-center text-xs text-muted-foreground">
          Lost access? Contact{" "}
          <Link className="underline" href="/contact">
            support
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}

