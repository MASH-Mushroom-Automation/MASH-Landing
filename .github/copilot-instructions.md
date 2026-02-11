# MASH Landing Page - AI Agent Instructions

## Project Overview
Next.js 16 landing page for MASH (Mushroom Automation System Hub) - a professional mushroom cultivation automation platform. Built with React 19, TypeScript, Tailwind CSS 4, and integrated with Sanity CMS and Cal.com scheduling.

## Architecture & Structure

### Main Application (`/app`)
- **App Router**: Next.js App Router with file-based routing
- **Layout**: Root layout at [app/layout.tsx](app/layout.tsx) includes ThemeProvider with dark mode as default
- **Homepage**: [app/page.tsx](app/page.tsx) is a single-page landing with section components
- **Standalone Pages**: `/download`, `/faq`, `/schedule`, `/documentation`, `/support`, `/terms`, `/privacy`, `/license`, `/status`

### Components Organization (`/components`)
**Section Components** (main landing page sections):
- `HeroSection.tsx` - Video background with Sanity CMS integration
- `FeaturesSection.tsx`, `DemoSection.tsx`, `DocumentationSection.tsx`, `ScopeSection.tsx`, `BookingSection.tsx`, `SupportSection.tsx`, `DownloadSection.tsx`
- `MobileAppShowcase.tsx` - Interactive phone mockup with 4 app screen previews (Dashboard, Growth Analytics, Environmental Control, Alerts)
- `IoTDeviceSection.tsx` - Three.js 3D IoT device model (Chamber.glb) with CSS fallback, interactive spec panels
- `ChamberModel3D.tsx` - Three.js GLB model viewer using @react-three/fiber and drei
- `Navigation.tsx`, `Footer.tsx` - Shared across pages

**UI Components** (`/components/ui`):
- shadcn/ui pattern: Individual component files like `button.tsx`, `card.tsx`, `theme-toggle.tsx`
- `parallax-section.tsx` - Scroll-driven parallax wrapper using framer-motion
- `scroll-reveal.tsx` - Scroll-triggered entrance animations
- `status-badge.tsx` - Status indicator badges (operational, degraded, outage, maintenance)
- Variants defined using `class-variance-authority` (CVA)
- All use `cn()` utility from `@/lib/utils` for className merging

**Provider Components** (`/components/providers`):
- `theme-provider.tsx` - next-themes ThemeProvider wrapper
- `smooth-scroll-provider.tsx` - CSS smooth scroll with prefers-reduced-motion support

**Layout Components** (`/components/layout`):
- `PageLayout.tsx` - Wrapper for standalone pages

### Sanity Studio (`/studio`)
Separate Sanity CMS workspace for content management (e-commerce focused):
- **Project ID**: `gerattrr`, **Dataset**: `production`
- **Schema**: 25+ document types in `/studio/src/schemaTypes/documents/` (products, orders, reviews, blog, etc.)
- **Sample Data**: `/studio/sample-data/` with import scripts
- **Commands**: Run from `/studio` directory: `npm run dev` (port 3333), `npm run build`, `npm run deploy`
- **Note**: Integrated with main Next.js app via `lib/sanity.ts` for landing page content and media

## Critical Integrations

### Sanity CMS (Content & Media Management)
**Configuration**: [lib/sanity.ts](lib/sanity.ts)
- Project ID from `NEXT_PUBLIC_SANITY_PROJECT_ID` env var
- Helper functions: `getSanityImageUrl()`, `getSanityFileUrl()`, `getSanityVideoUrl()`, `getLandingPageData()`
- Cached data fetching with `getLandingPageDataCached()`
- Automatic optimization for images

**Usage Pattern**:
```tsx
import { getSanityFileUrl, getLandingPageData } from "@/lib/sanity";

const data = await getLandingPageData();
const videoUrl = getSanityFileUrl(data.heroVideo.asset);
<video>
  <source src={videoUrl} type="video/mp4" />
</video>
```

**Asset Management**: Upload via `scripts/upload-assets.js`, content via `scripts/import-landing-page.js`

### Cal.com Scheduling
**Configuration**: [lib/cal-config.ts](lib/cal-config.ts)
- `calConfig` object with username, event types (15min, 30min, 1-hour-meeting)
- Helper functions: `getCalLink()`, `getCalUrl()` - use these instead of hardcoding URLs
- `CalendarScheduler.tsx` component embeds Cal.com with theme sync

**Usage Pattern**:
```tsx
import { getCalUrl } from '@/lib/cal-config';

<CalendarScheduler eventType="30min" theme="auto" />
// Or direct link: getCalUrl('30min')
```

## Styling & Theming

### Tailwind CSS 4 Approach
- **Custom CSS Variables**: Defined in [app/globals.css](app/globals.css) with light/dark mode variants
- **Semantic Tokens**: Use `bg-background`, `text-primary`, `text-secondary`, not raw colors
- **Brand Color**: Green (`--color-primary: 22 163 74`) - use `bg-green-600`, `text-green-600`
- **Theme Toggle**: `next-themes` with `ThemeProvider` in layout - access via `useTheme()` hook

### Dark Mode (Default)
- Default theme: `dark` (set in [app/layout.tsx](app/layout.tsx))
- Classes: `dark:bg-gray-900`, `dark:text-gray-100` patterns throughout
- Video backgrounds: Lower opacity in dark mode (`dark:opacity-10`)

## Development Workflow

