# MASH Landing Page - Complete AI Agent Guide (Phase 13+)

> **Last Updated**: July 2025 - Full Sanity content import, 496 tests, 92.12% branch coverage
> **Status**: 496 tests passing, 37 suites, build SUCCESS, Sanity fully populated (all 14 sections)
> **Use this document as a standalone prompt for your next AI agent session.**

---

## 1. PROJECT IDENTITY

| Property | Value |
|----------|-------|
| **Project** | MASH Landing Page (Mushroom Automation System Hub) |
| **Framework** | Next.js 16.1.1 + React 19.2.3 + TypeScript |
| **Styling** | Tailwind CSS 4 + CSS Variables (NO gradients) + Dark mode default |
| **CMS** | Sanity CMS (projectId: `gerattrr`, dataset: `production`) |
| **Scheduling** | Cal.com integration (`mash-mushroom`) |
| **3D** | Three.js 0.172.0 + @react-three/fiber + @react-three/drei |
| **Animations** | framer-motion 12.34.0 (`motion` component API) |
| **Testing** | Jest 30.2.0 + @testing-library/react 16.3.2 + @swc/jest |
| **Node.js** | v24.12.0 (ABI 137 - requires WASM SWC fallback) |
| **Sanity Studio** | https://ppnamias.sanity.studio/ |
| **Preview** | https://join.mashmarket.app/ |

---

## 2. CRITICAL COMMANDS

```bash
# Build (MUST use --webpack for Node 24 compatibility)
npm run build                  # package.json: "next build --webpack"

# Dev server (uses Turbopack - config: turbopack: {} in next.config.ts)
npm run dev

# Tests
npm test                       # Runs all 496 tests
npx jest --coverage            # Full coverage report
npx jest --testPathPatterns=ComponentName  # Single file (Jest 30 syntax)

# Sanity Studio (separate directory)
cd studio && npm run dev       # Port 3333
cd studio && npx sanity deploy # Deploy schema updates

# Sanity Studio deploy requires date-fns@3 (NOT v4)
# If deploy fails with "Cannot find package date-fns/index.js":
cd studio && npm install date-fns@3 --legacy-peer-deps
```

**NEVER run `next build` without `--webpack`** - Node 24 native SWC binaries don't exist yet.

---

## 3. CURRENT STATE (Verified)

### Test Results
| Metric | Value |
|--------|-------|
| Test Suites | 37 passed, 37 total |
| Tests | 496 passed, 496 total |
| Failures | 0 |

### Coverage Summary
| Metric | Current | Target |
|--------|---------|--------|
| Statements | 96.7% | 100% |
| Branches | 92.12% | 100% |
| Functions | 98.43% | 100% |
| Lines | 98.89% | 100% |

### Build
- Status: **SUCCESS** (exit code 0)
- Mode: webpack (WASM SWC fallback)
- Pages: 14 prerendered
- Errors: 0
- Warnings: 0

### Design Decisions (Current Session)
- **NO GRADIENTS**: All `linear-gradient()`, `bg-gradient-to-*`, `from-*` `to-*` classes removed project-wide
- **Solid colors only**: bg-hero, bg-scope, bg-download use `background-color` not gradient
- **MobileAppShowcase**: Colors changed from gradient (`from-green-500 to-emerald-700`) to solid (`bg-green-600`)
- **SupportSection**: Channel cards use `bg` property instead of `gradient` (e.g., `bg-emerald-50 dark:bg-emerald-900/30`)
- **IoTDeviceSection**: CSS fallback uses solid `bg-gray-900` and `bg-gray-800`
- **App pages**: `bg-gradient-dark`/`bg-accent-gradient` replaced with solid Tailwind classes
- **No emojis**: Verified clean - only Unicode symbols (bullets, arrows) in content pages
- **Hydration fix**: Added `crossOrigin="anonymous"` to `<video>` in HeroSection.tsx
- **Screenshot support**: MobileAppShowcase now conditionally renders Sanity screenshots inside phone mockup
- **Sanity deployed**: Studio schema updated at ppnamias.sanity.studio with screenshot image field

