# Malak Ben Hassine — Portfolio

Personal portfolio of **Malak Ben Hassine**, Software Engineer (Full-Stack, Applied AI & DevOps).

Built with **Next.js 15 (App Router)**, **TypeScript (strict)**, **Tailwind CSS v4** and **Framer Motion**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Project structure

```
src/
├── app/                  # layout (SEO metadata), page, OG image, icon, robots, sitemap
├── components/
│   ├── sections/         # Hero, About, Stats, Experience, Projects, Skills, Certifications, Contact
│   ├── hero/             # CI/CD pipeline animation
│   ├── projects/         # Filterable project grid & cards
│   ├── contact/          # Contact form (Formspree / mailto fallback)
│   ├── layout/           # Navbar, Footer
│   ├── providers/        # Framer Motion config (respects prefers-reduced-motion)
│   └── ui/               # Reusable primitives + icons
├── data/                 # All site content (edit text here, not in components)
├── hooks/                # useActiveSection
└── lib/                  # Types, site config, helpers
```

## Configuration

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for canonical, Open Graph and sitemap (falls back to the Vercel production URL). |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID. If empty, the contact form opens the visitor's email app instead. |

## Content to add

- **CV**: place the PDF at `public/cv/Malak-Ben-Hassine-CV.pdf` (linked from the "Download CV" button).
- **Photo** (optional): add an image under `public/` and set `profile.photo` in `src/data/profile.ts`.
- **Project screenshots / links** (optional): set `image` and `href` on projects in `src/data/projects.ts`.
- **Pipeline stage names**: adjust `src/data/pipeline.ts` to match the real Jenkinsfile.
