import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/80 py-6 text-sm text-muted-foreground">
      <Container className="flex flex-col gap-1 text-center sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/privacy" className="hover:text-foreground">
            Privacy
          </a>
          <a href="/terms" className="hover:text-foreground">
            Terms
          </a>
        </div>
      </Container>
    </footer>
  );
}

