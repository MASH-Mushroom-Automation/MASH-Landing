import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusPage, { StatusIndicator } from '@/app/status/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/status',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('StatusPage', () => {
  it('renders heading when all systems operational', () => {
    render(<StatusPage />);
    expect(screen.getByText('All Systems Operational')).toBeInTheDocument();
  });

  it('renders service status section', () => {
    render(<StatusPage />);
    expect(screen.getByText('Service Status')).toBeInTheDocument();
  });

  it('renders all 6 services', () => {
    render(<StatusPage />);
    expect(screen.getByText('Cloud API')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Backend')).toBeInTheDocument();
    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    expect(screen.getByText('Data Storage')).toBeInTheDocument();
    expect(screen.getByText('Authentication')).toBeInTheDocument();
    expect(screen.getByText('WebSocket Server')).toBeInTheDocument();
  });

  it('renders operational indicators', () => {
    render(<StatusPage />);
    const indicators = screen.getAllByText('Operational');
    expect(indicators.length).toBe(6);
  });

  it('renders 90-day uptime section', () => {
    render(<StatusPage />);
    expect(screen.getByText('90-Day Uptime')).toBeInTheDocument();
    expect(screen.getByText('90 days ago')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('renders recent incidents', () => {
    render(<StatusPage />);
    expect(screen.getByText('Recent Incidents')).toBeInTheDocument();
    expect(screen.getByText('Scheduled Maintenance Complete')).toBeInTheDocument();
    expect(screen.getByText('Push Notification Delays')).toBeInTheDocument();
    expect(screen.getByText('API Performance Improvement')).toBeInTheDocument();
  });

  it('renders subscribe section', () => {
    render(<StatusPage />);
    expect(screen.getByText('Get Status Updates')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('renders uptime percentages for services', () => {
    render(<StatusPage />);
    // Check that uptime is displayed (hidden on mobile, visible on sm+)
    const uptimeTexts = screen.getAllByText(/99\.\d+% uptime/);
    expect(uptimeTexts.length).toBeGreaterThan(0);
  });

  it('renders resolved badges for incidents', () => {
    render(<StatusPage />);
    const resolvedBadges = screen.getAllByText('Resolved');
    expect(resolvedBadges.length).toBe(3);
  });

  it('renders incident dates', () => {
    render(<StatusPage />);
    expect(screen.getByText('2026-01-15')).toBeInTheDocument();
    expect(screen.getByText('2026-01-10')).toBeInTheDocument();
    expect(screen.getByText('2026-01-05')).toBeInTheDocument();
  });
});

describe('StatusIndicator', () => {
  it('renders operational status with green styling', () => {
    render(<StatusIndicator status="operational" />);
    expect(screen.getByText('Operational')).toBeInTheDocument();
    const badge = screen.getByText('Operational').closest('span');
    expect(badge?.className).toContain('bg-green-500/10');
  });

  it('renders degraded status with yellow styling', () => {
    render(<StatusIndicator status="degraded" />);
    expect(screen.getByText('Degraded')).toBeInTheDocument();
    const badge = screen.getByText('Degraded').closest('span');
    expect(badge?.className).toContain('bg-yellow-500/10');
  });

  it('renders degraded dot with yellow background', () => {
    const { container } = render(<StatusIndicator status="degraded" />);
    const dot = container.querySelector('.bg-yellow-500');
    expect(dot).toBeInTheDocument();
  });

  it('renders operational dot with green background', () => {
    const { container } = render(<StatusIndicator status="operational" />);
    const dot = container.querySelector('.bg-green-500');
    expect(dot).toBeInTheDocument();
  });
});

describe('StatusPage with degraded service', () => {
  const degradedServices = [
    { name: 'Test API', status: 'degraded', description: 'Test service', uptime: '95.0%' },
  ];

  it('renders "Some Systems Affected" when a service is degraded', () => {
    render(<StatusPage testServices={degradedServices} />);
    expect(screen.getByText('Some Systems Affected')).toBeInTheDocument();
  });

  it('renders Activity icon when not all operational', () => {
    const { container } = render(<StatusPage testServices={degradedServices} />);
    // Activity icon is rendered instead of CheckCircle
    expect(screen.getByText('Some Systems Affected')).toBeInTheDocument();
    // Yellow background on hero icon container
    const iconContainer = container.querySelector('.bg-yellow-500\\/10');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders Degraded indicator for non-operational service', () => {
    render(<StatusPage testServices={degradedServices} />);
    expect(screen.getByText('Degraded')).toBeInTheDocument();
  });
});
