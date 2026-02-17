# PORTFOLIO DESIGN SPEC
**Brutalist Technical · Calm & Refined · Electric Blue Accent**
`Version 1.0 · Feb 2026`

> *Aerospace documentation meets developer portfolio. Authoritative monochrome with surgical blue accents. Every element earns its space.*

**Stack:** Next.js · Tailwind CSS · Framer Motion · TypeScript
**Fonts:** DM Mono (Google Fonts) · Instrument Sans (Google Fonts)

---

## 01 / COLOR PALETTE

| ROLE | HEX | USAGE RULE |
|------|-----|------------|
| Background | `#0A0A0A` | Base canvas. Pure near-black. Never pure #000. |
| Surface | `#111111` | Card backgrounds, elevated elements. |
| Surface 2 | `#1A1A1A` | Hover states, nested surfaces. |
| Border | `#222222` | Default borders, dividers, hairlines. |
| Border 2 | `#333333` | Slightly visible borders, tag outlines. |
| Muted | `#555555` | Placeholder text, disabled states. |
| Ghost | `#888888` | Secondary body text, captions. |
| Primary Text | `#F0F0F0` | Headings, key labels, names. |
| **ACCENT** | **`#3B82F6`** | **CTAs, section numbers, hover borders, active tags. USE SPARINGLY.** |

> **Rule:** Every use of `#3B82F6` must be intentional — it signals active, interactive, or important. Never decorative.

---

## 02 / TYPOGRAPHY

| ELEMENT | FONT | SIZE | WEIGHT | LINE-H | TRACKING | CASE | USAGE |
|---------|------|------|--------|--------|----------|------|-------|
| Hero / H1 | DM Mono | 72–96px | 700 | 0.98 | -0.02em | ALL CAPS | Name, 1 per page |
| H2 Section | DM Mono | 40–48px | 700 | 1.1 | -0.01em | ALL CAPS | Section titles |
| H3 Card Title | DM Mono | 20–24px | 600 | 1.2 | 0 | ALL CAPS | Project names |
| Nav Links | Instrument Sans | 13px | 500 | 1 | 0.12em | ALL CAPS | Nav items |
| Section Label | DM Mono | 11–12px | 600 | 1 | 0.15em | ALL CAPS | 01, 02, labels |
| Body Text | Instrument Sans | 14–15px | 400 | 1.6 | 0 | Sentence | About, descriptions |
| Caption / Tag | DM Mono | 11px | 500 | 1 | 0.08em | ALL CAPS | Tech tags, metadata |
| Accent Label | DM Mono | 11px | 600 | 1 | 0.15em | ALL CAPS | Numbers in `#3B82F6` |

> **Core idea:** DM Mono handles all display/heading contexts. Instrument Sans handles all body/UI contexts. The clash between monospace and humanist IS the aesthetic.

### Font Loading (Next.js)

```ts
import { DM_Mono, Instrument_Sans } from 'next/font/google'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600']
})
```

---

## 03 / GRID & LAYOUT

| PROPERTY | VALUE | NOTES |
|----------|-------|-------|
| Frame width | `1440px` | Desktop design base |
| Mobile width | `390px` | iPhone 14 Pro base |
| Max content width | `1200px` | Max-w for all content |
| Horizontal padding | `80px` | Desktop gutters (each side) |
| Horizontal padding | `24px` | Mobile gutters (each side) |
| Base grid unit | `8px` | All spacing = multiples of 8px |
| Column count | `12` | Standard 12-col grid |
| Column gutter | `24px` | Gap between columns |
| Work section grid | `3-col` | 1px gap — border handles visual separation |
| About section grid | `2-col` | ~5-col left, ~7-col right |
| **Border radius** | **`0px`** | **Zero everywhere. Non-negotiable.** |
| Default border | `1px #222222` | All card/component borders |
| Accent border | `1px #3B82F6` | Hover / active state only |

---

## 04 / SPACING TOKENS

| TOKEN | VALUE | USAGE |
|-------|-------|-------|
| sp-1 | `4px` | Icon gaps, inline spacing |
| sp-2 | `8px` | Tag padding, tight gaps |
| sp-3 | `12px` | Input padding, small gaps |
| sp-4 | `16px` | Card padding (min), nav height unit |
| sp-5 | `24px` | Component gap, button padding |
| sp-6 | `32px` | Section inner padding |
| sp-7 | `48px` | Between components in a section |
| sp-8 | `64px` | Section top/bottom padding |
| sp-9 | `96px` | Large section separators |
| sp-10 | `128px` | Hero vertical padding |
| sp-11 | `160px` | Between full sections |
| sp-12 | `200px` | Hero height breathing room |

---

## 05 / COMPONENT SPECS

