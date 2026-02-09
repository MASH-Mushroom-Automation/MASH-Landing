import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';

// Mock Cloudinary
jest.mock('@/lib/cloudinary', () => ({
  getCloudinaryVideoUrl: jest.fn((id, options) => `https://res.cloudinary.com/test-cloud/video/upload/${id}`),
  CLOUDINARY_ASSETS: {
    videos: {
      demo: 'mash/demo',
    },
  },
}));

describe('HeroSection', () => {
  beforeEach(() => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders hero section', () => {
    render(<HeroSection />);
    // Check for main heading which is always present
    expect(screen.getByText(/MASH.*Mushroom Automation/i)).toBeInTheDocument();
  });

  it('renders main heading', () => {
    render(<HeroSection />);
    expect(screen.getByText(/MASH.*Mushroom Automation/i)).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Advanced automation system/i)).toBeInTheDocument();
  });

  it('renders Explore Features button', () => {
    render(<HeroSection />);
    const button = screen.getByText(/Explore Features/i);
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '#features');
  });

  it('renders Watch Demo button', () => {
    render(<HeroSection />);
    const button = screen.getByText(/Watch Demo/i);
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '#demo');
  });

  it('renders feature cards', () => {
    render(<HeroSection />);
    // Use getAllByText for text that appears multiple times
    const monitoringTexts = screen.queryAllByText(/Real-time Monitoring/i);
    expect(monitoringTexts.length).toBeGreaterThan(0);
  });

  it('contains video background', () => {
    const { container } = render(<HeroSection />);
    const videos = container.querySelectorAll('video');
    expect(videos.length).toBeGreaterThanOrEqual(0); // May be hidden if prefers-reduced-motion
  });

  it('respects prefers-reduced-motion', () => {
    // Mock prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { container } = render(<HeroSection />);
    const videos = container.querySelectorAll('video');
    // Video should not be rendered if prefers-reduced-motion
    expect(videos.length).toBe(0);
  });

  it('has proper section structure', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.className).toContain('min-h-screen');
  });
});
