import React from 'react';
import { render, screen } from '@testing-library/react';
import DocumentationSection from '@/components/DocumentationSection';
import type { LandingPageData } from '@/lib/sanity';

describe('DocumentationSection', () => {
  it('renders documentation section', () => {
    render(<DocumentationSection />);
    const docTexts = screen.queryAllByText(/documentation/i);
    expect(docTexts.length).toBeGreaterThan(0);
  });

  it('contains documentation links or content', () => {
    const { container } = render(<DocumentationSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('renders when called with no arguments (default param)', () => {
    const element = DocumentationSection();
    const { container } = render(element as React.ReactElement);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  // Sanity data tests
  describe('with Sanity data', () => {
    it('renders custom title from Sanity', () => {
      const data = {
        documentationTitle: 'Custom Docs Title',
      } as unknown as LandingPageData;
      render(<DocumentationSection data={data} />);
      expect(screen.getByText('Custom Docs Title')).toBeInTheDocument();
    });

    it('renders custom description from Sanity', () => {
      const data = {
        documentationDescription: 'Custom docs description',
      } as unknown as LandingPageData;
      render(<DocumentationSection data={data} />);
      expect(screen.getByText('Custom docs description')).toBeInTheDocument();
    });

    it('renders custom categories from Sanity', () => {
      const data = {
        documentationCategories: [
          { title: 'Sanity Category', description: 'Sanity cat desc', icon: 'setup', links: [{ name: 'Link 1', href: '/link1' }] },
        ],
      } as unknown as LandingPageData;
      render(<DocumentationSection data={data} />);
      expect(screen.getByText('Sanity Category')).toBeInTheDocument();
      expect(screen.getByText('Sanity cat desc')).toBeInTheDocument();
    });

    it('falls back to defaults when data is null', () => {
      render(<DocumentationSection data={null} />);
      const docTexts = screen.queryAllByText(/documentation/i);
      expect(docTexts.length).toBeGreaterThan(0);
    });
  });
});
