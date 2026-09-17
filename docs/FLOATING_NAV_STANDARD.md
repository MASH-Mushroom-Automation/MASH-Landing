# Floating Navigation - Standard Implementation Guide

## Architecture Overview

The MASH Landing Page uses a single, globally-rendered `FloatingNav` component as the standard navigation across **all pages**. There is no secondary or page-specific navigation.

```
app/layout.tsx (Root Layout - Server Component)
  |-- Fetches Sanity CMS data via getLandingPageDataCached()
  |-- Renders <FloatingNav data={landingData} /> ONCE
  |-- Wraps {children} — every page inherits FloatingNav
  |
  |-- app/page.tsx (Homepage)
  |     |-- <main id="main-content"> (no padding-top — hero is full-bleed)
  |     |-- HeroSection, FeaturesSection, ... DownloadSection
  |     |-- Footer
  |
  |-- app/download/page.tsx, app/faq/page.tsx, etc. (Standalone pages)
        |-- Wrapped in <PageLayout>
        |-- <main id="main-content" className="pt-24"> (clearance for fixed nav)
        |-- Page content
        |-- Footer
```

## Design Principles

### 1. Full-Width Fixed Bar (Not a Floating Pill)

The nav is a clean, full-width bar fixed to the top of the viewport. This follows the pattern used by leading tech companies (Stripe, Linear, Vercel) and avoids the "detached bubble" feel of rounded pill navs with side margins.

```
Position: fixed top-0 inset-x-0 z-50
Height:   h-16 (64px)
Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### 2. Transparent-to-Solid Transition

| State              | Background            | Border                 | Shadow    | Blur              |
|--------------------|-----------------------|------------------------|-----------|--------------------|
| At top of page     | `bg-transparent`      | `border-transparent`   | None      | None               |
| Scrolled (> 20px)  | `bg-navigation` (95%) | `border-default`       | `shadow-sm` | `backdrop-blur-xl` |
| Drawer open        | `bg-navigation` (95%) | `border-default`       | `shadow-sm` | `backdrop-blur-xl` |

Key behavior: The nav automatically becomes solid when the mobile drawer opens (`isTransparent = transparentUntilScroll && !scrolled && !open`). This ensures the drawer and nav appear as one connected unit.

### 3. Solid Colors Only (NO Gradients)

Every background in the navigation uses solid, opaque colors defined via CSS custom properties:

```css
/* Light mode */
--color-background-navigation: 255 255 255;  /* white at 95% opacity */

/* Dark mode */
--color-background-navigation: 17 24 39;     /* gray-900 at 95% opacity */
```

The `.bg-navigation` utility class applies `background-color: rgb(var(--color-background-navigation) / 0.95)` for a subtle transparency that works with `backdrop-blur-xl`.

### 4. Consistent Border Strategy

A `border-b` (bottom border, 1px) is **always present** on the `<header>`. Only its color changes:

- **Transparent state**: `border-transparent` (invisible, prevents layout shift)
- **Solid state**: `border-default` which uses `--color-border` (gray-200 / gray-700)

This approach avoids the layout jump that occurs when adding/removing borders.

## Component API

### Props

```tsx
interface FloatingNavProps {
  data?: {
    floatingNav?: {
      enabled?: boolean;              // Show/hide nav entirely (default: true)
      transparentUntilScroll?: boolean; // Transparent at page top (default: true)
      backdrop?: boolean;              // Enable backdrop-blur (default: true)
      logoText?: string;               // Logo text (default: "MASH")
      logoHref?: string;               // Logo link (default: "/")
      showScrollProgress?: boolean;    // Scroll progress bar (default: true)
      showThemeToggle?: boolean;       // Theme toggle button (default: true)
      ctaButtons?: Array<{
        text: string;
        href: string;
        variant: "default" | "outline";
      }>;
    };
    navigationLinks?: Array<{
      label: string;
      href: string;
    }>;
    brandPalette?: {
      brandName?: string;              // Fallback for logoText
    };
  };
}
```

### Default Navigation Links

When no Sanity data is available, these links are used:

| Label         | Href             | Type         |
|---------------|------------------|--------------|
| Features      | `/#features`     | Hash (scroll)|
| Demo          | `/#demo`         | Hash (scroll)|
| Documentation | `/documentation` | Page link    |
| Download      | `/#download`     | Hash (scroll)|
| Contact       | `/#booking`      | Hash (scroll)|

### Sanity CMS Fields

All navigation configuration lives in the `landingPage` document under the `floatingNav` object. Fields in Sanity Studio:

- `floatingNav.enabled` (boolean)
- `floatingNav.transparentUntilScroll` (boolean)
- `floatingNav.backdrop` (boolean)
- `floatingNav.logoText` (string)
- `floatingNav.logoHref` (string)
- `floatingNav.showScrollProgress` (boolean)
- `floatingNav.showThemeToggle` (boolean)
- `floatingNav.ctaButtons` (array of objects)
- `navigationLinks` (array of `{label, href}`)

## Layout Integration

### Root Layout (app/layout.tsx)

The FloatingNav is rendered **once** in the root layout. This is the single source of navigation for every page.

