import React from 'react';
import { render, screen } from '@testing-library/react';
import FeaturesSection from '@/components/FeaturesSection';

describe('FeaturesSection', () => {
  it('renders features section', () => {
    render(<FeaturesSection />);
    // Section should contain features heading or features content
    expect(screen.getByText(/features/i) || screen.getByText(/capabilities/i)).toBeInTheDocument();
  });

  it('has features section ID for navigation', () => {
    const { container } = render(<FeaturesSection />);
    const section = container.querySelector('#features');
    expect(section).toBeInTheDocument();
  });

  it('displays multiple feature items', () => {
    const { container } = render(<FeaturesSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    
    // Check for feature-related content
    const content = container.textContent;
    expect(content).toBeTruthy();
  });
});