### Commands
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm test             # Run all tests
npm run test:coverage # Generate coverage report
```

### Working with Standalone Pages
1. Create page in `/app/[page-name]/page.tsx`
2. Wrap with `PageLayout` component for consistent styling
3. Add metadata export for SEO
4. Link from Navigation or relevant sections

### Adding New Components
1. Section components: `/components/[Name]Section.tsx` - use `"use client"` if interactive
2. UI components: `/components/ui/[name].tsx` - follow shadcn/ui pattern with CVA variants
3. Import path: Use `@/` alias (e.g., `@/components/ui/button`)

## Key Conventions

### Client vs Server Components
- **Default**: Server Components (no `"use client"`)
- **Use `"use client"`** when: useState, useEffect, event handlers, browser APIs, theme hooks
- Examples: `HeroSection.tsx`, `CalendarScheduler.tsx`, `theme-toggle.tsx`

### File Naming
- Components: PascalCase (`HeroSection.tsx`)
- Utils/configs: kebab-case (`cal-config.ts`, `sanity.ts`)
- Pages: lowercase (`page.tsx` in directories)

### Import Organization
Standard order: React → Next.js → External → Internal → Types
```tsx
import { useState } from "react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
```

### Accessibility
- All videos: Include `aria-hidden="true"` for decorative backgrounds
- Check `prefers-reduced-motion` for animations (see [components/HeroSection.tsx](components/HeroSection.tsx#L7-L23))
- Semantic HTML: `<section>`, `<nav>`, `<main>`, `<footer>`

## Environment Variables
**Required** (see [.env.example](.env.example)):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name
- `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version
- `NEXT_PUBLIC_CAL_USERNAME` - Cal.com username
- `NEXT_PUBLIC_CAL_*_SLUG` - Event type slugs (15min, 30min, 1-hour-meeting)
- `NEXT_PUBLIC_CONTACT_EMAIL` - Contact email

**Current** (see [.env.local](.env.local)):
- Sanity Project: `gerattrr`, Dataset: `production`
- Cal.com: `mash-mushroom`
- Email: `mash.mushroom.automation@gmail.com`

## Common Patterns

### Sanity Image with Optimization
```tsx
import { getSanityImageUrl } from "@/lib/sanity";

<Image
  src={getSanityImageUrl(data.image, { width: 200 })}
  alt="MASH Logo"
  width={200}
  height={60}
/>
```

### Responsive Button (shadcn/ui)
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">Explore Features</Button>
```

### Theme-Aware Styling
```tsx
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
```

## What NOT to Do
- Do not store images/videos in `/public/assets` - use Sanity CMS
- Don't hardcode Cal.com URLs - use `getCalUrl()` helpers
- Don't use raw color values - use CSS variables or Tailwind classes
- Don't add `"use client"` unnecessarily - default to server components
- Don't run Studio commands from root - `cd studio` first

## Ralph Loop Agent - Autonomous Testing & Quality Assurance

### Overview
This project uses the **Ralph Wiggum Technique** - a continuous AI agent loop for autonomous testing and quality assurance. The agent runs iteratively until all tests pass and the build succeeds.

### Testing Loop Workflow
```
┌──────────────────────────────────────────────────────┐
│              Ralph Testing Loop (outer)              │
│  ┌────────────────────────────────────────────────┐  │
│  │  1. Create/Update Unit Tests                   │  │
│  │  2. Run Tests (npm test)                       │  │
│  │  3. Analyze Failures                           │  │
│  │  4. Fix Component/Test Issues                  │  │
│  │  5. Run Build (npm run build)                  │  │
│  │  6. Fix Build Errors                           │  │
│  └────────────────────────────────────────────────┘  │
│                         ↓                            │
│  verifyCompletion: "All tests pass? Build success?"  │
│                         ↓                            │
│       No? → Analyze errors → Run another iteration   │
│       Yes? → Task complete, stop loop                │
└──────────────────────────────────────────────────────┘
```

### Test Requirements
**Target Coverage**: 100% test pass rate for all components and utilities

**Test Suite Must Include**:
- **Section Components** (`/components/*Section.tsx`): Navigation, Hero, Features, Demo, Documentation, Scope, Booking, Support, Download, Footer
- **UI Components** (`/components/ui/*.tsx`): Button, Card, ThemeToggle
- **Layout Components** (`/components/layout/*.tsx`): PageLayout
- **Utility Functions** (`/lib/*.ts`): sanity.ts, cal-config.ts, utils.ts
- **Page Components** (`/app/**/page.tsx`): All standalone pages

### Testing Framework & Tools
```bash
# Install dependencies (if not present)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event jest-environment-jsdom @types/jest

# Commands
npm test          # Run all tests
npm run test:watch # Run in watch mode
npm run test:coverage # Generate coverage report
```

### Jest Configuration Pattern
```javascript
// jest.config.js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  collectCoverageFrom: ['components/**/*.tsx', 'lib/**/*.ts', 'app/**/*.tsx'],
}
module.exports = createJestConfig(customJestConfig)
```

### Test File Patterns
**Component Tests** (`__tests__/components/[ComponentName].test.tsx`):
```tsx
import { render, screen } from '@testing-library/react';
import ComponentName from '@/components/ComponentName';

describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(<ComponentName />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });
});
```

**Utility Tests** (`__tests__/lib/[utilName].test.ts`):
```typescript
import { helperFunction } from '@/lib/utilName';

