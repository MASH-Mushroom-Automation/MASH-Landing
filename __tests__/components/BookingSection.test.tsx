import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BookingSection from '@/components/BookingSection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('BookingSection', () => {
  it('renders heading', () => {
    render(<BookingSection />);
    expect(screen.getByText('Schedule a Consultation')).toBeInTheDocument();
  });

  it('renders Free Consultations badge', () => {
    render(<BookingSection />);
    expect(screen.getByText('Free Consultations')).toBeInTheDocument();
  });

  it('renders all 3 plan cards', () => {
    render(<BookingSection />);
    expect(screen.getByText('Quick Call')).toBeInTheDocument();
    expect(screen.getByText('Consultation')).toBeInTheDocument();
    expect(screen.getByText('Deep Dive')).toBeInTheDocument();
  });

  it('shows Popular badge on Consultation', () => {
    render(<BookingSection />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('renders Free price on all cards', () => {
    render(<BookingSection />);
    const freeLabels = screen.getAllByText('Free');
    expect(freeLabels.length).toBe(3);
  });

  it('renders Book Now links', () => {
    render(<BookingSection />);
    const bookLinks = screen.getAllByText('Book Now');
    expect(bookLinks).toHaveLength(3);
  });

  it('links to correct schedule pages', () => {
    render(<BookingSection />);
    const links = screen.getAllByText('Book Now');
    expect(links[0].closest('a')).toHaveAttribute('href', '/schedule?type=15min');
    expect(links[1].closest('a')).toHaveAttribute('href', '/schedule?type=30min');
    expect(links[2].closest('a')).toHaveAttribute('href', '/schedule?type=1-hour-meeting');
  });

  it('has schedule section id', () => {
    const { container } = render(<BookingSection />);
    expect(container.querySelector('#schedule')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<BookingSection data={{ bookingTitle: 'Custom Booking' }} />);
    expect(screen.getByText('Custom Booking')).toBeInTheDocument();
  });
});
