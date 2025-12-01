import { Suspense } from "react";

import { LoadingCard } from "@/components/ui/loading";
import { DashboardStats } from "./components/dashboard-stats";

export default function DashboardHomePage() {
  return (
    <Suspense fallback={<LoadingCard />}>
      <DashboardStats />
    </Suspense>
  );
}