import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "attendance-erp",
    name: "Attendance & Workforce ERP",
    tagline: "Biometric-integrated workforce platform for real operational rules",
    problem:
      "A multi-branch business needed accurate attendance and workforce data — not just clock-in times, but correct handling of multiple daily punches, shift schedules, holidays, leave, and the audit trail to back it all up.",
    engineering:
      "Designed the Laravel + MySQL data model around employees, schedules, and punch events, then layered attendance-calculation rules on top: shift matching, multiple daily punches, late/early thresholds, holiday and leave interaction, and edge cases like missed punches. Role-based access and audit logging protect who can view or adjust records.",
    result:
      "A system that combines business logic, database engineering, hardware integration, and admin-facing workflows into one platform — connecting a ZKTeco UF200-S biometric device directly to the reporting layer HR actually uses.",
    stack: ["Laravel", "MySQL", "ZKTeco UF200-S", "RBAC", "Audit Logging"],
    highlights: [
      { label: "Hardware", detail: "ZKTeco UF200-S biometric punch integration" },
      { label: "Logic", detail: "Multi-punch, shift, holiday & leave calculation rules" },
      { label: "Security", detail: "Role-based access with full audit logging" },
    ],
    featured: true,
  },
  {
    id: "desktop-pos",
    name: "Desktop POS",
    tagline: "Offline-first point-of-sale for real retail floors",
    problem:
      "Retail checkout can't depend on a browser tab staying open or a connection staying live. The business needed a desktop application that keeps selling even when the network doesn't cooperate.",
    engineering:
      "Built with Laravel running inside NativePHP and packaged as an Electron desktop app, backed by a local SQLite database. Local-first data handling keeps the POS workflow — sales, inventory, receipts — usable offline, with an architecture designed to stay update-safe as the app evolves.",
    result:
      "A native-feeling desktop application that brings Laravel's backend patterns to a POS environment where reliability matters more than connectivity.",
    stack: ["Laravel", "NativePHP", "Electron", "SQLite"],
    highlights: [
      { label: "Architecture", detail: "Laravel inside a native desktop shell via NativePHP + Electron" },
      { label: "Data", detail: "Local SQLite storage, update-safe by design" },
      { label: "Use case", detail: "Offline-capable point-of-sale workflows" },
    ],
    featured: true,
  },
  {
    id: "ai-customer-service",
    name: "AI Customer Service Platform",
    tagline: "AI-assisted conversations with human takeover and full audit history",
    problem:
      "Businesses wanted AI-assisted customer conversations without losing control — a human needs to be able to step in, escalate, and review what happened, in both English and Arabic.",
    engineering:
      "Laravel API backend with a React frontend, modeling conversations, contacts, and role-based escalation paths. Built an AI provider abstraction so the underlying model can be swapped without rewriting the conversation layer, with encrypted storage for integration credentials, full audit logging, and WhatsApp integration groundwork. The interface supports English and Arabic, including RTL layout.",
    result:
      "A platform where AI assistance and human oversight work together — escalation and takeover are first-class features, not an afterthought, and every action is auditable.",
    stack: ["Laravel", "React", "RBAC", "Encrypted Credentials", "RTL (Arabic)"],
    highlights: [
      { label: "Control", detail: "Human takeover & escalation paths, not just AI autopilot" },
      { label: "Security", detail: "Encrypted integration credentials & audit logs" },
      { label: "Localization", detail: "English / Arabic with full RTL support" },
    ],
    featured: true,
  },
  {
    id: "warranty-platform",
    name: "Warranty Platform",
    tagline: "Structured warranty and device-workflow tracking for the business",
    problem:
      "Warranty and device-service tracking was informal, making it hard to answer basic questions: what's covered, what's in progress, and what happened to a specific device.",
    engineering:
      "A Laravel-based platform structuring the full warranty and device lifecycle — registration, status tracking, and workflow handoffs — so device history is recorded consistently instead of living in someone's memory.",
    result:
      "A dependable system of record for warranty and device workflows that the business can actually query and report on.",
    stack: ["Laravel", "MySQL", "Workflow Design"],
    highlights: [
      { label: "Scope", detail: "Full device & warranty lifecycle tracking" },
      { label: "Outcome", detail: "Replaced informal tracking with a queryable system of record" },
    ],
    featured: true,
  },
];

export const otherWork = [
  {
    title: "White-label POS architecture",
    description: "A POS foundation designed to be re-branded and redeployed across multiple businesses.",
  },
  {
    title: "NFC & loyalty systems",
    description: "Hardware-integrated loyalty tracking using NFC for customer identification.",
  },
  {
    title: "Business websites & e-commerce",
    description: "Custom business sites and e-commerce builds, from storefront to backend.",
  },
  {
    title: "APIs & hardware integrations",
    description: "Purpose-built APIs connecting business software to physical devices.",
  },
] as const;
