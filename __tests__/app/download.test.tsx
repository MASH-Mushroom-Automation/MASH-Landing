import React from 'react';
import { render, screen } from '@testing-library/react';
import DownloadPage from '@/app/download/page';

// Mock layout and icons
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);
jest.mock('lucide-react', () => ({
  Download: (props: any) => <svg data-testid="download-icon" {...props} />,
  Smartphone: (props: any) => <svg data-testid="smartphone-icon" {...props} />,
  Monitor: (props: any) => <svg data-testid="monitor-icon" {...props} />,
  Apple: (props: any) => <svg data-testid="apple-icon" {...props} />,
  CheckCircle: (props: any) => <svg data-testid="check-icon" {...props} />,
}));

describe('Download Page', () => {
  it('renders without crashing', () => {
    render(<DownloadPage />);
    expect(screen.getByText('Download MASH')).toBeInTheDocument();
  });

  it('renders inside PageLayout', () => {
    render(<DownloadPage />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('shows page description', () => {
    render(<DownloadPage />);
    expect(screen.getByText(/Get the MASH app for your preferred platform/)).toBeInTheDocument();
  });

  it('displays app features', () => {
    render(<DownloadPage />);
    expect(screen.getAllByText('Real-time sensor monitoring').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Remote climate control').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Push notifications for alerts').length).toBeGreaterThan(0);
  });

  it('displays desktop features', () => {
    render(<DownloadPage />);
    expect(screen.getAllByText('Full dashboard experience').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Advanced data analytics').length).toBeGreaterThan(0);
  });
});
