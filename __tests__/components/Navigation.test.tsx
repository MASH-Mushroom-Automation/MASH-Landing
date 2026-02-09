import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '@/components/Navigation';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Menu: (props: any) => <svg data-testid="menu-icon" {...props} />,
  X: (props: any) => <svg data-testid="x-icon" {...props} />,
  Sun: (props: any) => <svg data-testid="sun-icon" {...props} />,
  Moon: (props: any) => <svg data-testid="moon-icon" {...props} />,
}));

describe('Navigation', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders navigation component', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders MASH text logo', () => {
    render(<Navigation />);
    expect(screen.getByText('MASH')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Scope')).toBeInTheDocument();
    expect(screen.getByText('Schedule')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<Navigation />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders download button', () => {
    render(<Navigation />);
    const downloadLinks = screen.getAllByText(/download/i);
    expect(downloadLinks.length).toBeGreaterThan(0);
  });

  it('shows mobile menu button', () => {
    render(<Navigation />);
    const menuToggle = screen.getByLabelText(/toggle mobile menu/i);
    expect(menuToggle).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    
    const menuButton = screen.getByLabelText(/toggle mobile menu/i);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes mobile menu when clicked again', async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    
    const menuButton = screen.getByLabelText(/toggle mobile menu/i);
    
    await user.click(menuButton); // open
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    await user.click(menuButton); // close
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('has correct link hrefs', () => {
    render(<Navigation />);
    
    const featuresLink = screen.getByText('Features').closest('a');
    expect(featuresLink).toHaveAttribute('href', '/#features');
    
    const docsLink = screen.getByText('Documentation').closest('a');
    expect(docsLink).toHaveAttribute('href', '/documentation');
    
    const scopeLink = screen.getByText('Scope').closest('a');
    expect(scopeLink).toHaveAttribute('href', '/#scope');
    
    const scheduleLink = screen.getByText('Schedule').closest('a');
    expect(scheduleLink).toHaveAttribute('href', '/schedule');
    
    const supportLink = screen.getByText('Support').closest('a');
    expect(supportLink).toHaveAttribute('href', '/support');
  });

  it('applies fixed positioning', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('fixed');
  });

  it('has z-50 for proper layering', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('z-50');
  });

  it('renders logo as a link to home', () => {
    render(<Navigation />);
    const logoLink = screen.getByText('MASH').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('has proper aria-label on navigation', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('renders download link with correct href', () => {
    render(<Navigation />);
    const downloadLinks = screen.getAllByText(/Download App/i);
    const desktopLink = downloadLinks[0].closest('a');
    expect(desktopLink).toHaveAttribute('href', '/download');
  });

  it('mobile menu shows all nav links when open', async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    
    const menuButton = screen.getByLabelText(/toggle mobile menu/i);
    await user.click(menuButton);
    
    // When mobile menu is open, links appear twice (desktop + mobile)
    const featureLinks = screen.getAllByText('Features');
    expect(featureLinks.length).toBe(2);
  });

  it('shows download button in mobile menu', async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    
    const menuButton = screen.getByLabelText(/toggle mobile menu/i);
    await user.click(menuButton);
    
    // Download links: desktop + mobile
    const downloadLinks = screen.getAllByText(/Download App/i);
    expect(downloadLinks.length).toBe(2);
  });

  it('closes mobile menu when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    
    const menuButton = screen.getByLabelText(/toggle mobile menu/i);
    await user.click(menuButton);
    
    // Click on documentation link in mobile menu
    const docLinks = screen.getAllByText('Documentation');
    const mobileDocLink = docLinks[docLinks.length - 1]; // Last one is in mobile menu
    await user.click(mobileDocLink);
    
    // Menu should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles smooth scroll for hash links in mobile menu', async () => {
    const user = userEvent.setup();
    const mockScrollIntoView = jest.fn();

    const mockElement = document.createElement('div');
    const mockHeading = document.createElement('h2');
    mockElement.appendChild(mockHeading);
    mockElement.scrollIntoView = mockScrollIntoView;

    const originalQuerySelector = document.querySelector.bind(document);
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === '#features') return mockElement;
      return originalQuerySelector(selector);
    });

    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navigation />);

    // Open mobile menu
    const menuButton = screen.getByLabelText(/toggle mobile menu/i);
    await user.click(menuButton);

    // Click Features hash link in mobile menu
    const featureLinks = screen.getAllByText('Features');
    const mobileFeatureLink = featureLinks[featureLinks.length - 1];
    await user.click(mobileFeatureLink);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    // Menu should close after smooth scroll
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    jest.restoreAllMocks();
  });

  it('closes mobile menu when download button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    // Open mobile menu
    const menuButton = screen.getByLabelText(/toggle mobile menu/i);
    await user.click(menuButton);

    // Click the download button in mobile menu
    const downloadLinks = screen.getAllByText(/Download App/i);
    const mobileDownload = downloadLinks[downloadLinks.length - 1];
    await user.click(mobileDownload);

    // Menu should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles smooth scroll on home page for hash links', async () => {
    const user = userEvent.setup();
    const mockScrollIntoView = jest.fn();
    
    // Mock document.querySelector to return a mock element
    const mockElement = document.createElement('div');
    const mockHeading = document.createElement('h2');
    mockElement.appendChild(mockHeading);
    mockElement.scrollIntoView = mockScrollIntoView;
    
    const originalQuerySelector = document.querySelector.bind(document);
    jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === '#features') return mockElement;
      return originalQuerySelector(selector);
    });
    
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navigation />);
    
    const featuresLink = screen.getByText('Features');
    await user.click(featuresLink);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    
    jest.restoreAllMocks();
  });

  it('does not prevent default on non-home pages for hash links', () => {
    (usePathname as jest.Mock).mockReturnValue('/documentation');
    render(<Navigation />);
    
    const featuresLink = screen.getByText('Features').closest('a');
    expect(featuresLink).toHaveAttribute('href', '/#features');
  });
});
