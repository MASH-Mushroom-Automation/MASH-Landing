import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPage from '@/app/privacy/page';

// Mock layout
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);

describe('Privacy Page', () => {
  it('renders without crashing', () => {
    render(<PrivacyPage />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders inside PageLayout', () => {
    render(<PrivacyPage />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('shows last updated date', () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Last updated: January 1, 2026/)).toBeInTheDocument();
  });

  it('displays all sections', () => {
    render(<PrivacyPage />);
    expect(screen.getByText('1. Introduction')).toBeInTheDocument();
    expect(screen.getByText('2. Information We Collect')).toBeInTheDocument();
    expect(screen.getByText('3. How We Use Your Information')).toBeInTheDocument();
    expect(screen.getByText('10. Contact Us')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/mash.mushroom.automation@gmail.com/)).toBeInTheDocument();
  });
});
