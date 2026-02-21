# MASH Landing Page - AI Agent Guide v2.0

> **Last Updated**: July 2025 - Phases 9-16 complete, 547 tests, 41 suites, build SUCCESS
> **Use this document as a standalone prompt for your next AI agent session.**

---

## 1. PROJECT IDENTITY

| Property | Value |
|----------|-------|
| **Project** | MASH Landing Page (Mushroom Automation System Hub) |
| **Framework** | Next.js 16.1.1 + React 19.2.3 + TypeScript 5 |
| **Styling** | Tailwind CSS 4 + CSS Variables (slate palette, NO gradients) |
| **CMS** | Sanity CMS (projectId: `gerattrr`, dataset: `production`) |
| **Scheduling** | Cal.com integration (`mash-mushroom`) |
| **3D** | Three.js 0.172.0 + @react-three/fiber + @react-three/drei |
| **Animations** | framer-motion 12.34.0 (`motion` component API, NOT `m`/`LazyMotion`) |
| **Testing** | Jest 30.2.0 + @testing-library/react 16 + @swc/jest |
| **Node.js** | v24.12.0 (ABI 137 - requires WASM SWC fallback) |
| **Sanity Studio** | https://ppnamias.sanity.studio/ |
| **Preview** | https://join.mashmarket.app/ |

---

## 2. CRITICAL COMMANDS

```bash
# Build (MUST use --webpack for Node 24 compatibility)
npm run build                  # package.json: "next build --webpack"

# Dev server (uses Turbopack)
npm run dev

# Tests
npm test                       # Alias for npx jest
npx jest --no-coverage         # Fast run (skip coverage)
npx jest --coverage            # Full coverage report
npx jest __tests__/components/ComponentName.test.tsx  # Single file

# Sanity Studio (separate directory)
cd studio && npm run dev       # Port 3333
cd studio && npx sanity deploy

# Lint
npm run lint
```

**NEVER run `next build` without `--webpack`** - Node 24 native SWC binaries don't exist yet.

---

## 3. CURRENT STATE (Verified July 2025)

### Test Results
| Metric | Value |
|--------|-------|
| Test Suites | 41 passed, 41 total |
| Tests | 547 passed, 547 total |
| Failures | 0 |

### Build
- Status: **SUCCESS** (exit code 0)
- Mode: webpack (WASM SWC fallback)
- Pages: 14 prerendered (plus `/_not-found`)
- Errors: 0

### Homepage Sections (7 total)
1. HeroSection (video bg, "Explore Features" + "View Documentation" CTAs)
2. FeaturesSection (9 features, show-all toggle)
3. MobileAppShowcase (phone mockup, 4 screens, auto-cycle, swipe, dot indicators)
4. IoTDeviceSection (3D Chamber.glb model, 6 spec panels)
5. BookingSection (Cal.com scheduling, 3 tiers)
6. DownloadSection (APK download, Coming Soon iOS)
7. MiniCTA (compact "Have Questions?" with Support + FAQ links)
+ Footer

### Completed Phases (prd.json v5.0.0)
- Phase 9: Design System Enforcement (Button/Card components everywhere)
- Phase 10: Homepage Consolidation (10 sections -> 7)
- Phase 11: Scroll Animations & Micro-interactions (scroll-spy, back-to-top, ScrollReveal)
- Phase 12: Navigation & Accessibility (focus trap, breadcrumbs, 404 page, Skeleton)
- Phase 13: Mobile UX (swipe gestures, auto-cycle, dot indicators, social links)
- Phase 14: Performance (video preload="none")
- Phase 15: Testing (547 tests, 41 suites, 0 failures)
- Phase 16: Standalone Page Polish (iOS disabled, status sample data label)

### Color System (slate palette)
```css
/* Light mode */
--color-background: 248 250 252;       /* slate-50 */
--color-text-primary: 15 23 42;        /* slate-900 */
--color-text-secondary: 71 85 105;     /* slate-600 */

/* Dark mode */
--color-background: 15 23 42;          /* slate-900 */
--color-text-primary: 248 250 252;     /* slate-50 */
--color-text-secondary: 203 213 225;   /* slate-300 */
```

---

## 4. PROJECT ARCHITECTURE

