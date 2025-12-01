"use client";

import { useEffect, useState } from "react";

import { LoadingCard } from "@/components/ui/loading";
import { ErrorCard } from "@/components/ui/error";

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  status: string;
  createdAt: string;
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <LoadingCard />;
  }

  if (error) {
    return (
      <ErrorCard
        title="Failed to load users"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="rounded-2xl border bg-background/80">
      <header className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Team members</h2>
      </header>
      <div className="divide-y text-sm">
        {users.length === 0 ? (
          <p className="px-6 py-8 text-muted-foreground">
            No users yet. Invite your first team member below.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
            >
              <div>
                <p className="font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground">
                  {user.name && `${user.name} · `}
                  {user.role} · {user.status}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
