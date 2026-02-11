import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingSection from '@/components/BookingSection';
import type { LandingPageData } from '@/lib/sanity';

// Mock CalendarScheduler component
jest.mock('@/components/CalendarScheduler', () => ({
  __esModule: true,
  default: () => <div data-testid="calendar-scheduler">Calendar Scheduler Mock</div>,
}));

describe('BookingSection', () => {
  it('renders booking section', () => {
    render(<BookingSection />);
    expect(screen.getByText(/schedule/i) || screen.getByText(/booking/i) || screen.getByText(/consultation/i)).toBeTruthy();
  });

  it('contains booking information', () => {
    render(<BookingSection />);
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    const { container } = render(<BookingSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('renders when called with no arguments (default param)', () => {
    const element = BookingSection();
    const { container } = render(element as React.ReactElement);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  // Sanity data tests
  describe('with Sanity data', () => {
    it('renders custom title from Sanity', () => {
      const data = {
        bookingTitle: 'Custom Booking Title',
      } as unknown as LandingPageData;
      render(<BookingSection data={data} />);
      expect(screen.getByText('Custom Booking Title')).toBeInTheDocument();
    });

    it('renders custom description from Sanity', () => {
      const data = {
        bookingDescription: 'Custom booking description text',
      } as unknown as LandingPageData;
      render(<BookingSection data={data} />);
      expect(screen.getByText('Custom booking description text')).toBeInTheDocument();
    });

    it('renders both custom title and description', () => {
      const data = {
        bookingTitle: 'Sanity Title',
        bookingDescription: 'Sanity Description',
      } as unknown as LandingPageData;
      render(<BookingSection data={data} />);
      expect(screen.getByText('Sanity Title')).toBeInTheDocument();
      expect(screen.getByText('Sanity Description')).toBeInTheDocument();
    });

    it('falls back to defaults when data is null', () => {
      render(<BookingSection data={null} />);
      expect(screen.getByText(/Schedule a Meeting/i)).toBeInTheDocument();
    });
  });
});
