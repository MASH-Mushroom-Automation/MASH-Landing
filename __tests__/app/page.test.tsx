import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock Sanity getLandingPageDataCached
jest.mock('@/lib/sanity', () => ({
  getLandingPageDataCached: jest.fn().mockResolvedValue(null),
}));

// Mock all section components (Navigation removed — handled by layout FloatingNav)
jest.mock('@/components/HeroSection', () => () => <section data-testid="hero">Hero</section>);
jest.mock('@/components/FeaturesSection', () => () => <section data-testid="features">Features</section>);
jest.mock('@/components/MobileAppShowcase', () => () => <section data-testid="mobile-app">MobileApp</section>);
jest.mock('@/components/IoTDeviceSection', () => () => <section data-testid="iot-device">IoTDevice</section>);
jest.mock('@/components/BookingSection', () => () => <section data-testid="booking">Booking</section>);
jest.mock('@/components/DownloadSection', () => () => <section data-testid="download">Download</section>);
jest.mock('@/components/MiniCTA', () => () => <section data-testid="mini-cta">MiniCTA</section>);
jest.mock('@/components/Footer', () => () => <footer data-testid="footer">Footer</footer>);

// Helper to render async Server Component
async function renderHome() {
  const jsx = await Home();
  return render(jsx);
}

describe('Home Page', () => {
  it('renders without crashing', async () => {
    await renderHome();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
  });

  it('renders all section components', async () => {
    await renderHome();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-app')).toBeInTheDocument();
    expect(screen.getByTestId('iot-device')).toBeInTheDocument();
    expect(screen.getByTestId('booking')).toBeInTheDocument();
    expect(screen.getByTestId('download')).toBeInTheDocument();
    expect(screen.getByTestId('mini-cta')).toBeInTheDocument();
  });

  it('renders footer', async () => {
    await renderHome();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders main content area with id', async () => {
    await renderHome();
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main.id).toBe('main-content');
  });

  it('has min-h-screen wrapper', async () => {
    const { container } = await renderHome();
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('min-h-screen');
  });

  it('does not render inline Navigation (handled by layout)', async () => {
    const { container } = await renderHome();
    // Navigation is no longer rendered inside page.tsx
    expect(container.querySelector('[data-testid="navigation"]')).toBeNull();
  });
});

