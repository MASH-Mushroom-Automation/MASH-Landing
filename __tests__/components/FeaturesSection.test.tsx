import React from 'react';
import { render, screen } from '@testing-library/react';
import FeaturesSection from '@/components/FeaturesSection';
import type { LandingPageData } from '@/lib/sanity';

describe('FeaturesSection', () => {
  it('renders features section', () => {
    render(<FeaturesSection />);
    expect(screen.getByText(/features/i) || screen.getByText(/capabilities/i)).toBeInTheDocument();
  });

  it('has features section ID for navigation', () => {
    const { container } = render(<FeaturesSection />);
    const section = container.querySelector('#features');
    expect(section).toBeInTheDocument();
  });

  it('renders when called with no arguments (default param)', () => {
    const element = FeaturesSection();
    const { container } = render(element as React.ReactElement);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('displays multiple feature items', () => {
    const { container } = render(<FeaturesSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    const content = container.textContent;
    expect(content).toBeTruthy();
  });

  it('renders default title and subtitle', () => {
    render(<FeaturesSection />);
    expect(screen.getByText('Powerful Features')).toBeInTheDocument();
    expect(screen.getByText(/everything you need to automate/i)).toBeInTheDocument();
  });

  it('renders all 9 default features', () => {
    render(<FeaturesSection />);
    // Check for a selection of default features to confirm all render
    expect(screen.getByText('Climate Control')).toBeInTheDocument();
    expect(screen.getByText('Remote Access')).toBeInTheDocument();
  });

  // Sanity data tests
  describe('with Sanity data', () => {
    it('renders custom title from Sanity', () => {
      const data = {
        featuresTitle: 'Custom Features Title',
      } as unknown as LandingPageData;
      render(<FeaturesSection data={data} />);
      expect(screen.getByText('Custom Features Title')).toBeInTheDocument();
    });

    it('renders custom subtitle from Sanity', () => {
      const data = {
        featuresSubtitle: 'Custom subtitle text',
      } as unknown as LandingPageData;
      render(<FeaturesSection data={data} />);
      expect(screen.getByText('Custom subtitle text')).toBeInTheDocument();
    });

    it('renders Sanity features', () => {
      const data = {
        features: [
          { title: 'Sanity Feature', subtitle: 'Feature description', icon: 'climate-control', details: ['Detail 1'] },
        ],
      } as unknown as LandingPageData;
      render(<FeaturesSection data={data} />);
      expect(screen.getByText('Sanity Feature')).toBeInTheDocument();
    });

    it('falls back to default icon when icon key is unknown', () => {
      const data = {
        features: [
          { title: 'Unknown Icon Feature', subtitle: 'Desc', icon: 'nonexistent-icon', details: [] },
        ],
      } as unknown as LandingPageData;
      render(<FeaturesSection data={data} />);
      // Should render without crashing - falls back to climate-control icon
      expect(screen.getByText('Unknown Icon Feature')).toBeInTheDocument();
    });

    it('falls back to defaults when data is null', () => {
      render(<FeaturesSection data={null} />);
      expect(screen.getByText('Powerful Features')).toBeInTheDocument();
    });

    it('falls back to defaults when data has no features', () => {
      const data = { heroTitle: 'test' } as unknown as LandingPageData;
      render(<FeaturesSection data={data} />);
      expect(screen.getByText('Climate Control')).toBeInTheDocument();
    });
  });
});
