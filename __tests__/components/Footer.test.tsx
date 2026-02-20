import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Footer', () => {
  it('renders brand name', () => {
    render(<Footer />);
    expect(screen.getByText('MASH')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Footer />);
    expect(screen.getByText(/Smart mushroom cultivation automation/i)).toBeInTheDocument();
  });

  it('renders all section titles', () => {
    render(<Footer />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('renders Product links', () => {
    render(<Footer />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('How It Works')).toBeInTheDocument();
  });

  it('renders Resources links', () => {
    render(<Footer />);
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders Company links', () => {
    render(<Footer />);
    expect(screen.getByText('Schedule a Call')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Footer />);
    const github = screen.getByLabelText('GitHub');
    expect(github).toHaveAttribute('href', 'https://github.com/MASH-Mushroom-Automation');
    const facebook = screen.getByLabelText('Facebook');
    expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/groups/mashmushrooom');
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/Copyright 2026 MASH/i)).toBeInTheDocument();
  });

  it('renders bottom bar quick links', () => {
    render(<Footer />);
    const privacyLinks = screen.getAllByText('Privacy');
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('renders with custom data', () => {
    render(<Footer data={{ footerBrand: 'CustomBrand', footerDescription: 'Custom desc' }} />);
    expect(screen.getByText('CustomBrand')).toBeInTheDocument();
    expect(screen.getByText('Custom desc')).toBeInTheDocument();
  });

  it('renders external links with target=_blank', () => {
    render(
      <Footer
        data={{
          footerSections: [
            {
              title: 'External',
              links: [{ label: 'External Link', href: 'https://external.com' }],
            },
          ],
        }}
      />
    );
    const externalLink = screen.getByText('External Link');
    expect(externalLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(externalLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
    expect(externalLink.closest('a')).toHaveAttribute('href', 'https://external.com');
  });

  it('renders internal links without target=_blank', () => {
    render(<Footer />);
    const faqLink = screen.getByText('FAQ');
    expect(faqLink.closest('a')).not.toHaveAttribute('target');
    expect(faqLink.closest('a')).toHaveAttribute('href', '/faq');
  });

  it('renders with custom copyright', () => {
    render(<Footer data={{ footerCopyright: 'Custom Copyright 2026' }} />);
    expect(screen.getByText('Custom Copyright 2026')).toBeInTheDocument();
  });
});
