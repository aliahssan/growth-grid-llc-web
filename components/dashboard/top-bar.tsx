"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

type DashboardTopBarProps = {
  userName?: string | null;
  userRole: string;
};

export function DashboardTopBar({ userName, userRole }: DashboardTopBarProps) {
  const [pending, startTransition] = useTransition();
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-background/80 px-8 py-4">
      <div>
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          {pathname === "/dashboard" ? "Overview" : pathname.replace("/dashboard/", "")}
        </p>
        <h1 className="text-2xl font-semibold">
          {userName ?? "Admin"} · {userRole}
        </h1>
      </div>
      <button
        type="button"
        onClick={() => {
          startTransition(() => {
            void signOut({ callbackUrl: "/login" });
          });
        }}
        disabled={pending}
        className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-foreground/5 disabled:opacity-70"
      >
        {pending ? "Signing out..." : "Sign out"}
      </button>
    </header>
  );
}

