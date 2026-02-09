# MASH Landing Page - AI Agent Instructions

## Project Overview
Next.js 16 landing page for MASH (Mushroom Automation System Hub) - a professional mushroom cultivation automation platform. Built with React 19, TypeScript, Tailwind CSS 4, and integrated with Cloudinary CDN and Cal.com scheduling.

## Architecture & Structure

### Main Application (`/app`)
- **App Router**: Next.js App Router with file-based routing
- **Layout**: Root layout at [app/layout.tsx](app/layout.tsx) includes ThemeProvider with dark mode as default
- **Homepage**: [app/page.tsx](app/page.tsx) is a single-page landing with section components
- **Standalone Pages**: `/download`, `/faq`, `/schedule`, `/documentation`, `/support`, `/terms`, `/privacy`, `/license`, `/status`

### Components Organization (`/components`)
**Section Components** (main landing page sections):
- `HeroSection.tsx` - Video background with Cloudinary integration
- `FeaturesSection.tsx`, `DemoSection.tsx`, `DocumentationSection.tsx`, `ScopeSection.tsx`, `BookingSection.tsx`, `SupportSection.tsx`, `DownloadSection.tsx`
- `Navigation.tsx`, `Footer.tsx` - Shared across pages

**UI Components** (`/components/ui`):
- shadcn/ui pattern: Individual component files like `button.tsx`, `card.tsx`, `theme-toggle.tsx`
- Variants defined using `class-variance-authority` (CVA)
- All use `cn()` utility from `@/lib/utils` for className merging

**Layout Components** (`/components/layout`):
- `PageLayout.tsx` - Wrapper for standalone pages

### Sanity Studio (`/studio`)
Separate Sanity CMS workspace for content management (e-commerce focused):
- **Project ID**: `gerattrr`, **Dataset**: `production`
- **Schema**: 25+ document types in `/studio/src/schemaTypes/documents/` (products, orders, reviews, blog, etc.)
- **Sample Data**: `/studio/sample-data/` with import scripts
- **Commands**: Run from `/studio` directory: `npm run dev` (port 3333), `npm run build`, `npm run deploy`
- **Note**: Currently not integrated with main Next.js app - future integration planned

## Critical Integrations

### Cloudinary CDN (Media Management)
**Configuration**: [lib/cloudinary.ts](lib/cloudinary.ts)
- Cloud name from `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` env var
- Helper functions: `getCloudinaryImageUrl()`, `getCloudinaryVideoUrl()`, `getVideoThumbnailUrl()`
- Predefined asset paths in `CLOUDINARY_ASSETS` constant
- Automatic optimization: format (WebP/AVIF), quality, responsive sizing

**Usage Pattern**:
```tsx
import { getCloudinaryVideoUrl, CLOUDINARY_ASSETS } from "@/lib/cloudinary";

<video>
  <source src={getCloudinaryVideoUrl(CLOUDINARY_ASSETS.videos.demo, { format: 'mp4' })} />
</video>
```

**Asset Organization**: `/mash/` folder structure on Cloudinary (images/, videos/, icons/)

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
npm run upload:cloudinary  # Upload assets to Cloudinary (if script exists)
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
- Utils/configs: kebab-case (`cal-config.ts`, `cloudinary.ts`)
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
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `NEXT_PUBLIC_CAL_USERNAME` - Cal.com username
- `NEXT_PUBLIC_CAL_*_SLUG` - Event type slugs (15min, 30min, 1-hour-meeting)
- `NEXT_PUBLIC_CONTACT_EMAIL` - Contact email

**Current** (see [.env.local](.env.local)):
- Cloud: `dba1qe4pw`
- Cal.com: `mash-mushroom`
- Email: `mash.mushroom.automation@gmail.com`

## Common Patterns

### Cloudinary Image with Optimization
```tsx
<Image
  src={getCloudinaryImageUrl('mash/images/logo', { width: 200, quality: 'auto', format: 'auto' })}
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
- ❌ Don't store images/videos in `/public/assets` - use Cloudinary
- ❌ Don't hardcode Cal.com URLs - use `getCalUrl()` helpers
- ❌ Don't use raw color values - use CSS variables or Tailwind classes
- ❌ Don't add `"use client"` unnecessarily - default to server components
- ❌ Don't run Studio commands from root - `cd studio` first

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
- **Utility Functions** (`/lib/*.ts`): cloudinary.ts, cal-config.ts, utils.ts
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
   - ✅ All tests passing (0 failures)
   - ✅ Build completes successfully (exit code 0)
   - ✅ No TypeScript errors
   - ✅ No ESLint errors
8. **Loop**: If verification fails, analyze errors and repeat from step 4

**Stop Conditions**:
- ✅ Primary: All tests pass (100%) AND build succeeds
- ⚠️ Fallback: Max 50 iterations (prevents infinite loops)
- ⚠️ Emergency: Manual agent termination by user

**Error Handling Patterns**:
- **"Cannot find module"**: Add to jest.setup.js mocks
- **"useTheme is not a function"**: Mock next-themes in test setup
- **"window is not defined"**: Mock browser APIs or use client component wrappers
- **Environment variables**: Mock in jest.setup.js with test values

### Current Test Coverage Status
Track progress here (updated by agent):
```
Component Tests: 11/11 passing ✅
Utility Tests: 3/3 passing ✅
UI Component Tests: 1/1 passing ✅
Total Tests: 113 passed, 0 failed ✅
Build Status: SUCCESS ✅
Last Run: February 10, 2026
Coverage: 42.9% lines, 41.07% branches, 36.47% functions

Fully Tested:
- lib/cloudinary.ts (100%)
- lib/cal-config.ts (100%)
- lib/utils.ts (100%)
- components/ui/button.tsx (100%)
- All Section Components (100%)

Needs Coverage Improvement:
- app/page.tsx and other page components (0% - SSR pages, may not need unit tests)
- CalendarScheduler.tsx (0% - complex component, needs dedicated tests)
- Navigation.tsx (43.33% - interactive features need more coverage)
```

### Manual Override Commands
```bash
# Skip to specific step (emergency use only)
npm test -- --testPathPattern=components  # Test only components
npm run build -- --no-lint                # Build without linting
```

## Future Considerations
- Sanity CMS integration with Next.js app (currently separate workspaces)
- E-commerce functionality using existing Sanity schemas
- Blog/documentation CMS-driven content
- E2E testing with Playwright (after unit tests complete)
- Visual regression testing with Chromatic
