import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 font-mono-tight text-xs text-success">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
              {profile.availability}
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Have a system that needs building, fixing, or connecting?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground">
              Based in {profile.location}. Reach out directly — I read every message myself.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              >
                <Mail aria-hidden="true" size={16} />
                {profile.email}
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <GithubIcon aria-hidden="true" width={16} height={16} />
                GitHub
                <ArrowUpRight aria-hidden="true" size={12} />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <LinkedinIcon aria-hidden="true" width={16} height={16} />
                LinkedIn
                <ArrowUpRight aria-hidden="true" size={12} />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
