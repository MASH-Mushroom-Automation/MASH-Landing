import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FAQPageClient from '@/app/faq/faq-client';
import FAQPage from '@/app/faq/page';

// Mock layout and icons
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);
jest.mock('lucide-react', () => ({
  ChevronDown: (props: any) => <svg data-testid="chevron-icon" {...props} />,
  Search: (props: any) => <svg data-testid="search-icon" {...props} />,
}));

// Mock getLandingPageData for server component test
const mockGetLandingPageData = jest.fn();
jest.mock('@/lib/sanity', () => ({
  getLandingPageData: (...args: unknown[]) => mockGetLandingPageData(...args),
}));

describe('FAQ Page', () => {
  // Server component tests
  describe('FAQPage (server component)', () => {
    beforeEach(() => {
      mockGetLandingPageData.mockReset();
    });

    it('renders FAQPageClient with fetched data', async () => {
      mockGetLandingPageData.mockResolvedValue({
        faqTitle: 'Server FAQ Title',
        faqSubtitle: 'Server subtitle',
        faqCategories: [{ name: 'Server Cat', faqs: [{ question: 'SQ?', answer: 'SA.' }] }],
      });
      const page = await FAQPage();
      render(page);
      expect(screen.getByText('Server FAQ Title')).toBeInTheDocument();
    });

    it('renders with null data when Sanity fetch fails', async () => {
      mockGetLandingPageData.mockRejectedValue(new Error('Fetch failed'));
      const page = await FAQPage();
      render(page);
      // Should fall back to defaults
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });
  });

  // Client component tests
  describe('FAQPageClient', () => {
    it('renders without crashing (no data)', () => {
      render(<FAQPageClient />);
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('renders with Sanity data', () => {
      const data = {
        _id: 'test',
        _type: 'landingPage' as const,
        heroTitle: 'Test',
        heroSubtitle: 'Test',
        faqTitle: 'Custom FAQ Title',
        faqSubtitle: 'Custom FAQ subtitle',
        faqCategories: [
          {
            name: 'Test Category',
            faqs: [
              { question: 'Test Q?', answer: 'Test A.' },
            ],
          },
        ],
        faqCtaTitle: 'Custom CTA',
        faqCtaDescription: 'Custom CTA Description',
      };
      render(<FAQPageClient data={data} />);
      expect(screen.getByText('Custom FAQ Title')).toBeInTheDocument();
      expect(screen.getByText('Custom FAQ subtitle')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
      expect(screen.getByText('Test Q?')).toBeInTheDocument();
      expect(screen.getByText('Custom CTA')).toBeInTheDocument();
    });

    it('renders inside PageLayout', () => {
      render(<FAQPageClient />);
      expect(screen.getByTestId('page-layout')).toBeInTheDocument();
    });

    it('displays FAQ categories', () => {
      render(<FAQPageClient />);
      expect(screen.getByText('Getting Started')).toBeInTheDocument();
      expect(screen.getByText('Mobile App')).toBeInTheDocument();
      expect(screen.getByText('Features')).toBeInTheDocument();
    });

    it('displays FAQ questions', () => {
      render(<FAQPageClient />);
      expect(screen.getByText(/What hardware do I need/)).toBeInTheDocument();
    });

    it('has a search input', () => {
      render(<FAQPageClient />);
      const searchInput = screen.getByPlaceholderText(/search/i);
      expect(searchInput).toBeInTheDocument();
    });

    it('toggles FAQ answer visibility when clicked', async () => {
      const user = userEvent.setup();
      render(<FAQPageClient />);

      const question = screen.getByText(/What hardware do I need/);
      const button = question.closest('button');
      expect(button).toBeInTheDocument();

      await user.click(button!);
      expect(screen.getByText(/compatible microcontroller/)).toBeInTheDocument();

      await user.click(button!);
      expect(screen.queryByText(/compatible microcontroller/)).not.toBeInTheDocument();
    });

    it('filters FAQ items based on search query', async () => {
      const user = userEvent.setup();
      render(<FAQPageClient />);

      const searchInput = screen.getByPlaceholderText(/search/i);
      await user.type(searchInput, 'iOS and Android');

      expect(screen.getByText(/Is the mobile app available/)).toBeInTheDocument();
    });

    it('shows no results message when search has no matches', async () => {
      const user = userEvent.setup();
      render(<FAQPageClient />);

      const searchInput = screen.getByPlaceholderText(/search/i);
      await user.type(searchInput, 'xyznonexistent123');

      expect(screen.getByText(/No FAQs found/i)).toBeInTheDocument();
    });

    it('uses default data when null is passed', () => {
      render(<FAQPageClient data={null} />);
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByText('Getting Started')).toBeInTheDocument();
    });
  });
});
