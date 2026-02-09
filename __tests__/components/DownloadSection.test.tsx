import React from 'react';
import { render, screen } from '@testing-library/react';
import DownloadSection from '@/components/DownloadSection';

describe('DownloadSection', () => {
  it('renders download section', () => {
    render(<DownloadSection />);
    // Use getAllByText for text that appears multiple times
    const downloadTexts = screen.queryAllByText(/download/i);
    expect(downloadTexts.length).toBeGreaterThan(0);
  });

  it('contains download information', () => {
    const { container } = render(<DownloadSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