### File Structure
```
MASH-Landing/
├── app/
│   ├── layout.tsx                # Root layout (ThemeProvider + FloatingNav)
│   ├── page.tsx                  # HOME - 7 sections + Footer
│   ├── not-found.tsx             # Custom 404 page
│   ├── globals.css               # CSS variables (slate palette)
│   ├── documentation/page.tsx
│   ├── documentation/tutorials/page.tsx
│   ├── download/page.tsx
│   ├── faq/page.tsx
│   ├── license/page.tsx
│   ├── privacy/page.tsx
│   ├── schedule/page.tsx
│   ├── status/page.tsx
│   ├── support/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── HeroSection.tsx           # Video bg from Sanity, 3 feature cards
│   ├── FeaturesSection.tsx       # 9 features, show-all toggle
│   ├── MobileAppShowcase.tsx     # Phone mockup, 4 screens, swipe, auto-cycle
│   ├── IoTDeviceSection.tsx      # 3D model + 6 spec panels
│   ├── ChamberModel3D.tsx        # Three.js GLB viewer (lazy loaded)
│   ├── BookingSection.tsx        # Cal.com 3 tiers
│   ├── DownloadSection.tsx       # APK download
│   ├── MiniCTA.tsx               # Compact CTA (Support + FAQ links)
│   ├── FloatingNav.tsx           # Global nav, scroll-spy, back-to-top
│   ├── Footer.tsx                # 3 sections + social links
│   ├── CalendarScheduler.tsx     # Cal.com embed
│   ├── DemoSection.tsx           # (Removed from homepage, still exists)
│   ├── DocumentationSection.tsx  # (Removed from homepage, still exists)
│   ├── ScopeSection.tsx          # (Removed from homepage, still exists)
│   ├── SupportSection.tsx        # (Removed from homepage, still exists)
│   ├── layout/PageLayout.tsx     # Standalone page wrapper + breadcrumbs
│   ├── providers/
│   │   ├── theme-provider.tsx
│   │   └── smooth-scroll-provider.tsx
│   └── ui/
│       ├── button.tsx            # CVA variants + asChild + isLoading
│       ├── card.tsx              # Card/CardHeader/CardTitle/CardDescription
│       ├── skeleton.tsx          # Loading placeholder with shimmer
│       ├── theme-toggle.tsx
│       ├── parallax-section.tsx
│       ├── scroll-reveal.tsx
│       └── status-badge.tsx
├── lib/
│   ├── sanity.ts                 # Client, helpers, GROQ queries, types
│   ├── cal-config.ts             # Cal.com configuration
│   └── utils.ts                  # cn() utility
├── __tests__/                    # 41 test suites
│   ├── app/                      # 13 page tests (incl not-found)
│   ├── components/               # 25 component tests
│   └── lib/                      # 3 utility tests
├── studio/                       # Sanity Studio (separate workspace)
├── scripts/                      # Import/upload scripts
├── prd.json                      # Roadmap (phases 1-16 COMPLETED)
└── .env.local                    # Environment variables
```

### FloatingNav DEFAULT_LINKS
```tsx
const DEFAULT_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Mobile App", href: "/#mobile-app" },
  { label: "Hardware", href: "/#iot-device" },
  { label: "Schedule", href: "/#booking" },
  { label: "Download", href: "/#download" },
  { label: "Documentation", href: "/documentation" },
];
```

---

## 5. DESIGN RULES (Non-Negotiable)

- **NO emojis** anywhere in code, comments, or UI
- **NO gradients** (all solid backgrounds using CSS custom properties)
- **ALL buttons** must use `components/ui/button.tsx` (never raw `<button>` or `<a>`)
- **ALL cards** must use `components/ui/card.tsx`
- **ALL below-fold sections** must use `components/ui/scroll-reveal.tsx`
- **Import paths** use `@/` alias
- **Default to Server Components** (no `"use client"` unless hooks/state needed)
- **Dark mode is default** - test in both themes
- **Colors**: Use semantic tokens (`bg-background`, `text-primary`, `text-secondary`), brand green (`bg-green-600`, `text-green-600`)

---

## 6. RALPH LOOP METHODOLOGY

After EVERY component change:
1. `npx jest __tests__/components/[Component].test.tsx` - fix failures
2. Once all component tests pass: `npx jest` (full suite)
3. Once all tests pass: `npm run build` - fix build errors
4. Repeat until: 0 failures + build exit code 0

---

## 7. NEXT STEPS (Ready-to-Prompt Phases)

