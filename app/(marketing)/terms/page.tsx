import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The legal terms governing your use of the Growth Grid platform and services.",
  path: siteConfig.links.terms,
});

const clauses = [
  {
    heading: "1. Acceptance",
    copy: "By accessing Growth Grid you agree to these Terms and our Privacy Policy. If you are acting on behalf of a company you represent that you have authority to bind that entity.",
  },
  {
    heading: "2. Services",
    copy: "We provide hosted software, implementation support, and advisory services. Scope, deliverables, and payment schedules are defined in each Statement of Work or subscription order.",
  },
  {
    heading: "3. Intellectual property",
    copy: "We retain ownership of the Growth Grid platform, templates, and proprietary methodologies. You own all data, creative assets, and deliverables produced specifically for your organization upon payment.",
  },
  {
    heading: "4. Confidentiality",
    copy: "Both parties agree to safeguard confidential information using industry-standard security practices and to use it solely for performing obligations under the agreement.",
  },
  {
    heading: "5. Liability",
    copy: "Neither party is liable for indirect or consequential damages. Aggregate liability is limited to fees paid within the previous 12 months.",
  },
  {
    heading: "6. Governing law",
    copy: "These Terms are governed by the laws of Delaware, USA. Disputes will be resolved through binding arbitration in Wilmington unless mutually agreed otherwise.",
  },
];

export default function TermsPage() {
  return (
    <section className="py-20">
      <Container className="space-y-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Legal
          </p>
          <h1 className="text-4xl font-semibold">Terms of Service</h1>
          <p className="text-muted-foreground">
            Effective as of {new Date().getFullYear()}
          </p>
        </header>
        <article className="space-y-6 rounded-3xl border bg-background/70 p-8 leading-relaxed text-sm text-muted-foreground">
          {clauses.map((clause) => (
            <section key={clause.heading} className="space-y-2 text-base">
              <h2 className="text-xl font-semibold text-foreground">
                {clause.heading}
              </h2>
              <p>{clause.copy}</p>
            </section>
          ))}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p>
              Questions about these Terms? Email{" "}
              <a className="underline" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              or write to {siteConfig.contact.address}.
            </p>
          </section>
        </article>
      </Container>
    </section>
  );
}

