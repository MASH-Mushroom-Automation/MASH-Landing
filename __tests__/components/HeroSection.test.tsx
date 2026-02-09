import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';

// Mock Sanity - HeroSection imports getSanityFileUrl
jest.mock('@/lib/sanity', () => ({
  getSanityFileUrl: jest.fn((asset) => `https://cdn.sanity.io/files/test-project/production/${asset._ref}`),
  sanityClient: {},
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
    const monitoringTexts = screen.queryAllByText(/Real-time Monitoring/i);
    expect(monitoringTexts.length).toBeGreaterThan(0);
  });

  it('renders Mobile Control card', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Mobile Control/i)).toBeInTheDocument();
    expect(screen.getByText(/Control your mushroom farm/i)).toBeInTheDocument();
  });

  it('renders Automated Control card', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Automated Control/i)).toBeInTheDocument();
    expect(screen.getByText(/Intelligent automation/i)).toBeInTheDocument();
  });

  it('shows fallback background when no video asset configured', () => {
    // DEFAULT_HERO_VIDEO_ASSET is null, so no video should render
    const { container } = render(<HeroSection />);
    const videos = container.querySelectorAll('video');
    expect(videos.length).toBe(0);
    // Fallback div should be present
    const fallbackDivs = container.querySelectorAll('.bg-hero');
    expect(fallbackDivs.length).toBeGreaterThan(0);
  });

  it('respects prefers-reduced-motion', () => {
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
    expect(videos.length).toBe(0);
  });

  it('handles mediaQuery change events', () => {
    let changeHandler: ((e: any) => void) | null = null;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event: string, handler: any) => {
          if (event === 'change') changeHandler = handler;
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(<HeroSection />);
    
    // Simulate the media query change
    if (changeHandler) {
      (changeHandler as (e: any) => void)({ matches: true });
    }
    // The handler should have been called without errors
    expect(changeHandler).not.toBeNull();
  });

  it('cleans up mediaQuery listener on unmount', () => {
    const removeEventListener = jest.fn();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener,
        dispatchEvent: jest.fn(),
      })),
    });

    const { unmount } = render(<HeroSection />);
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('has proper section structure', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.className).toContain('min-h-screen');
  });

  it('renders three feature cards total', () => {
    render(<HeroSection />);
    const monitoringTexts = screen.queryAllByText(/Real-time Monitoring/i);
    expect(monitoringTexts.length).toBeGreaterThan(0);
    expect(screen.getByText(/Mobile Control/i)).toBeInTheDocument();
    expect(screen.getByText(/Automated Control/i)).toBeInTheDocument();
  });

  it('renders CTA buttons with correct styling', () => {
    render(<HeroSection />);
    const exploreBtn = screen.getByText(/Explore Features/i);
    expect(exploreBtn.className).toContain('bg-green-600');
    
    const demoBtn = screen.getByText(/Watch Demo/i);
    expect(demoBtn.className).toContain('border-2');
  });
});
