import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LicensePage from '@/app/license/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/license',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('LicensePage', () => {
  it('renders heading', () => {
    render(<LicensePage />);
    expect(screen.getByRole('heading', { level: 1, name: 'License' })).toBeInTheDocument();
  });

  it('renders MIT License info', () => {
    render(<LicensePage />);
    expect(screen.getByRole('heading', { name: 'MIT License' })).toBeInTheDocument();
  });

  it('renders permitted actions', () => {
    render(<LicensePage />);
    expect(screen.getByText('Permitted')).toBeInTheDocument();
    expect(screen.getByText('Commercial use')).toBeInTheDocument();
    expect(screen.getByText('Modification')).toBeInTheDocument();
    expect(screen.getByText('Distribution')).toBeInTheDocument();
    expect(screen.getByText('Private use')).toBeInTheDocument();
  });

  it('renders conditions', () => {
    render(<LicensePage />);
    expect(screen.getByText('Conditions')).toBeInTheDocument();
    expect(screen.getByText('Include copyright notice')).toBeInTheDocument();
    expect(screen.getByText('Include license text')).toBeInTheDocument();
  });

  it('renders full license text', () => {
    render(<LicensePage />);
    expect(screen.getByText('Full License Text')).toBeInTheDocument();
    expect(screen.getByText(/Copyright \(c\) 2026 MASH/)).toBeInTheDocument();
  });

  it('renders third-party licenses', () => {
    render(<LicensePage />);
    expect(screen.getByText('Third-Party Licenses')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('Lucide Icons')).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    render(<LicensePage />);
    expect(screen.getByText('View on GitHub')).toBeInTheDocument();
  });

  it('renders related page links', () => {
    render(<LicensePage />);
    const privacyLinks = screen.getAllByText('Privacy Policy');
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1);
    const termsLinks = screen.getAllByText('Terms of Service');
    expect(termsLinks.length).toBeGreaterThanOrEqual(1);
  });
});