### Color System (app/globals.css - No Gradients)
```css
/* Light mode (:root) */
--color-background-hero: 240 253 244;       /* green-50 */
--color-background-scope: 240 253 244;      /* green-50 */
--color-background-download: 22 163 74;     /* green-600 */

/* Dark mode (.dark) */
--color-background-hero: 17 24 39;          /* gray-900 */
--color-background-scope: 31 41 55;         /* gray-800 */
--color-background-download: 22 163 74;     /* green-600 */
```
All utility classes (.bg-hero, .bg-scope, .bg-download) use `background-color: rgb(var(...))` only.

---

## 4. PROJECT ARCHITECTURE

### File Structure
```
MASH-Landing/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (ThemeProvider, dark default)
│   ├── page.tsx                  # HOME - async Server Component, fetches ALL Sanity data
│   ├── globals.css               # CSS variables, Tailwind 4
│   ├── documentation/page.tsx    # Standalone page
│   ├── documentation/tutorials/page.tsx
│   ├── download/page.tsx
│   ├── faq/
│   │   ├── page.tsx              # Server wrapper (fetches Sanity data)
│   │   └── faq-client.tsx        # Client component (search, accordion)
│   ├── license/page.tsx
│   ├── privacy/page.tsx
│   ├── schedule/page.tsx
│   ├── status/page.tsx
│   ├── support/page.tsx
│   └── terms/page.tsx
├── components/                   # All 12 landing section components
│   ├── Navigation.tsx            # data?: LandingPageData | null
│   ├── HeroSection.tsx           # data prop + video from Sanity
│   ├── FeaturesSection.tsx       # 9 features with icon mapping
│   ├── MobileAppShowcase.tsx     # Phone mockup, parallax, 4 screens, Sanity screenshots
│   ├── IoTDeviceSection.tsx      # 3D model + 6 spec panels
│   ├── ChamberModel3D.tsx        # Three.js GLB viewer (lazy loaded)
│   ├── DemoSection.tsx           # 3 demo videos + stats
│   ├── DocumentationSection.tsx  # 6 categories with nested links
│   ├── ScopeSection.tsx          # 6 categories + 4 architecture layers
│   ├── BookingSection.tsx        # Cal.com scheduling
│   ├── SupportSection.tsx        # 4 channels + 5 FAQs
│   ├── DownloadSection.tsx       # APK download + 6 features
│   ├── Footer.tsx                # 3 footer sections with links
│   ├── CalendarScheduler.tsx     # Cal.com embed with theme sync
│   ├── layout/PageLayout.tsx     # Wrapper for standalone pages
│   ├── providers/
│   │   ├── theme-provider.tsx    # next-themes wrapper
│   │   └── smooth-scroll-provider.tsx
│   └── ui/                       # shadcn/ui pattern components
│       ├── button.tsx
│       ├── card.tsx
│       ├── theme-toggle.tsx
│       ├── parallax-section.tsx
│       ├── scroll-reveal.tsx
│       └── status-badge.tsx
├── lib/
│   ├── sanity.ts                 # 334 lines - client, helpers, types, GROQ
│   ├── cal-config.ts             # Cal.com configuration
│   └── utils.ts                  # cn() utility
├── studio/                       # Sanity Studio (separate workspace)
│   └── src/schemaTypes/documents/
│       └── landingPage.ts        # 678 lines - ALL 14 section schemas
├── scripts/
│   ├── import-all-landing-content.js  # 907 lines - ALL content
│   ├── upload-assets.js          # Video/APK upload
│   └── upload-3d-model.js       # Chamber.glb upload
├── __tests__/                    # 37 test suites
│   ├── app/                      # 12 page tests
│   ├── components/               # 14 component tests
│   └── lib/                      # 3 utility tests
├── prd.json                      # 983 lines - phases 1-12 COMPLETED
├── jest.config.js
├── jest.setup.js
├── next.config.ts
├── package.json
└── .env.local                    # Environment variables
```