describe('helperFunction', () => {
  it('returns expected output', () => {
    expect(helperFunction(input)).toBe(expectedOutput);
  });
});
```

### Ralph Loop Agent Instructions
**Objective**: Achieve 100% test pass rate and successful production build

**Loop Iteration Process**:
1. **Analyze Current State**: Check which components/utils lack tests
2. **Create Tests**: Write comprehensive unit tests following patterns above
3. **Run Tests**: Execute `npm test` and capture all failures
4. **Fix Issues**: 
   - If test fails: Fix test logic or component implementation
   - If component error: Update component to be testable (mocks, props, etc.)
5. **Run Build**: Execute `npm run build` and capture build errors
6. **Fix Build Errors**: Resolve TypeScript, ESLint, or compilation issues
7. **Verify Completion**: 
   - All tests passing (0 failures)
   - Build completes successfully (exit code 0)
   - No TypeScript errors
   - No ESLint errors
8. **Loop**: If verification fails, analyze errors and repeat from step 4

**Stop Conditions**:
- Primary: All tests pass (100%) AND build succeeds
- Fallback: Max 50 iterations (prevents infinite loops)
- Emergency: Manual agent termination by user

**Error Handling Patterns**:
- **"Cannot find module"**: Add to jest.setup.js mocks
- **"useTheme is not a function"**: Mock next-themes in test setup
- **"window is not defined"**: Mock browser APIs or use client component wrappers
- **Environment variables**: Mock in jest.setup.js with test values

### Current Test Coverage Status
Track progress here (updated by agent):
```
Component Tests: 14/14 passing (added ChamberModel3D)
Utility Tests: 3/3 passing
UI Component Tests: 7/7 passing (ParallaxSection, ScrollReveal, StatusBadge)
Provider Tests: 2/2 passing (SmoothScrollProvider)
App Page Tests: 12/12 passing
Total Tests: 403 passed, 0 failed
Test Suites: 37 passed
Build Status: SUCCESS (webpack mode with WASM SWC fallback)
Build Command: npx next build --webpack (also in package.json: npm run build)
Dev Server: Turbopack (with turbopack: {} in next.config.ts)
Last Run: February 2026
Node.js: v24.12.0 (ABI 137 - requires @swc/jest for tests, --webpack for builds)
framer-motion: 12.34.0 (motion component API, not m/LazyMotion)
three: 0.172.0 (@react-three/fiber + @react-three/drei for GLB models)
3D Model: /public/assets/Chamber.glb (8.2 MB)

Fully Tested (100% branch coverage):
- lib/cal-config.ts (100% all metrics)
- lib/utils.ts (100% all metrics)
- components/ui/button.tsx (100% branch)
- components/ui/card.tsx (100% all metrics)
- components/ui/theme-toggle.tsx (100% all metrics)
- components/layout/PageLayout.tsx (100% all metrics)
- components/providers/theme-provider.tsx (100% all metrics)
- components/Navigation.tsx (100% branch - previously 66.66%)
- components/BookingSection.tsx (100% all metrics)
- components/DocumentationSection.tsx (100% all metrics)
- components/DownloadSection.tsx (100% all metrics)
- components/FeaturesSection.tsx (100% all metrics)
- components/Footer.tsx (100% all metrics)
- components/ScopeSection.tsx (100% all metrics)
- components/SupportSection.tsx (100% all metrics)
- All App Pages (100% lines)

Remaining Branch Gaps (defensive/unreachable code in jsdom):
- HeroSection lines 18-34: typeof window !== undefined SSR guard (always true in jsdom)
- CalendarScheduler line 33: MutationObserver attributeName check (jsdom limitation)
- DemoSection line 52: fallback title for non-existent video ID (unreachable - state always valid)
- status/page lines 110-117: allOperational ternary (hardcoded data all operational)
- sanity.ts lines 166-248: TypeScript interface definitions (not executable code)

Sanity Deployment:
- Hero Video: file-71501ee4a175fe13f42a40a9490a3db191df2db3-mp4
- CDN URL: https://cdn.sanity.io/files/gerattrr/production/71501ee4a175fe13f42a40a9490a3db191df2db3.mp4
- Studio: https://ppnamias.sanity.studio/
- Preview: https://join.mashmarket.app/
```

### Manual Override Commands
```bash
# Skip to specific step (emergency use only)
npm test -- --testPathPattern=components  # Test only components
npm run build -- --no-lint                # Build without linting
```

## COMPLETED MISSION: Sanity CMS Migration

### Migration Summary
**Goal**: Replace Cloudinary CDN with Sanity CMS for all media assets (videos, images, APK files) and landing page content management.
**Status**: COMPLETED - All phases finished successfully.

**Outcomes Achieved**:
- Unified content management (text + media in one place)
- Better content workflows and versioning
- Existing Sanity Studio infrastructure in `/studio`
- Free tier: 250K API calls/month, file uploads included
- Built-in asset optimization and CDN
- Zero Cloudinary references remaining in codebase

**Migration Phases (All Completed)**:
1. **Schema Creation**: Landing page document types with file upload fields
2. **Client Integration**: Sanity client installed in main Next.js app
3. **Utility Functions**: Sanity helpers created in `lib/sanity.ts`
4. **Automation Scripts**: Import landing content + upload video/APK files
5. **Component Refactoring**: All components updated to fetch from Sanity
6. **Testing**: 308 tests passing, 31 suites, 95.44% statement coverage
7. **Deprecation**: Cloudinary fully removed (files, packages, env vars)

### Ralph Loop Agent - Sanity Migration Workflow
```
┌──────────────────────────────────────────────────────────────────┐
│         Ralph Loop: Sanity CMS Migration (outer loop)            │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  1. Create Sanity schemas (landingPage.ts)                 │  │
│  │  2. Install Sanity client dependencies                     │  │
│  │  3. Create lib/sanity.ts utilities                         │  │
│  │  4. Create import/upload scripts                           │  │
│  │  5. Refactor components to use Sanity data                 │  │
│  │  6. Create unit tests for Sanity integration               │  │
│  │  7. Run tests (npm test)                                   │  │
│  │  8. Fix test failures                                      │  │
│  │  9. Run build (npm run build)                              │  │
│  │  10. Fix build errors                                      │  │
│  └────────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  verifyCompletion: "Sanity integrated? Tests pass? Build OK?"   │
│                              ↓                                   │
│       No? → Analyze errors → Run another iteration               │
│       Yes? → Migration complete, 100% test coverage achieved     │
└──────────────────────────────────────────────────────────────────┘
```

**Stop Conditions**:
- Primary: All Sanity integration tests pass (100%) + Build succeeds + No Cloudinary references remain
- Fallback: Max 100 iterations (complex migration)
- Emergency: Manual agent termination

### Sanity Schema Structure

**Landing Page Schema** (`studio/src/schemaTypes/documents/landingPage.ts`):
```typescript
{
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    // Hero Section
    { name: 'heroTitle', type: 'string' },
    { name: 'heroSubtitle', type: 'text' },
    { name: 'heroVideo', type: 'file' },      // Video file upload
    { name: 'heroButtons', type: 'array' },
    
    // Features Section
    { name: 'features', type: 'array', of: [{ type: 'feature' }] },
    
    // Demo Section
    { name: 'demoVideos', type: 'array', of: [{ type: 'file' }] },
    
    // Download Section
    { name: 'downloadApk', type: 'file' },    // APK file upload
    { name: 'downloadVersion', type: 'string' },
    { name: 'downloadNotes', type: 'text' },
    
    // Scope, Support, Booking content
    { name: 'scopeContent', type: 'blockContent' },
    { name: 'supportContent', type: 'blockContent' },
  ]
}
```

### Sanity Client Configuration

**lib/sanity.ts** (to be created):
```typescript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true',
  token: process.env.SANITY_API_READ_TOKEN, // For authenticated requests
});

