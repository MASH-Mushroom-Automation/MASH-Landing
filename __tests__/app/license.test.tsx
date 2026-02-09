import React from 'react';
import { render, screen } from '@testing-library/react';
import LicensePage from '@/app/license/page';

// Mock layout and icons
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);
jest.mock('lucide-react', () => ({
  Scale: (props: any) => <svg data-testid="scale-icon" {...props} />,
  FileText: (props: any) => <svg data-testid="file-icon" {...props} />,
  Github: (props: any) => <svg data-testid="github-icon" {...props} />,
}));

describe('License Page', () => {
  it('renders without crashing', () => {
    render(<LicensePage />);
    expect(screen.getByRole('heading', { name: 'License' })).toBeInTheDocument();
  });

  it('renders inside PageLayout', () => {
    render(<LicensePage />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('displays MIT License heading', () => {
    render(<LicensePage />);
    const mitElements = screen.getAllByText('MIT License');
    expect(mitElements.length).toBeGreaterThan(0);
  });

  it('shows permitted actions', () => {
    render(<LicensePage />);
    expect(screen.getByText(/Commercial use/)).toBeInTheDocument();
    expect(screen.getByText(/Modification/)).toBeInTheDocument();
    expect(screen.getByText(/Distribution/)).toBeInTheDocument();
  });

  it('shows license conditions', () => {
    render(<LicensePage />);
    expect(screen.getByText(/Include copyright notice/)).toBeInTheDocument();
    expect(screen.getByText(/Include license text/)).toBeInTheDocument();
  });

  it('displays full license text', () => {
    render(<LicensePage />);
    expect(screen.getByText(/Permission is hereby granted/)).toBeInTheDocument();
  });

  it('lists third-party libraries', () => {
    render(<LicensePage />);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  it('shows GitHub link', () => {
    render(<LicensePage />);
    expect(screen.getByText('View on GitHub')).toBeInTheDocument();
  });

  it('links to privacy and terms pages', () => {
    render(<LicensePage />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });
});
