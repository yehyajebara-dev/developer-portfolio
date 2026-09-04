import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono-tight text-sm text-foreground">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.location}</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            aria-label="Call Yehya Jebara"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
          >
            <Phone aria-hidden="true" size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email Yehya Jebara"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
          >
            <Mail aria-hidden="true" size={18} />
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Yehya Jebara on GitHub"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
          >
            <GithubIcon aria-hidden="true" width={18} height={18} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Yehya Jebara on LinkedIn"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
          >
            <LinkedinIcon aria-hidden="true" width={18} height={18} />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {year} {profile.name}. Built with Next.js.
        </p>
      </Container>
    </footer>
  );
}
