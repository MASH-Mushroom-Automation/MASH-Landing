import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DocumentationSection from '@/components/DocumentationSection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('DocumentationSection', () => {
  it('renders heading', () => {
    render(<DocumentationSection />);
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });

  it('renders all 6 doc categories', () => {
    render(<DocumentationSection />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('User Guide')).toBeInTheDocument();
    expect(screen.getByText('Mobile App')).toBeInTheDocument();
    expect(screen.getByText('API Reference')).toBeInTheDocument();
    expect(screen.getByText('Troubleshooting')).toBeInTheDocument();
    expect(screen.getByText('Advanced Features')).toBeInTheDocument();
  });

  it('renders View Full Documentation link', () => {
    render(<DocumentationSection />);
    const link = screen.getByText('View Full Documentation');
    expect(link.closest('a')).toHaveAttribute('href', '/documentation');
  });

  it('has documentation section id', () => {
    const { container } = render(<DocumentationSection />);
    expect(container.querySelector('#documentation')).toBeInTheDocument();
  });

  it('renders category links', () => {
    render(<DocumentationSection />);
    expect(screen.getByText('System Requirements')).toBeInTheDocument();
    expect(screen.getByText('REST API')).toBeInTheDocument();
  });
});
