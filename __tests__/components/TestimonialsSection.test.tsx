import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialsSection from '@/components/TestimonialsSection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('TestimonialsSection', () => {
  it('renders heading', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('What Growers Are Saying')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/Trusted by mushroom cultivators/i)).toBeInTheDocument();
  });

  it('renders all 3 testimonials', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.getByText('James Chen')).toBeInTheDocument();
    expect(screen.getByText('Dr. Amara Obi')).toBeInTheDocument();
  });

  it('renders testimonial roles', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/Commercial Grower/i)).toBeInTheDocument();
    expect(screen.getByText(/Operations Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Research Lead/i)).toBeInTheDocument();
  });

  it('renders testimonial quotes', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/MASH transformed our oyster mushroom/i)).toBeInTheDocument();
  });

  it('renders avatar initials', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('MS')).toBeInTheDocument();
    expect(screen.getByText('JC')).toBeInTheDocument();
    expect(screen.getByText('DAO')).toBeInTheDocument();
  });

  it('renders with custom data', () => {
    render(
      <TestimonialsSection
        data={{
          testimonialsTitle: 'Custom Title',
          testimonials: [
            { quote: 'Great product!', name: 'Test User', role: 'Tester' },
          ],
        }}
      />
    );
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
});
