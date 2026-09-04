import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Eight years, four roles, one throughline"
          description="Overlapping dates are intentional — infrastructure work and software development have run in parallel, not in sequence."
        />

        <ol className="mt-14 space-y-10 border-l border-border pl-8 sm:pl-10">
          {experience.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.05}>
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary sm:-left-[calc(2.5rem+5px)]"
                />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{entry.role}</h3>
                  <span className="text-sm text-muted-foreground">— {entry.organization}</span>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <p className="font-mono-tight text-xs text-muted-foreground">
                    {entry.start} — {entry.end}
                  </p>
                  {entry.current ? (
                    <span className="inline-flex items-center gap-1.5 font-mono-tight text-xs text-success">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
                      Current
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>

                <ul className="mt-4 space-y-1.5">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-foreground/85">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
