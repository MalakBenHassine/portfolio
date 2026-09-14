# Malak Ben Hassine — Portfolio

Personal portfolio of **Malak Ben Hassine**, Software Engineer (Full-Stack, Applied AI & DevOps).

Built with **Next.js 15 (App Router)**, **TypeScript (strict)**, **Tailwind CSS v4**, **Framer Motion** and **Simple Icons** (tree-shaken, server-rendered).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Page structure (scroll storytelling)

Hero (portrait, interactive background) → Profile at a glance → 01 About (from code to production) → Engineering Impact → 02 Experience → Internship case study (AnalyseImpacte, Capgemini Engineering) → 03 Projects (public GitHub repositories) → 04 Skills → Applied AI → Achievements → 05 Contact

Projects only list work whose source code is public; every claim is checked against the linked repository.

## Project structure

```
src/
├── app/                  # layout (SEO metadata), page (JSON-LD), OG image, icon, robots, sitemap
├── components/
│   ├── sections/         # One component per page section
│   ├── hero/             # Portrait, CSS intro reveal, pointer parallax, particle field
│   ├── about/            # "From code to production" delivery flow
│   ├── ai/               # Code window for the Applied AI section
│   ├── skills/           # Skill chip with hover role tooltip
│   ├── case-study/       # AnalyseImpacte internship case study: pipeline, results, workflow, architecture
│   ├── experience/       # Scroll-linked timeline rail
│   ├── projects/         # Filterable grid (client), server-rendered cards, illustrative visuals
│   ├── contact/          # Contact form (Formspree / mailto fallback), copy-email button
│   ├── layout/           # Navbar, Footer, top scroll progress, custom cursor (desktop only)
│   ├── providers/        # Framer Motion config (respects prefers-reduced-motion)
│   └── ui/               # Design-system primitives (Reveal, Stagger, SpotlightCard, MagneticButton…) + icons
├── data/                 # All site content — edit text here, not in components
├── hooks/                # useActiveSection, useMediaQuery, usePrefersReducedMotion, useFinePointer
└── lib/                  # Types, site config, motion presets, tech icon mapping, helpers
```

## Design system

Tokens live in `src/app/globals.css` (`@theme`):

| Token | Usage |
| --- | --- |
| `ink-*` | Near-black surfaces |
| `snow` / `mist-*` | Headings / body & secondary text (WCAG AA on all surfaces) |
| `azure-*` | Primary accent — used sparingly |
| `iris-400` | Secondary tint, gradients only |
| `ok-400` | "Passed" status in the pipeline visuals |

Utilities: `surface`, `glass`, `spotlight`, `text-gradient`, `bg-grid`, `bg-dots`, `divider-x`, `link-underline`, `text-numeral`.

## Motion principles

- Transform/opacity only; no endless animations. The particle field runs only while the mouse moves and the Hero is on screen.
- The Hero intro is pure CSS (`.hero-rise`), so it plays at first paint without waiting for JavaScript. The name is static (LCP).
- Scroll reveals use Framer Motion and carry `data-reveal`: without JavaScript, or with `prefers-reduced-motion`, they are shown immediately.
- Pointer effects (custom cursor, parallax, particles, magnetic buttons) are enabled only on fine pointers without reduced motion.

## Configuration

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical, Open Graph and sitemap (falls back to the Vercel production URL). |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID. If empty, the contact form opens the visitor's email app instead. |

## Content

- **CV**: `public/cv/Malak-Ben-Hassine-CV.pdf`.
- **Portrait**: `public/images/malak-profile.webp` (referenced in `src/data/profile.ts` and imported in `src/components/hero/Portrait.tsx`). To replace it, keep the same file name, or update both.
- **Project visuals**: each project uses an illustrative, code-drawn preview (`visual`). Set `image` to show a real screenshot instead, or add a `{ kind: "demo" }` link in `src/data/projects.ts`.
- **Technology logos**: map a technology name to a Simple Icons export in `src/lib/techIcons.ts` (a monogram is shown otherwise).
