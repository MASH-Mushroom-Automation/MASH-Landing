import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StepsSection from '@/components/StepsSection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('StepsSection', () => {
  it('renders heading', () => {
    render(<StepsSection />);
    expect(screen.getByText(/Start Growing Smarter in 3 Steps/i)).toBeInTheDocument();
  });

  it('renders all 3 steps', () => {
    render(<StepsSection />);
    expect(screen.getByText('Connect Your Hardware')).toBeInTheDocument();
    expect(screen.getByText('Monitor & Analyze')).toBeInTheDocument();
    expect(screen.getByText('Automate & Optimize')).toBeInTheDocument();
  });

  it('renders step numbers', () => {
    render(<StepsSection />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    render(<StepsSection />);
    expect(screen.getByText(/Set up IoT sensors/i)).toBeInTheDocument();
    expect(screen.getByText(/Access your real-time dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Create intelligent automation/i)).toBeInTheDocument();
  });

  it('has how-it-works id', () => {
    const { container } = render(<StepsSection />);
    expect(container.querySelector('#how-it-works')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<StepsSection data={{ stepsTitle: 'Custom Steps Title' }} />);
    expect(screen.getByText('Custom Steps Title')).toBeInTheDocument();
  });
});
