import React from 'react';
import { render, screen } from '@testing-library/react';
import ScopeSection from '@/components/ScopeSection';
import type { LandingPageData } from '@/lib/sanity';

describe('ScopeSection', () => {
  it('renders scope section', () => {
    render(<ScopeSection />);
    expect(screen.getByText(/scope/i) || screen.getByText(/capabilities/i) || screen.getByText(/architecture/i)).toBeTruthy();
  });

  it('has scope section ID for navigation', () => {
    const { container } = render(<ScopeSection />);
    const section = container.querySelector('#scope');
    expect(section).toBeInTheDocument();
  });

  it('renders when called with no arguments (default param)', () => {
    const element = ScopeSection();
    const { container } = render(element as React.ReactElement);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('displays scope content', () => {
    const { container } = render(<ScopeSection />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.textContent).toBeTruthy();
  });

  // Sanity data tests
  describe('with Sanity data', () => {
    it('renders custom title from Sanity', () => {
      const data = {
        scopeTitle: 'Custom Scope Title',
      } as unknown as LandingPageData;
      render(<ScopeSection data={data} />);
      expect(screen.getByText('Custom Scope Title')).toBeInTheDocument();
    });

    it('renders custom description from Sanity', () => {
      const data = {
        scopeDescription: 'Custom scope description',
      } as unknown as LandingPageData;
      render(<ScopeSection data={data} />);
      expect(screen.getByText('Custom scope description')).toBeInTheDocument();
    });

    it('renders custom categories from Sanity', () => {
      const data = {
        scopeCategories: [
          { title: 'Sanity Cat', icon: 'hardware', items: ['Item 1', 'Item 2'] },
        ],
      } as unknown as LandingPageData;
      render(<ScopeSection data={data} />);
      expect(screen.getByText('Sanity Cat')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('renders custom architecture layers from Sanity', () => {
      const data = {
        scopeArchitectureLayers: [
          { name: 'Custom Layer', items: ['Sub-item'] },
        ],
      } as unknown as LandingPageData;
      render(<ScopeSection data={data} />);
      expect(screen.getByText('Custom Layer')).toBeInTheDocument();
    });

    it('renders custom architecture title from Sanity', () => {
      const data = {
        scopeArchitectureTitle: 'Custom Arch Title',
      } as unknown as LandingPageData;
      render(<ScopeSection data={data} />);
      expect(screen.getByText('Custom Arch Title')).toBeInTheDocument();
    });

    it('falls back to defaults when data is null', () => {
      render(<ScopeSection data={null} />);
      expect(screen.getByText(/scope/i) || screen.getByText(/capabilities/i)).toBeTruthy();
    });
  });
});
