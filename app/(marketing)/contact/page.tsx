import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

import { ContactForm } from "./contact-form";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Book a discovery call or drop a note. We respond within one business day.",
  path: siteConfig.links.contact,
});

const faqs = [
  {
    question: "How fast can we launch?",
    answer:
      "Strategy and design sprints begin within two weeks. Most MVP experiences ship inside 6–8 weeks with instrumentation and QA.",
  },
  {
    question: "Do you work with internal teams?",
    answer:
      "Yes. We partner with in-house engineering, RevOps, or creative teams and can embed fractional leaders or autonomous squads.",
  },
  {
    question: "What budgets do you support?",
    answer:
      "Engagements start at $12k/month for GTM retainers. Implementation-only scopes are quoted after a technical scoping workshop.",
  },
];

export default function ContactPage() {
  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_minmax(320px,0.9fr)]">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Let’s build together
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight">
              Tell us about your next launch, migration, or growth objective.
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form and we’ll confirm a kickoff call within 24
              hours. Prefer email? Reach us directly at{" "}
              <a
                className="underline decoration-dotted underline-offset-4"
                href={`mailto:${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>

          <ContactForm />
          <p className="text-center text-xs text-muted-foreground">
            By submitting you agree to our{" "}
            <Link className="underline" href={siteConfig.links.privacy}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <aside className="space-y-8 rounded-3xl border bg-secondary/30 p-6">
          <div>
            <h2 className="text-xl font-semibold">Direct lines</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.contact.availability}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p>Email: {siteConfig.contact.email}</p>
              <p>Phone: {siteConfig.contact.phone}</p>
              <p>Studio: {siteConfig.contact.address}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">FAQs</h2>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-border/60 bg-background/80 p-4"
                >
                  <summary className="cursor-pointer text-foreground">
                    {faq.question}
                  </summary>
                  <p className="mt-2">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </aside>
      </Container>
    </section>
  );
}

