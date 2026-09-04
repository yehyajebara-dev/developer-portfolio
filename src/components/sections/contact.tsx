import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { Convergence } from "@/components/visuals/convergence";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <Container>
        <p className="font-mono-tight flex items-center justify-center gap-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-primary">
          <span className="text-muted-foreground/70">07</span>
          Contact
        </p>

        <Reveal>
          <div className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-card px-6 pb-14 pt-24 text-center sm:px-12 sm:pb-20 sm:pt-28">
            <Convergence />

            <span className="relative inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 font-mono-tight text-xs text-success">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
              {profile.availability}
            </span>

            <h2 className="relative mx-auto mt-6 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Have a system that needs building, fixing, or connecting?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground">
              Based in {profile.location}. Reach out directly — I read every message myself.
            </p>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
                >
                  <Mail aria-hidden="true" size={16} />
                  {profile.email}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-border-strong hover:bg-secondary"
                >
                  <Phone aria-hidden="true" size={16} />
                  {profile.phone}
                </a>
              </Magnetic>
            </div>

            <div className="relative mt-8 flex items-center justify-center gap-4">
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
