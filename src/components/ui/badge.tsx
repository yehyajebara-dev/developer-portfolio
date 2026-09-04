import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 font-mono-tight text-xs text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
