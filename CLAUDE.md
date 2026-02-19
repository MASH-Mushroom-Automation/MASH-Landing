# CLAUDE.md — MASH Landing Page Redesign Agent Guide

## Project Context

This is the **MASH Landing Page** (Mushroom Automation System Hub) — a Next.js 16 marketing site for an IoT mushroom cultivation platform. The goal is to redesign the UI/UX with a premium, modern aesthetic inspired by the Nuxt UI Landing Template while preserving all existing content and functionality.

**Production URL**: https://join.mashmarket.app (tentative)
**Repository**: MASH-Mushroom-Automation/MASH-Landing
**Branch**: main

---

## Ralph Agent Configuration

### Autonomous Execution Rules

1. **Read progress.txt Codebase Patterns FIRST** every iteration
2. **Read prd.json** to find the next incomplete story (passes: false, lowest priority number)
3. **ONE story per iteration** — complete it fully before moving on
4. **Never ask for permission** — execute autonomously
5. **Never use emojis** — text-only output with markers like [SUCCESS], [ERROR], etc.
6. **Auto-commit** after each successful story with technical details
7. **Auto-test** via npm run build (mandatory before commit)

### Quality Gates (Non-Negotiable)

```bash
npm run build    # MUST pass — zero errors
npm run lint     # MUST pass — zero warnings  
npx tsc --noEmit # MUST pass — no type errors
```

If any gate fails: fix autonomously (max 3 attempts), then re-run.

### Commit Message Format

```
STORY-ID: Technical Implementation

Code Changes:
- Exact changes with function/component names
- Files modified with line counts

Build Validation:
- Routes compiled: X
- TypeScript: clean
- Lint: clean

Reference: STORY-ID
```

---

## Tech Stack Reference

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.1 | React meta-framework (App Router) |
| React | 19.2.3 | UI library |
| Tailwind CSS | 4.x | Utility-first CSS (PostCSS plugin) |
| TypeScript | 5.x | Type safety |
| next-themes | latest | Dark/light mode |
| lucide-react | latest | Icon library |
| next-cloudinary | latest | Media CDN |
| clsx + tailwind-merge | latest | Class merging (via cn()) |

---

## File Structure

```
app/
  globals.css          # Design tokens, Tailwind config, utility classes
  layout.tsx           # Root layout (ThemeProvider, fonts, metadata)
  page.tsx             # Main landing page (all sections assembled)
  download/page.tsx    # Download page
  documentation/page.tsx       # Docs hub
  documentation/tutorials/page.tsx  # Tutorial list
  schedule/page.tsx    # Cal.com booking
  faq/page.tsx         # FAQ page
  support/page.tsx     # Support + contact form
  license/page.tsx     # MIT license
  privacy/page.tsx     # Privacy policy
  terms/page.tsx       # Terms of service
  status/page.tsx      # System status

components/
  Navigation.tsx       # Top navbar (glassmorphism, smart hide)
  HeroSection.tsx      # Hero (animated gradient, CTAs)
  FeaturesSection.tsx  # Features showcase + grid
  StepsSection.tsx     # [NEW] How it works (3 steps)
  BookingSection.tsx   # Consultation pricing cards
  TestimonialsSection.tsx  # [NEW] User quotes
  SupportSection.tsx   # Support channels + FAQ accordion
  DownloadSection.tsx  # Bottom CTA section
  DemoSection.tsx      # Video demos
  ScopeSection.tsx     # Technical scope
  DocumentationSection.tsx  # Docs section
  CalendarScheduler.tsx    # Cal.com embed
  Footer.tsx           # Site footer
  layout/PageLayout.tsx    # Subpage layout wrapper
  providers/theme-provider.tsx  # next-themes provider
  ui/button.tsx        # Button component
  ui/card.tsx          # Card component
  ui/theme-toggle.tsx  # Dark/light toggle
  ui/scroll-reveal.tsx # [NEW] Scroll animation wrapper

lib/
  utils.ts             # cn() class merger utility
  cal-config.ts        # Cal.com configuration
  cloudinary.ts        # Cloudinary config
```

---

## Design System Reference

