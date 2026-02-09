import React from 'react';
import { render, screen } from '@testing-library/react';
import SupportSection from '@/components/SupportSection';

describe('SupportSection', () => {
  it('renders support section', () => {
    render(<SupportSection />);
    // Use queryAllByText for text that appears multiple times
    const supportTexts = screen.queryAllByText(/support/i);
    expect(supportTexts.length).toBeGreaterThan(0);
  });

  it('displays support information', () => {
    const { container } = render(<SupportSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.textContent).toBeTruthy();
  });
});
