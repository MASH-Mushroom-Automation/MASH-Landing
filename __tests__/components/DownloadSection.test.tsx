import React from 'react';
import { render, screen } from '@testing-library/react';
import DownloadSection from '@/components/DownloadSection';
import type { LandingPageData } from '@/lib/sanity';

describe('DownloadSection', () => {
  it('renders download section', () => {
    render(<DownloadSection />);
    const downloadTexts = screen.queryAllByText(/download/i);
    expect(downloadTexts.length).toBeGreaterThan(0);
  });

  it('contains download information', () => {
    const { container } = render(<DownloadSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('renders when called with no arguments (default param)', () => {
    const element = DownloadSection();
    const { container } = render(element as React.ReactElement);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders default title and subtitle', () => {
    render(<DownloadSection />);
    expect(screen.getByText('Get Started with MASH')).toBeInTheDocument();
    expect(screen.getByText(/Download our mobile app/)).toBeInTheDocument();
  });

  it('renders App Store and Google Play cards', () => {
    render(<DownloadSection />);
    expect(screen.getByText('App Store')).toBeInTheDocument();
    expect(screen.getByText('Google Play')).toBeInTheDocument();
  });

  it('renders default app features', () => {
    render(<DownloadSection />);
    expect(screen.getByText('Real-time Monitoring')).toBeInTheDocument();
    expect(screen.getByText('Remote Control')).toBeInTheDocument();
    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    expect(screen.getByText('Historical Data')).toBeInTheDocument();
    expect(screen.getByText('Multi-chamber Support')).toBeInTheDocument();
    expect(screen.getByText('Offline Mode')).toBeInTheDocument();
  });

  it('renders feature descriptions for default features', () => {
    render(<DownloadSection />);
    expect(screen.getByText('View live sensor data from anywhere')).toBeInTheDocument();
    expect(screen.getByText('Adjust settings on the go')).toBeInTheDocument();
  });

  it('renders App Features heading', () => {
    render(<DownloadSection />);
    expect(screen.getByText('App Features')).toBeInTheDocument();
  });

  it('renders View All Downloads link', () => {
    render(<DownloadSection />);
    const link = screen.getByText('View All Downloads');
    expect(link.closest('a')).toHaveAttribute('href', '/download');
  });

  // Sanity data tests
  describe('with Sanity data', () => {
    it('renders custom title from Sanity', () => {
      const data = {
        downloadTitle: 'Custom Download Title',
      } as unknown as LandingPageData;
      render(<DownloadSection data={data} />);
      expect(screen.getByText('Custom Download Title')).toBeInTheDocument();
    });

    it('renders custom subtitle from Sanity', () => {
      const data = {
        downloadDescription: 'Custom description text',
      } as unknown as LandingPageData;
      render(<DownloadSection data={data} />);
      expect(screen.getByText('Custom description text')).toBeInTheDocument();
    });

    it('renders Sanity app features (string array)', () => {
      const data = {
        downloadAppFeatures: ['Cloud Sync', 'AI Predictions', 'Widget Support'],
      } as unknown as LandingPageData;
      render(<DownloadSection data={data} />);
      expect(screen.getByText('Cloud Sync')).toBeInTheDocument();
      expect(screen.getByText('AI Predictions')).toBeInTheDocument();
      expect(screen.getByText('Widget Support')).toBeInTheDocument();
    });

    it('Sanity features have empty descriptions', () => {
      const data = {
        downloadAppFeatures: ['Cloud Sync'],
      } as unknown as LandingPageData;
      const { container } = render(<DownloadSection data={data} />);
      // Sanity features are strings mapped to { title: string, description: "" }
      // The description paragraph should not render (conditional: feat.description && ...)
      expect(screen.getByText('Cloud Sync')).toBeInTheDocument();
      // No description paragraph for Sanity features
      const featureParent = screen.getByText('Cloud Sync').closest('div');
      const paragraphs = featureParent?.querySelectorAll('p');
      // Should have 0 description paragraphs
      expect(paragraphs?.length ?? 0).toBe(0);
    });

    it('falls back to defaults when data is null', () => {
      render(<DownloadSection data={null} />);
      expect(screen.getByText('Get Started with MASH')).toBeInTheDocument();
      expect(screen.getByText('Real-time Monitoring')).toBeInTheDocument();
    });

    it('falls back to defaults when downloadAppFeatures is undefined', () => {
      const data = { heroTitle: 'test' } as unknown as LandingPageData;
      render(<DownloadSection data={data} />);
      expect(screen.getByText('Real-time Monitoring')).toBeInTheDocument();
    });
  });
});
