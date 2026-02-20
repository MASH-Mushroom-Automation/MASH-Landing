import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScopeSection from '@/components/ScopeSection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('ScopeSection', () => {
  it('renders heading', () => {
    render(<ScopeSection />);
    expect(screen.getByText('Project Scope & Capabilities')).toBeInTheDocument();
  });

  it('renders all 6 scope categories', () => {
    render(<ScopeSection />);
    expect(screen.getByText('Hardware Components')).toBeInTheDocument();
    expect(screen.getByText('Software Capabilities')).toBeInTheDocument();
    expect(screen.getByText('Automation Features')).toBeInTheDocument();
    expect(screen.getByText('Monitoring & Analytics')).toBeInTheDocument();
    expect(screen.getByText('Integration Options')).toBeInTheDocument();
    expect(screen.getByText('Scalability')).toBeInTheDocument();
  });

  it('renders system architecture section', () => {
    render(<ScopeSection />);
    expect(screen.getByText('System Architecture')).toBeInTheDocument();
    expect(screen.getByText('Layer 1')).toBeInTheDocument();
    expect(screen.getByText('Layer 4')).toBeInTheDocument();
  });

  it('has scope section id', () => {
    const { container } = render(<ScopeSection />);
    expect(container.querySelector('#scope')).toBeInTheDocument();
  });

  it('renders scope items', () => {
    render(<ScopeSection />);
    expect(screen.getByText(/Industrial-grade sensors/i)).toBeInTheDocument();
    expect(screen.getByText(/REST API for third-party/i)).toBeInTheDocument();
  });
});
