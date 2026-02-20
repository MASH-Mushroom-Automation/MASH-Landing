import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('HeroSection', () => {
  it('renders heading text', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Smart Mushroom Cultivation Platform/i);
  });

  it('renders IoT badge', () => {
    render(<HeroSection />);
    expect(screen.getByText('IoT-Powered Cultivation')).toBeInTheDocument();
  });

  it('renders CTA buttons with correct hrefs', () => {
    render(<HeroSection />);
    const getStarted = screen.getByText('Get Started');
    expect(getStarted.closest('a')).toHaveAttribute('href', '#features');
    const learnMore = screen.getByText('Learn More');
    expect(learnMore.closest('a')).toHaveAttribute('href', '#how-it-works');
  });

  it('renders subtitle text', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Advanced IoT automation/i)).toBeInTheDocument();
  });

  it('renders dashboard metrics', () => {
    render(<HeroSection />);
    expect(screen.getByText('24.5°C')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('800 ppm')).toBeInTheDocument();
    expect(screen.getByText('450 lux')).toBeInTheDocument();
  });

  it('renders Live Dashboard label', () => {
    render(<HeroSection />);
    expect(screen.getByText('Live Dashboard')).toBeInTheDocument();
  });

  it('uses custom data when provided', () => {
    render(
      <HeroSection
        data={{
          heroTitle: 'Custom Title',
          heroSubtitle: 'Custom subtitle',
          heroButtons: [{ text: 'Custom CTA', href: '/test', variant: 'default' }],
        }}
      />
    );
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
    expect(screen.getByText('Custom CTA')).toBeInTheDocument();
  });
});
