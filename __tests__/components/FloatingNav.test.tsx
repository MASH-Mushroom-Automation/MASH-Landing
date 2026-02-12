import { render, screen, fireEvent } from '@testing-library/react';
import FloatingNav from '@/components/FloatingNav';

const mockData = {
  navigationLinks: [
    { label: 'Features', href: '/#features' },
    { label: 'Demo', href: '/#demo' },
  ],
  floatingNav: {
    enabled: true,
    transparentUntilScroll: false,
    backdrop: true,
    logoText: 'MASH Test',
    logoHref: '/',
    ctaButtons: [{ text: 'Get App', href: '/download', variant: 'default' }],
  },
  brandPalette: { brandName: 'MASH' },
};

describe('FloatingNav', () => {
  it('renders without crashing and shows brand text', () => {
    render(<FloatingNav data={mockData} />);
    expect(screen.getByTestId('floating-nav')).toBeInTheDocument();
    expect(screen.getByText('MASH Test')).toBeInTheDocument();
  });

  it('renders navigation links and CTA', () => {
    render(<FloatingNav data={mockData} />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Get App')).toBeInTheDocument();
  });

  it('toggles mobile drawer when menu button clicked', () => {
    render(<FloatingNav data={mockData} />);
    const toggle = screen.getByTestId('menu-toggle');
    expect(toggle).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument();
  });
});
