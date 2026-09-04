import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { philosophy } from "@/data/profile";

export function Philosophy() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Approach"
          title="Build. Solve. Grow."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {philosophy.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.08}>
              <div className="text-center sm:text-left">
                <span className="font-mono-tight text-sm text-primary">0{index + 1}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
