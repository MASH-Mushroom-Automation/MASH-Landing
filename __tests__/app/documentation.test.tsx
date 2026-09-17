import React from 'react';
import { render, screen } from '@testing-library/react';
import DocumentationPage from '@/app/documentation/page';

// Mock layout and icons
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);
jest.mock('lucide-react', () => ({
  BookOpen: (props: any) => <svg data-testid="book-icon" {...props} />,
  Code: (props: any) => <svg data-testid="code-icon" {...props} />,
  Smartphone: (props: any) => <svg data-testid="smartphone-icon" {...props} />,
  Settings: (props: any) => <svg data-testid="settings-icon" {...props} />,
  AlertCircle: (props: any) => <svg data-testid="alert-icon" {...props} />,
  Rocket: (props: any) => <svg data-testid="rocket-icon" {...props} />,
  ChevronRight: (props: any) => <svg data-testid="chevron-icon" {...props} />,
}));

describe('Documentation Page', () => {
  it('renders without crashing', () => {
    render(<DocumentationPage />);
    expect(screen.getByRole('heading', { name: 'Documentation' })).toBeInTheDocument();
  });

  it('renders inside PageLayout', () => {
    render(<DocumentationPage />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('shows page description', () => {
    render(<DocumentationPage />);
    expect(screen.getByText(/Everything you need to know/)).toBeInTheDocument();
  });

  it('displays documentation categories', () => {
    render(<DocumentationPage />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('User Guide')).toBeInTheDocument();
    expect(screen.getByText('Mobile App')).toBeInTheDocument();
    expect(screen.getAllByText('API Reference').length).toBeGreaterThan(0);
    expect(screen.getByText('Troubleshooting')).toBeInTheDocument();
    expect(screen.getByText('Advanced Features')).toBeInTheDocument();
  });

  it('shows article links', () => {
    render(<DocumentationPage />);
    expect(screen.getByText('System Requirements')).toBeInTheDocument();
    expect(screen.getByText('Hardware Setup')).toBeInTheDocument();
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
    expect(screen.getByText('REST API')).toBeInTheDocument();
  });

  it('shows Browse Tutorials link', () => {
    render(<DocumentationPage />);
    expect(screen.getByText('Browse Tutorials')).toBeInTheDocument();
  });

  it('shows Need More Help section', () => {
    render(<DocumentationPage />);
    expect(screen.getByText('Need More Help?')).toBeInTheDocument();
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
    expect(screen.getByText('Join Community')).toBeInTheDocument();
  });
});
