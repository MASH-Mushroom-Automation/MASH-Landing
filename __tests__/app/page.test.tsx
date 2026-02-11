import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock all section components
jest.mock('@/components/Navigation', () => () => <nav data-testid="navigation">Navigation</nav>);
jest.mock('@/components/HeroSection', () => () => <section data-testid="hero">Hero</section>);
jest.mock('@/components/FeaturesSection', () => () => <section data-testid="features">Features</section>);
jest.mock('@/components/MobileAppShowcase', () => () => <section data-testid="mobile-app">MobileApp</section>);
jest.mock('@/components/IoTDeviceSection', () => () => <section data-testid="iot-device">IoTDevice</section>);
jest.mock('@/components/DemoSection', () => () => <section data-testid="demo">Demo</section>);
jest.mock('@/components/DocumentationSection', () => () => <section data-testid="documentation">Documentation</section>);
jest.mock('@/components/ScopeSection', () => () => <section data-testid="scope">Scope</section>);
jest.mock('@/components/BookingSection', () => () => <section data-testid="booking">Booking</section>);
jest.mock('@/components/SupportSection', () => () => <section data-testid="support">Support</section>);
jest.mock('@/components/DownloadSection', () => () => <section data-testid="download">Download</section>);
jest.mock('@/components/Footer', () => () => <footer data-testid="footer">Footer</footer>);

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('renders all section components', () => {
    render(<Home />);
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

  it('renders footer', () => {
    render(<Home />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders main content area', () => {
    render(<Home />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('has min-h-screen wrapper', () => {
    const { container } = render(<Home />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('min-h-screen');
  });
});
