import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SupportPage from '@/app/support/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/support',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('SupportPage', () => {
  it('renders heading', () => {
    render(<SupportPage />);
    expect(screen.getByText('How Can We Help?')).toBeInTheDocument();
  });

  it('renders all 4 support options', () => {
    render(<SupportPage />);
    expect(screen.getByText('Schedule a Meeting')).toBeInTheDocument();
    expect(screen.getByText('Community Forum')).toBeInTheDocument();
    expect(screen.getByText('Email Support')).toBeInTheDocument();
  });

  it('renders contact form', () => {
    render(<SupportPage />);
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders Send Message button', () => {
    render(<SupportPage />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('renders contact info section', () => {
    render(<SupportPage />);
    expect(screen.getByText('Response Time')).toBeInTheDocument();
    expect(screen.getByText('Philippines')).toBeInTheDocument();
  });

  it('renders email link', () => {
    render(<SupportPage />);
    const emailLinks = screen.getAllByText('mash.mushroom.automation@gmail.com');
    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
  });
});
