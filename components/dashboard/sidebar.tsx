"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/posts", label: "Posts" },
  { href: "/dashboard/users", label: "Users" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-full max-w-xs border-r bg-background/90 px-6 py-10">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Growth Grid
          </p>
          <p className="text-lg font-semibold">Admin</p>
        </div>
        <nav className="space-y-2 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-xl px-4 py-2 transition",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

