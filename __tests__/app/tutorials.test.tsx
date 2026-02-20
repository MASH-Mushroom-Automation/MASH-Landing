import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TutorialsPage from '@/app/documentation/tutorials/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/documentation/tutorials',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('TutorialsPage', () => {
  it('renders heading', () => {
    render(<TutorialsPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Tutorials & Guides' })).toBeInTheDocument();
  });

  it('renders breadcrumb navigation', () => {
    render(<TutorialsPage />);
    const breadcrumbDoc = screen.getAllByText('Documentation');
    expect(breadcrumbDoc.length).toBeGreaterThanOrEqual(1);
    // Tutorials text in breadcrumbs
    const tutorialsTexts = screen.getAllByText('Tutorials');
    expect(tutorialsTexts.length).toBeGreaterThanOrEqual(1);
  });

  it('renders category filter buttons', () => {
    render(<TutorialsPage />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    const gettingStartedButtons = screen.getAllByText('Getting Started');
    expect(gettingStartedButtons.length).toBeGreaterThanOrEqual(1);
    const hardwareTexts = screen.getAllByText('Hardware');
    expect(hardwareTexts.length).toBeGreaterThanOrEqual(1);
  });

  it('renders all tutorial cards', () => {
    render(<TutorialsPage />);
    expect(screen.getByText('Complete Getting Started Guide')).toBeInTheDocument();
    expect(screen.getByText('Setting Up Temperature & Humidity Sensors')).toBeInTheDocument();
    expect(screen.getByText('Creating Climate Automation Rules')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Configuration')).toBeInTheDocument();
    expect(screen.getByText('Creating Custom Growing Recipes')).toBeInTheDocument();
    expect(screen.getByText('Analyzing Your Growing Data')).toBeInTheDocument();
    expect(screen.getByText('Configuring Alert Notifications')).toBeInTheDocument();
    expect(screen.getByText('Integrating with Third-Party Systems')).toBeInTheDocument();
  });

  it('renders difficulty badges', () => {
    render(<TutorialsPage />);
    const beginnerBadges = screen.getAllByText('Beginner');
    expect(beginnerBadges.length).toBeGreaterThan(0);
    const intermediateBadges = screen.getAllByText('Intermediate');
    expect(intermediateBadges.length).toBeGreaterThan(0);
    const advancedBadges = screen.getAllByText('Advanced');
    expect(advancedBadges.length).toBeGreaterThan(0);
  });

  it('renders read time for tutorials', () => {
    render(<TutorialsPage />);
    // Multiple tutorials have these read times
    const fifteenMin = screen.getAllByText('15 min');
    expect(fifteenMin.length).toBeGreaterThanOrEqual(1);
    const tenMin = screen.getAllByText('10 min');
    expect(tenMin.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Read Tutorial links', () => {
    render(<TutorialsPage />);
    const readLinks = screen.getAllByText('Read Tutorial');
    expect(readLinks.length).toBe(8);
  });

  it('renders contribute CTA', () => {
    render(<TutorialsPage />);
    expect(screen.getByText('Want to contribute a tutorial?')).toBeInTheDocument();
    expect(screen.getByText('Contribute on GitHub')).toBeInTheDocument();
  });
});