### Phase 17: Sanity Data Integration for Remaining Components

**Status**: NOT STARTED
**Priority**: HIGH

Currently MobileAppShowcase, FloatingNav, and several other components use hardcoded data only. The Sanity schema supports all fields but these components don't accept `data` props yet.

```
You are an autonomous AI coding agent. Execute Phase 17: Sanity data integration for remaining components.

READ FIRST:
- .github/copilot-instructions.md
- lib/sanity.ts (LandingPageData type, GROQ queries)
- studio/src/schemaTypes/documents/landingPage.ts (schema fields)

TASKS:
1. Add `data?: LandingPageData | null` prop to MobileAppShowcase.tsx
   - Use data?.mobileAppTitle, data?.mobileAppSubtitle, data?.mobileAppScreens
   - Fall back to existing hardcoded APP_SCREENS when no data
   - If data has screenshot images, render <Image> inside phone mockup
2. Update app/page.tsx to pass `data={landingData}` to MobileAppShowcase
3. Add Sanity data tests for MobileAppShowcase in __tests__/components/MobileAppShowcase.test.tsx
4. Repeat for BookingSection (data?.bookingTiers), DownloadSection (data?.downloadSection)
5. Run Ralph Loop: npx jest && npm run build

STOP WHEN: All components accept data prop + Tests pass + Build succeeds
```

---

### Phase 18: E2E Testing with Playwright

**Status**: NOT STARTED
**Priority**: HIGH

Unit tests are at 547 but no end-to-end tests exist. Critical user flows need verification.

```
You are an autonomous AI coding agent. Set up Playwright E2E testing for the MASH Landing Page.

READ FIRST:
- .github/copilot-instructions.md
- app/page.tsx (homepage structure)
- components/FloatingNav.tsx (navigation)

TASKS:
1. Install Playwright: npx playwright install --with-deps
2. Create playwright.config.ts with baseURL http://localhost:3000
3. Create e2e/ directory with tests:
   - e2e/homepage.spec.ts: page loads, all 7 sections visible, scroll between sections
   - e2e/navigation.spec.ts: FloatingNav links work, mobile drawer opens/closes, scroll-spy highlights active
   - e2e/dark-mode.spec.ts: theme toggle works, persists across navigation
   - e2e/standalone-pages.spec.ts: /download, /faq, /support, /documentation load correctly
   - e2e/404.spec.ts: unknown routes show 404 page
4. Add npm script: "test:e2e": "playwright test"
5. Run: npm run test:e2e

STOP WHEN: All E2E tests pass on both desktop and mobile viewports
```

---

### Phase 19: Performance Optimization

**Status**: NOT STARTED
**Priority**: MEDIUM

Chamber.glb is 8.2 MB. Hero video loads from Sanity CDN. Both need optimization.

```
You are an autonomous AI coding agent. Optimize performance for the MASH Landing Page.

READ FIRST:
- .github/copilot-instructions.md
- components/ChamberModel3D.tsx
- components/HeroSection.tsx

TASKS:
1. GLB Compression:
   - npm install --save-dev gltf-pipeline
   - Create scripts/compress-model.js targeting Draco compression
   - Compress public/assets/Chamber.glb to under 2MB
   - Update ChamberModel3D.tsx to use compressed file
   - Verify 3D model still renders

2. Image Optimization:
   - Audit all <Image> components for proper width/height/priority
   - Add blur placeholders for above-fold images
   - Verify next.config.ts has Sanity CDN in images.remotePatterns

3. Bundle Analysis:
   - npm install --save-dev @next/bundle-analyzer
   - Add analyze script to package.json
   - Run analysis, identify largest chunks
   - Code-split Three.js (already lazy-loaded, verify chunk size)

4. Core Web Vitals targets:
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

5. Run Ralph Loop: npx jest && npm run build

STOP WHEN: Chamber.glb < 2MB + No test regressions + Build succeeds
```

---

### Phase 20: Contact Form on /support

**Status**: NOT STARTED
**Priority**: MEDIUM

The /support page currently has a static contact section. Add a functional form.

