import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Growth Grid collects, stores, and protects customer data across the platform.",
  path: siteConfig.links.privacy,
});

const sections = [
  {
    title: "1. Information we collect",
    body: [
      "Identity data (name, email, role) provided directly by you.",
      "Usage data automatically captured via analytics and application logs.",
      "Content data such as uploaded media, templates, or campaign copy you create inside Growth Grid.",
    ],
  },
  {
    title: "2. How we use data",
    body: [
      "To operate and maintain the Growth Grid platform.",
      "To provide customer support, onboarding, and troubleshooting.",
      "To send product updates, security notices, and relevant marketing communications (opt-out anytime).",
    ],
  },
  {
    title: "3. Security & retention",
    body: [
      "All data is encrypted in transit (TLS 1.2+) and at rest (AES-256).",
      "Role-based access control and audit logs monitor every privileged action.",
      "Customer data is retained for the duration of the contract and deleted within 30 days of termination unless requested sooner.",
    ],
  },
  {
    title: "4. Your rights",
    body: [
      "Request access, correction, or deletion of your personal data.",
      "Export project data at any time via our admin portal.",
      "Register a complaint with your local supervisory authority if you believe we are not meeting legal obligations.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <Container className="space-y-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Legal
          </p>
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().getFullYear()} · Questions? Email{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="underline"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </header>

        <article className="space-y-8 rounded-3xl border bg-background/70 p-8 leading-relaxed">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {section.body.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Contact</h2>
            <p className="text-sm text-muted-foreground">
              Growth Grid LLC · {siteConfig.contact.address} ·{" "}
              {siteConfig.contact.phone}
            </p>
          </section>
        </article>
      </Container>
    </section>
  );
}

