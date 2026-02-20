import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TermsPage from '@/app/terms/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/terms',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('TermsPage', () => {
  it('renders heading', () => {
    render(<TermsPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Service' })).toBeInTheDocument();
  });

  it('renders last updated date', () => {
    render(<TermsPage />);
    expect(screen.getByText('Last updated: January 1, 2026')).toBeInTheDocument();
  });

  it('renders table of contents', () => {
    render(<TermsPage />);
    expect(screen.getByText('Table of Contents')).toBeInTheDocument();
  });

  it('renders key sections in TOC', () => {
    render(<TermsPage />);
    const agreementLinks = screen.getAllByText('1. Agreement to Terms');
    expect(agreementLinks.length).toBeGreaterThanOrEqual(2);
    const ipLinks = screen.getAllByText('5. Intellectual Property');
    expect(ipLinks.length).toBeGreaterThanOrEqual(2);
    const contactLinks = screen.getAllByText('15. Contact Us');
    expect(contactLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('renders contact information', () => {
    render(<TermsPage />);
    expect(screen.getByText(/mash\.mushroom\.automation@gmail\.com/)).toBeInTheDocument();
  });

  it('renders section content', () => {
    render(<TermsPage />);
    expect(screen.getByText(/mushroom cultivation automation platform/)).toBeInTheDocument();
  });

  it('renders TOC anchor links', () => {
    render(<TermsPage />);
    const agreementLinks = screen.getAllByRole('link', { name: '1. Agreement to Terms' });
    const tocLink = agreementLinks.find(l => l.getAttribute('href') === '#agreement');
    expect(tocLink).toBeTruthy();
  });
});
