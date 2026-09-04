import type { ComponentType } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { ErpVisual } from "@/components/visuals/projects/erp-visual";
import { PosVisual } from "@/components/visuals/projects/pos-visual";
import { AiVisual } from "@/components/visuals/projects/ai-visual";
import { WarrantyVisual } from "@/components/visuals/projects/warranty-visual";
import { projects, otherWork } from "@/data/projects";
import { cn } from "@/lib/utils";

const visuals: Record<string, ComponentType> = {
  "attendance-erp": ErpVisual,
  "desktop-pos": PosVisual,
  "ai-customer-service": AiVisual,
  "warranty-platform": WarrantyVisual,
};

export function Projects() {
  return (
    <section id="projects" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Selected Systems"
          index="03"
          title="Systems built for how the business actually works"
          description="Each of these started as a real operational problem, not a tutorial. No fabricated metrics — just the problem, the engineering, and what it does."
        />

        <div className="mt-14 space-y-8">
          {projects.map((project, index) => {
            const Visual = visuals[project.id];
            const isFlagship = index === 0;

            return (
              <Reveal key={project.id} delay={index * 0.05}>
                <GlowCard className="p-6 sm:p-10">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono-tight text-xs text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {isFlagship ? (
                          <span className="font-mono-tight rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-primary">
                            Flagship
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">{project.name}</h3>
                      <p className="mt-1 text-sm text-primary sm:text-base">{project.tagline}</p>
                    </div>
                  </div>

                  <div className={cn("mt-8 grid gap-8", isFlagship ? "lg:grid-cols-[1fr_360px]" : "lg:grid-cols-[1fr_320px]")}>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div>
                        <h4 className="font-mono-tight text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Problem
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-mono-tight text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Engineering
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{project.engineering}</p>
                      </div>
                      <div>
                        <h4 className="font-mono-tight text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Result
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{project.result}</p>
                      </div>
                    </div>

                    {Visual ? (
                      <div className="lg:row-span-1">
                        <Visual />
                      </div>
                    ) : null}
                  </div>

                  <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                    {project.highlights.map((highlight) => (
                      <div key={highlight.label}>
                        <dt className="font-mono-tight text-xs text-primary">{highlight.label}</dt>
                        <dd className="mt-1 text-sm text-muted-foreground">{highlight.detail}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h3 className="font-mono-tight text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Other Work
            </h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {otherWork.map((work) => (
                <div key={work.title}>
                  <p className="text-sm font-medium text-foreground">{work.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{work.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
