# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — configured via `@theme` blocks in `app/globals.css`, no `tailwind.config.js`
- **Framer Motion 12** — all animated components use `"use client"` directive

## Architecture

Single-page marketing site. `app/page.tsx` imports five section components from `components/`:

| Component | Purpose |
|---|---|
| `Hero.tsx` | Full-screen hero with `GeometricBackground.tsx` overlay |
| `WhatWeDo.tsx` | Three service cards with scroll entrance |
| `WhyAIconic.tsx` | Positioning statement + supporting pillars |
| `Results.tsx` | Client project showcase (Tempo District, Lisi Trio) |
| `Contact.tsx` | CTA + footer |

## Design Tokens

Defined in `app/globals.css` `@theme` block:
- `--color-gold`: `#C9A84C` — primary accent
- `--color-foreground`: `#F5F0E8` — warm white text
- `--color-muted`: `#6B6A5E` — secondary text
- `--color-surface`: `#111110` — card backgrounds
- `--font-display`: Playfair Display (serif, for headings)
- `--font-sans`: Geist Sans (for body)

## Animation Patterns

- Entrance: `initial={{ opacity: 0, y: 40 }}` → `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}`
- Easing: `ease: [0.16, 1, 0.3, 1]` (custom cinematic ease)
- Card hover: `whileHover={{ y: -6 }}` + CSS `group-hover` for top border accent
- Hero text: staggered `animate` (not `whileInView`) with sequential delays
