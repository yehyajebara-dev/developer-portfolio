import type { CapabilityPillar, SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend",
    description: "Business logic, APIs, and the data layer underneath them.",
    items: [
      "PHP",
      "Laravel",
      "REST APIs",
      "Laravel Sanctum",
      "Authentication & Authorization",
      "RBAC",
      "Audit Logging",
      "Filament",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces for the systems above — built to be used daily, not just demoed.",
    items: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Vite", "Responsive Web Development"],
  },
  {
    id: "database",
    title: "Database",
    description: "Schema design and data integrity for operational systems.",
    items: ["MySQL", "PostgreSQL", "SQLite"],
  },
  {
    id: "desktop",
    title: "Desktop",
    description: "Native-feeling business software when a browser tab isn't enough.",
    items: ["NativePHP", "Electron"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "The servers, networks, and hardware that software actually runs on.",
    items: [
      "Windows Server",
      "VMware",
      "MikroTik",
      "Networking",
      "CCBOOT / CCDisk",
      "PC & Laptop Hardware",
      "Troubleshooting",
      "Remote Support",
    ],
  },
  {
    id: "integration",
    title: "System Integration",
    description: "Where software meets physical devices.",
    items: ["Biometric Devices", "ZKTeco", "NFC", "Hardware ↔ Web Integration"],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    description: "How the work ships and stays reproducible.",
    items: ["Git", "GitHub", "Docker", "WSL / WSL2"],
  },
];

export const capabilities: CapabilityPillar[] = [
  {
    id: "business-systems",
    title: "Business Systems",
    description:
      "ERP, workforce, and POS platforms that model how a business actually operates — schedules, shifts, permissions, and edge cases included.",
    points: ["Laravel + MySQL/PostgreSQL architecture", "Role-based access & audit logging", "Reporting built for operators, not just admins"],
  },
  {
    id: "web-applications",
    title: "Web Applications",
    description:
      "React and Laravel front-to-back, from authenticated dashboards to public-facing sites — responsive, accessible, and fast by default.",
    points: ["Laravel APIs + React/TypeScript UIs", "Sanctum-based authentication", "Tailwind CSS component systems"],
  },
  {
    id: "desktop-software",
    title: "Desktop Software",
    description:
      "Offline-capable business tools using NativePHP and Electron, for environments where a browser tab isn't reliable enough.",
    points: ["Local SQLite data layers", "POS and operational workflows", "Update-safe local data handling"],
  },
  {
    id: "infrastructure-hardware",
    title: "Infrastructure & Hardware",
    description:
      "Windows Server, VMware, and MikroTik networking — plus the hands-on hardware experience to keep multi-branch operations running.",
    points: ["Multi-branch IT operations", "Biometric & NFC device integration", "Networking, virtualization & remote support"],
  },
];
