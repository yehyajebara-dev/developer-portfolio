import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Technology"
          title="Organized by what it's for, not a wall of logos"
          description="Grouped the way the work actually breaks down — from business logic to the hardware it eventually touches."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.04}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