| COMPONENT | LAYOUT | SIZE | PADDING | NOTES |
|-----------|--------|------|---------|-------|
| NAV | Fixed top | H: 56px | px: 32px | Border-bottom: 1px #222. Logo: DM Mono 14px. Links: 13px 0.12em tracking. |
| HERO | Full viewport | min-H: 100vh | px: 80px py: 160px | Name as H1 (DM Mono 96px). Tag line accent blue. 2 CTAs. Stack pills row. |
| ABOUT | 2-col grid | Gap: 64px | py: 128px | Left: label + headline. Right: bio paragraph + skill pills grid. |
| WORK GRID | 3-col grid | Gap: 1px | py: 128px | Cards flush edge. Border separates. Hover: border accent. No card shadows. |
| PROJECT CARD | Stacked | p: 24px | H: 200px min | Number accent top-left. Title DM Mono. Tags row. Blue bar bottom on hover. |
| CONTACT | Centered | max-w: 640px | py: 160px | Big headline. Email as link. Social links row. Underline accent on hover. |
| SKILL PILL | Inline | h: 24px | px: 10px | DM Mono 11px. Border #222. Hover border #3B82F6. No background fill. |
| CTA PRIMARY | Inline-block | h: 40px | px: 20px | bg `#3B82F6`. DM Mono 13px. No border-radius. Hover: `#2563EB`. |
| CTA GHOST | Inline-block | h: 40px | px: 20px | bg transparent. Border #333. Hover border #3B82F6. DM Mono 13px. |
| SECTION NUMBER | Inline | — | mb: 8px | DM Mono 11px. Color `#3B82F6`. Tracking 0.15em. e.g. `01 / 02 / 03`. |

---

## 06 / INTERACTIONS & ANIMATION

| ELEMENT | PROPERTY | DURATION | EASING | NOTES |
|---------|----------|----------|--------|-------|
| Page Load — Nav | opacity: 0→1 | 600ms | ease-out | delay: 0ms |
| Page Load — H1 Line 1 | x: -20px→0, opacity 0→1 | 500ms | ease-out | delay: 100ms |
| Page Load — H1 Line 2 | x: -20px→0, opacity 0→1 | 500ms | ease-out | delay: 200ms |
| Page Load — Subtext | opacity: 0→1 | 400ms | ease-out | delay: 350ms |
| Page Load — CTAs | y: 8px→0, opacity 0→1 | 400ms | ease-out | delay: 500ms |
| Scroll Reveal — Section | x: -20px→0, opacity 0→1 | 500ms | ease-out | stagger: 60ms |
| Card Hover — Border | border-color: #222→#3B82F6 | 80ms | linear | no scale, no shadow |
| Card Hover — Number | color: #888→#3B82F6 | 80ms | linear | — |
| Button Hover (primary) | bg: #3B82F6→#2563EB | 120ms | ease | — |
| Button Hover (ghost) | border: #333→#3B82F6 | 80ms | linear | — |
| Nav Link Hover | color: #888→#F0F0F0 | 80ms | linear | — |
| Cursor | Custom crosshair | — | — | Blue ring 32px on hover over interactive els |
| Tag Hover | border-color→#3B82F6 | 80ms | linear | no bg change |

> **Philosophy:** This isn't a creative portfolio. Slow animations feel indulgent. Fast ones feel precise. Keep it snappy.

---

## 07 / PAGE SECTIONS BREAKDOWN

### NAV

| | |
|--|--|
| Height | 56px fixed top |
| Background | `#0A0A0A` with `backdrop-filter: blur(12px)` |
| Border | `border-bottom: 1px solid #222222` |
| Logo | DM Mono, 14px, `#F0F0F0`, letter-spacing 0.12em — YOUR INITIALS only |
| Nav links | Instrument Sans, 13px, `#888888` default → `#F0F0F0` hover, 80ms |
| Active link | Color `#3B82F6` |
| Mobile | Hamburger → full-screen overlay, links centered, 32px DM Mono |

---

### HERO

| | |
|--|--|
| Height | `100vh` min-height |
| Padding | pt: 160px · pb: 128px · px: 80px (desktop) / 24px (mobile) |
| Tag line | DM Mono 11px, `#3B82F6`, tracking 0.15em — e.g. `FULL-STACK DEVELOPER` |
| H1 | DM Mono 96px, `#F0F0F0`, line-height 0.98, tracking -0.02em |
| Subtext | Instrument Sans 15px, `#555555` — one-liner philosophy / stack |
| CTAs | Primary + Ghost side by side, gap: 16px |
| Stack row | Skill pills row below CTAs, gap: 8px, mt: 48px |
| Bottom rule | `1px solid #1A1A1A` — subtle section divider |
| Animation | Stagger: tag → H1 line 1 → H1 line 2 → sub → CTAs (100ms apart) |

---

### ABOUT

| | |
|--|--|
| Layout | 2-column CSS grid — `5fr` left, `7fr` right — gap: 80px |
| Padding | py: 128px · px: 80px (desktop) |
| Left col | Section number `01` in accent, H2 `ABOUT` (DM Mono 40px) |
| Right col | Instrument Sans 15px body text, 2–3 paragraphs. Skill grid below. |
| Skill grid | Wrap of pill components — full stack. 3–4 per row naturally. |
| Key rule | No headshot needed. Let the text and stack speak. |

