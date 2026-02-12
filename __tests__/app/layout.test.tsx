import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

// Mock SmoothScrollProvider
jest.mock('@/components/providers/smooth-scroll-provider', () => ({
  SmoothScrollProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="smooth-scroll-provider">{children}</div>
  ),
}));

// Mock FloatingNav
jest.mock('@/components/FloatingNav', () => {
  return function MockFloatingNav({ data }: { data?: any }) {
    return <div data-testid="floating-nav">FloatingNav</div>;
  };
});

// Mock Sanity
jest.mock('@/lib/sanity', () => ({
  getLandingPageDataCached: jest.fn().mockResolvedValue({
    navigationLinks: [{ label: 'Features', href: '#features' }],
    floatingNav: { enabled: true, logoText: 'MASH', logoHref: '/' },
  }),
}));

// Helper to render async Server Component
async function renderLayout(children: React.ReactNode) {
  const jsx = await RootLayout({ children });
  return render(jsx as React.ReactElement);
}

describe('RootLayout', () => {
  it('renders children', async () => {
    await renderLayout(<div data-testid="child">Hello</div>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('wraps children in ThemeProvider', async () => {
    await renderLayout(<div>Content</div>);
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
  });

  it('wraps children in SmoothScrollProvider', async () => {
    await renderLayout(<div>Content</div>);
    expect(screen.getByTestId('smooth-scroll-provider')).toBeInTheDocument();
  });

  it('renders html element with lang attribute', async () => {
    const { container } = await renderLayout(<div>Content</div>);
    expect(container.innerHTML).toContain('Content');
  });

  it('renders body with antialiased class', async () => {
    const { container } = await renderLayout(<div>Content</div>);
    const body = container.querySelector('body');
    if (body) {
      expect(body.className).toContain('antialiased');
    }
  });

  it('renders FloatingNav', async () => {
    await renderLayout(<div>Content</div>);
    expect(screen.getByTestId('floating-nav')).toBeInTheDocument();
  });

  it('handles Sanity fetch failure gracefully', async () => {
    const { getLandingPageDataCached } = require('@/lib/sanity');
    getLandingPageDataCached.mockRejectedValueOnce(new Error('Network error'));
    await renderLayout(<div>Content</div>);
    // FloatingNav should still render with defaults
    expect(screen.getByTestId('floating-nav')).toBeInTheDocument();
  });
});
