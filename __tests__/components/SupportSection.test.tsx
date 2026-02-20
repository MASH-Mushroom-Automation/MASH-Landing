import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SupportSection from '@/components/SupportSection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('SupportSection', () => {
  it('renders heading', () => {
    render(<SupportSection />);
    expect(screen.getByText('Support & Resources')).toBeInTheDocument();
  });

  it('renders Help Center badge', () => {
    render(<SupportSection />);
    expect(screen.getByText('Help Center')).toBeInTheDocument();
  });

  it('renders all 4 support channels', () => {
    render(<SupportSection />);
    expect(screen.getByText('Schedule a Call')).toBeInTheDocument();
    expect(screen.getByText('Email Support')).toBeInTheDocument();
    expect(screen.getByText('Community Forum')).toBeInTheDocument();
    expect(screen.getByText('Knowledge Base')).toBeInTheDocument();
  });

  it('renders FAQ heading', () => {
    render(<SupportSection />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders all 5 FAQ questions', () => {
    render(<SupportSection />);
    expect(screen.getByText('What hardware do I need to get started?')).toBeInTheDocument();
    expect(screen.getByText(/Is the mobile app available/i)).toBeInTheDocument();
    expect(screen.getByText(/Can I manage multiple growing chambers/i)).toBeInTheDocument();
    expect(screen.getByText('What kind of support do you offer?')).toBeInTheDocument();
    expect(screen.getByText('Is my data secure?')).toBeInTheDocument();
  });

  it('toggles FAQ accordion on click', () => {
    render(<SupportSection />);
    const question = screen.getByText('What hardware do I need to get started?');
    const button = question.closest('button')!;
    
    // Click to open
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Click to close
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders View All FAQs link', () => {
    render(<SupportSection />);
    const link = screen.getByText('View All FAQs');
    expect(link.closest('a')).toHaveAttribute('href', '/faq');
  });

  it('has support section id', () => {
    const { container } = render(<SupportSection />);
    expect(container.querySelector('#support')).toBeInTheDocument();
  });

  it('renders with custom data', () => {
    render(<SupportSection data={{ supportTitle: 'Custom Support' }} />);
    expect(screen.getByText('Custom Support')).toBeInTheDocument();
  });

  it('renders mailto link for Email Support channel', () => {
    render(<SupportSection />);
    const emailCard = screen.getByText('Email Support').closest('a');
    expect(emailCard).toBeInTheDocument();
    expect(emailCard?.getAttribute('href')).toContain('mailto:');
    // mailto links should NOT have target=_blank
    expect(emailCard).not.toHaveAttribute('target');
  });

  it('renders external link with target=_blank for Community Forum', () => {
    render(<SupportSection />);
    const communityCard = screen.getByText('Community Forum').closest('a');
    expect(communityCard).toBeInTheDocument();
    expect(communityCard?.getAttribute('href')).toContain('https://');
    expect(communityCard).toHaveAttribute('target', '_blank');
    expect(communityCard).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders internal links for Schedule and Knowledge Base', () => {
    render(<SupportSection />);
    const scheduleCard = screen.getByText('Schedule a Call').closest('a');
    expect(scheduleCard?.getAttribute('href')).toBe('/schedule');
    expect(scheduleCard).not.toHaveAttribute('target');

    const kbCard = screen.getByText('Knowledge Base').closest('a');
    expect(kbCard?.getAttribute('href')).toBe('/documentation/tutorials');
    expect(kbCard).not.toHaveAttribute('target');
  });

  it('renders custom description from data prop', () => {
    render(<SupportSection data={{ supportDescription: 'Custom support desc' }} />);
    expect(screen.getByText('Custom support desc')).toBeInTheDocument();
  });

  it('uses fallback icon for unknown channel icon', () => {
    render(
      <SupportSection
        data={{
          supportChannels: [
            { name: 'Custom Channel', description: 'Test', icon: 'unknown-icon', link: '/test' },
          ],
        }}
      />
    );
    // Without linkText, should fall back to channel.name - appears twice (heading + linkText span)
    const matches = screen.getAllByText('Custom Channel');
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });
});