```
You are an autonomous AI coding agent. Add a contact form to the /support page.

READ FIRST:
- .github/copilot-instructions.md
- app/support/page.tsx

TASKS:
1. Convert support page or create a SupportForm client component
2. Add controlled form state (useState for name, email, subject, message)
3. Validation:
   - Name: required, min 2 chars
   - Email: required, valid format (regex)
   - Subject: required
   - Message: required, min 10 chars
4. Show inline error messages below invalid fields (red text)
5. OnSubmit: open mailto:mash.mushroom.automation@gmail.com?subject=...&body=...
6. Show loading state on button (isLoading prop), then success confirmation
7. Write comprehensive tests:
   - __tests__/components/SupportForm.test.tsx
   - Test validation, error display, form submission
8. Run Ralph Loop: npx jest && npm run build

STOP WHEN: Form validates + submits + Tests pass + Build succeeds
```

---

### Phase 21: SEO & Meta Tags

**Status**: NOT STARTED
**Priority**: MEDIUM

```
You are an autonomous AI coding agent. Improve SEO for the MASH Landing Page.

READ FIRST:
- .github/copilot-instructions.md
- app/layout.tsx (root metadata)
- All app/**/page.tsx files

TASKS:
1. Add comprehensive metadata to app/layout.tsx:
   - title template: "%s | MASH - Mushroom Automation"
   - description, keywords, openGraph, twitter cards
2. Add metadata to each standalone page:
   - /download, /faq, /support, /documentation, /schedule
   - /terms, /privacy, /license, /status
3. Create app/sitemap.ts (dynamic sitemap generation)
4. Create app/robots.ts
5. Add JSON-LD structured data to homepage (Organization schema)
6. Run: npm run build (validates metadata at build time)

STOP WHEN: All pages have proper metadata + sitemap + robots + Build succeeds
```

---

### Phase 22: Internationalization (i18n) Preparation

**Status**: NOT STARTED
**Priority**: LOW

```
You are an autonomous AI coding agent. Prepare the MASH Landing Page for i18n.

READ FIRST:
- .github/copilot-instructions.md
- All component files with hardcoded text

TASKS:
1. Install next-intl or similar i18n library
2. Extract all hardcoded strings from components to message files:
   - messages/en.json (default)
   - messages/es.json (Spanish - placeholder)
3. Create i18n configuration in next.config.ts
4. Update components to use translation function: t('key')
5. Add language switcher to FloatingNav
6. Ensure Sanity content remains separate (CMS content vs UI strings)
7. Run Ralph Loop: npx jest && npm run build

STOP WHEN: English message file complete + Components use t() + Build succeeds
```

---

### Phase 23: CI/CD Pipeline

**Status**: NOT STARTED
**Priority**: MEDIUM

```
You are an autonomous AI coding agent. Set up CI/CD for the MASH Landing Page.

READ FIRST:
- .github/copilot-instructions.md
- package.json (scripts)

TASKS:
1. Create .github/workflows/ci.yml:
   - Trigger: push to main, pull requests
   - Steps: checkout, setup Node 24, npm ci, npm run lint, npm test, npm run build
   - Cache node_modules
2. Create .github/workflows/deploy.yml:
   - Trigger: push to main (after CI passes)
   - Deploy to Vercel/Netlify
3. Add status badges to README.md
4. Set up branch protection rules (document in README)

STOP WHEN: CI pipeline runs successfully + Build badge shows passing
```

---

### Phase 24: Accessibility Audit

**Status**: NOT STARTED
**Priority**: HIGH

```
You are an autonomous AI coding agent. Perform a comprehensive accessibility audit.

READ FIRST:
- .github/copilot-instructions.md
- All component files

TASKS:
1. Install axe-core: npm install --save-dev @axe-core/react
2. Add axe checks to development mode (app/layout.tsx)
3. Audit each component for:
   - Proper heading hierarchy (h1 -> h2 -> h3, no skips)
   - All interactive elements keyboard accessible
   - Color contrast ratios (4.5:1 for text, 3:1 for large text)
   - All images have meaningful alt text
   - Form inputs have labels
   - ARIA attributes used correctly
4. Fix all issues found
5. Document findings in docs/ACCESSIBILITY.md
6. Run Ralph Loop: npx jest && npm run build

STOP WHEN: 0 axe violations + All keyboard navigable + Build succeeds
```

---

### Phase 25: Production Deployment Checklist

**Status**: NOT STARTED
**Priority**: HIGH (when ready to launch)

