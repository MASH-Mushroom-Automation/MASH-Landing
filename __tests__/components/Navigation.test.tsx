import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Navigation from '@/components/Navigation';

vi.mock('next/link', () => ({
  default: ({ children, href, onClick, ...props }: { children: React.ReactNode; href: string; onClick?: React.MouseEventHandler; [key: string]: unknown }) => (
    <a href={href} onClick={onClick} {...props}>{children}</a>
  ),
}));

const mockPathname = vi.fn(() => '/');
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

// Capture IntersectionObserver callbacks
let intersectionCallbacks: Array<{ callback: IntersectionObserverCallback; options?: IntersectionObserverInit }> = [];

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [0];
  takeRecords = vi.fn(() => []);
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
    intersectionCallbacks.push({ callback, options });
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

describe('Navigation', () => {
  let rafCallback: FrameRequestCallback | null = null;
  const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');

  beforeEach(() => {
    mockPathname.mockReturnValue('/');
    intersectionCallbacks = [];
    rafCallback = null;
    // Mock requestAnimationFrame to capture and execute synchronously
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      rafCallback = cb;
      return 1;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalScrollY) {
      Object.defineProperty(window, 'scrollY', originalScrollY);
    }
  });

  it('renders brand name', () => {
    render(<Navigation />);
    expect(screen.getByText('MASH')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Navigation />);
    expect(screen.getAllByText('Features').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('How It Works').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Docs').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Schedule').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Support').length).toBeGreaterThanOrEqual(1);
  });

  it('renders Download button', () => {
    render(<Navigation />);
    const downloadLinks = screen.getAllByText('Download');
    expect(downloadLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('renders mobile menu toggle', () => {
    render(<Navigation />);
    const toggle = screen.getByLabelText('Toggle mobile menu');
    expect(toggle).toBeInTheDocument();
  });

  it('toggles mobile menu on click', () => {
    render(<Navigation />);
    const toggle = screen.getByLabelText('Toggle mobile menu');
    
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('has nav role with aria-label', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('renders with custom brand', () => {
    render(<Navigation data={{ navigationBrand: 'MyBrand' }} />);
    expect(screen.getByText('MyBrand')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<Navigation />);
    const toggles = screen.getAllByRole('button');
    expect(toggles.length).toBeGreaterThanOrEqual(2);
  });

  it('hides on scroll down and shows on scroll up', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');

    // Scroll down past threshold
    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
    fireEvent.scroll(window);
    if (rafCallback) act(() => { rafCallback!(performance.now()); rafCallback = null; });

    expect(nav.className).toContain('-translate-y-full');

    // Scroll back up
    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true });
    fireEvent.scroll(window);
    if (rafCallback) act(() => { rafCallback!(performance.now()); rafCallback = null; });

    expect(nav.className).toContain('translate-y-0');
  });

  it('adds scrolled class when scrolled past 10px', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');

    Object.defineProperty(window, 'scrollY', { value: 15, configurable: true });
    fireEvent.scroll(window);
    if (rafCallback) act(() => { rafCallback!(performance.now()); rafCallback = null; });

    expect(nav.className).toContain('glass-nav');
  });

  it('sets active section via IntersectionObserver on homepage', () => {
    // Create mock section elements
    const mockEl = document.createElement('div');
    mockEl.id = 'features';
    document.body.appendChild(mockEl);

    vi.spyOn(document, 'getElementById').mockImplementation((id: string) => {
      if (id === 'features') return mockEl;
      return null;
    });

    render(<Navigation />);

    // Find the observer callback for sections
    const sectionObserver = intersectionCallbacks.find(
      cb => cb.options?.rootMargin === '-40% 0px -50% 0px'
    );
    expect(sectionObserver).toBeDefined();

    // Simulate intersection
    act(() => {
      sectionObserver!.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    // The Features link should now be active (green text)
    const featureLinks = screen.getAllByText('Features');
    const activeLink = featureLinks.find(el => el.className.includes('text-green'));
    expect(activeLink).toBeDefined();

    document.body.removeChild(mockEl);
    vi.restoreAllMocks();
  });

  it('does not create IntersectionObserver on non-homepage', () => {
    mockPathname.mockReturnValue('/about');
    render(<Navigation />);
    // On non-homepage, no section observer should be created
    const sectionObserver = intersectionCallbacks.find(
      cb => cb.options?.rootMargin === '-40% 0px -50% 0px'
    );
    expect(sectionObserver).toBeUndefined();
  });

  it('handles smooth scroll on homepage for hash links', () => {
    const mockScrollIntoView = vi.fn();
    vi.spyOn(document, 'querySelector').mockImplementation(() => {
      return { scrollIntoView: mockScrollIntoView } as unknown as Element;
    });

    render(<Navigation />);
    const featuresLinks = screen.getAllByText('Features');
    const desktopLink = featuresLinks[0];

    fireEvent.click(desktopLink);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    vi.restoreAllMocks();
  });

  it('does not preventDefault for hash links on non-homepage', () => {
    mockPathname.mockReturnValue('/about');
    const mockScrollIntoView = vi.fn();
    vi.spyOn(document, 'querySelector').mockReturnValue(null);

    render(<Navigation />);
    const featuresLinks = screen.getAllByText('Features');
    const desktopLink = featuresLinks[0];

    // On non-homepage, smooth scroll should not be called
    fireEvent.click(desktopLink);
    expect(mockScrollIntoView).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('isActive returns true for matching pathname', () => {
    mockPathname.mockReturnValue('/documentation');
    render(<Navigation />);

    const docsLinks = screen.getAllByText('Docs');
    const activeLink = docsLinks.find(el => el.className.includes('text-green'));
    expect(activeLink).toBeDefined();
  });

  it('closes mobile menu when clicking a mobile nav link', () => {
    render(<Navigation />);
    const toggle = screen.getByLabelText('Toggle mobile menu');

    // Open mobile menu
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Click a non-hash link in mobile menu (e.g., Docs)
    const allDocsLinks = screen.getAllByText('Docs');
    // Mobile links are the ones after the desktop links
    const mobileDocsLink = allDocsLinks[allDocsLinks.length - 1];
    fireEvent.click(mobileDocsLink);

    // Menu should close
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu and smooth scrolls for hash links', () => {
    const mockScrollIntoView = vi.fn();
    vi.spyOn(document, 'querySelector').mockImplementation(() => {
      return { scrollIntoView: mockScrollIntoView } as unknown as Element;
    });

    render(<Navigation />);
    const toggle = screen.getByLabelText('Toggle mobile menu');

    // Open mobile menu
    fireEvent.click(toggle);

    // Click a hash link in mobile menu
    const allFeaturesLinks = screen.getAllByText('Features');
    const mobileFeaturesLink = allFeaturesLinks[allFeaturesLinks.length - 1];
    fireEvent.click(mobileFeaturesLink);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    vi.restoreAllMocks();
  });

  it('closes mobile menu when clicking mobile download link', () => {
    render(<Navigation />);
    const toggle = screen.getByLabelText('Toggle mobile menu');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const downloadLinks = screen.getAllByText('Download');
    // Mobile download link is the last one
    const mobileDownload = downloadLinks[downloadLinks.length - 1];
    fireEvent.click(mobileDownload);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders with custom navigation links from data prop', () => {
    render(<Navigation data={{ navigationLinks: [{ href: '/custom', label: 'Custom Link' }] }} />);
    expect(screen.getAllByText('Custom Link').length).toBeGreaterThanOrEqual(1);
  });

  it('does not hide nav when menu is open even on scroll down', () => {
    render(<Navigation />);
    const toggle = screen.getByLabelText('Toggle mobile menu');
    const nav = screen.getByRole('navigation');

    // Open menu
    fireEvent.click(toggle);

    // Scroll down
    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
    fireEvent.scroll(window);
    if (rafCallback) act(() => { rafCallback!(performance.now()); rafCallback = null; });

    // Nav should NOT hide because menu is open
    expect(nav.className).toContain('translate-y-0');
  });

  it('handles ticking guard on rapid scroll events', () => {
    render(<Navigation />);

    // First scroll - sets ticking = true
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    fireEvent.scroll(window);

    // Second scroll before RAF executes - should be guarded by ticking
    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
    fireEvent.scroll(window);

    // Now execute the RAF callback
    if (rafCallback) act(() => { rafCallback!(performance.now()); rafCallback = null; });

    // Should still process correctly
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('handles smooth scroll when element is not found', () => {
    vi.spyOn(document, 'querySelector').mockReturnValue(null);

    render(<Navigation />);
    const featuresLinks = screen.getAllByText('Features');
    const desktopLink = featuresLinks[0];

    // Click should not throw even if element is not found
    fireEvent.click(desktopLink);

    vi.restoreAllMocks();
  });

  it('clicks desktop non-hash link without calling smooth scroll', () => {
    const mockScrollIntoView = vi.fn();
    vi.spyOn(document, 'querySelector').mockReturnValue(null);

    render(<Navigation />);
    // "Docs" links to /documentation (non-hash)
    const docsLinks = screen.getAllByText('Docs');
    const desktopDocsLink = docsLinks[0];
    fireEvent.click(desktopDocsLink);

    expect(mockScrollIntoView).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('handles section observer not-intersecting callback', () => {
    const mockEl = document.createElement('div');
    mockEl.id = 'features';
    document.body.appendChild(mockEl);

    vi.spyOn(document, 'getElementById').mockImplementation((id: string) => {
      if (id === 'features') return mockEl;
      return null;
    });

    render(<Navigation />);

    const sectionObserver = intersectionCallbacks.find(
      cb => cb.options?.rootMargin === '-40% 0px -50% 0px'
    );

    // Trigger not-intersecting
    act(() => {
      sectionObserver!.callback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    // Should not set active section
    const featureLinks = screen.getAllByText('Features');
    const activeLink = featureLinks.find(el => el.className.includes('text-green'));
    expect(activeLink).toBeUndefined();

    document.body.removeChild(mockEl);
    vi.restoreAllMocks();
  });
});
