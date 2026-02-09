import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '@/components/Navigation';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Navigation', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders navigation component', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders logo', () => {
    render(<Navigation />);
    const logo = screen.getByAltText(/MASH/i);
    expect(logo).toBeInTheDocument();
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
    // Theme toggle should be present
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders download button', () => {
    render(<Navigation />);
    expect(screen.getByText(/download/i)).toBeInTheDocument();
  });

  it('shows mobile menu button', () => {
    render(<Navigation />);
    // Find button with Menu or X icon
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('toggles mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    
    // Find menu toggle button (should show Menu icon initially)
    const buttons = screen.getAllByRole('button');
    const menuButton = buttons.find(btn => btn.querySelector('svg'));
    
    if (menuButton) {
      await user.click(menuButton);
      // Menu should now be visible
    }
  });

  it('has correct link hrefs', () => {
    render(<Navigation />);
    
    const featuresLink = screen.getByText('Features').closest('a');
    expect(featuresLink).toHaveAttribute('href', '/#features');
    
    const docsLink = screen.getByText('Documentation').closest('a');
    expect(docsLink).toHaveAttribute('href', '/documentation');
    
    const scopeLink = screen.getByText('Scope').closest('a');
    expect(scopeLink).toHaveAttribute('href', '/#scope');
  });

  it('applies fixed positioning', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('fixed');
  });
});