```tsx
export default async function RootLayout({ children }) {
  let landingData = null;
  try {
    landingData = await getLandingPageDataCached();
  } catch {
    // FloatingNav renders with defaults when data unavailable
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScrollProvider>
            <FloatingNav data={landingData} />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Homepage (app/page.tsx)

The homepage has **no padding-top** on `<main>`. The HeroSection is full-bleed and the transparent nav overlays it.

```tsx
<main id="main-content">
  <HeroSection />  {/* Full-bleed hero, nav overlays */}
  ...
</main>
```

### Standalone Pages (via PageLayout)

All standalone pages use `PageLayout` which provides `pt-24` (96px) clearance:

```tsx
// components/layout/PageLayout.tsx
export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main id="main-content" className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

**Important**: PageLayout does NOT render any navigation. FloatingNav from `layout.tsx` handles it.

## Spacing Reference

```
Nav:         h-16 = 64px, fixed at top-0
PageLayout:  pt-24 = 96px (64px nav + 32px gap)
Scroll snap: scroll-margin-top: 5rem = 80px (64px nav + 16px clearance)
```

## Mobile Navigation

### Drawer Behavior

The mobile drawer is a **connected dropdown** that appears flush below the nav bar (not a detached floating card):

```
Position: fixed top-16 inset-x-0 z-50
Background: bg-navigation backdrop-blur-xl
Border: border-t border-default (separates from nav)
Animation: slide down 8px + fade in, 150ms ease-out
```

### Close Triggers

1. Tap a navigation link
2. Tap the backdrop overlay
3. Press Escape key
4. Tap hamburger toggle again

### Accessibility

- `role="dialog"` on drawer
- `aria-modal="true"` to indicate modal behavior
- `aria-expanded` on hamburger button
- Body scroll is locked when drawer is open
- Focus returns to hamburger button on Escape
- Touch targets are 48px minimum (py-3 on links)

## Accessibility Checklist

| Feature                | Implementation                                    |
|------------------------|---------------------------------------------------|
| Skip to content        | First focusable element, links to `#main-content` |
| Navigation role        | `role="navigation"` with `aria-label`             |
| Active page indicator  | `aria-current="page"` on active links             |
| Mobile toggle state    | `aria-expanded` reflects open/closed              |
| Keyboard navigation    | Tab through links, Escape closes drawer           |
| Focus visible          | `focus-visible:ring-2 focus-visible:ring-green-500`|
| Reduced motion         | Checks `prefers-reduced-motion: reduce`           |
| Semantic HTML          | `<header>`, `<nav>`, `<a>`, `<button>`            |

## Theming

The nav works in both light and dark modes via CSS custom properties:

| Element          | Light Mode                     | Dark Mode                      |
|------------------|--------------------------------|--------------------------------|
| Logo text        | `text-green-600`               | `text-green-400`               |
| Active link      | `text-green-600`               | `text-green-400`               |
| Inactive link    | `text-gray-600`                | `text-gray-300`                |
| Link hover       | `text-gray-900`                | `text-white`                   |
| CTA button       | `bg-green-600 text-white`      | `bg-green-500 text-white`      |
| CTA hover        | `bg-green-700`                 | `bg-green-600`                 |
| Background       | `white / 95%`                  | `gray-900 / 95%`               |
| Border           | `gray-200`                     | `gray-700`                     |
| Hamburger        | `text-gray-900`                | `text-white`                   |

## Best Practices

### DO

- Use `FloatingNav` exclusively from `layout.tsx` for navigation
- Pass Sanity data via the `data` prop for CMS-driven content
- Use `id="main-content"` on every page's `<main>` element
- Use `pt-24` on standalone pages via PageLayout
- Keep the nav as a `"use client"` component (needs hooks)
- Test with both themes and at mobile breakpoints

### DO NOT

- Import or render a separate `<Navigation>` component (deleted)
- Add navigation to individual pages or PageLayout
- Use gradients in the nav (solid colors only)
- Hardcode nav links (use DEFAULT_LINKS or Sanity data)
- Skip the `id="main-content"` attribute (needed for skip-to-content)
- Use `rounded-full` for CTA buttons (`rounded-lg` is the standard)

## File Locations

| File                              | Purpose                            |
|-----------------------------------|------------------------------------|
| `components/FloatingNav.tsx`      | Nav component (client)             |
| `app/layout.tsx`                  | Renders FloatingNav globally       |
| `components/layout/PageLayout.tsx`| Standalone page wrapper (no nav)   |
| `app/globals.css`                 | CSS variables, `.bg-navigation`    |
| `lib/sanity.ts`                   | Sanity client + type definitions   |
| `__tests__/components/FloatingNav.test.tsx` | 48 comprehensive tests  |

## Testing

The FloatingNav has **48 tests** covering:

- Rendering with/without Sanity data
- Enabled/disabled states
- Navigation links (default and custom)
- CTA button variants
- Theme toggle visibility
- Scroll progress bar
- Skip-to-content link
- ARIA attributes and roles
- Active link detection by pathname
- Mobile drawer open/close/escape/backdrop
- Body scroll lock
- Scroll state transitions (transparent to solid)
- Smooth scroll for hash links
- Hamburger animation classes
- Reduced motion detection
- Edge cases (null data, undefined links)
- Event listener cleanup on unmount

Run tests:
```bash
npx jest __tests__/components/FloatingNav.test.tsx
```

Run all tests:
```bash
npx jest
```

---

**Last Updated**: February 12, 2026
**Tests**: 517 passing, 38 suites
**Build**: Next.js 16.1.1 (webpack), 14 pages prerendered
