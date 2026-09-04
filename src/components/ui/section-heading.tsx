import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "font-mono-tight flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary",
          align === "center" && "justify-center",
        )}
      >

        {index ? <span className="text-muted-foreground/70">{index}</span> : null}
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
