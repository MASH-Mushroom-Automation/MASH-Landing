import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageLayout from '@/components/layout/PageLayout';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('PageLayout', () => {
  it('renders children', () => {
    render(<PageLayout><div data-testid="child">Hello</div></PageLayout>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders Navigation', () => {
    render(<PageLayout><div>Content</div></PageLayout>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders Footer', () => {
    render(<PageLayout><div>Content</div></PageLayout>);
    expect(screen.getByText(/Copyright 2026 MASH/)).toBeInTheDocument();
  });

  it('wraps content in main element', () => {
    render(<PageLayout><div data-testid="child">Content</div></PageLayout>);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toContainElement(screen.getByTestId('child'));
  });
});
