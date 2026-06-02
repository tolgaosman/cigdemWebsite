# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The import above is load-bearing: this repo runs **Next.js 16.2.6**, whose APIs and conventions differ from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.

## Commands

```bash
npm run dev      # Turbopack dev server (http://localhost:3000)
npm run build    # Static export → ./out
npm run lint     # eslint (eslint-config-next)
```

There is no test suite.

## Critical architecture constraint: static export to GitHub Pages

[next.config.ts](next.config.ts) sets `output: 'export'`, `basePath: '/cigdemWebsite'`, `trailingSlash: true`, and `images.unoptimized: true`. This shapes everything:

- **No server runtime.** No API routes, route handlers, server actions, or server-side data fetching at request time. Everything is prerendered to static HTML in `out/`.
- **All asset paths are hardcoded with the `/cigdemWebsite/` prefix** (e.g. `<img src="/cigdemWebsite/cigdem.jpeg">`, favicon in [layout.tsx](src/app/layout.tsx)). `next/image` optimization is off — raw `<img>` is used with `eslint-disable @next/next/no-img-element`. New assets in `public/cigdemWebsite/` must follow this prefix or they break on GitHub Pages.
- The contact form **submits via a WhatsApp deep link** (`window.open('https://wa.me/...')`), not to a backend — see `handleGonder` in [iletisim/page.tsx](src/app/iletisim/page.tsx).
- **Prisma + nodemailer are vestigial.** [prisma/schema.prisma](prisma/schema.prisma) defines a `BasvuruFormu` model (SQLite) and the deps are installed, but nothing in the static frontend reads/writes the DB. `/admin` is a non-functional placeholder pointing to WhatsApp. Don't assume a working DB/email path exists.

## Frontend structure

- **App Router**, all pages are `'use client'` components under `src/app/`: `/` (home), `/hakkimda`, `/iletisim`, `/destek-alanlari`, `/admin`. Shared chrome (`Navbar`, `Footer`) is in [layout.tsx](src/app/layout.tsx).
- **Path alias:** `@/*` → `./src/*`.
- **Content is in Turkish** and lives inline in each page component (no CMS/i18n). The site is a psychology-counseling practice for Dr. Çiğdem Dürüst.

## Design system — single source of truth

The entire visual identity is **plain global CSS** in [src/app/globals.css](src/app/globals.css). No Tailwind, CSS modules, or UI library. Style changes happen here, driven by class names, not inline styles or component-scoped CSS.

- Design tokens are CSS custom properties in `:root`: purple brand palette (`--primary*`), warm accents (`--warm`, `--gold`, `--rose`), gradients (`--gradient-brand`, `--gradient-hero`, `--gradient-warm`, `--gradient-text`), layered shadows, `--radius*`, and easing (`--ease-soft`).
- Decorative depth comes from CSS-only animated mesh/orb backgrounds (`body::before`, `.hero-bg::before/::after`, `.page-header-bg`, `@keyframes orbDrift`/`morph`) — keep these performant and behind `prefers-reduced-motion` (handled at the bottom of the file).
- Fonts: Playfair Display + Cormorant Garamond (serif headings) and Outfit (body), imported via Google Fonts `@import` at the top of globals.css.
- Responsive breakpoints: 1024 / 900 / 640 / 380 px.

## Animations — Framer Motion via the `motion` package

Scroll/entrance animations use **`motion/react`** (the `motion` package, v12), wrapped by reusable helpers in [src/components/Reveal.tsx](src/components/Reveal.tsx):

- `<Reveal>` — fade + directional slide on scroll-into-view (`whileInView`, `once: true`). Props: `direction`, `delay`, `as`, `className`.
- `<Reveal stagger>` + `<RevealItem>` — container/child pattern for staggered grids (cards, stats).
- The home hero uses `motion` directly with a `variants` stagger container.

Prefer these over hand-rolled IntersectionObserver. The `AnimatedCounter` in [page.tsx](src/app/page.tsx) is the one intentional IntersectionObserver (number count-up). Form step transitions use `AnimatePresence` in [iletisim/page.tsx](src/app/iletisim/page.tsx).
