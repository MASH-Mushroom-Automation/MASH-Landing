import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock Sanity CMS
jest.mock('@/lib/sanity', () => ({
  getLandingPageData: jest.fn().mockResolvedValue({
    iotDeviceModel: {
      asset: { _ref: 'file-abc123-glb', _type: 'reference' },
    },
  }),
  getSanityFileUrl: jest.fn((asset) => `https://cdn.sanity.io/files/test/production/${asset._ref.split('-')[1]}.glb`),
}));

// Mock all section components
jest.mock('@/components/Navigation', () => () => <nav data-testid="navigation">Navigation</nav>);
jest.mock('@/components/HeroSection', () => () => <section data-testid="hero">Hero</section>);
jest.mock('@/components/FeaturesSection', () => () => <section data-testid="features">Features</section>);
jest.mock('@/components/MobileAppShowcase', () => () => <section data-testid="mobile-app">MobileApp</section>);
jest.mock('@/components/IoTDeviceSection', () => {
  return function MockIoTDevice(props: { modelUrl?: string }) {
    return <section data-testid="iot-device" data-model-url={props.modelUrl || ''}>IoTDevice</section>;
  };
});
jest.mock('@/components/DemoSection', () => () => <section data-testid="demo">Demo</section>);
jest.mock('@/components/DocumentationSection', () => () => <section data-testid="documentation">Documentation</section>);
jest.mock('@/components/ScopeSection', () => () => <section data-testid="scope">Scope</section>);
jest.mock('@/components/BookingSection', () => () => <section data-testid="booking">Booking</section>);
jest.mock('@/components/SupportSection', () => () => <section data-testid="support">Support</section>);
jest.mock('@/components/DownloadSection', () => () => <section data-testid="download">Download</section>);
jest.mock('@/components/Footer', () => () => <footer data-testid="footer">Footer</footer>);

describe('Home Page', () => {
  it('renders without crashing', async () => {
    const page = await Home();
    render(page);
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('renders all section components', async () => {
    const page = await Home();
    render(page);
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-app')).toBeInTheDocument();
    expect(screen.getByTestId('iot-device')).toBeInTheDocument();
    expect(screen.getByTestId('demo')).toBeInTheDocument();
    expect(screen.getByTestId('documentation')).toBeInTheDocument();
    expect(screen.getByTestId('scope')).toBeInTheDocument();
    expect(screen.getByTestId('booking')).toBeInTheDocument();
    expect(screen.getByTestId('support')).toBeInTheDocument();
    expect(screen.getByTestId('download')).toBeInTheDocument();
  });

  it('renders footer', async () => {
    const page = await Home();
    render(page);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders main content area', async () => {
    const page = await Home();
    render(page);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('has min-h-screen wrapper', async () => {
    const page = await Home();
    const { container } = render(page);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('min-h-screen');
  });

  it('passes Sanity 3D model URL to IoTDeviceSection', async () => {
    const page = await Home();
    render(page);
    const iotSection = screen.getByTestId('iot-device');
    expect(iotSection.getAttribute('data-model-url')).toContain('cdn.sanity.io');
  });

  it('handles Sanity fetch failure gracefully', async () => {
    const sanity = require('@/lib/sanity');
    sanity.getLandingPageData.mockRejectedValueOnce(new Error('Network error'));

    const page = await Home();
    render(page);
    // IoTDeviceSection should still render with empty modelUrl (falls back to local)
    const iotSection = screen.getByTestId('iot-device');
    expect(iotSection.getAttribute('data-model-url')).toBe('');
  });

  it('handles missing iotDeviceModel gracefully', async () => {
    const sanity = require('@/lib/sanity');
    sanity.getLandingPageData.mockResolvedValueOnce({ heroTitle: 'Test' });

    const page = await Home();
    render(page);
    const iotSection = screen.getByTestId('iot-device');
    expect(iotSection.getAttribute('data-model-url')).toBe('');
  });
});