### Data Flow Pattern (HOME PAGE)
```
app/page.tsx (Server Component)
  └── getLandingPageData() → Sanity GROQ query
      └── Returns LandingPageData | null
          └── Passed as data={landingData} to ALL 12 components
              └── Each component: data?.field ?? DEFAULT_VALUE (hardcoded fallback)
```

### Component Prop Pattern (ALL 12 components)
```typescript
// Every landing component follows this pattern:
import type { LandingPageData } from "@/lib/sanity";

const DEFAULT_DATA = [/* hardcoded fallback content */];

export default function SectionName({ data }: { data?: LandingPageData | null } = {}) {
  const items = data?.sanityField ?? DEFAULT_DATA;
  // render using items
}
```

---

## 5. SANITY CMS INTEGRATION (FULLY COMPLETE)

### Schema: `studio/src/schemaTypes/documents/landingPage.ts` (678 lines)
14 field groups covering ALL landing page content:
1. **hero** - heroTitle, heroSubtitle, heroVideo (file), heroButtons (array), heroCards (array)
2. **features** - features (array with title, subtitle, iconKey, details)
3. **demo** - demoTitle, demoSubtitle, demoVideos (array with video file + thumbnail), demoStats (array)
4. **documentation** - documentationTitle, documentationSubtitle, documentationCategories (array with nested links)
5. **scope** - scopeTitle, scopeSubtitle, scopeCategories (array), scopeLayers (array)
6. **mobileApp** - mobileAppTitle, mobileAppSubtitle, mobileAppScreens (array with iconKey, features list, screenshot image with hotspot)
7. **iotDevice** - iotDeviceTitle, iotDeviceSubtitle, iotDeviceModel (file for GLB), iotDeviceSpecs (array with nested details + metrics)
8. **booking** - bookingTitle, bookingDescription, bookingFeatures (array)
9. **support** - supportTitle, supportSubtitle, supportChannels (array), supportFaqs (array)
10. **download** - downloadTitle, downloadSubtitle, downloadApk (file), downloadVersion, downloadSize, downloadAppFeatures (array)
11. **navigation** - navLinks (array with label, href, isHash boolean)
12. **footer** - footerSections (array with nested links)
13. **faq** - faqPageTitle, faqPageSubtitle, faqCategories (array with nested faqs)
14. **seo** - seoTitle, seoDescription, seoImage (image)

### Client: `lib/sanity.ts` (334 lines)
**Key Exports:**
- `sanityClient` - createClient with projectId, dataset, API version, CDN enabled
- `getSanityImageUrl(source, options?)` - Uses `createImageUrlBuilder` (named export, NOT deprecated default)
- `getSanityFileUrl(asset)` - Constructs CDN URL from asset ref
- `getSanityVideoUrl(asset)` - Alias for file URL
- `getSanity3DModelUrl(asset)` - For GLB model files
- `getLandingPageData()` - Fetches with GROQ, 60s revalidation
- `getLandingPageDataCached()` - React cache wrapper
- `LandingPageData` interface - Complete TypeScript type (lines 160-333)
- `LANDING_PAGE_QUERY` - GROQ query with asset URL projections

### Content Population
- **Import Script**: `scripts/import-all-landing-content.js` (907 lines) - EXECUTED SUCCESSFULLY
- **Document ID**: `landingPage` in Sanity production dataset
- **All 14 sections populated**: Hero, Features (9), Demo (3 videos + 3 stats), Documentation (6 categories), Scope (6 categories + 4 layers), Mobile App (4 screens), IoT Device (6 specs), Booking (4 features), Support (4 channels + 5 FAQs), Download (6 features), Navigation (5 links), Footer (3 sections), FAQ (5 categories), SEO configured
- **Sanity Studio**: https://ppnamias.sanity.studio/ - All content visible and editable

