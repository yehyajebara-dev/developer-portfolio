export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  start: string;
  end: string;
  current: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface ProjectHighlight {
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  engineering: string;
  result: string;
  stack: string[];
  highlights: ProjectHighlight[];
  featured: boolean;
}

/** The six capability pillars. Each id also selects that pillar's glyph and grid span. */
export type CapabilityId =
  | "business-systems"
  | "web-applications"
  | "hardware-integration"
  | "desktop-software"
  | "infrastructure"
  | "security-data";

export interface CapabilityPillar {
  id: CapabilityId;
  title: string;
  description: string;
  points: string[];
}