---

### WORK / PROJECTS

| | |
|--|--|
| Layout | 3-column CSS grid — gap: 1px (border handles visual separation) |
| Padding | py: 128px · px: 80px (desktop) |
| Card padding | p: 24px all sides |
| Card min-height | 200px |
| Card border | `1px solid #222222` default → `1px solid #3B82F6` on hover (80ms) |
| Number | DM Mono 11px, `#3B82F6` — `001 / 002 / 003` |
| Title | DM Mono 20px, `#F0F0F0`, mt: 8px |
| Tags row | Skill pills, mt: 12px, wrap |
| Description | Instrument Sans 13px, `#555555`, mt: 12px, max 2 lines |
| Accent bar | 0px height default → `3px solid #3B82F6` on hover |
| Mobile | 1-column stacked, full width |

---

### CONTACT

| | |
|--|--|
| Layout | Single column, centered, max-width: 640px |
| Padding | py: 160px · px: 80px (desktop) |
| Section number | DM Mono 11px, `#3B82F6` — `04` |
| Headline | DM Mono 48px, `#F0F0F0` — e.g. `LET'S BUILD SOMETHING.` |
| Email | DM Mono 20px, `#3B82F6`, underline on hover — clickable `mailto:` |
| Social links | Instrument Sans 13px, `#333333` → `#F0F0F0` hover |
| Footer | DM Mono 11px `#222222` — minimal copyright only |

---

## 08 / AI PROMPT TEMPLATES

### VIBE SPEC
> Paste this into EVERY prompt as context. This is your style lock.

```
Brutalist Technical + Calm & Refined aesthetic. Pure dark background (#0A0A0A).
Monochrome with ONE electric blue accent (#3B82F6). DM Mono for all headings/display.
Instrument Sans for body. Zero border-radius anywhere. Hard edges, 8px grid, tight
snappy animations (80ms hover, 500ms reveals). Feels like aerospace documentation
meets developer portfolio. Every element earns its space.
```

---

### FIRST PASS — Full Context Dump
> Image 3 template, pre-filled for your portfolio.

```
Create a [developer portfolio] for [recruiters + fellow devs who care about craft].

Core pages: Hero, About/Stack, Work (3 projects), Contact.

Color palette: #0A0A0A bg, #F0F0F0 text, #3B82F6 accent, #1A1A1A surface,
#333333 border, #888888 muted text.

Typography: DM Mono (headings, display, labels) + Instrument Sans (body).

Style: brutalist modern, dark, monochrome, precise, engineering aesthetic.
Zero border-radius. 8px spacing grid. No shadows.

Key components: fixed nav (56px), hero with staggered load animation, 2-col
about section, 3-col project grid with hover accent borders, minimal contact.

Technical constraints: Next.js 14 App Router, Tailwind CSS, Framer Motion,
TypeScript, WCAG AA accessibility.

Reference structure: [paste your vibe spec above]
```

---

### SELF REVIEW — Per Section
> Image 4 template. Run after each section is generated.

```
Review the [hero section] you created and improve it:

1. Identify mistakes, inconsistencies, and visual issues
2. Apply modern UI/UX best practices:
   - Spacing and rhythm (8px grid)
   - Typography hierarchy (DM Mono display, Instrument Sans body)
   - Color balance and contrast (WCAG AA minimum)
   - Visual alignment
3. Ensure layout feels balanced and professional
4. Fix awkward placements and improve consistency

Keep the same design system:
- Colors: #0A0A0A bg, #F0F0F0 text, #3B82F6 accent only
- Fonts: DM Mono + Instrument Sans
- Zero border-radius
Make it production-ready.
```

---

### PIXEL POLISH — Micro Pass
> Image 5 template. Run last on each component.

```
On [nav component], make these precise changes:

1. Set height to exactly 56px
2. Add border-bottom: 1px solid #222222
3. Set logo letter-spacing to 0.12em
4. Nav link color: #888888 default, hover: #F0F0F0, transition: 80ms linear
5. Active link color: #3B82F6
6. Add backdrop-filter: blur(12px) when scrollY > 20px
7. [Add any other micro-adjustments with exact values]
```

---

## 09 / TAILWIND CONFIG REFERENCE

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg:       '#0A0A0A',
        surface:  '#111111',
        surface2: '#1A1A1A',
        border:   '#222222',
        border2:  '#333333',
        muted:    '#555555',
        ghost:    '#888888',
        primary:  '#F0F0F0',
        accent:   '#3B82F6',
        'accent-hover': '#2563EB',
      },
      fontFamily: {
        mono:  ['DM Mono', 'monospace'],
        sans:  ['Instrument Sans', 'sans-serif'],
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
      borderRadius: {
        DEFAULT: '0px',   // zero everywhere
      },
      letterSpacing: {
        label: '0.15em',
        nav:   '0.12em',
        tag:   '0.08em',
      },
    }
  }
}
```

---

*PORTFOLIO DESIGN SPEC · v1.0 · Feb 2026 · Brutalist Technical + Electric Blue*
