"use client";

import { useEffect, useState } from "react";

import { LoadingCard } from "@/components/ui/loading";
import { ErrorCard } from "@/components/ui/error";

interface DashboardData {
  users: number;
  posts: Array<{
    id: string;
    title: string;
    status: string;
    createdAt: string;
    author?: { name?: string };
  }>;
  published: number;
}

export function DashboardStats() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }
        const stats = await response.json();
        setData(stats);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingCard />;
  }

  if (error || !data) {
    return (
      <ErrorCard
        title="Failed to load dashboard"
        message={error || "We couldn't fetch your dashboard data right now."}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total users", value: data.users },
          { label: "Recent posts", value: data.posts.length },
          { label: "Published posts", value: data.published },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border bg-background/80 p-6 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border bg-background/80">
        <header className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Latest posts</h2>
        </header>
        <div className="divide-y text-sm">
          {data.posts.length === 0 ? (
            <p className="px-6 py-8 text-muted-foreground">
              No posts yet. Use the Posts tab to create one.
            </p>
          ) : (
            data.posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
              >
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">
                    by {post.author?.name ?? "Unknown"} ·{" "}
                    {post.status.toLowerCase()}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
