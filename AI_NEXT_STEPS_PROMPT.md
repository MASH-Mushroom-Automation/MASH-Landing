# MASH Landing Page - UI/UX Redesign AI Agent Prompt

## Use This Prompt To Execute the prd.json v5.0.0 Phases

Copy everything below this line and paste it to an AI coding agent (Copilot, Cursor, Claude, etc.) to begin execution.

---

```
You are an autonomous AI coding agent working on the MASH Landing Page project (Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + Sanity CMS). Your mission is to execute a comprehensive UI/UX redesign defined in prd.json v5.0.0.

## CRITICAL: Read These Files First

Before writing any code, read these files to understand the full context:
1. `prd.json` - The complete roadmap with all phases, tasks, design tokens, and rules
2. `.github/copilot-instructions.md` - Project conventions, testing patterns, and architecture
3. `docs/FLOATING_NAV_STANDARD.md` - Navigation architecture and design specs
4. `app/globals.css` - Current CSS custom properties and design tokens
5. `app/layout.tsx` - Root layout structure
6. `app/page.tsx` - Current homepage section order

## PROJECT RULES (Non-Negotiable)

- NO emojis anywhere in code, comments, or output
- NO gradients (all solid backgrounds using CSS custom properties)
- ALL buttons MUST use `components/ui/button.tsx` (never raw <a> or <button> with inline styles)
- ALL card-like elements MUST use `components/ui/card.tsx` (never inline div+className cards)
- ALL below-fold sections MUST use `components/ui/scroll-reveal.tsx` for entrance animations
- Import paths use `@/` alias (e.g., `@/components/ui/button`)
- Default to Server Components (no `"use client"` unless hooks/state/handlers needed)
- Dark mode is the default theme - test in both themes
- Build command: `npm run build` (uses `next build --webpack`)
- Test command: `npx jest`

## EXECUTION ORDER

Execute phases in this exact order. Each phase must pass Ralph Loop (tests + build) before moving to next.

### Phase 9: Design System Enforcement (CRITICAL - Do This First)

**Goal:** Make every section use Button and Card components from `components/ui/`.

1. Read `components/ui/button.tsx` and `components/ui/card.tsx` to understand their API
2. Add `isLoading` prop (spinner + disabled) and `asChild` prop to Button (T105)
3. Refactor these components one at a time, running tests after each:
   - `components/HeroSection.tsx` (T100): Replace raw <a> CTAs with <Button>. Add staggered entrance animation using framer-motion (delay 0/150/300/450ms). Add scroll-down chevron at bottom.
   - `components/FeaturesSection.tsx` (T101): Replace inline card divs with <Card>, <CardHeader>, <CardTitle>, <CardDescription>. Wrap in <ScrollReveal>. Add lucide icons for each feature. Show 6 features initially + "Show all" toggle for remaining.
   - `components/BookingSection.tsx` (T102): Use Card + Button. Change bg from bg-accent-blue-light to bg-background-alt. Green-only icon colors (no blue/purple per-tier).
   - `components/DownloadSection.tsx` (T103): Use Button. Store cards: disabled styling (opacity-60, cursor-not-allowed) for "Coming Soon". Add direct APK link.
   - `components/SupportSection.tsx` (T104): Create collapsible accordion FAQ (click to expand/collapse). Use Card + Button. Show max 3 FAQs inline with "View all FAQs" link to /faq.

4. After each component: `npx jest __tests__/components/[ComponentName].test.tsx`
5. After all: `npx jest && npm run build`

### Phase 10: Homepage Section Consolidation (HIGH)

**Goal:** Reduce homepage from 10 sections to 7-8 focused ones. The current layout overwhelms users.

1. In `app/page.tsx`:
   - Remove `DemoSection` import and rendering (all 3 items show "Video coming soon" - broken UX)
   - Remove `DocumentationSection` import and rendering (content lives at /documentation, nav link sufficient)
   - Remove `ScopeSection` import and rendering (merge key capabilities into FeaturesSection)
   - Remove `SupportSection` import and rendering (content lives at /support, Footer links sufficient)
2. Merge the best scope items into FeaturesSection: extract 4-6 key capabilities from ScopeSection data and add them as additional feature cards or a "Technical Scope" sub-section
3. Create a compact MiniCTA section/component above Footer: "Have questions? Reach out or check our FAQ" with two Button components linking to /support and /faq
4. Update HeroSection: change "Watch Demo" button text to "View Documentation" linking to /documentation (or remove it entirely)
5. Final section order: Hero > Features > MobileAppShowcase > IoTDevice > Booking > Download > MiniCTA > Footer
6. Add alternating background colors for visual rhythm: odd sections use `bg-default`, even use `bg-componentpage`
7. Verify all FloatingNav hash links still scroll to the correct sections
8. Run: `npx jest && npm run build`

### Phase 11: Scroll Animations & Micro-Interactions (HIGH)

**Goal:** Page should feel alive. Every section should animate into view on scroll.

1. ScrollReveal is already built at `components/ui/scroll-reveal.tsx` but barely used. Import it in every remaining homepage section.
2. Pattern for each section:
   - Section header (h2 + subtitle): `<ScrollReveal direction="up">...</ScrollReveal>`
   - Card grid: Each card wrapped in `<ScrollReveal direction="up" delay={index * 0.1}>...</ScrollReveal>`
   - Bottom CTA: `<ScrollReveal direction="up" delay={0.3}>...</ScrollReveal>`
3. HeroSection entrance animation: Since hero is above the fold, do NOT use ScrollReveal. Instead use framer-motion `motion.div` with initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} with staggered delays:
   - Heading: delay 0s, duration 0.6s
   - Subtitle: delay 0.15s
   - Buttons: delay 0.3s
   - Info cards: delay 0.45s
4. Add animated scroll-down chevron at bottom of HeroSection (CSS animation: translateY bounce)
5. Scroll-spy in FloatingNav:
   - Use IntersectionObserver to watch all section elements (by their id)
   - When a section enters viewport (threshold ~0.3), set it as the active section
   - Update the active nav link based on currently visible section
   - Only enable on homepage (pathname === "/")
6. Back-to-top button (add to FloatingNav or as separate component):
   - Fixed position: bottom-6 right-6
   - Appears when scrolled > 500px, hidden when near top
   - Green circle (48x48px), white ArrowUp icon from lucide-react
   - AnimatePresence fade transition
   - onClick: window.scrollTo({ top: 0, behavior: 'smooth' })
7. Card hover micro-interactions:
   - All interactive cards: `hover:scale-[1.02] hover:shadow-lg transition-all duration-200`
   - Focus visible: `focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2`
8. Run: `npx jest && npm run build`

### Phase 12: Navigation & Accessibility (HIGH)

1. Update FloatingNav DEFAULT_LINKS to match new homepage:
   ```
   Features -> /#features
   Mobile App -> /#mobile-app
   Hardware -> /#iot-hardware
   Schedule -> /#booking
   Download -> /#download
   ```
   Plus "Documentation" as a page link to /documentation
2. Focus trap in mobile drawer:
   - When drawer opens, query all focusable elements inside
   - On Tab at last element, wrap to first
   - On Shift+Tab at first element, wrap to last
   - On close, return focus to hamburger button
3. Create `app/not-found.tsx`:
   - Server component wrapped in PageLayout
   - Large "404" heading, "Page not found" subtitle
   - Short friendly message
   - Button linking back to homepage
   - Add to metadata
   - Create `__tests__/app/not-found.test.tsx`
4. Add breadcrumbs to PageLayout:
   - New prop: `breadcrumbs?: Array<{label: string, href?: string}>`
   - Render as `<nav aria-label="Breadcrumb"><ol>...</ol></nav>`
   - First item always "Home" linking to /
   - Last item (current page) is plain text, not a link
   - Update 2-3 standalone pages to pass breadcrumbs
5. Run: `npx jest && npm run build`

### Phase 13: Mobile UX & Interactive Improvements (MEDIUM)

1. MobileAppShowcase phone mockup:
   - Add swipe detection: use framer-motion's `drag="x"` on the screen content area
   - On `onDragEnd`, check velocity/offset: swipe left = next screen, right = previous
   - Add auto-cycling: `setInterval` every 5000ms to advance screen, clear on user interaction
   - Add 4 dot indicators below phone: small circles, active dot is green-600, inactive gray-300
2. IoTDeviceSection mobile optimization:
   - Check `window.innerWidth < 768` (or use a `useMediaQuery` hook)
   - If mobile: do not render `<ChamberModel3D>`, show only CSS DeviceModel3D
   - On desktop: add a loading progress indicator (shimmer overlay that fades out when model loads)
3. Footer improvements:
   - Add GitHub icon link (target="_blank" rel="noopener noreferrer")
   - Add Facebook icon link (similarly)
   - External links: add ExternalLink icon (tiny, next to text)
   - Copyright year: `{new Date().getFullYear()}`
   - Add "Back to top" link in bottom bar
4. /support contact form:
   - Convert to client component if not already
   - Add controlled form state (useState for each field)
   - Validate: name required, email format required, message required
   - Show inline error messages below invalid fields
   - OnSubmit: open `mailto:mash.mushroom.automation@gmail.com?subject=...&body=...`
   - Show loading state on button, then success confirmation message
5. Run: `npx jest && npm run build`

### Phase 14: Performance (MEDIUM)

1. GLB compression:
   - `npm install --save-dev gltf-pipeline`
   - Create `scripts/compress-model.js`
   - Run: compress `public/assets/Chamber.glb` to `public/assets/Chamber-draco.glb`
   - Target: under 2MB
   - Update `ChamberModel3D.tsx` to use compressed path
   - Verify model still renders correctly
2. Hero video optimization:
   - Option A (keep video): Convert to WebM, add `poster` attribute with a still frame, add `fetchpriority="low"`, consider `preload="none"`
   - Option B (remove video): Replace with subtle CSS ambient animation (e.g., floating dots, pulsing circles, or a soft noise pattern) -- this saves 8MB+
   - Whichever option: LCP should be under 2.5s
3. Skeleton loading component:
   - Create `components/ui/skeleton.tsx`
   - Props: width, height, rounded, className
   - Shimmer animation using CSS `@keyframes` and pseudo-element overlay
   - Can be composed: `<Skeleton className="h-4 w-3/4" />` for text, `<Skeleton className="h-40 w-full rounded-xl" />` for cards
4. Run: `npx jest && npm run build`

### Phase 15: Testing (HIGH - Run Throughout)

After every phase, ensure:
1. `npx jest` - 0 failures
2. `npm run build` - exit code 0

At the end of all phases:
1. Update ALL modified component test files to match new implementations
2. Create tests for ALL new components:
   - `__tests__/app/not-found.test.tsx`
   - Button isLoading and asChild tests in existing `__tests__/components/Button.test.tsx`
   - Skeleton tests
   - MiniCTA tests
   - Breadcrumbs in PageLayout tests
   - Accordion FAQ behavior tests
3. Run: `npx jest --coverage`
4. Targets: 550+ tests, 40+ suites, 95%+ statements, 90%+ branches
5. Final: `npm run build` must succeed with exit code 0

### Phase 16: Standalone Page Polish (LOW)

1. `/status`: Add "(Sample data)" label to uptime chart. Remove email form or make it show "Coming soon" message.
2. `/documentation`: Change dead article links to anchor sections within the same page, or add "Coming soon" badges.
3. `/download`: iOS buttons get `opacity-60 cursor-not-allowed pointer-events-none`. Android APK button: larger, green bg, shows version + file size.
4. Run: `npx jest && npm run build`

## RALPH LOOP METHODOLOGY

After EVERY component change:
1. Run `npx jest __tests__/components/[Component].test.tsx` - fix test failures
2. After phase complete: `npx jest` (full suite) - fix ALL failures
3. After all tests pass: `npm run build` - fix build errors
4. If build fails: fix TypeScript/ESLint errors, re-run tests to confirm no regressions
5. Repeat until: 0 failures + build exit code 0
6. Max 50 iterations per phase

## DESIGN TOKEN REFERENCE

Use these consistently across all components:
- Section padding: `py-20 sm:py-24 lg:py-28`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card border: `border border-default rounded-xl`
- Card hover: `hover:border-green-500/50 hover:shadow-lg transition-all duration-200`
- Section headline: `text-3xl sm:text-4xl font-bold tracking-tight`
- Section subtitle: `text-lg sm:text-xl text-secondary max-w-2xl mx-auto`
- Primary accent: `text-green` or `bg-brand` (uses CSS vars, adapts to dark mode)
- Alternating bg: `bg-default` and `bg-componentpage`
- Card padding: `p-6 sm:p-8`
- Focus ring: `focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2`

## STOP CONDITIONS

- PRIMARY: All phases complete + 550+ tests passing + build succeeds + 0 failures
- FALLBACK: Max 100 total iterations (prevents infinite loops)
- EMERGENCY: If a phase creates unsolvable regressions after 20 attempts, skip it, document why, and continue to next phase

## VERIFICATION CHECKLIST (Run After All Phases Complete)

- [ ] `npx jest` - 0 failures, 550+ tests
- [ ] `npm run build` - exit code 0
- [ ] Homepage has 7-8 sections (not 10)
- [ ] All buttons use `@/components/ui/button`
- [ ] All cards use `@/components/ui/card`
- [ ] All below-fold sections have ScrollReveal entrance animations
- [ ] Hero has staggered entrance animation on mount
- [ ] FloatingNav has scroll-spy active link tracking on homepage
- [ ] Back-to-top button appears when scrolled and works
- [ ] Mobile drawer has focus trap
- [ ] Custom 404 page exists at app/not-found.tsx
- [ ] No emojis in any file (grep -r for common emoji codepoints)
- [ ] No gradients in TSX (grep -r "gradient" --include="*.tsx")
- [ ] Contact form on /support validates and submits
- [ ] Footer has dynamic copyright year and social links
- [ ] MobileAppShowcase supports swipe gestures
- [ ] IoTDeviceSection disables Three.js on mobile

Report final metrics: test count, test suite count, coverage %, build status, homepage section count.
```

---

**Last Updated**: February 12, 2026
**PRD Version**: 5.0.0
**Current State**: 517 tests passing, 38 suites, build SUCCESS, 10 homepage sections (target: 7-8)
