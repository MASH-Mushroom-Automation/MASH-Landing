import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SchedulePage from '@/app/schedule/page';

// Mock layout and icons
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);
jest.mock('lucide-react', () => ({
  Calendar: (props: any) => <svg data-testid="calendar-icon" {...props} />,
  Clock: (props: any) => <svg data-testid="clock-icon" {...props} />,
  Video: (props: any) => <svg data-testid="video-icon" {...props} />,
  CheckCircle: (props: any) => <svg data-testid="check-icon" {...props} />,
}));

// Mock CalendarScheduler
jest.mock('@/components/CalendarScheduler', () => (props: any) => (
  <div data-testid="calendar-scheduler" data-event-type={props.eventType}>
    Calendar for {props.eventType}
  </div>
));

// Mock next/navigation
const mockGet = jest.fn(() => null);
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: mockGet,
  })),
}));

// Mock cal-config
jest.mock('@/lib/cal-config', () => ({
  calConfig: {
    eventTypes: {
      '15min': { name: 'Quick Chat', duration: '15 min', slug: '15min', description: 'Quick discussion', popular: false },
      '30min': { name: 'Consultation', duration: '30 min', slug: '30min', description: 'Standard meeting', popular: true },
      '1-hour-meeting': { name: 'Deep Dive', duration: '60 min', slug: '1-hour-meeting', description: 'Detailed session', popular: false },
    },
    contactEmail: 'test@example.com',
  },
  getCalLink: jest.fn((type) => `test-user/${type}`),
}));

describe('Schedule Page', () => {
  beforeEach(() => {
    mockGet.mockReturnValue(null);
  });

  it('renders without crashing', () => {
    render(<SchedulePage />);
    expect(screen.getByText('Schedule a Meeting')).toBeInTheDocument();
  });

  it('renders inside PageLayout', () => {
    render(<SchedulePage />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('shows meeting type buttons', () => {
    render(<SchedulePage />);
    expect(screen.getAllByText('15 min').length).toBeGreaterThan(0);
    expect(screen.getAllByText('30 min').length).toBeGreaterThan(0);
    expect(screen.getAllByText('60 min').length).toBeGreaterThan(0);
  });

  it('renders calendar scheduler with default event type', () => {
    render(<SchedulePage />);
    const scheduler = screen.getByTestId('calendar-scheduler');
    expect(scheduler).toHaveAttribute('data-event-type', '30min');
  });

  it('switches meeting type when button is clicked', async () => {
    const user = userEvent.setup();
    render(<SchedulePage />);

    const quickChatButton = screen.getByText('15 min');
    await user.click(quickChatButton);

    const scheduler = screen.getByTestId('calendar-scheduler');
    expect(scheduler).toHaveAttribute('data-event-type', '15min');
  });

  it('shows What to Expect section', () => {
    render(<SchedulePage />);
    expect(screen.getByText('What to Expect')).toBeInTheDocument();
    expect(screen.getByText('Instant Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Expert Guidance')).toBeInTheDocument();
    expect(screen.getByText('Flexible Rescheduling')).toBeInTheDocument();
    expect(screen.getByText('Actionable Insights')).toBeInTheDocument();
  });

  it('shows contact email', () => {
    render(<SchedulePage />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('marks popular meeting type', () => {
    render(<SchedulePage />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('initializes with type from URL search params', () => {
    mockGet.mockReturnValue('15min');
    render(<SchedulePage />);
    const scheduler = screen.getByTestId('calendar-scheduler');
    expect(scheduler).toHaveAttribute('data-event-type', '15min');
  });

  it('ignores invalid type from URL search params', () => {
    mockGet.mockReturnValue('invalid-type');
    render(<SchedulePage />);
    const scheduler = screen.getByTestId('calendar-scheduler');
    expect(scheduler).toHaveAttribute('data-event-type', '30min');
  });
});