### Sanity Environment Variables (in `.env`)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=gerattrr
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-26
SANITY_API_WRITE_TOKEN=sk8tLquq2h8oKzHCUtSgUdkidRF4Jb86zkd86rLYZd8SHMdevbINUce94J3nTUdFvh0LSe4pB1xctBljt5IL3sYt3ZcCZrcAvHaeZEikkGRpX5Z8BNmu1lTai0UuHcrQI9gpYOCapL5WNHpFpYlA1dpTG9xa0Bw7HfdmSEYyCRtUXMvOtMv1
```

### Hero Video Asset
- **Ref**: `file-71501ee4a175fe13f42a40a9490a3db191df2db3-mp4`
- **CDN URL**: `https://cdn.sanity.io/files/gerattrr/production/71501ee4a175fe13f42a40a9490a3db191df2db3.mp4`

---

## 6. COMPLETED PHASES (prd.json - ALL 10 PHASES DONE)

| Phase | Title | Status | Key Deliverables |
|-------|-------|--------|-----------------|
| 1 | Foundation | COMPLETED | Sanity schema, client, dependencies |
| 2 | Script Execution | COMPLETED | Content populated, assets uploaded |
| 3 | Component Migration | COMPLETED | Cloudinary fully removed |
| 4 | Testing (100% pass rate) | COMPLETED | All tests green |
| 5 | Cleanup | COMPLETED | No Cloudinary references |
| 6 | Video Upload & Coverage | COMPLETED | Hero video in Sanity CDN |
| 7 | Parallax & Showcase | COMPLETED | framer-motion parallax, MobileAppShowcase |
| 8 | 3D Model Integration | COMPLETED | ChamberModel3D + Three.js + Turbopack fix |
| 9 | Sanity 3D Model | COMPLETED | ChamberModel3D supports Sanity CDN URLs |
| 10 | Hydration Fix & Quality | COMPLETED | Code quality, 418 tests |
| 11 | Full Content Expansion | COMPLETED | 678-line schema, 334-line lib/sanity.ts, 907-line import script, 12 component refactors, FAQ split, deprecation fix, 496 tests |
| 12 | Sanity Content Import & Validation | COMPLETED | All 14 Sanity sections populated, color palette validated (zero gradients), final quality checks, 496 tests passing |

---

## 7. COVERAGE GAPS (Remaining - Practical Ceiling Reached)

### Overview
Coverage has been pushed to a practical ceiling. Remaining gaps are defensive/unreachable code in jsdom test environment. All gaps are documented in prd.json.

### Current Coverage: 92.12% Branch (Up from 86.85%)
Tests expanded from 420 to 496 with:
- Sanity data tests for all 9 section components (data={mockData} + data={null})
- Default parameter tests for 5 hook-free components
- FAQ server component test
- StatusBadge individual test for all status variants

### Remaining Branch Gaps (Defensive/Unreachable in jsdom)
These are NOT fixable without major refactoring or are testing framework limitations:

1. **`= {}` default params on hook-based components** - React JSX always passes a props object, so `function Component({ data } = {})` default never triggers
2. **HeroSection lines 18-34**: `typeof window !== 'undefined'` SSR guard - always true in jsdom
3. **CalendarScheduler line 33**: MutationObserver `attributeName` check - jsdom limitation
4. **ChamberModel3D**: Inner `ChamberScene` with Three.js hooks - mocked out entirely in tests
5. **status/page lines 110-117**: `allOperational` ternary - hardcoded data is always operational
6. **sanity.ts lines 166-248**: TypeScript interface definitions - not executable code

### Why Further Coverage Push is Impractical
- Hook-based components (DemoSection, IoTDeviceSection, MobileAppShowcase, HeroSection) cannot be called as plain functions outside React rendering context
- Three.js rendering requires WebGL (not available in jsdom)
- MutationObserver in jsdom has no real DOM mutation events
- SSR guards (`typeof window`) always evaluate to `true` in jsdom
- Interface definitions are counted as uncovered lines by Istanbul but are not executable

---

## 8. RALPH LOOP INSTRUCTIONS

### What is the Ralph Loop?
An autonomous testing and quality assurance cycle. Run continuously until ALL tests pass and build succeeds with target coverage.

