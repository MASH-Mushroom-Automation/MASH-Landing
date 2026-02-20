import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DocumentationPage from '@/app/documentation/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/documentation',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('DocumentationPage', () => {
  it('renders heading', () => {
    render(<DocumentationPage />);
    // There are multiple "Documentation" texts, get the h1
    const headings = screen.getAllByText('Documentation');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('renders all 6 doc categories', () => {
    render(<DocumentationPage />);
    expect(screen.getByRole('heading', { name: 'Getting Started' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'User Guide' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mobile App' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'API Reference' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Troubleshooting' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Advanced Features' })).toBeInTheDocument();
  });

  it('renders Browse Tutorials link', () => {
    render(<DocumentationPage />);
    const link = screen.getByText('Browse Tutorials');
    expect(link.closest('a')).toHaveAttribute('href', '/documentation/tutorials');
  });

  it('renders Need More Help section', () => {
    render(<DocumentationPage />);
    expect(screen.getByText('Need More Help?')).toBeInTheDocument();
  });

  it('renders Contact Support link', () => {
    render(<DocumentationPage />);
    const link = screen.getByText('Contact Support');
    expect(link.closest('a')).toHaveAttribute('href', '/support');
  });
});
