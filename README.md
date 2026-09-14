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

Hero → Profile at a glance → About → Engineering Impact → Experience → Internship case study (AnalyseImpacte, Capgemini Engineering) → Projects (public GitHub repositories) → Skills → Achievements → Contact

Projects only list work whose source code is public; every claim is checked against the linked repository.

## Project structure

```
src/
├── app/                  # layout (SEO metadata), page (JSON-LD), OG image, icon, robots, sitemap
├── components/
│   ├── sections/         # One component per page section
│   ├── hero/             # Terminal visual, tech orbit, background
│   ├── case-study/       # AnalyseImpacte internship case study: pipeline, results, workflow, architecture
│   ├── experience/       # Scroll-linked timeline rail
│   ├── projects/         # Filterable grid (client) + server-rendered cards
│   ├── contact/          # Contact form (Formspree / mailto fallback), copy-email button
│   ├── layout/           # Navbar (active section, scroll progress, mobile menu), Footer
│   ├── providers/        # Framer Motion config (respects prefers-reduced-motion)
│   └── ui/               # Design-system primitives (Reveal, Stagger, SpotlightCard, MagneticButton…) + icons
├── data/                 # All site content — edit text here, not in components
├── hooks/                # useActiveSection, usePrefersReducedMotion
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

Utilities: `surface`, `glass`, `spotlight`, `text-gradient`, `bg-grid`, `bg-dots`, `divider-x`.

## Configuration

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical, Open Graph and sitemap (falls back to the Vercel production URL). |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID. If empty, the contact form opens the visitor's email app instead. |

## Content

- **CV**: `public/cv/Malak-Ben-Hassine-CV.pdf`.
- **Photo** (optional): add an image under `public/` and set `profile.photo` in `src/data/profile.ts`.
- **Project screenshots / demo links** (optional): set `image` or add a `{ kind: "demo" }` link in `src/data/projects.ts`.
- **Technology logos**: map a technology name to a Simple Icons export in `src/lib/techIcons.ts` (a monogram is shown otherwise).