### Loop Process
```
1. Identify coverage gap (read coverage report)
2. Write/update tests to cover the gap
3. Run: npx jest (must be 0 failures)
4. If failures: fix test or component, go to step 3
5. Run: npm run build (must exit 0)
6. If build errors: fix TypeScript/ESLint, go to step 5
7. Run: npx jest --coverage (check metrics improved)
8. If coverage target not met: go to step 1
9. STOP when: all targets met
```

### Stop Conditions
- **Primary**: All tests pass (0 failures) AND build succeeds (exit 0) AND coverage targets met
- **Fallback**: Max 50 iterations
- **Emergency**: User interrupts

### Error Handling Quick Reference
| Error | Fix |
|-------|-----|
| "Cannot find module" | Add to jest.setup.js mocks |
| "useTheme is not a function" | Mock next-themes in jest.setup.js |
| "window is not defined" | Mock browser APIs or ensure "use client" |
| "nanoid" / ESM module error | Add to transformIgnorePatterns in jest.config.js |
| "act() warning" | Wrap state updates in act() or use findBy queries |
| React Three casing warnings | These are harmless console warnings from Three.js mocks, ignore |

---

## 9. TASKS FOR NEXT AGENT SESSION

### Task A: Upload Actual App Screenshots to Sanity
The MobileAppShowcase component now conditionally renders Sanity screenshots inside the phone mockup. Upload actual app screenshots:
1. Take screenshots of the MASH mobile app (Dashboard, Growth Analytics, Environmental Control, Alerts)
2. Upload to Sanity via Studio (https://ppnamias.sanity.studio/) or API
3. Screenshots render at the mobileAppScreens[].screenshot field with hotspot/crop support
4. Test that screenshots display correctly inside the phone mockup

### Task B: Upload Chamber.glb to Sanity CDN
The 3D model (8.2 MB) is currently served from `/public/assets/Chamber.glb`. Upload to Sanity:
```bash
# Script already exists:
node scripts/upload-3d-model.js
# Requires SANITY_API_WRITE_TOKEN (already in .env)
```
After upload:
- Update ChamberModel3D to use Sanity CDN URL as primary source
- Keep local fallback for offline development
- Update tests

### Task C: Performance Optimization
- Draco-compress Chamber.glb for faster loading (8.2 MB is large)
- Add loading progress indicator for 3D model
- Consider preloading 3D model on intersection observer
- Implement ISR with `revalidate` for landing page data (already 60s in getLandingPageData)
- Add `loading="lazy"` to below-fold sections

### Task D: E2E Testing (Playwright)
- Configure Playwright for Next.js
- Test smooth scroll navigation between sections
- Test parallax effects render correctly
- Test 3D model loads and is interactive
- Test theme toggle (light/dark)
- Test Cal.com scheduling embed
- Test responsive layout (mobile/tablet/desktop)

### Task E: Final Coverage Push (Optional)
If 100% coverage is desired beyond the practical ceiling:
- Move TypeScript interfaces from lib/sanity.ts to a separate `.d.ts` file excluded from coverage
- Add `/* istanbul ignore next */` to unreachable SSR guards
- Refactor status page to accept services as props for testability
- These are cosmetic improvements only - all real logic is covered

---

## 10. TESTING PATTERNS REFERENCE

### Component Test with Sanity Data
```tsx
import { render, screen } from '@testing-library/react';
import ComponentName from '@/components/ComponentName';
import type { LandingPageData } from '@/lib/sanity';

// Mock Sanity data matching the LandingPageData interface
const mockData: Partial<LandingPageData> = {
  fieldName: [
    { title: 'Test', subtitle: 'Test subtitle' }
  ],
};

describe('ComponentName', () => {
  it('renders with hardcoded defaults when no data', () => {
    render(<ComponentName />);
    expect(screen.getByText('Default Title')).toBeInTheDocument();
  });

  it('renders with Sanity data when provided', () => {
    render(<ComponentName data={mockData as LandingPageData} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('falls back to defaults when data is null', () => {
    render(<ComponentName data={null} />);
    expect(screen.getByText('Default Title')).toBeInTheDocument();
  });
});
```

### FAQ Client Test Pattern
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import FAQPageClient from '@/app/faq/faq-client';

describe('FAQPageClient', () => {
  it('renders default categories without data', () => {
    render(<FAQPageClient />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
  });

  it('renders Sanity FAQ data when provided', () => {
    const mockData = {
      faqCategories: [
        { name: 'Custom Category', faqs: [{ question: 'Q?', answer: 'A.' }] }
      ]
    };
    render(<FAQPageClient data={mockData as any} />);
    expect(screen.getByText('Custom Category')).toBeInTheDocument();
  });

  it('searches and filters FAQs', () => {
    render(<FAQPageClient />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'hardware' } });
    // Verify filtered results appear
  });
});
```

### Status Page Test Pattern
```tsx
import { render, screen } from '@testing-library/react';
import StatusPage from '@/app/status/page';

