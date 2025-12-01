import { Suspense } from "react";

import { InviteUserForm } from "./invite-form";
import { LoadingCard } from "@/components/ui/loading";
import { UsersList } from "./components/users-list";

export default function DashboardUsersPage() {
  return (
    <div className="space-y-8">
      <InviteUserForm />
      <Suspense fallback={<LoadingCard />}>
        <UsersList />
      </Suspense>
    </div>
  );
}