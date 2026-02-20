import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';

describe('SmoothScrollProvider', () => {
  it('renders children', () => {
    render(
      <SmoothScrollProvider>
        <div data-testid="child">Hello</div>
      </SmoothScrollProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('is a passthrough component', () => {
    const { container } = render(
      <SmoothScrollProvider>
        <span>Content</span>
      </SmoothScrollProvider>
    );
    expect(container.querySelector('span')).toHaveTextContent('Content');
  });
});
