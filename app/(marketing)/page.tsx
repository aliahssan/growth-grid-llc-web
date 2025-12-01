import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Modern growth partner",
  description: siteConfig.description,
  path: "/",
});

const stats = [
  { label: "Launch-ready page templates", value: "8" },
  { label: "Server-side API endpoints", value: "6" },
  { label: "Average uplift unlocked", value: "34%" },
];

const pillars = [
  {
    title: "Strategy + positioning",
    body: "Narratives, offer architecture, and content engines that resonate with buying committees.",
  },
  {
    title: "Product + engineering",
    body: "Next.js 16 + Prisma stack with Server Actions, rate limiting, and role-aware access baked in.",
  },
  {
    title: "Lifecycle automation",
    body: "SendGrid-powered messaging, CRM syncs, and attribution that prove pipeline impact.",
  },
];

export default function MarketingHomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-secondary/40 py-24">
        <Container className="flex flex-col gap-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {siteConfig.tagline}
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight">
              Launch a secure, data-informed marketing OS in weeks—not quarters.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Growth Grid unifies brand sites, lead capture, and admin tooling with
              enterprise-grade security and analytics. Every module is optimized
              for Lighthouse 95+, SEO-first routing, and production-ready CI/CD.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={siteConfig.links.contact}
              className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Book a discovery call
            </Link>
            <Link
              href={siteConfig.links.about}
              className="inline-flex items-center rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
            >
              See how we work
            </Link>
          </div>
          <div className="grid gap-6 rounded-3xl border bg-background/70 p-6 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label}>
                <p className="text-4xl font-semibold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Delivery model
            </p>
            <h2 className="text-3xl font-semibold">
              Operators + platform, delivered as one growth squad.
            </h2>
            <p className="text-muted-foreground">
              Use Growth Grid as your digital HQ or embed our engineers
              alongside your internal teams. Either way you get structured
              roadmaps, analytics, and executive-level reporting.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Fractional GTM leadership with weekly war rooms</li>
              <li>• Pre-built component library using ShadCN + Tailwind</li>
              <li>• Serverless API layer for auth, uploads, and CRM sync</li>
            </ul>
          </div>
          <div className="grid gap-6 rounded-3xl border bg-background/70 p-6 md:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="space-y-2">
                <h3 className="text-lg font-semibold">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground">{pillar.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-6 rounded-3xl border bg-primary text-primary-foreground p-10">
          <p className="text-sm uppercase tracking-widest">Next steps</p>
          <h2 className="text-3xl font-semibold">Ready for Phase 3 deliverables?</h2>
          <p className="text-primary-foreground/80">
            We’re lining up the database, auth, and admin portal next. Book a
            call to preview the roadmap or request early access to the dashboard.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={siteConfig.links.contact}
              className="inline-flex items-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-background/80"
            >
              Schedule a call
            </Link>
            <Link
              href={siteConfig.links.terms}
              className="inline-flex items-center rounded-full border border-primary-foreground px-6 py-3 text-sm font-semibold"
            >
              Review legal
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

