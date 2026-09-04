export const profile = {
  name: "Yehya Jebara",
  initials: "YJ",
  location: "Sidon, Lebanon",
  positioning: "Full-Stack Developer — Laravel / PHP — IT & Systems Specialist",
  heroKicker: "Software + Infrastructure, one engineer",
  heroHeadline: "I build the systems businesses run on — and the infrastructure that keeps them running.",
  heroSubline:
    "8+ years across software engineering, IT infrastructure, networking, and hardware. I design Laravel/PHP systems end to end, then deploy and support them on real, physical infrastructure — not just a staging environment.",
  summary:
    "8+ years of experience spanning software engineering, IT infrastructure, networking, technical support, Windows systems, virtualization, hardware, and multi-branch IT operations. I build modern Laravel/PHP business systems — ERP, attendance and workforce platforms, POS, AI-assisted customer service tools, dashboards, and APIs — and I connect them to the physical world: biometric devices, networked hardware, and the servers they run on.",
  email: "contact@yehyajebara.com",
  social: {
    github: "https://github.com/yehyajebara",
    linkedin: "https://www.linkedin.com/in/yehyajebara",
  },
  availability: "Open to full-stack and systems engineering roles",
} as const;

export const philosophy = [
  {
    id: "build",
    title: "Build",
    description:
      "Ship production systems with clean architecture, sane data models, and business logic that survives real-world edge cases — not just the happy path.",
  },
  {
    id: "solve",
    title: "Solve",
    description:
      "Diagnose the actual root cause, whether it's a race condition in an attendance calculation, a misconfigured VLAN, or a biometric device that stopped syncing.",
  },
  {
    id: "grow",
    title: "Grow",
    description:
      "Keep systems maintainable and infrastructure supportable, so the business can add branches, devices, and features without a rewrite.",
  },
] as const;
