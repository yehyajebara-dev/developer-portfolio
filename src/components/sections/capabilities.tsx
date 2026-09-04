import { Building2, Globe, MonitorSmartphone, Network } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { capabilities } from "@/data/skills";

const icons = {
  "business-systems": Building2,
  "web-applications": Globe,
  "desktop-software": MonitorSmartphone,
  "infrastructure-hardware": Network,
} as const;

export function Capabilities() {
  return (
    <section id="capabilities" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What I Build"
          title="Four disciplines, one engineer"
          description="Most developers stop at the browser tab. I take systems the rest of the way — onto the servers, networks, and devices they actually run on."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {capabilities.map((capability, index) => {
            const Icon = icons[capability.id as keyof typeof icons];
            return (
              <Reveal key={capability.id} delay={index * 0.06}>
                <article className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-border-strong sm:p-8">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary text-primary">
                    <Icon aria-hidden="true" size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
                  <ul className="mt-5 space-y-2">
                    {capability.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
