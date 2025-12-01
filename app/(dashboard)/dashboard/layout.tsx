import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopBar } from "@/components/dashboard/top-bar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardTopBar
            userName={session.user.name}
            userRole={session.user.role}
          />
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

