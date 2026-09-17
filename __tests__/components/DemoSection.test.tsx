import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DemoSection from '@/components/DemoSection';
import type { LandingPageData } from '@/lib/sanity';

describe('DemoSection', () => {
  it('renders demo section heading', () => {
    render(<DemoSection />);
    expect(screen.getByText(/See MASH in Action/i)).toBeInTheDocument();
  });

  it('renders demo section description', () => {
    render(<DemoSection />);
    expect(screen.getByText(/Watch our demonstration videos/i)).toBeInTheDocument();
  });

  it('has demo section ID for navigation', () => {
    const { container } = render(<DemoSection />);
    const section = container.querySelector('#demo');
    expect(section).toBeInTheDocument();
  });

  it('renders all three video buttons', () => {
    render(<DemoSection />);
    // System Overview appears in both placeholder and button
    const overviewTexts = screen.getAllByText('System Overview');
    expect(overviewTexts.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Installation & Setup')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Demo')).toBeInTheDocument();
  });

  it('highlights active video button', () => {
    render(<DemoSection />);
    // Overview is active by default - find the one inside a button (h3)
    const overviewTexts = screen.getAllByText('System Overview');
    const buttonText = overviewTexts.find(el => el.closest('button'));
    const overviewButton = buttonText?.closest('button');
    expect(overviewButton?.className).toContain('bg-green-600');
  });

  it('switches active video on button click', async () => {
    const user = userEvent.setup();
    render(<DemoSection />);
    
    const setupButton = screen.getByText('Installation & Setup').closest('button');
    if (setupButton) {
      await user.click(setupButton);
    }
    
    // Setup should now be active
    expect(setupButton?.className).toContain('bg-green-600');
    
    // Overview button should no longer be active
    const overviewTexts = screen.getAllByText('System Overview');
    const overviewInButton = overviewTexts.find(el => el.closest('button'));
    const overviewButton = overviewInButton?.closest('button');
    expect(overviewButton?.className).not.toContain('bg-green-600');
  });

  it('renders video descriptions', () => {
    render(<DemoSection />);
    expect(screen.getByText(/comprehensive tour/i)).toBeInTheDocument();
    expect(screen.getByText(/install and configure/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile application features/i)).toBeInTheDocument();
  });

  it('renders placeholder video area', () => {
    render(<DemoSection />);
    expect(screen.getByText(/Video coming soon/i)).toBeInTheDocument();
  });

  it('shows correct active video title in placeholder', () => {
    render(<DemoSection />);
    // Default active video is overview - appears in placeholder and button
    const overviewTexts = screen.getAllByText('System Overview');
    expect(overviewTexts.length).toBeGreaterThanOrEqual(2); // placeholder + button
  });

  it('renders statistics section', () => {
    render(<DemoSection />);
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('System Uptime')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByText('Yield Increase')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('Monitoring')).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    const { container } = render(<DemoSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.className).toContain('py-20');
  });

  it('renders mobile button click correctly', async () => {
    const user = userEvent.setup();
    render(<DemoSection />);
    
    const mobileButton = screen.getByText('Mobile App Demo').closest('button');
    if (mobileButton) {
      await user.click(mobileButton);
      expect(mobileButton.className).toContain('bg-green-600');
    }
  });

  // Sanity data tests
  describe('with Sanity data', () => {
    it('renders custom title from Sanity', () => {
      const data = {
        demoTitle: 'Custom Demo Title',
      } as unknown as LandingPageData;
      render(<DemoSection data={data} />);
      expect(screen.getByText('Custom Demo Title')).toBeInTheDocument();
    });

    it('renders custom subtitle from Sanity', () => {
      const data = {
        demoSubtitle: 'Custom demo subtitle',
      } as unknown as LandingPageData;
      render(<DemoSection data={data} />);
      expect(screen.getByText('Custom demo subtitle')).toBeInTheDocument();
    });

    it('renders custom videos from Sanity', () => {
      const data = {
        demoVideos: [
          { id: 'custom1', title: 'Custom Video 1', description: 'Custom desc 1' },
          { id: 'custom2', title: 'Custom Video 2', description: 'Custom desc 2' },
        ],
      } as unknown as LandingPageData;
      render(<DemoSection data={data} />);
      expect(screen.getAllByText('Custom Video 1').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Custom Video 2')).toBeInTheDocument();
    });

    it('renders custom stats from Sanity', () => {
      const data = {
        demoStats: [
          { value: '100%', label: 'Custom Stat' },
        ],
      } as unknown as LandingPageData;
      render(<DemoSection data={data} />);
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('Custom Stat')).toBeInTheDocument();
    });

    it('falls back to defaults when data is null', () => {
      render(<DemoSection data={null} />);
      expect(screen.getByText(/See MASH in Action/i)).toBeInTheDocument();
    });
  });
});
