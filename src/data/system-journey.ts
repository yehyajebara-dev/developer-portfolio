/**
 * Node graph for the "Inside the System" cinematic scroll sequence.
 * Positions are on a 0-100 viewBox-relative grid so the diagram scales
 * cleanly at any size. Each node maps to a real project id so Scene 4 can
 * morph the same node directly into that project's case-study card.
 */
export type SystemNodeId =
  | "react"
  | "laravel"
  | "database"
  | "server"
  | "network"
  | "pos"
  | "biometric";

export interface SystemNode {
  id: SystemNodeId;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  /** Project this node transforms into during Scene 4. Undefined = infra-only node. */
  projectId?: string;
}

export const systemNodes: SystemNode[] = [
  { id: "react", label: "React", sublabel: "Frontend", x: 50, y: 12, projectId: "ai-customer-service" },
  { id: "laravel", label: "Laravel", sublabel: "API / Backend", x: 50, y: 40, projectId: "attendance-erp" },
  { id: "database", label: "MySQL", sublabel: "Data Layer", x: 22, y: 58 },
  { id: "server", label: "Server", sublabel: "Infrastructure", x: 50, y: 68 },
  { id: "network", label: "Network", sublabel: "Multi-branch", x: 78, y: 58 },
  { id: "pos", label: "Desktop POS", sublabel: "NativePHP / Electron", x: 22, y: 86, projectId: "desktop-pos" },
  { id: "biometric", label: "Biometric", sublabel: "ZKTeco UF200-S", x: 78, y: 86, projectId: "attendance-erp" },
];

export const systemEdges: [SystemNodeId, SystemNodeId][] = [
  ["react", "laravel"],
  ["laravel", "database"],
  ["laravel", "server"],
  ["laravel", "network"],
  ["database", "pos"],
  ["server", "pos"],
  ["network", "biometric"],
  ["server", "biometric"],
];
