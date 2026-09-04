type ClassValue = string | number | null | boolean | undefined | ClassValue[];

function flatten(input: ClassValue, out: string[]) {
  if (!input) return;
  if (Array.isArray(input)) {
    for (const item of input) flatten(item, out);
    return;
  }
  out.push(String(input));
}

/** Joins class names, skipping falsy values. No dependency on clsx/tailwind-merge. */
export function cn(...inputs: ClassValue[]) {
  const out: string[] = [];
  flatten(inputs, out);
  return out.join(" ");
}
