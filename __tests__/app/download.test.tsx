import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DownloadPage from '@/app/download/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/download',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('DownloadPage', () => {
  it('renders heading', () => {
    render(<DownloadPage />);
    expect(screen.getByText('Download MASH')).toBeInTheDocument();
  });

  it('renders Mobile Apps section', () => {
    render(<DownloadPage />);
    expect(screen.getByText('Mobile Apps')).toBeInTheDocument();
  });

  it('renders iOS and Android cards', () => {
    render(<DownloadPage />);
    expect(screen.getByText('iOS App')).toBeInTheDocument();
    expect(screen.getByText('Android App')).toBeInTheDocument();
  });

  it('renders Desktop Apps section', () => {
    render(<DownloadPage />);
    expect(screen.getByText('Desktop Apps')).toBeInTheDocument();
  });

  it('renders system requirements', () => {
    render(<DownloadPage />);
    expect(screen.getByText('System Requirements')).toBeInTheDocument();
  });

  it('renders direct download link for APK', () => {
    render(<DownloadPage />);
    const apkLink = screen.getByText('Direct Download (.apk)');
    expect(apkLink.closest('a')).toHaveAttribute('href', '/downloads/mash-v1.4.3b5.apk');
  });
});
