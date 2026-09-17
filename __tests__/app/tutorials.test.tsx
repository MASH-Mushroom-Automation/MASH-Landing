import React from 'react';
import { render, screen } from '@testing-library/react';
import TutorialsPage from '@/app/documentation/tutorials/page';

// Mock layout and icons
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);
jest.mock('lucide-react', () => ({
  Clock: (props: any) => <svg data-testid="clock-icon" {...props} />,
  Tag: (props: any) => <svg data-testid="tag-icon" {...props} />,
  ChevronRight: (props: any) => <svg data-testid="chevron-icon" {...props} />,
  BookOpen: (props: any) => <svg data-testid="book-icon" {...props} />,
}));

describe('Tutorials Page', () => {
  it('renders without crashing', () => {
    render(<TutorialsPage />);
    expect(screen.getByText('Tutorials & Guides')).toBeInTheDocument();
  });

  it('renders inside PageLayout', () => {
    render(<TutorialsPage />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('shows breadcrumb navigation', () => {
    render(<TutorialsPage />);
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Tutorials')).toBeInTheDocument();
  });

  it('displays all tutorials', () => {
    render(<TutorialsPage />);
    expect(screen.getByText('Complete Getting Started Guide')).toBeInTheDocument();
    expect(screen.getByText('Setting Up Temperature & Humidity Sensors')).toBeInTheDocument();
    expect(screen.getByText('Creating Climate Automation Rules')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Configuration')).toBeInTheDocument();
    expect(screen.getByText('Creating Custom Growing Recipes')).toBeInTheDocument();
    expect(screen.getByText('Analyzing Your Growing Data')).toBeInTheDocument();
    expect(screen.getByText('Configuring Alert Notifications')).toBeInTheDocument();
    expect(screen.getByText('Integrating with Third-Party Systems')).toBeInTheDocument();
  });

  it('shows difficulty badges', () => {
    render(<TutorialsPage />);
    const beginnerBadges = screen.getAllByText('Beginner');
    expect(beginnerBadges.length).toBeGreaterThan(0);
    const intermediateBadges = screen.getAllByText('Intermediate');
    expect(intermediateBadges.length).toBeGreaterThan(0);
    const advancedBadges = screen.getAllByText('Advanced');
    expect(advancedBadges.length).toBeGreaterThan(0);
  });

  it('shows read time for tutorials', () => {
    render(<TutorialsPage />);
    expect(screen.getAllByText('15 min').length).toBeGreaterThan(0);
    expect(screen.getAllByText('10 min').length).toBeGreaterThan(0);
  });

  it('shows category filter buttons', () => {
    render(<TutorialsPage />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getAllByText('Hardware').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Automation').length).toBeGreaterThan(0);
  });

  it('shows contribute section', () => {
    render(<TutorialsPage />);
    expect(screen.getByText(/Want to contribute/)).toBeInTheDocument();
    expect(screen.getByText('Contribute on GitHub')).toBeInTheDocument();
  });
});
