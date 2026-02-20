import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SchedulePage from '@/app/schedule/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

let mockSearchParams = new URLSearchParams();
vi.mock('next/navigation', () => ({
  usePathname: () => '/schedule',
  useSearchParams: () => mockSearchParams,
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.mock('@/components/CalendarScheduler', () => ({
  default: ({ eventType }: { eventType: string }) => (
    <div data-testid="calendar-scheduler">{eventType}</div>
  ),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('SchedulePage', () => {
  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
  });

  it('renders heading', () => {
    render(<SchedulePage />);
    expect(screen.getByText('Schedule a Meeting')).toBeInTheDocument();
  });

  it('renders meeting type selection', () => {
    render(<SchedulePage />);
    expect(screen.getByText('Choose Your Meeting Type')).toBeInTheDocument();
  });

  it('renders all meeting type buttons', () => {
    render(<SchedulePage />);
    expect(screen.getAllByText('15 Minute Quick Call').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('30 Minute Consultation').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('1 Hour Deep Dive').length).toBeGreaterThanOrEqual(1);
  });

  it('renders what to expect section', () => {
    render(<SchedulePage />);
    expect(screen.getByText('What to Expect')).toBeInTheDocument();
    expect(screen.getByText('Instant Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Expert Guidance')).toBeInTheDocument();
    expect(screen.getByText('Flexible Rescheduling')).toBeInTheDocument();
    expect(screen.getByText('Actionable Insights')).toBeInTheDocument();
  });

  it('renders CalendarScheduler component', () => {
    render(<SchedulePage />);
    expect(screen.getByTestId('calendar-scheduler')).toBeInTheDocument();
  });

  it('defaults to 30min meeting type', () => {
    render(<SchedulePage />);
    expect(screen.getByTestId('calendar-scheduler')).toHaveTextContent('30min');
  });

  it('switches meeting type on button click', () => {
    render(<SchedulePage />);
    const quickCallButton = screen.getByText('15m').closest('button');
    if (quickCallButton) fireEvent.click(quickCallButton);
    expect(screen.getByTestId('calendar-scheduler')).toHaveTextContent('15min');
  });

  it('renders contact email link', () => {
    render(<SchedulePage />);
    const emailLink = screen.getByText('mash.mushroom.automation@gmail.com');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:mash.mushroom.automation@gmail.com');
  });

  it('initializes from URL search param with valid type', () => {
    mockSearchParams = new URLSearchParams('type=15min');
    render(<SchedulePage />);
    expect(screen.getByTestId('calendar-scheduler')).toHaveTextContent('15min');
  });

  it('ignores invalid URL search param and defaults to 30min', () => {
    mockSearchParams = new URLSearchParams('type=invalid-type');
    render(<SchedulePage />);
    expect(screen.getByTestId('calendar-scheduler')).toHaveTextContent('30min');
  });

  it('initializes from URL search param with 1-hour-meeting type', () => {
    mockSearchParams = new URLSearchParams('type=1-hour-meeting');
    render(<SchedulePage />);
    expect(screen.getByTestId('calendar-scheduler')).toHaveTextContent('1-hour-meeting');
  });

  it('shows popular badge for consultation option', () => {
    render(<SchedulePage />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });
});
