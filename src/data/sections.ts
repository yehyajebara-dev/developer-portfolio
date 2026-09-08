/** The full narrative order of the page — drives the scroll rail's index markers. */
export const storySections = [
  { id: "system", index: "01", label: "Inside the System" },
  { id: "introduction", index: "02", label: "Who I Am" },
  { id: "capabilities", index: "03", label: "What I Build" },
  { id: "projects", index: "04", label: "Selected Systems" },
  { id: "skills", index: "05", label: "Engineering Stack" },
  { id: "experience", index: "06", label: "Experience" },
  { id: "how-i-work", index: "07", label: "How I Work" },
  { id: "contact", index: "08", label: "Contact" },
] as const;

export const storySectionIds = storySections.map((section) => section.id);

/**
 * The subset of sections surfaced in the navbar. Labels are deliberately shorter
 * than the corresponding `storySections` labels to fit the header.
 */
export const navLinks = [
  { label: "What I Build", href: "#capabilities" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const navSectionIds = navLinks.map((link) => link.href.slice(1));
