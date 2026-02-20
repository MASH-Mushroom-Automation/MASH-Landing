import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeaturesSection from '@/components/FeaturesSection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('FeaturesSection', () => {
  it('renders the showcase heading', () => {
    render(<FeaturesSection />);
    expect(screen.getByText(/Revolutionize your mushroom cultivation/i)).toBeInTheDocument();
  });

  it('renders showcase features list', () => {
    render(<FeaturesSection />);
    expect(screen.getByText(/Optimize your growing environment/i)).toBeInTheDocument();
    expect(screen.getByText(/Track your cultivation metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/Automate your daily operations/i)).toBeInTheDocument();
  });

  it('renders the features grid heading', () => {
    render(<FeaturesSection />);
    expect(screen.getByText('Take control of your cultivation')).toBeInTheDocument();
  });

  it('renders all 6 feature cards', () => {
    render(<FeaturesSection />);
    expect(screen.getByText('Climate Control')).toBeInTheDocument();
    expect(screen.getByText('Real-time Analytics')).toBeInTheDocument();
    expect(screen.getByText('Multi-chamber Support')).toBeInTheDocument();
    expect(screen.getByText('Alert System')).toBeInTheDocument();
    expect(screen.getByText('Remote Access')).toBeInTheDocument();
    expect(screen.getByText('Recipe Management')).toBeInTheDocument();
  });

  it('renders dashboard readings', () => {
    render(<FeaturesSection />);
    // Dashboard readings in the showcase mockup
    expect(screen.getByText('MASH Dashboard')).toBeInTheDocument();
  });

  it('has features section id', () => {
    const { container } = render(<FeaturesSection />);
    expect(container.querySelector('#features')).toBeInTheDocument();
  });

  it('renders with custom data', () => {
    render(
      <FeaturesSection
        data={{
          featuresTitle: 'Custom Features',
          featuresSubtitle: 'Custom subtitle',
        }}
      />
    );
    expect(screen.getByText('Custom Features')).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
  });

  it('falls back to default icon for unknown icon key', () => {
    render(
      <FeaturesSection
        data={{
          features: [
            { title: 'Unknown Feature', description: 'Has unknown icon', icon: 'nonexistent-icon' },
          ],
        }}
      />
    );
    // Should still render without error (fallback to climate-control icon)
    expect(screen.getByText('Unknown Feature')).toBeInTheDocument();
  });
});
