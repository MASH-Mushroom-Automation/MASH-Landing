import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusPage from '@/app/status/page';

// Mock layout and icons
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);
jest.mock('lucide-react', () => ({
  CheckCircle: (props: any) => <svg data-testid="check-icon" {...props} />,
  AlertCircle: (props: any) => <svg data-testid="alert-icon" {...props} />,
  Clock: (props: any) => <svg data-testid="clock-icon" {...props} />,
}));

describe('Status Page', () => {
  it('renders without crashing', () => {
    render(<StatusPage />);
    expect(screen.getByText('All Systems Operational')).toBeInTheDocument();
  });

  it('renders inside PageLayout', () => {
    render(<StatusPage />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('displays all services', () => {
    render(<StatusPage />);
    expect(screen.getByText('Cloud API')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Backend')).toBeInTheDocument();
    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    expect(screen.getByText('Data Storage')).toBeInTheDocument();
    expect(screen.getByText('Authentication')).toBeInTheDocument();
    expect(screen.getByText('WebSocket Server')).toBeInTheDocument();
  });

  it('shows service status badges', () => {
    render(<StatusPage />);
    const operational = screen.getAllByText('Operational');
    expect(operational.length).toBe(6);
  });

  it('shows uptime percentages', () => {
    render(<StatusPage />);
    expect(screen.getAllByText(/99\.9/)).toBeTruthy();
  });

  it('displays recent incidents', () => {
    render(<StatusPage />);
    expect(screen.getByText('Scheduled Maintenance Complete')).toBeInTheDocument();
    expect(screen.getByText('Push Notification Delays')).toBeInTheDocument();
    expect(screen.getByText('API Performance Improvement')).toBeInTheDocument();
  });

  it('shows 90-day uptime section', () => {
    render(<StatusPage />);
    expect(screen.getByText('90-Day Uptime')).toBeInTheDocument();
  });

  it('shows subscribe section', () => {
    render(<StatusPage />);
    expect(screen.getByText('Get Status Updates')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });
});
