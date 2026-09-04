import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

export function Introduction() {
  return (
    <section className="border-t border-border py-20 sm:py-28" aria-labelledby="introduction-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <Reveal>
            <p className="font-mono-tight text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Profile
            </p>
            <h2 id="introduction-heading" className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {profile.heroSubline}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.summary}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
