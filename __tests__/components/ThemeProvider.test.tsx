import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/providers/theme-provider';

// Override the global next-themes mock for this test
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="theme-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
    themes: ['light', 'dark'],
  }),
}));

describe('ThemeProvider', () => {
  it('renders children', () => {
    render(
      <ThemeProvider>
        <div>Child content</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('wraps children with NextThemesProvider', () => {
    render(
      <ThemeProvider>
        <div>Wrapped</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
  });

  it('passes through props to NextThemesProvider', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div>Content</div>
      </ThemeProvider>
    );
    const provider = screen.getByTestId('theme-provider');
    const props = JSON.parse(provider.getAttribute('data-props') || '{}');
    expect(props.attribute).toBe('class');
    expect(props.defaultTheme).toBe('dark');
  });

  it('renders multiple children', () => {
    render(
      <ThemeProvider>
        <div>First</div>
        <div>Second</div>
      </ThemeProvider>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('supports enableSystem prop', () => {
    render(
      <ThemeProvider enableSystem>
        <div>Content</div>
      </ThemeProvider>
    );
    const provider = screen.getByTestId('theme-provider');
    const props = JSON.parse(provider.getAttribute('data-props') || '{}');
    expect(props.enableSystem).toBe(true);
  });
});
