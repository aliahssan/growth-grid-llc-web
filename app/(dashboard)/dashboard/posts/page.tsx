import { Suspense } from "react";

import { CreatePostForm } from "./post-form";
import { LoadingCard } from "@/components/ui/loading";
import { PostsList } from "./components/posts-list";

export default function DashboardPostsPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <CreatePostForm />
        <section className="rounded-2xl border bg-background/80 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">API access</h2>
          <p className="text-sm text-muted-foreground">
            Create posts via REST: POST /api/posts with {"{\"title\",\"content\",\"status\"}"}.
            Authenticated requests are rate limited.
          </p>
          <div className="mt-4 space-y-3 text-xs font-mono text-muted-foreground">
{`curl -X POST https://yourdomain.com/api/posts \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Launch","content":"...","status":"PUBLISHED"}'`}
          </div>
        </section>
      </div>

      <Suspense fallback={<LoadingCard />}>
        <PostsList />
      </Suspense>
    </div>
  );
}