```
You are an autonomous AI coding agent. Prepare the MASH Landing Page for production deployment.

PRE-DEPLOYMENT:
1. npm test - 0 failures
2. npm run build - exit code 0
3. npm run lint - 0 warnings/errors
4. Verify .env.example has all required variables documented
5. Verify .gitignore includes .env.local, node_modules, .next, coverage
6. Security audit: npm audit (fix critical issues)

ENVIRONMENT VARIABLES (for Vercel/hosting):
- NEXT_PUBLIC_SANITY_PROJECT_ID=gerattrr
- NEXT_PUBLIC_SANITY_DATASET=production
- NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
- NEXT_PUBLIC_CAL_USERNAME=mash-mushroom
- NEXT_PUBLIC_CAL_15MIN_SLUG=15min
- NEXT_PUBLIC_CAL_30MIN_SLUG=30min
- NEXT_PUBLIC_CAL_1HR_SLUG=1-hour-meeting
- NEXT_PUBLIC_CONTACT_EMAIL=mash.mushroom.automation@gmail.com

POST-DEPLOYMENT:
1. Verify all pages load (/, /download, /faq, /support, /documentation, /schedule)
2. Test dark mode toggle
3. Test Cal.com scheduling embeds
4. Test video playback
5. Test 404 page
6. Run Lighthouse (target: 90+ all metrics)
7. Monitor Sanity usage: https://sanity.io/manage/project/gerattrr/usage

STOP WHEN: Site live + All pages verified + Lighthouse 90+
```

---

## 8. PROMPT TEMPLATE

Use this template for any custom task:

```
You are an autonomous AI coding agent working on the MASH Landing Page project.

PROJECT STACK: Next.js 16.1.1, React 19.2.3, TypeScript 5, Tailwind CSS 4, Sanity CMS, framer-motion 12, Jest 30

READ FIRST:
- .github/copilot-instructions.md (conventions, patterns, testing)
- NEXT_STEPS_AI_AGENT_GUIDE_V2.md (current state, architecture)

DESIGN RULES:
- NO emojis, NO gradients, solid colors only (slate palette)
- ALL buttons: components/ui/button.tsx
- ALL cards: components/ui/card.tsx
- Dark mode is default
- Use @/ import alias

TASK:
[Describe your task here]

RALPH LOOP (after every change):
1. npx jest __tests__/[relevant].test.tsx
2. npx jest (full suite - must be 547+ tests, 0 failures)
3. npm run build (must exit 0)

STOP WHEN: [Clear completion criteria]
```

---

## 9. COMMON PATTERNS

### Adding a New Component
```tsx
// components/MySection.tsx
"use client"; // Only if hooks/state/handlers needed
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MySection() {
  return (
    <section id="my-section" className="py-20 sm:py-24 lg:py-28 bg-componentpage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
            Section Title
          </h2>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

### Writing Tests
```tsx
// __tests__/components/MySection.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import MySection from "@/components/MySection";

describe("MySection", () => {
  it("renders without crashing", () => {
    render(<MySection />);
    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });
});
```

### Using Sanity Data
```tsx
import { getLandingPageData, getSanityFileUrl } from "@/lib/sanity";

// In Server Component:
const data = await getLandingPageData();
const videoUrl = getSanityFileUrl(data.heroVideo.asset);
```

### Cal.com Scheduling
```tsx
import { getCalUrl } from "@/lib/cal-config";
// Direct link: getCalUrl("30min")
// Or embed: <CalendarScheduler eventType="30min" theme="auto" />
```

---

## 10. TROUBLESHOOTING

| Issue | Fix |
|-------|-----|
| Build fails with SWC error | Use `npm run build` (has --webpack flag) |
| `useTheme` not found in tests | Mock `next-themes` in jest.setup.js |
| `window is not defined` | Add `"use client"` or mock in test |
| `Cannot find module @/...` | Check moduleNameMapper in jest.config.js |
| IntersectionObserver in tests | Already mocked in jest.setup.js |
| framer-motion warnings in tests | Props like `layoutId` warned but harmless |
| Three.js errors in tests | Fully mocked in jest.setup.js |
| `prefers-reduced-motion` | Mock `window.matchMedia` per test |

---

**Metrics Summary**:
- Tests: 547 passed, 0 failed, 41 suites
- Build: SUCCESS (14 pages + /_not-found)
- Homepage: 7 sections + Footer
- Color: Slate palette (no gradients)
- Design: No emojis, solid colors, Button/Card components everywhere