// Helper: Get landing page data
export async function getLandingPageData() {
  const query = `*[_type == "landingPage"][0]`;
  return await sanityClient.fetch(query);
}

// Helper: Get file URL (video/APK)
export function getSanityFileUrl(asset: any): string {
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${asset._ref.split('-')[1]}.${asset._ref.split('-')[2]}`;
}

// Helper: Get optimized image URL
export function getSanityImageUrl(source: any, options = {}) {
  const builder = imageUrlBuilder(sanityClient);
  return builder.image(source).auto('format').fit('max').url();
}
```

### Automation Scripts

**scripts/import-landing-page.js**:
```javascript
import { sanityClient } from '../lib/sanity.ts';

const landingPageData = {
  _type: 'landingPage',
  heroTitle: 'MASH - Mushroom Automation System Hub',
  heroSubtitle: 'Advanced automation system for professional mushroom cultivation',
  // ... all landing page content
};

await sanityClient.create(landingPageData);
```

**scripts/upload-assets.js**:
```javascript
// Upload videos and APK files to Sanity
import fs from 'fs';
import { sanityClient } from '../lib/sanity.ts';

async function uploadVideo(filePath, fileName) {
  const fileBuffer = fs.readFileSync(filePath);
  const asset = await sanityClient.assets.upload('file', fileBuffer, {
    filename: fileName,
  });
  return asset;
}

// Upload all assets
await uploadVideo('./public/videos/demo.mp4', 'demo.mp4');
await uploadVideo('./public/downloads/mash-app.apk', 'mash-app.apk');
```

### Component Migration Pattern (Completed)

**Before (Cloudinary - removed)**:
```tsx
// This pattern is no longer used - Cloudinary has been fully removed
import { getCloudinaryVideoUrl, CLOUDINARY_ASSETS } from "@/lib/cloudinary";

export default function HeroSection() {
  const videoUrl = getCloudinaryVideoUrl(CLOUDINARY_ASSETS.videos.demo);
  return <video src={videoUrl} />;
}
```

**After (Sanity - current implementation)**:
```tsx
import { getLandingPageData, getSanityFileUrl } from "@/lib/sanity";

export default async function HeroSection() {
  const data = await getLandingPageData();
  const videoUrl = getSanityFileUrl(data.heroVideo.asset);
  return <video src={videoUrl} />;
}
```

### Testing for Sanity Integration (Completed)

**Test Files Created**:
- `__tests__/lib/sanity.test.ts` (30+ tests) - sanityClient config, getLandingPageData, getSanityFileUrl, getSanityImageUrl
- `__tests__/components/HeroSection.test.tsx` - 15+ tests with Sanity mock
- `__tests__/components/DemoSection.test.tsx` - 12 tests
- `__tests__/components/Navigation.test.tsx` - 20+ tests
- `__tests__/components/Footer.test.tsx` - text logo test
- `__tests__/components/CalendarScheduler.test.tsx` - 26 tests
- `__tests__/components/ThemeToggle.test.tsx` - 10 tests
- `__tests__/components/PageLayout.test.tsx` - 10 tests
- `__tests__/components/Card.test.tsx` - 30 tests
- `__tests__/components/ThemeProvider.test.tsx` - 5 tests
- 12 app page test files (layout, page, download, faq, terms, privacy, license, status, support, documentation, tutorials, schedule)

**Test Coverage Achieved**: 95.44% stmts, 82.2% branches, 98.86% functions, 98.37% lines

**Mock Pattern**:
```typescript
jest.mock('@sanity/client', () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(),
    assets: {
      upload: jest.fn(),
    },
  })),
}));
```

### Migration Checklist

**Phase 1: Foundation** (Iterations 1-20) COMPLETED
- [x] Create `landingPage.ts` schema in `/studio/src/schemaTypes/documents/`
- [x] Update `/studio/src/schemaTypes/index.ts` to include landing page schema
- [x] Install `@sanity/client`, `@sanity/image-url`, `next-sanity` in root
- [x] Create `lib/sanity.ts` with client config and helper functions
- [x] Run tests: Verify Sanity client initialization

**Phase 2: Scripts** (Iterations 21-40) COMPLETED
- [x] Create `scripts/import-landing-page.js` with all content
- [x] Create `scripts/upload-assets.js` for video/APK uploads
- [x] Run scripts to populate Sanity with landing page data
- [x] Verify data in Sanity Studio (https://ppnamias.sanity.studio)

**Phase 3: Component Migration** (Iterations 41-70) COMPLETED
- [x] Refactor `HeroSection.tsx` to use Sanity data
- [x] Refactor `DemoSection.tsx` to use Sanity videos from Sanity
- [x] Refactor `Navigation.tsx` to use text-based logo (no Cloudinary Image)
- [x] Refactor `Footer.tsx` to use text-based logo (no Cloudinary Image)
- [x] Update all section components to fetch from Sanity

**Phase 4: Testing** (Iterations 71-90) COMPLETED
- [x] Create comprehensive unit tests for `lib/sanity.ts`
- [x] Create tests for Sanity-integrated components
- [x] Run `npm test` - Fix all failures - 308 tests passing
- [x] Run `npm run build` - Fix all build errors - 14 pages prerendered
- [x] Achieve 95.44% test coverage (remaining gaps are defensive/unreachable code)

**Phase 5: Cleanup** (Iterations 91-100) COMPLETED
- [x] Remove Cloudinary dependencies from package.json
- [x] Delete `lib/cloudinary.ts`
- [x] Remove NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME from .env
- [x] Update documentation with Sanity usage patterns
- [x] Final verification: All tests pass, build succeeds

### Current Migration Status
```
Sanity Schema: COMPLETED (landingPage.ts with 220 lines, all fields)
Client Integration: COMPLETED (lib/sanity.ts with 249 lines, 8 functions)
Utility Functions: COMPLETED (getSanityImageUrl, getSanityFileUrl, getSanityVideoUrl, getLandingPageData, getLandingPageDataCached)
Import Scripts: COMPLETED (import-landing-page.js + upload-assets.js + README.md)
Component Migration: COMPLETED (HeroSection, DemoSection, Navigation, Footer - all refactored)
Testing: COMPLETED (308 tests, 31 suites, all passing)
Test Coverage: 95.44% stmts, 82.2% branches, 98.86% functions, 98.37% lines
Cloudinary Removal: COMPLETED (lib/cloudinary.ts deleted, packages removed, env vars removed)
Build Status: SUCCESS (14 pages prerendered)
Last Updated: June 2025
```

### Common Sanity Migration Patterns

**Fetching Data in Server Components**:
```tsx
// app/page.tsx
import { getLandingPageData } from '@/lib/sanity';

export default async function HomePage() {
  const landingData = await getLandingPageData();
  return <HeroSection data={landingData} />;
}
```

**Handling File Assets**:
```typescript
// For videos, APKs, PDFs
const fileUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${ext}`;

// For images with optimization
const imageUrl = imageUrlBuilder(sanityClient)
  .image(imageAsset)
  .width(800)
  .auto('format')
  .url();
```

**Incremental Static Regeneration (ISR)**:
```tsx
export const revalidate = 60; // Revalidate every 60 seconds
```

### Error Handling Patterns

**Sanity Client Errors**:
```typescript
try {
  const data = await sanityClient.fetch(query);
} catch (error) {
  if (error.statusCode === 404) {
    // Document not found
  }
  if (error.statusCode === 401) {
    // Authentication failed - check SANITY_API_READ_TOKEN
  }
}
```

**Large File Uploads**:
```javascript
// For files > 5MB, use streaming upload
const stream = fs.createReadStream(filePath);
const asset = await sanityClient.assets.upload('file', stream, {
  filename: fileName,
  contentType: 'video/mp4',
});
```

## Future Considerations
- E-commerce functionality using existing Sanity schemas
- Blog/documentation CMS-driven content (already have schema)
- E2E testing with Playwright (after unit tests complete)
- Visual regression testing with Chromatic
- Sanity webhooks for real-time content updates

## NEXT STEPS: AI-GUIDED WORKFLOW PROMPTS

### For Future AI Agents Working on This Project

This section provides ready-to-use prompts for AI agents to continue development, maintenance, or migration work on the MASH Landing Page project.

---

### Prompt 1: Complete Sanity CMS Migration

```
STATUS: COMPLETED - This migration has been fully executed.
All Cloudinary references removed. 308 tests passing. Build succeeds.

The following tasks were completed:
1. Import script executed: `node scripts/import-landing-page.js`
2. Assets uploaded to Sanity CMS
3. Data verified in Sanity Studio at https://ppnamias.sanity.studio
4. Components refactored to use Sanity data:
   - HeroSection.tsx - uses getSanityFileUrl for video
   - DemoSection.tsx - uses Sanity video assets
   - Navigation.tsx - text-based logo (no external image)
   - Footer.tsx - text-based logo (no external image)
5. Ralph Loop testing cycle completed:
   - npm test - 308 tests passing, 31 suites
   - npm run build - SUCCESS, 14 pages prerendered
6. 100% test pass rate achieved
7. Cloudinary dependencies fully removed

REFERENCE: See "COMPLETED MISSION" section above for full details.
```

---

### Prompt 2: Increase Test Coverage to 100%

```
Increase the test coverage for the MASH Landing Page project to 100%.

CURRENT STATUS:
- Total Tests: 308 passing
- Coverage: 98.37% lines, 82.2% branches, 98.86% functions
- Remaining Branch Gaps (defensive/unreachable code):
  * HeroSection: video onError handler (video not rendered when no asset uploaded)
  * Navigation: inline JSX ternaries for hash vs non-hash links
  * CalendarScheduler: MutationObserver attributeName check
  * DemoSection: fallback title for non-existent video ID
  * cal-config: env var fallback defaults (module-level constants)
  * status/page: StatusBadge switch cases for degraded/outage/maintenance

TASKS:
1. Run coverage report: `npm test -- --coverage`
2. Analyze uncovered lines in CalendarScheduler.tsx
3. Create __tests__/components/CalendarScheduler.test.tsx with:
   - Cal.com embed rendering tests
   - Theme sync tests
   - Event type prop tests
   - Error handling tests
4. Add more tests to Navigation.test.tsx:
   - Mobile menu open/close states
   - Link active states based on usePathname
   - Scroll behavior tests
   - Theme toggle interactions
5. Run Ralph Loop:
   - Create tests → npm test → Fix failures → npm run build → Fix errors → Repeat
6. Target: 100% line, branch, and function coverage

FOLLOW: Testing patterns in .github/copilot-instructions.md
STOP WHEN: Coverage reaches 100% for all metrics
```

---

### Prompt 3: Refactor Component to Use Sanity Data

```
Refactor the [COMPONENT_NAME] component to fetch data from Sanity CMS instead of hardcoded content.

EXAMPLE (replace [COMPONENT_NAME] with actual component):
Component: HeroSection.tsx

TASKS:
1. Read current implementation of components/HeroSection.tsx
2. Check Sanity schema structure in studio/src/schemaTypes/documents/landingPage.ts
3. Refactor component to:
   - Make it async (Server Component)
   - Import { getLandingPageData, getSanityFileUrl } from '@/lib/sanity'
   - Fetch landing page data: const data = await getLandingPageData()
   - Replace hardcoded text with data.heroTitle, data.heroSubtitle
   - Replace Cloudinary video with getSanityFileUrl(data.heroVideo.asset)
4. Update tests in __tests__/components/HeroSection.test.tsx:
   - Mock getLandingPageData to return test data
   - Test component renders with Sanity data
   - Test error handling if data is missing
5. Run tests: npm test -- HeroSection
6. Run build: npm run build
7. Verify changes don't break existing functionality

PATTERN: See "Component Migration Pattern" in .github/copilot-instructions.md
STOP WHEN: Component uses Sanity data + Tests pass + Build succeeds
```

---

### Prompt 4: Fix Failing Tests Using Ralph Loop

```
Fix all failing tests in the MASH Landing Page project using the Ralph Loop methodology.

RALPH LOOP PROCESS:
1. Run tests: `npm test`
2. Analyze failures: Read error messages, identify root causes
3. Fix issues:
   - If test logic is wrong: Update test expectations
   - If component is broken: Fix component implementation
   - If mock is missing: Add mock to jest.setup.js
4. Re-run tests: `npm test`
5. If failures persist: Repeat steps 2-4
6. Once all tests pass: Run build `npm run build`
7. Fix any build errors (TypeScript, ESLint)
8. Re-run tests to confirm no regressions
9. STOP when: All tests pass + Build succeeds

DEBUGGING TIPS:
- Check jest.setup.js for missing environment variable mocks
- Look for "window is not defined" → Mock browser APIs
- Look for "useTheme is not a function" → Verify next-themes mock
- Look for module resolution errors → Check @/ path aliases in jest.config.js

FOLLOW: "Ralph Loop Agent Instructions" in .github/copilot-instructions.md
MAX ITERATIONS: 50 (stop and report if unable to fix)
```

---

### Prompt 5: Add New Feature with Full Test Coverage

```
Add a new [FEATURE_NAME] feature to the MASH Landing Page with 100% test coverage.

EXAMPLE (replace [FEATURE_NAME]):
Feature: Newsletter Subscription Component

WORKFLOW:
1. Plan & Design:
   - Define component requirements
   - Identify Sanity schema fields needed (if any)
   - Sketch component API (props, state, handlers)

2. Sanity Schema (if needed):
   - Add fields to studio/src/schemaTypes/documents/landingPage.ts
   - Update schema index
   - Run Sanity Studio to verify: cd studio && npm run dev

3. Create Component:
   - Create components/[ComponentName].tsx
   - Follow project conventions (see .github/copilot-instructions.md)
   - Use "use client" if interactive (useState, event handlers)
   - Import from @/ alias for internal modules

4. Write Tests FIRST (TDD approach):
   - Create __tests__/components/[ComponentName].test.tsx
   - Write tests for all functionality before implementing
   - Follow test patterns in .github/copilot-instructions.md

5. Implement Component:
   - Write code to make tests pass
   - Run npm test -- [ComponentName] after each change
   - Achieve 100% coverage: npm test -- --coverage [ComponentName]

6. Integration:
   - Add component to appropriate page (e.g., app/page.tsx)
   - Update Sanity import script if needed
   - Run full test suite: npm test
   - Run build: npm run build

7. Verify:
   - All tests pass (including new ones)
   - Build succeeds
   - Component renders correctly in dev: npm run dev

STOP WHEN: Feature complete + 100% test coverage + Build succeeds
```

---

### Prompt 6: Update Styling/Theme

```
Update the styling or theme for the MASH Landing Page project.

STYLING GUIDELINES:
- Use Tailwind CSS 4 utility classes
- Follow semantic tokens: bg-background, text-primary, etc.
- Brand color: Green (bg-green-600, text-green-600)
- Dark mode: Use dark: prefix (dark:bg-gray-900)
- Custom variables: Define in app/globals.css

TASKS:
1. Identify what needs styling changes
2. Update Tailwind classes in components
3. If adding new colors: Update app/globals.css CSS variables
4. Test in both light and dark modes
5. Run tests: npm test (verify no broken tests)
6. Run build: npm run build
7. Visual check: npm run dev → Test in browser

DARK MODE PATTERNS:
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
className="border-gray-200 dark:border-gray-800"

RESPONSIVE PATTERNS:
className="text-sm md:text-base lg:text-lg"
className="px-4 md:px-6 lg:px-8"

STOP WHEN: Styles updated + Tests pass + Build succeeds + Visual verification complete
```

---

### Prompt 7: Security Audit & Environment Variables

```
Perform a security audit of the MASH Landing Page project, focusing on environment variables and Sanity API tokens.

AUDIT CHECKLIST:
1. Environment Variables:
   - Verify .env.local is in .gitignore (should NOT be committed)
   - Check .env.example is up-to-date with all required variables
   - Confirm all NEXT_PUBLIC_* vars are safe for client-side exposure
   - Ensure sensitive tokens (SANITY_API_WRITE_TOKEN) are server-side only

2. Sanity Token Security:
   - Read token: Used only for fetching published data
   - Write token: Used only in scripts/import-landing-page.js (server-side)
   - Deploy token: Used only for npx sanity deploy (local/CI only)
   - Verify tokens have appropriate permissions in Sanity dashboard

3. API Route Security (if any):
   - Check for proper authentication
   - Validate input data
   - Rate limiting considerations

4. Dependencies:
   - Run: npm audit
   - Fix critical vulnerabilities: npm audit fix
   - Review outdated packages: npm outdated

5. Content Security Policy:
   - Review next.config.ts for CSP headers
   - Ensure Sanity CDN (cdn.sanity.io) is allowlisted
   - Ensure Cal.com domains are allowlisted

6. Git History:
   - Search for accidentally committed secrets: git log --all --oneline | grep -i "token\|secret\|password"
   - If found: Rotate tokens immediately + use git-filter-repo to remove

REPORT:
Create a security-audit.md file with findings and recommendations

STOP WHEN: Audit complete + Critical issues fixed + Report generated
```

---

### Prompt 8: Deploy to Production

```
Deploy the MASH Landing Page to production (Vercel/Netlify/other platform).

PRE-DEPLOYMENT CHECKLIST:
1. All tests passing: npm test -> 308/308 PASS
2. Build succeeds: npm run build -> No errors PASS
3. Sanity data populated: Verify in https://ppnamias.sanity.studio PASS
4. Environment variables ready for production
5. No console.error or console.warn in production build
6. Accessibility check: Run Lighthouse audit

DEPLOYMENT STEPS:
1. Verify Environment Variables:
   - Copy variables from .env.local
   - Add to deployment platform (Vercel/Netlify dashboard)
   - Do NOT commit .env.local to git

2. Sanity Studio Deployment:
   - cd studio
   - npm run build
   - npx sanity deploy (requires SANITY_DEPLOY_TOKEN)
   - Verify Studio is accessible at https://ppnamias.sanity.studio

3. Next.js App Deployment:
   - Push to main branch (triggers automatic deployment if configured)
   - OR: Manual deploy via platform CLI
   - Wait for build to complete

4. Post-Deployment Verification:
   - Visit production URL
   - Test all pages load correctly
   - Test dark mode toggle
   - Test Cal.com scheduling embeds
   - Test video playback
   - Test APK download link
   - Run Lighthouse audit (target: 90+ for all metrics)

5. Monitor:
   - Check Vercel/Netlify logs for errors
   - Check Sanity usage dashboard: https://sanity.io/manage/project/gerattrr/usage
   - Monitor API calls (should be under 250K/month limit)

ROLLBACK PLAN:
If deployment fails: Revert to previous commit + redeploy

STOP WHEN: Site live + All functionality verified + No errors in logs
```

---

### Prompt 9: Generate Coverage Report & Improve Weak Areas

```
Generate a comprehensive test coverage report and improve areas with low coverage.

TASKS:
1. Generate coverage report with detailed breakdown:
   npm test -- --coverage --verbose

2. Analyze coverage data:
   - Open coverage/lcov-report/index.html in browser
   - Identify files with < 80% coverage
   - List uncovered lines, branches, functions

3. Prioritize improvements:
   - Critical: lib/*.ts files (utilities must be 100%)
   - High: components/*.tsx (main sections)
   - Medium: components/ui/*.tsx (UI components)
   - Low: app/**/page.tsx (SSR pages, may not need unit tests)

4. Create missing tests:
   - Focus on uncovered branches (if/else, switch, ternary)
   - Focus on uncovered functions (error handlers, edge cases)
   - Follow test patterns in .github/copilot-instructions.md

5. Run Ralph Loop:
   - Add tests → npm test → Fix failures → Verify coverage improved → Repeat

6. Document findings:
   - Update "Current Test Coverage Status" in .github/copilot-instructions.md
   - List fully tested files
   - List files needing improvement

TARGET: 
- Lines: 100%
- Branches: 100%
- Functions: 100%
- Statements: 100%

STOP WHEN: Coverage targets achieved for all critical files
```

---

### Prompt 10: Onboard New Developer (Generate Documentation)

```
Create comprehensive onboarding documentation for a new developer joining the MASH Landing Page project.

DOCUMENTATION TO CREATE:

1. GETTING_STARTED.md:
   - Prerequisites (Node.js 18+, npm, git)
   - Clone repository
   - Install dependencies: npm install
   - Setup environment variables: Copy .env.example to .env.local
   - Run dev server: npm run dev
   - Run tests: npm test
   - Run Sanity Studio: cd studio && npm run dev

2. ARCHITECTURE.md:
   - Project structure overview
   - Next.js App Router architecture
   - Sanity CMS integration
   - Component organization (Section, UI, Layout)
   - Styling approach (Tailwind CSS 4 + CSS variables)
   - Testing strategy (Jest + React Testing Library)

3. CONTRIBUTING.md:
   - Code style guidelines
   - Commit message conventions
   - Branch naming conventions
   - Pull request process
   - Testing requirements (100% coverage for new code)
   - Review checklist

4. API_REFERENCE.md:
   - lib/sanity.ts API documentation
   - lib/cal-config.ts API documentation
   - lib/cloudinary.ts API documentation
   - Component props interfaces
   - Utility function signatures

5. TROUBLESHOOTING.md:
   - Common errors and solutions
   - Jest test failures (mocking, environment)
   - Build errors (TypeScript, ESLint)
   - Sanity connection issues
   - Environment variable issues

6. Update README.md:
   - Add badges (build status, test coverage, license)
   - Add "Features" section
   - Add "Tech Stack" section
   - Link to all documentation files

STOP WHEN: All documentation created + Reviewed for accuracy + Added to repository
```

---

### Prompt 11: Continue Enhanced Landing Page Improvements (COMPLETED)

```
STATUS: COMPLETED - February 2026

Completed Tasks:
1. Fixed dev server Turbopack error (added turbopack: {} to next.config.ts)
2. Updated build script to use --webpack flag in package.json
3. Integrated Chamber.glb 3D model via Three.js (@react-three/fiber + drei)
4. Created ChamberModel3D component with lazy loading and CSS fallback
5. Updated IoTDeviceSection to use real 3D model
6. Added Three.js mocks to jest.setup.js
7. All 403 tests passing, 37 suites
8. Build succeeds (14 pages prerendered)
9. Dev server runs without Turbopack error
```

---

### Prompt 12: Next Phase - Production Polish and Sanity 3D Model Migration

```
Continue improving the MASH Landing Page with production polish, Sanity 3D model migration, and performance optimization.

CURRENT STATE (as of February 2026):
- 403 tests passing, 37 test suites, 0 failures
- Build succeeds with `npm run build` (uses --webpack flag)
- Dev server runs with Turbopack (no more config conflict error)
- Node.js v24.12.0 (ABI 137) with WASM SWC fallback
- Chamber.glb 3D model loaded from /public/assets/ (8.2 MB)
- ChamberModel3D component uses @react-three/fiber + @react-three/drei
- IoTDeviceSection lazy-loads ChamberModel3D with CSS fallback
- All framer-motion components use `motion` API (not `m`/`LazyMotion`)

KNOWN TECHNICAL ISSUES:
1. Node.js 24 SWC incompatibility:
   - Build uses WASM SWC fallback (--webpack flag in package.json)
   - Tests use @swc/jest instead of next/jest
   - FIX: Downgrade to Node.js 22 LTS when possible

2. @sanity/image-url deprecation warning:
   - "The default export of @sanity/image-url has been deprecated"
   - FIX: Update import to use `createImageUrlBuilder` named export

3. Chamber.glb served from /public (not Sanity CDN):
   - Requires a SANITY_API_WRITE_TOKEN to upload to Sanity
   - Once token available: upload GLB to Sanity, update ChamberModel3D to use Sanity CDN URL
   - Schema field already exists: iotDeviceModel in landingPage schema

4. npm --legacy-peer-deps strips .d.ts files:
   - After npm install, verify type files exist for framer-motion, motion-dom, motion-utils

IMPROVEMENT TASKS:
1. Migrate Chamber.glb to Sanity CDN:
   - Get/create SANITY_API_WRITE_TOKEN
   - Upload Chamber.glb to Sanity using iotDeviceModel field
   - Update ChamberModel3D to fetch URL from Sanity via getLandingPageData()
   - Update tests

2. Fix @sanity/image-url deprecation:
   - Replace `import imageUrlBuilder from '@sanity/image-url'`
   - With `import { createImageUrlBuilder } from '@sanity/image-url'`
   - Update getSanityImageUrl function in lib/sanity.ts

3. Performance Optimization:
   - Model compression: Convert Chamber.glb to Draco-compressed format
   - Add loading progress bar for 3D model
   - Code-split Three.js dependencies with dynamic imports

4. Accessibility Enhancements:
   - Add ARIA labels to IoT device spec buttons
   - Tab navigation for MobileAppShowcase screen buttons
   - Keyboard-accessible 3D model rotation

5. Visual Polish:
   - Add gradient mesh backgrounds to sections
   - Loading shimmer effects for Sanity-fetched content
   - Model interaction hints (drag to rotate)

6. Test Coverage:
   - Run coverage report: npx jest --coverage
   - Target 100% for ChamberModel3D edge cases
   - Test 3D model loading error states

FOLLOW: Project conventions in .github/copilot-instructions.md
RALPH LOOP: Create/fix tests -> npx jest -> Fix failures -> npm run build -> Fix errors -> Repeat
STOP WHEN: All improvements implemented + Tests pass + Build succeeds
```

---

### Prompt Template: Custom Task

```
[DESCRIBE YOUR TASK HERE]

CONTEXT:
- Project: MASH Landing Page (Next.js 16 + React 19 + TypeScript + Sanity CMS)
- Current State: [DESCRIBE CURRENT STATE]
- Goal: [DESCRIBE DESIRED OUTCOME]

TASKS:
1. [STEP 1]
2. [STEP 2]
3. [STEP 3]
...

FOLLOW:
- Project conventions in .github/copilot-instructions.md
- Testing requirements: 100% pass rate + full coverage
- Ralph Loop methodology for iterative testing

STOP WHEN: [CLEAR COMPLETION CRITERIA]
```

---

## Using These Prompts

### For AI Agents:
1. Copy the relevant prompt above
2. Paste into your AI agent interface
3. Let the agent work autonomously following the instructions
4. Agent will stop when completion criteria are met

### For Human Developers:
1. Use prompts as checklists for complex tasks
2. Follow the documented patterns and conventions
3. Run tests and builds frequently (Ralph Loop approach)
4. Update documentation as you make changes

### Prompt Maintenance:
- Update prompts when project structure changes
- Add new prompts for recurring tasks
- Keep environment variable references current
- Update test coverage targets as needed

---

**Last Updated**: February 11, 2026
**Version**: 3.0.0
**Maintained By**: MASH Development Team
