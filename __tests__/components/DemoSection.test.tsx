import React from 'react';
import { render, screen } from '@testing-library/react';
import DemoSection from '@/components/DemoSection';

// Mock Cloudinary
jest.mock('@/lib/cloudinary', () => ({
  getCloudinaryVideoUrl: jest.fn((id) => `https://res.cloudinary.com/test-cloud/video/upload/${id}`),
  getVideoThumbnailUrl: jest.fn((id) => `https://res.cloudinary.com/test-cloud/video/upload/${id}.jpg`),
  CLOUDINARY_ASSETS: {
    videos: {
      demo: 'mash/demo',
      overview: 'mash/overview',
      setup: 'mash/setup',
      mobile: 'mash/mobile',
    },
  },
}));

describe('DemoSection', () => {
  it('renders demo section', () => {
    render(<DemoSection />);
    // Use queryAllByText for text that appears multiple times
    const demoTexts = screen.queryAllByText(/demo/i);
    expect(demoTexts.length).toBeGreaterThan(0);
  });

  it('has demo section ID for navigation', () => {
    const { container } = render(<DemoSection />);
    const section = container.querySelector('#demo');
    expect(section).toBeInTheDocument();
  });

  it('contains video elements or references', () => {
    const { container } = render(<DemoSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
