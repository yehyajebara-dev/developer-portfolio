/**
 * Central site config. NEXT_PUBLIC_SITE_URL should be set to the real
 * production domain once one exists — everything else derives from it.
 */
export const siteConfig = {
  name: "Yehya Jebara",
  title: "Yehya Jebara — Full-Stack Software Engineer, Laravel/PHP & Systems Specialist",
  description:
    "Full-stack software engineer and IT systems specialist. I build Laravel/PHP business systems — ERP, POS, AI-assisted platforms — and the infrastructure and hardware integrations they run on.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yehyajebara.com",
} as const;
