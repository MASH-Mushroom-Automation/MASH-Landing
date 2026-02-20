import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQPage from '@/app/faq/page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/faq',
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})));

describe('FAQPage', () => {
  it('renders heading', () => {
    render(<FAQPage />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<FAQPage />);
    expect(screen.getByPlaceholderText('Search FAQs...')).toBeInTheDocument();
  });

  it('renders FAQ categories', () => {
    render(<FAQPage />);
    expect(screen.getByRole('heading', { name: 'Getting Started' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mobile App' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Features' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Data & Security' })).toBeInTheDocument();
  });

  it('filters FAQs based on search', () => {
    render(<FAQPage />);
    const input = screen.getByPlaceholderText('Search FAQs...');
    fireEvent.change(input, { target: { value: 'hardware' } });
    expect(screen.getByText(/What hardware do I need/i)).toBeInTheDocument();
  });

  it('shows no results message for unmatched search', () => {
    render(<FAQPage />);
    const input = screen.getByPlaceholderText('Search FAQs...');
    fireEvent.change(input, { target: { value: 'xyznonexistent' } });
    expect(screen.getByText(/No FAQs found/i)).toBeInTheDocument();
  });

  it('renders accordion toggle', () => {
    render(<FAQPage />);
    const question = screen.getByText(/What hardware do I need/i);
    const button = question.closest('button')!;
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders Contact Support CTA', () => {
    render(<FAQPage />);
    const link = screen.getByText('Contact Support');
    expect(link.closest('a')).toHaveAttribute('href', '/support');
  });
});
