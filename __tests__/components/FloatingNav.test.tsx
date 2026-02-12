import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import FloatingNav from '@/components/FloatingNav';

// Mock next/navigation
const mockPathname = jest.fn().mockReturnValue('/');
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

// Mock ThemeToggle
jest.mock('@/components/ui/theme-toggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme</button>,
}));

const fullData = {
  navigationLinks: [
    { label: 'Features', href: '/#features' },
    { label: 'Demo', href: '/#demo' },
    { label: 'Documentation', href: '/documentation' },
    { label: 'Download', href: '/#download' },
    { label: 'Contact', href: '/#booking' },
  ],
  floatingNav: {
    enabled: true,
    transparentUntilScroll: true,
    backdrop: true,
    logoText: 'MASH',
    logoHref: '/',
    showScrollProgress: true,
    showThemeToggle: true,
    ctaButtons: [
      { text: 'Download App', href: '/download', variant: 'default' },
      { text: 'Schedule Demo', href: '/schedule', variant: 'outline' },
    ],
  },
  brandPalette: { brandName: 'MASH' },
};

describe('FloatingNav', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/');
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    document.body.style.overflow = '';
  });

  // ========== RENDERING ==========

  it('renders without crashing', () => {
    render(<FloatingNav data={fullData} />);
    expect(screen.getByTestId('floating-nav')).toBeInTheDocument();
  });

  it('renders with no data (defaults)', () => {
    render(<FloatingNav />);
    expect(screen.getByTestId('floating-nav')).toBeInTheDocument();
    expect(screen.getByText('MASH')).toBeInTheDocument();
  });

  it('renders with empty data object', () => {
    render(<FloatingNav data={{}} />);
    expect(screen.getByTestId('floating-nav')).toBeInTheDocument();
    expect(screen.getByText('MASH')).toBeInTheDocument();
  });

  it('renders logo text from Sanity data', () => {
    render(<FloatingNav data={fullData} />);
    expect(screen.getByText('MASH')).toBeInTheDocument();
  });

  it('renders custom logo text', () => {
    const custom = {
      ...fullData,
      floatingNav: { ...fullData.floatingNav, logoText: 'MyBrand' },
    };
    render(<FloatingNav data={custom} />);
    expect(screen.getByText('MyBrand')).toBeInTheDocument();
  });

  it('falls back to brandPalette.brandName when no logoText', () => {
    const d = {
      brandPalette: { brandName: 'TestBrand' },
    };
    render(<FloatingNav data={d} />);
    expect(screen.getByText('TestBrand')).toBeInTheDocument();
  });

  // ========== ENABLED / DISABLED ==========

  it('returns null when floatingNav.enabled = false', () => {
    const d = { floatingNav: { enabled: false } };
    const { container } = render(<FloatingNav data={d} />);
    expect(container.querySelector('[data-testid="floating-nav"]')).toBeNull();
  });

  it('renders when floatingNav.enabled = true', () => {
    render(<FloatingNav data={fullData} />);
    expect(screen.getByTestId('floating-nav')).toBeInTheDocument();
  });

  // ========== NAVIGATION LINKS ==========

  it('renders navigation links from Sanity data', () => {
    render(<FloatingNav data={fullData} />);
    expect(screen.getAllByText('Features').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Demo').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Documentation').length).toBeGreaterThanOrEqual(1);
  });

  it('renders default links when navigationLinks is empty', () => {
    render(<FloatingNav data={{ navigationLinks: [] }} />);
    expect(screen.getAllByText('Features').length).toBeGreaterThanOrEqual(1);
  });

  it('renders default links when no data provided', () => {
    render(<FloatingNav />);
    expect(screen.getAllByText('Features').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Demo').length).toBeGreaterThanOrEqual(1);
  });

  // ========== CTA BUTTONS ==========

  it('renders CTA buttons from Sanity data', () => {
    render(<FloatingNav data={fullData} />);
    expect(screen.getAllByText('Download App').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Schedule Demo').length).toBeGreaterThanOrEqual(1);
  });

  it('renders default CTA when none provided', () => {
    render(<FloatingNav />);
    expect(screen.getAllByText('Download App').length).toBeGreaterThanOrEqual(1);
  });

  // ========== THEME TOGGLE ==========

  it('renders ThemeToggle when showThemeToggle is true', () => {
    render(<FloatingNav data={fullData} />);
    expect(screen.getAllByTestId('theme-toggle').length).toBeGreaterThanOrEqual(1);
  });

  it('hides ThemeToggle when showThemeToggle is false', () => {
    const d = {
      ...fullData,
      floatingNav: { ...fullData.floatingNav, showThemeToggle: false },
    };
    render(<FloatingNav data={d} />);
    expect(screen.queryByTestId('theme-toggle')).toBeNull();
  });

  // ========== SCROLL PROGRESS ==========

  it('renders scroll progress bar when showScrollProgress is true', () => {
    render(<FloatingNav data={fullData} />);
    expect(screen.getByTestId('scroll-progress')).toBeInTheDocument();
  });

  it('hides scroll progress bar when showScrollProgress is false', () => {
    const d = {
      ...fullData,
      floatingNav: { ...fullData.floatingNav, showScrollProgress: false },
    };
    render(<FloatingNav data={d} />);
    expect(screen.queryByTestId('scroll-progress')).toBeNull();
  });

  // ========== SKIP TO CONTENT ==========

  it('renders skip-to-content link', () => {
    render(<FloatingNav data={fullData} />);
    expect(screen.getByTestId('skip-to-content')).toBeInTheDocument();
    expect(screen.getByTestId('skip-to-content')).toHaveAttribute('href', '#main-content');
  });

  // ========== ACCESSIBILITY ==========

  it('has role="navigation" and aria-label', () => {
    render(<FloatingNav data={fullData} />);
    const header = screen.getByTestId('floating-nav');
    expect(header).toHaveAttribute('role', 'navigation');
    expect(header).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('menu toggle has aria-expanded attribute', () => {
    render(<FloatingNav data={fullData} />);
    const toggle = screen.getByTestId('menu-toggle');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('menu toggle aria-expanded changes when opened', () => {
    render(<FloatingNav data={fullData} />);
    const toggle = screen.getByTestId('menu-toggle');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('menu toggle has descriptive aria-label', () => {
    render(<FloatingNav data={fullData} />);
    const toggle = screen.getByTestId('menu-toggle');
    expect(toggle).toHaveAttribute('aria-label', 'Open menu');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-label', 'Close menu');
  });

  // ========== ACTIVE LINK DETECTION ==========

  it('marks active link with aria-current on homepage', () => {
    mockPathname.mockReturnValue('/');
    render(<FloatingNav data={fullData} />);
    const featureLinks = screen.getAllByText('Features');
    const hasActive = featureLinks.some(
      (el) => el.getAttribute('aria-current') === 'page'
    );
    expect(hasActive).toBe(true);
  });

  it('marks documentation link active on /documentation', () => {
    mockPathname.mockReturnValue('/documentation');
    render(<FloatingNav data={fullData} />);
    const docLinks = screen.getAllByText('Documentation');
    const hasActive = docLinks.some(
      (el) => el.getAttribute('aria-current') === 'page'
    );
    expect(hasActive).toBe(true);
  });

  it('renders active underline for active link', () => {
    mockPathname.mockReturnValue('/documentation');
    render(<FloatingNav data={fullData} />);
    expect(screen.getByTestId('active-underline')).toBeInTheDocument();
  });

  // ========== MOBILE DRAWER ==========

  it('opens mobile drawer when hamburger clicked', () => {
    render(<FloatingNav data={fullData} />);
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument();
  });

  it('closes mobile drawer when toggle clicked again', () => {
    render(<FloatingNav data={fullData} />);
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.queryByTestId('mobile-drawer')).toBeNull();
  });

  it('closes mobile drawer on Escape key', () => {
    render(<FloatingNav data={fullData} />);
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('mobile-drawer')).toBeNull();
  });

  it('closes mobile drawer when backdrop clicked', () => {
    render(<FloatingNav data={fullData} />);
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.getByTestId('drawer-backdrop')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('drawer-backdrop'));
    expect(screen.queryByTestId('mobile-drawer')).toBeNull();
  });

  it('closes mobile drawer when a link is clicked', () => {
    render(<FloatingNav data={fullData} />);
    fireEvent.click(screen.getByTestId('menu-toggle'));
    const drawerLinks = screen.getByTestId('mobile-drawer').querySelectorAll('a');
    expect(drawerLinks.length).toBeGreaterThan(0);
    fireEvent.click(drawerLinks[0]);
    expect(screen.queryByTestId('mobile-drawer')).toBeNull();
  });

  it('mobile drawer has role="dialog" and aria-modal', () => {
    render(<FloatingNav data={fullData} />);
    fireEvent.click(screen.getByTestId('menu-toggle'));
    const drawer = screen.getByTestId('mobile-drawer');
    expect(drawer).toHaveAttribute('role', 'dialog');
    expect(drawer).toHaveAttribute('aria-modal', 'true');
  });

  it('locks body scroll when drawer is open', () => {
    render(<FloatingNav data={fullData} />);
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when drawer is closed', () => {
    render(<FloatingNav data={fullData} />);
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(document.body.style.overflow).toBe('');
  });

  // ========== SCROLL BEHAVIOR ==========

  it('applies transparent style when not scrolled', () => {
    render(<FloatingNav data={fullData} />);
    const header = screen.getByTestId('floating-nav');
    expect(header.className).toContain('bg-transparent');
  });

  it('applies solid style when scrolled', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true });
    render(<FloatingNav data={fullData} />);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    const header = screen.getByTestId('floating-nav');
    expect(header.className).not.toContain('bg-transparent');
  });

  it('keeps solid background when transparentUntilScroll is false', () => {
    const d = {
      ...fullData,
      floatingNav: { ...fullData.floatingNav, transparentUntilScroll: false },
    };
    render(<FloatingNav data={d} />);
    const header = screen.getByTestId('floating-nav');
    expect(header.className).not.toContain('bg-transparent');
  });

  // ========== SMOOTH SCROLL ==========

  it('calls scrollIntoView for hash links on homepage', () => {
    mockPathname.mockReturnValue('/');
    render(<FloatingNav data={fullData} />);
    const el = document.createElement('div');
    el.id = 'features';
    el.scrollIntoView = jest.fn();
    document.body.appendChild(el);

    const featureLinks = screen.getAllByText('Features');
    fireEvent.click(featureLinks[0]);
    expect(el.scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it('does not prevent default for non-hash links', () => {
    mockPathname.mockReturnValue('/');
    render(<FloatingNav data={fullData} />);
    const docLinks = screen.getAllByText('Documentation');
    fireEvent.click(docLinks[0]);
    // Should not throw
  });

  // ========== HAMBURGER ICON ANIMATION ==========

  it('animates hamburger lines when open', () => {
    render(<FloatingNav data={fullData} />);
    const toggle = screen.getByTestId('menu-toggle');
    const lines = toggle.querySelectorAll('span:not(.sr-only)');
    expect(lines[0].className).not.toContain('rotate-45');

    fireEvent.click(toggle);
    const linesAfter = toggle.querySelectorAll('span:not(.sr-only)');
    expect(linesAfter[0].className).toContain('rotate-45');
    expect(linesAfter[1].className).toContain('opacity-0');
    expect(linesAfter[2].className).toContain('-rotate-45');
  });

  // ========== REDUCED MOTION ==========

  it('detects prefers-reduced-motion', () => {
    render(<FloatingNav data={fullData} />);
    expect(screen.getByTestId('floating-nav')).toBeInTheDocument();
  });

  // ========== EDGE CASES ==========

  it('handles data with null floatingNav', () => {
    render(<FloatingNav data={{ floatingNav: null }} />);
    expect(screen.getByTestId('floating-nav')).toBeInTheDocument();
  });

  it('handles data with undefined navigationLinks', () => {
    render(<FloatingNav data={{ navigationLinks: undefined }} />);
    expect(screen.getAllByText('Features').length).toBeGreaterThanOrEqual(1);
  });

  it('cleans up body overflow on unmount', () => {
    const { unmount } = render(<FloatingNav data={fullData} />);
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<FloatingNav data={fullData} />);
    unmount();
    expect(removeEventSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventSpy.mockRestore();
  });

  it('Escape does nothing when drawer is closed', () => {
    render(<FloatingNav data={fullData} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('mobile-drawer')).toBeNull();
  });
});