### Color Tokens (Dark Mode — Default)
```css
--bg-default: rgb(17, 24, 39);       /* gray-900 */
--bg-card: rgb(31, 41, 55);          /* gray-800 */
--bg-elevated: rgb(55, 65, 81);      /* gray-700 */
--text-primary: rgb(255, 255, 255);  /* white */
--text-secondary: rgb(156, 163, 175); /* gray-400 */
--text-muted: rgb(107, 114, 128);    /* gray-500 */
--brand-primary: rgb(34, 197, 94);   /* green-500 */
--brand-hover: rgb(22, 163, 74);     /* green-600 */
--border-default: rgba(255, 255, 255, 0.1); /* white/10 */
```

### Color Tokens (Light Mode)
```css
--bg-default: rgb(255, 255, 255);    /* white */
--bg-card: rgb(249, 250, 251);       /* gray-50 */
--bg-elevated: rgb(243, 244, 246);   /* gray-100 */
--text-primary: rgb(17, 24, 39);     /* gray-900 */
--text-secondary: rgb(75, 85, 99);   /* gray-600 */
--text-muted: rgb(107, 114, 128);    /* gray-500 */
--brand-primary: rgb(22, 163, 74);   /* green-600 */
--brand-hover: rgb(21, 128, 61);     /* green-700 */
--border-default: rgba(0, 0, 0, 0.1); /* black/10 */
```

### Typography Scale
```
Hero heading:    text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight
Section heading: text-3xl md:text-4xl font-bold
Card heading:    text-xl md:text-2xl font-semibold
Body large:      text-lg leading-relaxed
Body default:    text-base leading-relaxed
Caption:         text-sm text-muted
```

### Spacing System
```
Section padding:  py-20 lg:py-32
Section gap:      space-y-16 lg:space-y-20
Card padding:     p-6 lg:p-8
Card grid gap:    gap-6 lg:gap-8
Container:        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Glassmorphism Card Pattern
```tsx
<div className="bg-white/5 dark:bg-white/5 bg-white light:bg-white
  backdrop-blur-xl border border-white/10 dark:border-white/10
  rounded-xl shadow-lg hover:shadow-xl
  transition-all duration-300 p-6">
```

### Button Patterns
```tsx
// Primary CTA
<button className="bg-gradient-to-r from-green-500 to-emerald-400 
  text-white font-semibold px-6 py-3 rounded-lg
  hover:from-green-600 hover:to-emerald-500
  transition-all duration-300 shadow-lg hover:shadow-xl">

// Secondary/Outline
<button className="border border-green-500/50 text-green-500 
  font-semibold px-6 py-3 rounded-lg
  hover:bg-green-500/10 transition-all duration-300">
```

---

## Content Data (MASH Mushroom Automation)

### Hero
- **H1**: "Smart Mushroom Cultivation Platform"
- **Subtitle**: "Advanced IoT automation for professional mushroom cultivation with real-time monitoring, climate control, and intelligent growing environment management."
- **CTA 1**: "Get Started" → #features
- **CTA 2**: "Learn More" → #how-it-works

### 6 Features
1. Climate Control — Automated temperature and humidity regulation (Cloud icon)
2. Real-time Analytics — Comprehensive data visualization (Chart icon)
3. Multi-chamber Support — Independent climate zones (Grid icon)
4. Alert System — Instant notifications for critical events (Bell icon)
5. Remote Access — Secure cloud connectivity (Globe icon)
6. Recipe Management — Growing recipes for different species (Book icon)

### 3 Steps (How It Works)
1. Connect Your Hardware — Set up IoT sensors and actuators
2. Monitor & Analyze — Real-time dashboard with analytics
3. Automate & Optimize — AI-driven automation rules

### 3 Consultation Plans
1. Quick Call (15m) — Basic inquiries, $0/free
2. Consultation (30m) — Full walkthrough, POPULAR, $0/free
3. Deep Dive (60m) — Comprehensive planning, $0/free

### Dashboard Mockup Data
- Temperature: 24.5 C
- Humidity: 85%
- CO2 Level: 800 ppm
- Light: 450 lux

### Footer Links
- Product: Features, How It Works, Download
- Resources: Documentation, FAQ, Support
- Company: Schedule a Call, Privacy Policy, Terms of Service
- Social: GitHub (MASH-Mushroom-Automation), Facebook (groups/mashmushrooom)

---

## Subagent Orchestration Guide

When using **Orchestrator Mode** (recommended for this PRD with 16 stories):

### Subagent Prompt Template

```
You are a senior frontend engineer working on the MASH Landing Page redesign.

