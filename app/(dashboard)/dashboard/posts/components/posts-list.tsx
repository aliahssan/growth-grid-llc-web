"use client";

import { useEffect, useState } from "react";

import { LoadingCard } from "@/components/ui/loading";
import { ErrorCard } from "@/components/ui/error";

interface Post {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  author?: { email?: string };
}

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <LoadingCard />;
  }

  if (error) {
    return (
      <ErrorCard
        title="Failed to load posts"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <section className="rounded-2xl border bg-background/80">
      <header className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Existing posts</h2>
      </header>
      <div className="divide-y text-sm">
        {posts.length === 0 ? (
          <p className="px-6 py-8 text-muted-foreground">
            No posts yet. Use the Posts tab to create one.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
            >
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground">
                  {post.status} · {post.author?.email ?? "Unknown"}
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
  );
}
