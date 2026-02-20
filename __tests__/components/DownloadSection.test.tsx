import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DownloadSection from '@/components/DownloadSection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('DownloadSection', () => {
  it('renders heading', () => {
    render(<DownloadSection />);
    expect(screen.getByText(/Ready to Automate Your Cultivation/i)).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<DownloadSection />);
    expect(screen.getByText(/Download the MASH mobile app/i)).toBeInTheDocument();
  });

  it('renders Download App link', () => {
    render(<DownloadSection />);
    const link = screen.getByText('Download App');
    expect(link.closest('a')).toHaveAttribute('href', '/download');
  });

  it('renders Schedule a Demo link', () => {
    render(<DownloadSection />);
    const link = screen.getByText('Schedule a Demo');
    expect(link.closest('a')).toHaveAttribute('href', '/schedule');
  });

  it('has download section id', () => {
    const { container } = render(<DownloadSection />);
    expect(container.querySelector('#download')).toBeInTheDocument();
  });

  it('renders with custom data', () => {
    render(<DownloadSection data={{ downloadTitle: 'Custom Download' }} />);
    expect(screen.getByText('Custom Download')).toBeInTheDocument();
  });
});