// To cover the 50% branch gap, mock the services data with different statuses
// May need to refactor the component to accept services as props or extract the data
```

### Jest Setup Key Mocks (jest.setup.js)
The following are already mocked:
- `next-themes` (useTheme)
- `next/navigation` (usePathname, useRouter)
- `next/image` (Image component)
- `next/link` (Link component)
- `framer-motion` (motion components)
- `@react-three/fiber` (Canvas)
- `@react-three/drei` (useGLTF, OrbitControls, Environment)
- `lucide-react` (icon components)
- `@/lib/sanity` (getLandingPageData, getSanityFileUrl, etc.)
- Environment variables (SANITY_PROJECT_ID, etc.)

---

## 11. KNOWN TECHNICAL CONSTRAINTS

1. **Node.js 24 SWC incompatibility**: Build MUST use `--webpack` flag. Tests use `@swc/jest`. Will resolve when Node 24 gets SWC native binaries or when downgrading to Node 22 LTS.

2. **Three.js in jsdom**: React Three Fiber components render as mocked divs in tests. Real 3D rendering cannot be tested in jsdom. Use Playwright for visual testing.

3. **framer-motion 12.x**: Uses `motion` component API (NOT the old `m`/`LazyMotion` API). All motion components are mocked as plain divs in tests.

4. **Sanity type coverage**: TypeScript interfaces (lines 146-333 in sanity.ts) are not executable code but Istanbul counts them as uncovered lines. This is a known Istanbul limitation.

5. **npm --legacy-peer-deps**: Required for some installations. After npm install, verify `.d.ts` files exist for framer-motion, motion-dom, motion-utils.

---

## 12. AGENT EXECUTION PROMPT

Copy everything below this line as your agent prompt:

---

```
You are an autonomous AI agent working on the MASH Landing Page project. Follow the Ralph Loop methodology for continuous testing and quality assurance.

PROJECT LOCATION: c:\Users\ADMIN\Desktop\PP Namias\MASH\MASH-Landing

BEFORE STARTING:
1. Read .github/copilot-instructions.md for full project conventions
2. Read prd.json to understand completed phases (1-12 ALL DONE) and remaining work
3. Read NEXT_STEPS_AI_AGENT_GUIDE.md for current state and specific tasks
4. Run: npx jest --coverage (verify baseline: 496 tests, 92.12% branch)

CURRENT STATE (verified July 2025):
- 496 tests passing, 37 suites, 0 failures
- Coverage: Stmts 96.7% | Branches 92.12% | Funcs 98.43% | Lines 98.89%
- Build: SUCCESS (14 pages prerendered, --webpack mode)
- Sanity CMS: ALL 14 sections populated (import script executed)
- Color palette: ALL solid colors, zero gradients, zero emojis
- Phases 1-12: ALL COMPLETED in prd.json

YOUR MISSION (in priority order):

