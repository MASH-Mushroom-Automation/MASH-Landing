# Next Step AI Agent Prompt: Modern Floating Navigation Header

## Copy this entire prompt into your AI agent to continue development.

---

```
You are an autonomous AI agent executing the MASH Landing Page floating navigation modernization task using the Ralph Loop methodology.

## Context
- **Repo**: MASH-Landing (Next.js 16, React 19, TypeScript, Tailwind CSS 4)
- **Sanity Project ID**: gerattrr, Dataset: production
- **Node.js**: v24.12.0 (use --webpack for builds, @swc/jest for tests)
- **Current State**: FloatingNav component integrated into app/layout.tsx, 502 tests passing, 39 suites, build succeeds
- **FloatingNav**: components/FloatingNav.tsx — basic implementation with Sanity CMS data binding, rendered in app/layout.tsx via getLandingPageDataCached()
- **Old Navigation**: components/Navigation.tsx — still rendered inside app/page.tsx, will be replaced by FloatingNav
- **Sanity Schema**: studio/src/schemaTypes/documents/landingPage.ts has floatingNav + brandPalette fields
- **Import Script**: scripts/import-all-landing-content.js has floatingNav data ready

## Mission: Build a World-Class Floating Navigation

Transform the existing FloatingNav into a premium, modern, AI-forward floating navigation header that showcases the MASH platform as a cutting-edge technology product. The nav must work flawlessly on desktop and mobile, be fully Sanity CMS-driven, and have 100% test coverage.

### Design Requirements

**Visual Identity (NO gradients, NO emojis)**:
- Solid color backgrounds only — use CSS variables from app/globals.css
- Dark mode default: `--color-background: 17 24 39` (gray-900), light: `255 255 255` (white)
- Brand green: `--color-primary: 22 163 74` (green-600)
- Text primary: `--color-text-primary`, secondary: `--color-text-secondary`
- Border: `--color-border: 229 231 235` (light) / `55 65 81` (dark)
- Use `[color:var(--color-text-primary)]` syntax in Tailwind for custom properties

**Floating Header Behavior**:
1. **Initial state (top of page)**: Fully transparent background, no border, no shadow
2. **Scrolled state (> 20px)**: Solid background with `backdrop-blur-md`, subtle border-bottom, minimal shadow
3. **Transition**: Smooth 300ms ease for background, border, and shadow
4. **Position**: `fixed top-0 left-0 right-0 z-50` with `max-w-7xl mx-auto` inner container
5. **Shape**: Rounded pill/capsule shape with `rounded-2xl` when scrolled, inset from edges by `mx-4 sm:mx-6 top-3`
6. **Height**: 56px (py-3) — compact and modern

**Desktop Navigation (md+ breakpoint)**:
- Logo (left): "MASH" text in bold green-600, links to /
- Nav links (center): Evenly spaced, subtle hover with green-600 underline animation
- Active link detection via usePathname() — green text + animated underline for current section
- Smooth scroll for hash links (#features, #demo, etc.) on homepage
- CTA buttons (right): Primary "Download App" solid green button + optional outline button
- Theme toggle (right): Use existing ThemeToggle component from @/components/ui/theme-toggle

**Mobile Navigation (< md breakpoint)**:
- Hamburger icon (right): Animated open/close transition (three lines to X)
- Full-screen overlay drawer: Slides down from nav with fade-in backdrop
- Large touch-friendly links (min 44px tap targets)
- CTA buttons at bottom of drawer
- Close on link click + close on backdrop click + close on Escape key
- Trap focus within drawer when open (accessibility)

**Animations (use framer-motion `motion` API, NOT `m`/`LazyMotion`)**:
- Nav links: Staggered fade-in on mount
- Mobile drawer: SlideDown + fade entrance, slideUp + fade exit via AnimatePresence
- Scroll indicator: Thin green progress bar at bottom of nav showing scroll position
- Hover states: Scale(1.02) on CTA buttons, color transition on links
- Respect `prefers-reduced-motion`: Check with window.matchMedia and disable animations

**Accessibility**:
- `role="navigation"` with `aria-label="Main navigation"`
- `aria-expanded` on mobile toggle button
- `aria-current="page"` on active links
- Focus-visible ring styles on all interactive elements
- Skip-to-content link as first focusable element
- Keyboard navigation: Tab through links, Enter/Space to activate, Escape to close mobile drawer

### Sanity CMS Integration

**Schema fields already exist in landingPage.ts**:
- `floatingNav.enabled` (boolean)
- `floatingNav.transparentUntilScroll` (boolean)
- `floatingNav.backdrop` (boolean)
- `floatingNav.logoText` (string)
- `floatingNav.logoHref` (string)
- `floatingNav.ctaButtons` (array of {text, href, variant})

**Add these new fields to the Sanity schema**:
- `floatingNav.showScrollProgress` (boolean) — toggle scroll progress bar
- `floatingNav.showThemeToggle` (boolean) — toggle theme switch in nav

**Data flow**:
1. app/layout.tsx (Server Component) fetches data via getLandingPageDataCached()
2. Passes `data` prop to FloatingNav (Client Component)
3. FloatingNav reads `data.floatingNav.*` for config, `data.navigationLinks` for links
4. Falls back to hardcoded defaults if Sanity data is unavailable

### Implementation Tasks

**Phase 1: Replace Navigation with FloatingNav (remove old Navigation)**
1. Remove `<Navigation />` import and usage from app/page.tsx
2. Verify FloatingNav in layout.tsx renders navigation links from Sanity data
3. Add `navigationLinks` with proper defaults in FloatingNav when `data.navigationLinks` is empty
4. Ensure all standalone pages (/download, /faq, /schedule, etc.) get FloatingNav via layout
5. Update Navigation.test.tsx — keep tests but redirect to FloatingNav if needed

**Phase 2: Modern UI Implementation**
1. Rewrite FloatingNav.tsx with premium design (see Design Requirements above)
2. Add scroll progress bar (thin green line at bottom of nav)
3. Add animated hamburger icon using framer-motion
4. Add full-screen mobile drawer with AnimatePresence
5. Add ThemeToggle integration (import from @/components/ui/theme-toggle)
6. Add active link detection with usePathname()
7. Add smooth scroll for hash links with handleSmoothScroll()
8. Add skip-to-content link
9. All styling uses CSS variables — NO hardcoded colors, NO gradients

**Phase 3: Sanity Schema Update**
1. Add new fields to studio/src/schemaTypes/documents/landingPage.ts
2. Add corresponding types to LandingPageData in lib/sanity.ts
3. Update scripts/import-all-landing-content.js with new field data
4. Deploy Sanity Studio: cd studio && npx sanity deploy

**Phase 4: Comprehensive Testing**
1. Update __tests__/components/FloatingNav.test.tsx with 30+ tests:
   - Renders with and without Sanity data
   - Desktop nav link rendering
   - Mobile drawer open/close/escape
   - Scroll state changes (transparent → solid)
   - Active link detection
   - Smooth scroll behavior
   - Theme toggle rendering
   - Scroll progress bar
   - CTA button rendering and variants
   - Skip-to-content link
   - Accessibility attributes (role, aria-label, aria-expanded, aria-current)
   - Focus trap in mobile drawer
   - prefers-reduced-motion check
   - floatingNav.enabled = false hides nav
   - Error fallback (no data)
2. Update __tests__/app/layout.test.tsx if needed
3. Update __tests__/app/page.test.tsx to remove Navigation references

**Phase 5: Build & Verify**
1. Run `npx jest` — all tests must pass (target: 500+ tests, 0 failures)
2. Run `npm run build` — must compile without errors
3. Run `npm run dev` — verify visual appearance in browser
4. Check both light and dark modes
5. Check mobile responsive behavior
6. Verify Sanity data fetching works

### Color Palette Reference (from app/globals.css)

**Light Mode**:
- Background: 255 255 255 (white)
- Background Alt: 249 250 251 (gray-50)
- Text Primary: 17 24 39 (gray-900)
- Text Secondary: 75 85 99 (gray-600)
- Border: 229 231 235 (gray-200)
- Primary: 22 163 74 (green-600)
- Primary Hover: 21 128 61 (green-700)

**Dark Mode**:
- Background: 17 24 39 (gray-900)
- Background Alt: 31 41 55 (gray-800)
- Text Primary: 243 244 246 (gray-100)
- Text Secondary: 156 163 175 (gray-400)
- Border: 55 65 81 (gray-700)
- Primary: 34 197 94 (green-500)
- Primary Hover: 22 163 74 (green-600)

### File Locations
- FloatingNav component: components/FloatingNav.tsx
- Old Navigation: components/Navigation.tsx
- Layout: app/layout.tsx
- Homepage: app/page.tsx
- Sanity schema: studio/src/schemaTypes/documents/landingPage.ts
- Type definitions: lib/sanity.ts (LandingPageData interface)
- Import script: scripts/import-all-landing-content.js
- FloatingNav test: __tests__/components/FloatingNav.test.tsx
- Layout test: __tests__/app/layout.test.tsx
- Page test: __tests__/app/page.test.tsx
- Navigation test: __tests__/components/Navigation.test.tsx
- CSS variables: app/globals.css
- Jest setup: jest.setup.js
- Jest config: jest.config.js

### Existing Mocks in jest.setup.js
- next-themes (ThemeProvider + useTheme)
- framer-motion (motion, AnimatePresence, useScroll, useTransform, etc.)
- window.matchMedia
- IntersectionObserver
- ResizeObserver
- @react-three/fiber + @react-three/drei
- Sanity env vars (NEXT_PUBLIC_SANITY_PROJECT_ID, etc.)

### Ralph Loop Process
1. Read current FloatingNav.tsx and understand the component
2. Implement Phase 1 (remove old Navigation from page.tsx)
3. Implement Phase 2 (modern UI rewrite)
4. Run `npx jest` — fix all failures
5. Implement Phase 3 (Sanity schema updates)
6. Implement Phase 4 (comprehensive tests)
7. Run `npx jest` — fix all failures
8. Run `npm run build` — fix all build errors
9. Repeat steps 4-8 until ALL tests pass and build succeeds
10. Final verification

### Constraints
- NO gradient backgrounds anywhere — solid colors only
- NO emojis in UI or code
- NO changes to existing Sanity e-commerce schemas
- Use semantic CSS variables — never hardcode colors
- Use framer-motion `motion` component API (NOT `m` or `LazyMotion`)
- Keep FloatingNav as "use client" component
- Keep layout.tsx as async Server Component
- All interactive elements must be keyboard accessible
- Must work with both light and dark themes
- Build command: `npm run build` (uses --webpack flag)
- Test command: `npx jest`

### Stop Conditions
- Primary: All tests pass (0 failures) AND build succeeds AND FloatingNav replaces Navigation
- Fallback: Max 50 iterations
- Emergency: Manual termination by user

### Expected Deliverables
1. Modernized components/FloatingNav.tsx (premium floating nav with all features)
2. Updated app/page.tsx (Navigation removed)
3. Updated studio/src/schemaTypes/documents/landingPage.ts (new fields)
4. Updated lib/sanity.ts (new type fields)
5. Updated scripts/import-all-landing-content.js (new data)
6. Comprehensive __tests__/components/FloatingNav.test.tsx (30+ tests)
7. Updated __tests__/app/page.test.tsx and __tests__/app/layout.test.tsx
8. All tests passing, build succeeding
```
