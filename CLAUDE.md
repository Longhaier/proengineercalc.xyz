# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint via next lint
npm run start    # Start production server
```

No test framework is configured.

## Architecture

Next.js 14 App Router project with no `src/` directory, no UI library, no state management, and no shared layout component.

**Routing:**
- `/` — Home page with all calculators grouped by category (`app/page.tsx`)
- `/calculators/hvac|electrical|fluid|structure` — Category listing pages (server components)
- `/calculators/[slug]` — Individual calculators, each a physically separate `page.tsx` (not a dynamic route)

**Calculator page pattern** — every calculator page is self-contained:
- `'use client'` directive at top
- Pure math functions defined above the component
- State via `useState`; results update either on button click or reactively via `useEffect` (both patterns exist)
- Renders its own header/nav/footer boilerplate (copy-pasted across pages — no shared layout)
- Uses global CSS class names: `.calculator-container`, `.calculator-form`, `.result-group`, `.result-item`, `.content-section`, `.formula-box`, `.disclaimer`

**Shared component:** `components/CalculatorContent.tsx` exports `FormulaSection`, `TermsSection`, `GuideSection`, `FAQSection`, `CaseSection` for SEO content below the calculator form. Some pages use it; others inline the same content as HTML — both patterns coexist.

**Styling:** Single `app/globals.css` with CSS custom properties (`--primary`, `--text`, etc.). No CSS Modules, no Tailwind.

## Adding a New Calculator

1. Create `app/calculators/[new-slug]/page.tsx` — copy an existing calculator as a template
2. Register it in `app/page.tsx` (home page category array)
3. Register it in `app/calculators/[category]/page.tsx` (category listing)
4. Manually add the URL to `public/sitemap.xml`
