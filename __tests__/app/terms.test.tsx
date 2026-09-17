import React from 'react';
import { render, screen } from '@testing-library/react';
import TermsPage from '@/app/terms/page';

// Mock layout
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);

describe('Terms Page', () => {
  it('renders without crashing', () => {
    render(<TermsPage />);
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders inside PageLayout', () => {
    render(<TermsPage />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('shows last updated date', () => {
    render(<TermsPage />);
    expect(screen.getByText(/Last updated: January 1, 2026/)).toBeInTheDocument();
  });

  it('displays all sections', () => {
    render(<TermsPage />);
    expect(screen.getByText('1. Agreement to Terms')).toBeInTheDocument();
    expect(screen.getByText('2. Description of Service')).toBeInTheDocument();
    expect(screen.getByText('3. User Accounts')).toBeInTheDocument();
    expect(screen.getByText('4. Acceptable Use')).toBeInTheDocument();
    expect(screen.getByText('15. Contact Us')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<TermsPage />);
    expect(screen.getByText(/mash.mushroom.automation@gmail.com/)).toBeInTheDocument();
  });
});