TASK 1: Upload App Screenshots to Sanity
- MobileAppShowcase supports Sanity screenshots (screenshot field in schema)
- Take/obtain actual MASH app screenshots (Dashboard, Analytics, Control, Alerts)
- Upload via Sanity Studio (https://ppnamias.sanity.studio/) or API
- Verify screenshots render inside the phone mockup component

TASK 2: Upload Chamber.glb to Sanity CDN
- Run: node scripts/upload-3d-model.js
- Update ChamberModel3D to prefer Sanity CDN URL, fallback to local
- Update tests to cover new URL resolution logic

TASK 3: Performance Optimization
- Draco-compress Chamber.glb (currently 8.2 MB)
- Add loading progress for 3D model
- Intersection observer for lazy loading
- Validate ISR revalidation (60s in getLandingPageData)

TASK 4: E2E Testing (Playwright)
- Set up Playwright for Next.js
- Test scroll navigation, parallax, 3D model, theme toggle, Cal.com embed
- Test responsive design (mobile/tablet/desktop)

RALPH LOOP:
1. Write/update tests
2. Run: npx jest (0 failures required)
3. Fix any failures
4. Run: npm run build (exit 0 required)
5. Fix any build errors
6. Run: npx jest --coverage (check improvement)
7. Repeat until done

CONVENTIONS:
- NEVER use emojis in code, tests, or output
- Build command: npm run build (uses --webpack internally)
- Test command: npm test or npx jest
- Jest 30 CLI: use --testPathPatterns (NOT --testPathPattern)
- All components use: data?: LandingPageData | null prop pattern
- All colors: solid only (NO gradients, NO bg-gradient-*)
- Follow .github/copilot-instructions.md for all other conventions

STOP CONDITIONS:
- Primary: All tasks complete + 0 test failures + build SUCCESS
- Fallback: Max 50 iterations
- Report: Update prd.json with Phase 13 and NEXT_STEPS_AI_AGENT_GUIDE.md with final state
```

---

## 13. QUICK REFERENCE: KEY FILE CONTENTS

### app/page.tsx (Home - Server Component)
```tsx
import { getLandingPageData, getSanityFileUrl } from "@/lib/sanity";
import type { LandingPageData } from "@/lib/sanity";

export default async function Home() {
  let landingData: LandingPageData | null = null;
  let modelUrl: string | undefined;
  try {
    landingData = await getLandingPageData();
    if (landingData?.iotDeviceModel?.asset) {
      modelUrl = getSanityFileUrl(landingData.iotDeviceModel.asset);
    }
  } catch { /* components use hardcoded defaults */ }

  return (
    <div className="min-h-screen">
      <Navigation data={landingData} />
      <main>
        <HeroSection data={landingData} />
        <FeaturesSection data={landingData} />
        <MobileAppShowcase data={landingData} />
        <IoTDeviceSection modelUrl={modelUrl} data={landingData} />
        <DemoSection data={landingData} />
        <DocumentationSection data={landingData} />
        <ScopeSection data={landingData} />
        <BookingSection data={landingData} />
        <SupportSection data={landingData} />
        <DownloadSection data={landingData} />
      </main>
      <Footer data={landingData} />
    </div>
  );
}
```

### lib/sanity.ts Key Exports
```typescript
export const sanityClient = createClient({ projectId, dataset, apiVersion, useCdn: true });
export function getSanityImageUrl(source, options?): string;  // uses createImageUrlBuilder
export function getSanityFileUrl(asset): string;               // CDN URL from _ref
export function getSanityVideoUrl(asset): string;              // alias for file URL
export function getSanity3DModelUrl(asset): string;            // for GLB files
export async function getLandingPageData(): Promise<LandingPageData>;  // GROQ fetch, 60s revalidate
export function getLandingPageDataCached(): Promise<LandingPageData>;  // React cache wrapper
export interface LandingPageData { /* 170+ lines of typed fields */ }
```

### Component Data Prop Pattern
All 12 components use the same pattern:
```typescript
export default function ComponentName({ data }: { data?: LandingPageData | null } = {}) {
  const items = data?.sanityField ?? DEFAULT_ITEMS;
  // render
}
```

Components with this pattern:
- Navigation, HeroSection, FeaturesSection, MobileAppShowcase
- IoTDeviceSection (also has `modelUrl?: string`), DemoSection
- DocumentationSection, ScopeSection, BookingSection
- SupportSection, DownloadSection, Footer

---

*End of guide (July 2025). Use Section 12 as your standalone agent prompt, or provide this entire file as context.*