CONTEXT:
1. Read prd.json — find the highest-priority incomplete story (passes: false)
2. Read progress.txt Codebase Patterns section FIRST
3. Read CLAUDE.md for design system tokens and content data

YOUR MISSION:
1. Implement the selected story COMPLETELY
2. Follow the design system (glassmorphism, typography scale, spacing)
3. Use lucide-react for icons, cn() for class merging
4. Ensure dark/light mode works via next-themes class strategy
5. Write clean TypeScript (no any types)
6. Run npm run build — fix ALL errors
7. Update prd.json: set passes: true + completedAt timestamp
8. Append implementation summary to progress.txt
9. Commit with technical details
10. Exit immediately

QUALITY GATES (MUST PASS):
- npm run build (zero errors)
- npm run lint (zero warnings)
- TypeScript validation (no type errors)

EXIT when story is complete with all gates passing.
```

### Story Dependency Order

Stories can be executed in approximate order but some have soft dependencies:

```
LAND-001 (Design System)     → Foundation for ALL other stories
LAND-011 (ScrollReveal)      → Used by LAND-003 through LAND-010
LAND-002 (Navigation)        → Independent, can parallel with LAND-001
LAND-003 (Hero)              → Depends on LAND-001
LAND-004 (Features)          → Depends on LAND-001
LAND-005 (Steps)             → Depends on LAND-001, creates new file
LAND-006 (Booking)           → Depends on LAND-001
LAND-007 (Testimonials)      → Depends on LAND-001, creates new file
LAND-008 (Support)           → Depends on LAND-001
LAND-009 (Download CTA)      → Depends on LAND-001
LAND-010 (Footer)            → Independent
LAND-012 (Page Assembly)     → Depends on LAND-003 through LAND-011
LAND-013 (Subpages Polish)   → Depends on LAND-001
LAND-014 (Legal Pages)       → Depends on LAND-001
LAND-015 (Responsive Audit)  → Depends on all above
LAND-016 (Performance/SEO)   → Final check, depends on all above
```

### Recommended Execution Phases

**Phase 1 — Foundation** (do first, sequential):
- LAND-001: Design System tokens
- LAND-011: ScrollReveal component

**Phase 2 — Core Sections** (can parallelize):
- LAND-002: Navigation
- LAND-003: Hero
- LAND-004: Features
- LAND-005: Steps (new component)
- LAND-007: Testimonials (new component)

**Phase 3 — Secondary Sections** (can parallelize):
- LAND-006: Booking
- LAND-008: Support
- LAND-009: Download CTA
- LAND-010: Footer

**Phase 4 — Assembly & Polish** (sequential):
- LAND-012: Main page assembly
- LAND-013: Subpages polish
- LAND-014: Legal pages polish
- LAND-015: Responsive audit
- LAND-016: Performance/SEO check

---

## Known Issues & Warnings

- `StepsSection` and `TestimonialsSection` are imported in page.tsx but do NOT exist yet — must be created
- `ScrollReveal` and `SmoothScrollProvider` are imported but do NOT exist — must be created
- `StatusBadge` is imported in status/page.tsx but does NOT exist — must be created or inlined
- The `landing/` folder is a Nuxt.js template (build artifacts only, no source) — use it only as design reference, do NOT import from it
- Sanity CMS integration exists in Navigation but has hardcoded fallbacks — keep hardcoded data for landing page independence

---

## Build & Test Commands

```bash
# Mandatory before any commit
npm run build

# Development server (only after successful build)
npm run dev

# Linting
npm run lint

# TypeScript check (also runs during build)
npx tsc --noEmit
```

---
