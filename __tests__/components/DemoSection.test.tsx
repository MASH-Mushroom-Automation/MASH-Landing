import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DemoSection from '@/components/DemoSection';

vi.mock('@/lib/cloudinary', () => ({
  getCloudinaryVideoUrl: (id: string, opts?: { format?: string }) => `https://cdn.test/video/${id}.${opts?.format ?? 'mp4'}`,
  getVideoThumbnailUrl: (id: string) => `https://cdn.test/thumb/${id}.jpg`,
  CLOUDINARY_ASSETS: {
    images: { logo: 'mash/logo', poster: 'mash/poster' },
    videos: { demo: 'mash/demo', overview: 'mash/overview', setup: 'mash/setup', mobile: 'mash/mobile' },
  },
}));

describe('DemoSection', () => {
  it('renders heading', () => {
    render(<DemoSection />);
    expect(screen.getByText('See MASH in Action')).toBeInTheDocument();
  });

  it('renders all video tabs', () => {
    render(<DemoSection />);
    expect(screen.getByText('System Overview')).toBeInTheDocument();
    expect(screen.getByText('Installation & Setup')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Demo')).toBeInTheDocument();
  });

  it('renders stats', () => {
    render(<DemoSection />);
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
  });

  it('switches active video on tab click', () => {
    render(<DemoSection />);
    const setupTab = screen.getByText('Installation & Setup');
    fireEvent.click(setupTab.closest('button')!);
    // The setup tab should now be the active one
    expect(setupTab.closest('button')).toHaveClass('bg-green-600');
  });

  it('has demo section id', () => {
    const { container } = render(<DemoSection />);
    expect(container.querySelector('#demo')).toBeInTheDocument();
  });
});
