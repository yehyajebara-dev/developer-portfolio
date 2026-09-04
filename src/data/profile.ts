export const profile = {
  name: "Yehya Jebara",
  initials: "YJ",
  location: "Sidon, Lebanon",
  positioning: "Full-Stack Developer — Laravel / PHP — IT & Systems Specialist",
  heroKicker: "Full-Stack Software Engineer",
  heroHeadline: "Building software that connects business, systems, and the real world.",
  heroSubline:
    "8+ years across software engineering, IT infrastructure, networking, and hardware. I design Laravel/PHP systems end to end, then deploy and support them on real, physical infrastructure — not just a staging environment.",
  summary:
    "Full-stack developer and IT specialist with 8+ years of hands-on technology experience spanning IT infrastructure, networking, technical support, and software engineering. I build Laravel/PHP business applications — workforce and attendance ERP, desktop POS, AI-assisted customer-service platforms — using React, MySQL, PostgreSQL, SQLite, RBAC, and REST APIs, then connect them to the physical world: biometric devices, networked hardware, Windows Server, virtualization, and multi-branch IT operations.",
  phone: "+961 71 048 772",
  email: "ye7ya71048772@gmail.com",
  social: {
    github: "https://github.com/yehyajebara-dev",
    linkedin: "https://www.linkedin.com/in/yehya-jebara-80a517270",
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

export const education = [
  {
    id: "liu",
    institution: "Lebanese International University",
    program: "Information Technology",
    detail: "3 years completed — degree not finished",
  },
] as const;

export const training = [
  "Cisco Networking",
  "Cybersecurity (short course)",
  "VMware",
  "MikroTik (practical training)",
  "CCBoot / diskless systems",
] as const;

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
  { name: "French", level: "Reading knowledge" },
] as const;
