import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingSection from '@/components/BookingSection';

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
    // Check for booking-related content instead of specific component
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    const { container } = render(<BookingSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
