import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Meet the Growth Grid collective—designers, strategists, and engineers accelerating modern go-to-market teams.",
  path: siteConfig.links.about,
});

const values = [
  {
    title: "Alignment first",
    description:
      "We co-create strategy with your leadership team so every sprint maps back to revenue goals.",
  },
  {
    title: "Quality over noise",
    description:
      "Fewer initiatives, more impact. Every release ships with instrumentation, testing, and docs.",
  },
  {
    title: "Security always",
    description:
      "Enterprise-ready security, audit logging, and privacy reviews are integrated into every build.",
  },
];

const milestones = [
  { year: "2019", detail: "Founded as a boutique CRO consultancy" },
  { year: "2021", detail: "Expanded to full-service RevOps + product studio" },
  { year: "2023", detail: "Launched Growth Grid platform beta" },
  { year: "2025", detail: "Re-architected on Next.js 16 + Prisma" },
];

export default function AboutPage() {
  return (
    <section className="py-20">
      <Container className="space-y-16">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            About Growth Grid
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Built by operators who have scaled SaaS and agency teams from $0 to
            $50M ARR.
          </h1>
          <p className="text-lg text-muted-foreground">
            We combine technical product leadership, brand strategy, and
            lifecycle marketing to launch trustworthy digital experiences. The
            Growth Grid platform is the operating system we wished we had while
            scaling in-house teams: opinionated, secure, and measurable.
          </p>
        </div>

        <div className="grid gap-8 rounded-3xl border bg-background/60 p-8 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="space-y-2">
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Collective expertise</h2>
            <p className="text-muted-foreground">
              Fractional CMOs, staff engineers, product designers, and data
              analysts embedded directly with your team. We draw from playbooks
              spanning enterprise SaaS, boutique agencies, and VC-backed media
              brands.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Experimentation programs across 12 industries</li>
              <li>• 40+ design systems shipped to production</li>
              <li>• SOC 2 aligned delivery workflows</li>
              <li>• Preferred partners with Vercel, SendGrid, and HubSpot</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold">Timeline</h2>
            <ol className="space-y-4">
              {milestones.map((milestone) => (
                <li key={milestone.year} className="flex gap-4">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {milestone.year}
                  </span>
                  <p>{milestone.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

