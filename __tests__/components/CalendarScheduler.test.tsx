import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import CalendarScheduler from '@/components/CalendarScheduler';

// Mock cal-config
jest.mock('@/lib/cal-config', () => ({
  getCalLink: jest.fn((eventType) => `test-user/${eventType}`),
}));

describe('CalendarScheduler', () => {
  beforeEach(() => {
    // Reset document.documentElement class
    document.documentElement.classList.remove('dark');
  });

  it('renders the calendar embed container', () => {
    const { container } = render(<CalendarScheduler />);
    const embedContainer = container.querySelector('.cal-embed-container');
    expect(embedContainer).toBeInTheDocument();
  });

  it('shows loading spinner initially', () => {
    render(<CalendarScheduler />);
    expect(screen.getByText('Loading calendar...')).toBeInTheDocument();
  });

  it('renders an iframe', () => {
    const { container } = render(<CalendarScheduler />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it('uses default 30min event type', () => {
    const { container } = render(<CalendarScheduler />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('test-user/30min');
  });

  it('accepts custom event type prop', () => {
    const { container } = render(<CalendarScheduler eventType="15min" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('test-user/15min');
  });

  it('accepts 1-hour-meeting event type', () => {
    const { container } = render(<CalendarScheduler eventType="1-hour-meeting" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('test-user/1-hour-meeting');
  });

  it('sets embed parameter in URL', () => {
    const { container } = render(<CalendarScheduler />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('embed=true');
  });

  it('sets theme parameter in URL', () => {
    const { container } = render(<CalendarScheduler />);
    const iframe = container.querySelector('iframe');
    // Default auto theme resolves to light since dark class is not set
    expect(iframe?.src).toContain('theme=light');
  });

  it('uses dark theme when specified', () => {
    const { container } = render(<CalendarScheduler theme="dark" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('theme=dark');
  });

  it('uses light theme when specified', () => {
    const { container } = render(<CalendarScheduler theme="light" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('theme=light');
  });

  it('detects dark mode in auto theme', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<CalendarScheduler theme="auto" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('theme=dark');
  });

  it('sets layout parameter to month_view by default', () => {
    const { container } = render(<CalendarScheduler />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('layout=month_view');
  });

  it('accepts custom layout prop', () => {
    const { container } = render(<CalendarScheduler layout="week_view" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('layout=week_view');
  });

  it('accepts column_view layout', () => {
    const { container } = render(<CalendarScheduler layout="column_view" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('layout=column_view');
  });

  it('does not include hideEventTypeDetails by default', () => {
    const { container } = render(<CalendarScheduler />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).not.toContain('hideEventTypeDetails');
  });

  it('includes hideEventTypeDetails when set to true', () => {
    const { container } = render(<CalendarScheduler hideEventTypeDetails={true} />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('hideEventTypeDetails=true');
  });

  it('hides loading spinner when iframe loads', () => {
    const { container } = render(<CalendarScheduler />);
    const iframe = container.querySelector('iframe');
    
    // Trigger onLoad
    if (iframe) {
      fireEvent.load(iframe);
    }
    
    expect(screen.queryByText('Loading calendar...')).not.toBeInTheDocument();
  });

  it('has allow="payment" on iframe', () => {
    const { container } = render(<CalendarScheduler />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('allow', 'payment');
  });

  it('has proper min-height styling', () => {
    const { container } = render(<CalendarScheduler />);
    const embedContainer = container.querySelector('.cal-embed-container');
    expect(embedContainer?.className).toContain('min-h-[600px]');
  });

  it('renders loading spinner with animation', () => {
    const { container } = render(<CalendarScheduler />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('responds to theme class changes via MutationObserver', async () => {
    const { container } = render(<CalendarScheduler theme="auto" />);
    
    // Initially light (no dark class)
    let iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('theme=light');
    
    // Add dark class to trigger MutationObserver
    await act(async () => {
      document.documentElement.classList.add('dark');
    });
    
    // Re-check the iframe - it should now have dark theme
    iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('theme=dark');
  });

  it('ignores non-class attribute mutations in MutationObserver', async () => {
    const { container } = render(<CalendarScheduler theme="auto" />);

    let iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('theme=light');

    // Change a non-class attribute - should NOT change the theme
    await act(async () => {
      document.documentElement.setAttribute('data-test', 'value');
    });

    iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('theme=light');
  });

  it('renders with all default props correctly', () => {
    const { container } = render(<CalendarScheduler />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    
    const src = iframe?.src || '';
    expect(src).toContain('cal.com');
    expect(src).toContain('embed=true');
    expect(src).toContain('layout=month_view');
  });

  it('combines multiple custom props', () => {
    const { container } = render(
      <CalendarScheduler 
        eventType="15min" 
        theme="dark" 
        hideEventTypeDetails={true} 
        layout="week_view" 
      />
    );
    const iframe = container.querySelector('iframe');
    const src = iframe?.src || '';
    
    expect(src).toContain('test-user/15min');
    expect(src).toContain('theme=dark');
    expect(src).toContain('hideEventTypeDetails=true');
    expect(src).toContain('layout=week_view');
  });
});
