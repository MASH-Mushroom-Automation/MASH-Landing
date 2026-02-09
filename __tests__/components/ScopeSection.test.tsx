import React from 'react';
import { render, screen } from '@testing-library/react';
import ScopeSection from '@/components/ScopeSection';

describe('ScopeSection', () => {
  it('renders scope section', () => {
    render(<ScopeSection />);
    expect(screen.getByText(/scope/i) || screen.getByText(/capabilities/i) || screen.getByText(/architecture/i)).toBeTruthy();
  });

  it('has scope section ID for navigation', () => {
    const { container } = render(<ScopeSection />);
    const section = container.querySelector('#scope');
    expect(section).toBeInTheDocument();
  });

  it('displays scope content', () => {
    const { container } = render(<ScopeSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.textContent).toBeTruthy();
  });
});
