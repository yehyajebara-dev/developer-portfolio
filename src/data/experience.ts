import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    id: "zero3",
    organization: "Zero 3 Co.",
    role: "IT Specialist",
    start: "Jun 2023",
    end: "Present",
    current: true,
    summary:
      "Multi-branch IT operations covering hardware, networking, and systems support for day-to-day business technology.",
    highlights: [
      "Support and maintain IT infrastructure across multiple business branches",
      "Diagnose and resolve hardware, software, and network issues for staff and systems",
      "Manage Windows systems, workstations, and connected business hardware",
      "Provide remote and on-site technical support with minimal business disruption",
    ],
    tags: ["IT Operations", "Networking", "Hardware", "Windows Systems", "Multi-Branch Support"],
  },
  {
    id: "talkstech",
    organization: "TalksTech",
    role: "Software Development Intern",
    start: "2026",
    end: "Present",
    current: true,
    summary:
      "Working as part of a development team building SolarFlow, a SaaS platform — real collaborative, team-based software delivery.",
    highlights: [
      "Contribute to feature development within an established team workflow",
      "Work across the stack on a production SaaS codebase",
      "Collaborate with other engineers using shared Git and review practices",
    ],
    tags: ["Team Development", "SaaS", "Collaborative Engineering"],
  },
  {
    id: "gaming-store",
    organization: "Gaming Store",
    role: "Network & Gaming Systems Administrator",
    start: "Jun 2017",
    end: "Jun 2023",
    current: false,
    summary:
      "Owned the networking and diskless-system infrastructure for a gaming center — uptime-critical, hardware-heavy operations.",
    highlights: [
      "Administered CCBoot / CCDisk diskless system infrastructure for the gaming floor",
      "Designed and maintained networking for a multi-machine gaming environment",
      "Managed workstation imaging, updates, and hardware troubleshooting at scale",
      "Kept systems running under continuous, high-usage operating conditions",
    ],
    tags: ["Networking", "CCBoot / CCDisk", "System Administration", "Diskless Systems"],
  },
  {
    id: "abady-store",
    organization: "Abady Store",
    role: "IT Hardware Technician",
    start: "Jun 2016",
    end: "Jun 2019",
    current: false,
    summary: "Hands-on hardware repair and technical troubleshooting for PCs and laptops.",
    highlights: [
      "Diagnosed and repaired PC and laptop hardware faults",
      "Handled software installation, configuration, and troubleshooting for customers",
      "Built the hardware fundamentals that still inform every system integration today",
    ],
    tags: ["Hardware Repair", "Technical Troubleshooting"],
  },
];
