import { cn } from "@/lib/utils";

/** A single blurred radial-gradient light. Positioned via className from the caller. */
export function AmbientGlow({
  className,
  color = "var(--color-primary)",
  size = 480,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full opacity-[0.18] blur-[110px]", className)}
      style={{ width: size, height: size, background: color }}
    />
  );
}
