import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Sun: (props: any) => <svg data-testid="sun-icon" {...props} />,
  Moon: (props: any) => <svg data-testid="moon-icon" {...props} />,
}));

// We need to control the useTheme mock per test
const mockSetTheme = jest.fn();
let mockTheme = 'dark';
let mockResolvedTheme: string | undefined = undefined;

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
    themes: ['light', 'dark'],
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockTheme = 'dark';
    mockResolvedTheme = undefined;
    mockSetTheme.mockClear();
  });

  it('renders a button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has proper aria-label for dark mode', () => {
    mockTheme = 'dark';
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('has proper aria-label for light mode', () => {
    mockTheme = 'light';
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('shows Sun icon in dark mode', () => {
    mockTheme = 'dark';
    render(<ThemeToggle />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('shows Moon icon in light mode', () => {
    mockTheme = 'light';
    render(<ThemeToggle />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('toggles from dark to light on click', async () => {
    mockTheme = 'dark';
    const user = userEvent.setup();
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('toggles from light to dark on click', async () => {
    mockTheme = 'light';
    const user = userEvent.setup();
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('has proper transition classes', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('transition-colors');
  });

  it('has hover styling classes', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('hover:bg-gray-100');
  });

  it('has padding classes', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('p-2');
  });

  it('handles system theme resolved to dark', async () => {
    mockTheme = 'system';
    mockResolvedTheme = 'dark';
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    await user.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('handles system theme resolved to light', async () => {
    mockTheme = 'system';
    mockResolvedTheme = 'light';
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    await user.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
