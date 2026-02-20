import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrivacyPage from '@/app/privacy/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/privacy',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('PrivacyPage', () => {
  it('renders heading', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
  });

  it('renders last updated date', () => {
    render(<PrivacyPage />);
    expect(screen.getByText('Last updated: January 1, 2026')).toBeInTheDocument();
  });

  it('renders table of contents', () => {
    render(<PrivacyPage />);
    expect(screen.getByText('Table of Contents')).toBeInTheDocument();
  });

  it('renders key sections in TOC', () => {
    render(<PrivacyPage />);
    const introLinks = screen.getAllByText('1. Introduction');
    expect(introLinks.length).toBeGreaterThanOrEqual(2); // TOC + heading
    const collectLinks = screen.getAllByText('2. Information We Collect');
    expect(collectLinks.length).toBeGreaterThanOrEqual(2);
    const contactLinks = screen.getAllByText('10. Contact Us');
    expect(contactLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('renders contact information', () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/mash\.mushroom\.automation@gmail\.com/)).toBeInTheDocument();
  });

  it('renders section content about data collection', () => {
    render(<PrivacyPage />);
    expect(screen.getByText('Name and email address')).toBeInTheDocument();
    expect(screen.getByText('Temperature readings')).toBeInTheDocument();
  });

  it('renders TOC anchor links', () => {
    render(<PrivacyPage />);
    const introLinks = screen.getAllByRole('link', { name: '1. Introduction' });
    const tocLink = introLinks.find(l => l.getAttribute('href') === '#introduction');
    expect(tocLink).toBeTruthy();
  });
});
