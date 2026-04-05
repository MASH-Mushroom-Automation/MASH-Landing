import React from 'react';
import { render, screen } from '@testing-library/react';
import SupportSection from '@/components/SupportSection';
import type { LandingPageData } from '@/lib/sanity';

describe('SupportSection', () => {
  it('renders support section', () => {
    render(<SupportSection />);
    const supportTexts = screen.queryAllByText(/support/i);
    expect(supportTexts.length).toBeGreaterThan(0);
  });

  it('displays support information', () => {
    const { container } = render(<SupportSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.textContent).toBeTruthy();
  });

  it('renders default title and subtitle', () => {
    render(<SupportSection />);
    expect(screen.getByText('Support & Resources')).toBeInTheDocument();
    expect(screen.getByText(/We are here to help you succeed/)).toBeInTheDocument();
  });

  it('renders all four default channels', () => {
    render(<SupportSection />);
    // 'Schedule a Call' appears as both a channel name and CTA button
    expect(screen.getAllByText('Schedule a Call').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Email Support')).toBeInTheDocument();
    expect(screen.getByText('Community Forum')).toBeInTheDocument();
    expect(screen.getByText('Knowledge Base')).toBeInTheDocument();
  });

  it('renders channel descriptions', () => {
    render(<SupportSection />);
    expect(screen.getByText('Book a video consultation')).toBeInTheDocument();
    expect(screen.getByText('Get help from our expert team')).toBeInTheDocument();
    expect(screen.getByText('Connect with other users')).toBeInTheDocument();
    expect(screen.getByText('Browse tutorials and guides')).toBeInTheDocument();
  });

  it('renders internal links (non-external, non-mailto)', () => {
    render(<SupportSection />);
    // "Book Now" is a Link to /schedule
    const bookLink = screen.getByText('Book Now');
    expect(bookLink.closest('a')).toHaveAttribute('href', '/schedule');
  });

  it('renders external links with target=_blank', () => {
    render(<SupportSection />);
    // "Join the Community" is external (https://)
    const communityLink = screen.getByText('Join the Community');
    expect(communityLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(communityLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders mailto links for email channel', () => {
    render(<SupportSection />);
    // In test environment, NEXT_PUBLIC_CONTACT_EMAIL = 'test@example.com'
    const emailLinks = screen.getAllByText('test@example.com');
    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
    expect(emailLinks[0].closest('a')?.getAttribute('href')).toMatch(/^mailto:/);
  });

  it('renders internal link for knowledge base', () => {
    render(<SupportSection />);
    const articlesLink = screen.getByText('View Articles');
    expect(articlesLink.closest('a')).toHaveAttribute('href', '/documentation/tutorials');
    // Should NOT have target=_blank
    expect(articlesLink.closest('a')).not.toHaveAttribute('target');
  });

  it('renders FAQ section', () => {
    render(<SupportSection />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders default FAQ questions', () => {
    render(<SupportSection />);
    expect(screen.getByText('What hardware do I need to get started?')).toBeInTheDocument();
    expect(screen.getByText(/Is the mobile app available for both iOS/)).toBeInTheDocument();
    expect(screen.getByText('Can I manage multiple growing chambers?')).toBeInTheDocument();
    expect(screen.getByText('What kind of support do you offer?')).toBeInTheDocument();
    expect(screen.getByText('Is my data secure?')).toBeInTheDocument();
  });

  it('renders View All FAQs link', () => {
    render(<SupportSection />);
    const faqLink = screen.getByText('View All FAQs');
    expect(faqLink.closest('a')).toHaveAttribute('href', '/faq');
  });

  it('renders CTA buttons', () => {
    render(<SupportSection />);
    const scheduleLinks = screen.getAllByText('Schedule a Call');
    expect(scheduleLinks.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
  });

  // Sanity data tests
  describe('with Sanity data', () => {
    it('renders custom title and subtitle from Sanity', () => {
      const data = {
        supportTitle: 'Custom Support Title',
        supportDescription: 'Custom description',
      } as unknown as LandingPageData;
      render(<SupportSection data={data} />);
      expect(screen.getByText('Custom Support Title')).toBeInTheDocument();
      expect(screen.getByText('Custom description')).toBeInTheDocument();
    });

    it('renders Sanity channels', () => {
      const data = {
        supportChannels: [
          { name: 'Custom Channel', description: 'Custom desc', icon: 'email', link: 'mailto:test@test.com', linkText: 'Email Us' },
        ],
      } as unknown as LandingPageData;
      render(<SupportSection data={data} />);
      expect(screen.getByText('Custom Channel')).toBeInTheDocument();
      expect(screen.getByText('Custom desc')).toBeInTheDocument();
    });

    it('renders Sanity FAQs', () => {
      const data = {
        supportFaqs: [
          { question: 'Custom Q?', answer: 'Custom A.' },
        ],
      } as unknown as LandingPageData;
      render(<SupportSection data={data} />);
      expect(screen.getByText('Custom Q?')).toBeInTheDocument();
      expect(screen.getByText('Custom A.')).toBeInTheDocument();
    });

    it('falls back to defaults when data is null', () => {
      render(<SupportSection data={null} />);
      expect(screen.getByText('Support & Resources')).toBeInTheDocument();
      expect(screen.getAllByText('Schedule a Call').length).toBeGreaterThanOrEqual(1);
    });

    it('uses channel name when linkText is missing', () => {
      const data = {
        supportChannels: [
          { name: 'No Link Text', description: 'desc', icon: 'calendar', link: '/schedule' },
        ],
      } as unknown as LandingPageData;
      render(<SupportSection data={data} />);
      // linkText is undefined, so it should fall back to channel.name
      const links = screen.getAllByText('No Link Text');
      expect(links.length).toBeGreaterThanOrEqual(1);
    });

    it('uses fallback icon style when icon key is unknown', () => {
      const data = {
        supportChannels: [
          { name: 'Unknown Icon', description: 'desc', icon: 'nonexistent', link: '/test', linkText: 'Test' },
        ],
      } as unknown as LandingPageData;
      render(<SupportSection data={data} />);
      expect(screen.getByText('Unknown Icon')).toBeInTheDocument();
    });
  });
});
