# Yehya Jebara — Portfolio

Personal portfolio for Yehya Jebara — Full-Stack Developer (Laravel/PHP) and IT & Systems Specialist. Built as a single-page site presenting professional background, featured projects, technology, and experience.

## Technology Stack

- **Framework:** Next.js 16 (App Router, Turbopack, static export of every route)
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css`)
- **Animation:** [Motion](https://motion.dev) for React (`motion/react`), with `prefers-reduced-motion` respected throughout
- **Icons:** [lucide-react](https://lucide.dev), plus two hand-authored SVGs for GitHub/LinkedIn (lucide dropped trademarked brand glyphs)

## Prerequisites

- Node.js 20+ and npm

## Installation

```powershell
cd C:\Projects\yehya-jebara-portfolio
npm install
```

## Development

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```powershell
npm run build
npm start
```

## Other Scripts

```powershell
npm run lint      # ESLint
npx tsc --noEmit  # TypeScript type-check
```

## Folder Structure

```
src/
  app/                  # Routes, layout, metadata, sitemap/robots, dynamic icon & OG image
  components/
    layout/             # Navbar, Footer
    sections/           # Page sections (Hero, Projects, Skills, Experience, ...)
    ui/                 # Small reusable primitives (Button, Badge, Reveal, ...)
    icons.tsx           # Hand-authored brand SVGs
  data/                 # Content as structured data — edit here, not in components
    profile.ts          # Name, positioning, summary, philosophy
    experience.ts        # Work history timeline
    projects.ts          # Featured projects + "other work"
    skills.ts             # Skill groups + capability pillars
  lib/                  # Small utilities (`cn`, site config)
  hooks/                 # `useReducedMotion`
  types/                 # Shared TypeScript types for the data layer
```

## Editing Portfolio Content

All real-world content lives in `src/data/` as plain TypeScript objects — update these files directly, no component code needs to change:

| What to update | File |
|---|---|
| Name, headline, bio, email, social links, availability | `src/data/profile.ts` |
| Work history / timeline | `src/data/experience.ts` |
| Featured projects & other work | `src/data/projects.ts` |
| Skill groups & capability pillars | `src/data/skills.ts` |
| Site URL, page title/description | `src/lib/site.ts` |

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No (defaults to a placeholder) | Canonical production URL, used for metadata, Open Graph, sitemap, and robots.txt. Set this to the real domain before deploying. |

No secrets or API keys are required — the site has no server-side integrations. Contact is handled via a direct `mailto:` link rather than a form, so there is no email-provider credential to manage. If a contact form is added later, keep any provider API key server-side only (never exposed with `NEXT_PUBLIC_`), validate input server-side, and add rate-limiting.

## Security Notes

- Strict security headers are set in `next.config.ts`: Content-Security-Policy, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. The CSP relaxes `script-src` with `'unsafe-eval'` only in development (required by Next.js dev-mode debugging); production keeps the stricter policy.
- All external links (`target="_blank"`) use `rel="noopener noreferrer"`.
- No secrets, credentials, or `.env` files are committed. `.gitignore` excludes `.env*`.
- The only inline script is a static JSON-LD `<script type="application/ld+json">` built from hard-coded profile data — no user input ever reaches it.

## Deployment Notes

The site is fully static (every route prerenders — see `npm run build` output) and can be deployed to any Next.js-compatible host (Vercel, Netlify, a Node server, etc.). Before deploying:

1. Set `NEXT_PUBLIC_SITE_URL` to the real production domain.
2. Update `src/data/profile.ts` with verified social links and final contact email.
3. Add a real professional portrait/OG image if you want a photo instead of the generated monogram icon (replace `src/app/opengraph-image.tsx`, `src/app/icon.tsx`, `src/app/apple-icon.tsx`).
