import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Capture IntersectionObserver instances
let observerInstances: Array<{
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
}> = [];

beforeEach(() => {
  observerInstances = [];

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
      observerInstances.push({
        callback,
        options,
        observe: this.observe,
        unobserve: this.unobserve,
        disconnect: this.disconnect,
      });
    }
  }
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

describe('ScrollReveal', () => {
  it('renders children', () => {
    render(<ScrollReveal><p>Hello</p></ScrollReveal>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ScrollReveal className="custom">Content</ScrollReveal>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('applies transition classes', () => {
    const { container } = render(<ScrollReveal>Content</ScrollReveal>);
    expect(container.firstChild).toHaveClass('transition-all');
    expect(container.firstChild).toHaveClass('duration-700');
  });

  it('sets transitionDelay from delay prop', () => {
    const { container } = render(<ScrollReveal delay={200}>Content</ScrollReveal>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.transitionDelay).toBe('200ms');
  });

  it('starts hidden for fade-up variant', () => {
    const { container } = render(<ScrollReveal variant="fade-up">Content</ScrollReveal>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('opacity-0');
    expect(el.className).toContain('translate-y-8');
  });

  it('observes the element', () => {
    render(<ScrollReveal>Content</ScrollReveal>);
    expect(observerInstances.length).toBeGreaterThan(0);
    expect(observerInstances[0].observe).toHaveBeenCalled();
  });

  it('accepts all variant props', () => {
    const variants = ['fade-up', 'fade-in', 'fade-left', 'fade-right', 'scale-up'] as const;
    for (const variant of variants) {
      const { unmount } = render(<ScrollReveal variant={variant}>V</ScrollReveal>);
      unmount();
    }
  });

  it('becomes visible when intersection is triggered (once=true)', () => {
    const { container } = render(<ScrollReveal variant="fade-up" once={true}>Content</ScrollReveal>);
    const el = container.firstChild as HTMLElement;

    // Initially hidden
    expect(el.className).toContain('opacity-0');

    // Trigger intersection
    const observer = observerInstances[0];
    act(() => {
      observer.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    // Now visible
    expect(el.className).toContain('opacity-100');
    expect(el.className).toContain('translate-y-0');
    // Should have called unobserve since once=true
    expect(observer.unobserve).toHaveBeenCalled();
  });

  it('hides again when not intersecting with once=false', () => {
    const { container } = render(<ScrollReveal variant="fade-up" once={false}>Content</ScrollReveal>);
    const el = container.firstChild as HTMLElement;

    const observer = observerInstances[0];

    // Trigger intersection (visible)
    act(() => {
      observer.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(el.className).toContain('opacity-100');

    // Trigger un-intersection (hidden again)
    act(() => {
      observer.callback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(el.className).toContain('opacity-0');
    // Should NOT have called unobserve since once=false
    expect(observer.unobserve).not.toHaveBeenCalled();
  });

  it('passes custom threshold to IntersectionObserver', () => {
    render(<ScrollReveal threshold={0.5}>Content</ScrollReveal>);
    const observer = observerInstances[0];
    expect(observer.options?.threshold).toBe(0.5);
  });

  it('uses default threshold of 0.1', () => {
    render(<ScrollReveal>Content</ScrollReveal>);
    const observer = observerInstances[0];
    expect(observer.options?.threshold).toBe(0.1);
  });

  it('does nothing when not intersecting with once=true (default)', () => {
    const { container } = render(<ScrollReveal variant="fade-up">Content</ScrollReveal>);
    const el = container.firstChild as HTMLElement;
    const observer = observerInstances[0];

    // Trigger not-intersecting while once=true — implicit else branch, no state change
    act(() => {
      observer.callback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    // Should remain hidden (no change)
    expect(el.className).toContain('opacity-0');
    expect(observer.unobserve).not.toHaveBeenCalled();
  });
});
