import React from 'react';
import { render, screen } from '@testing-library/react';
import DocumentationSection from '@/components/DocumentationSection';

describe('DocumentationSection', () => {
  it('renders documentation section', () => {
    render(<DocumentationSection />);
    // Use queryAllByText for text that appears multiple times
    const docTexts = screen.queryAllByText(/documentation/i);
    expect(docTexts.length).toBeGreaterThan(0);
  });

  it('contains documentation links or content', () => {
    const { container } = render(<DocumentationSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
