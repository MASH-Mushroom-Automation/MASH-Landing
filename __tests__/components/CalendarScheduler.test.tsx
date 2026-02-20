import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CalendarScheduler from '@/components/CalendarScheduler';

// Capture MutationObserver instances to trigger callbacks
let mutationCallback: MutationCallback | null = null;

class MockMutationObserver {
  callback: MutationCallback;
  constructor(callback: MutationCallback) {
    this.callback = callback;
    mutationCallback = callback;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => [] as MutationRecord[]);
}
vi.stubGlobal('MutationObserver', MockMutationObserver);

describe('CalendarScheduler', () => {
  beforeEach(() => {
    mutationCallback = null;
    document.documentElement.classList.remove('dark');
  });

  it('renders loading state', () => {
    render(<CalendarScheduler />);
    expect(screen.getByText('Loading calendar...')).toBeInTheDocument();
  });

  it('renders iframe with cal.com URL', () => {
    const { container } = render(<CalendarScheduler eventType="30min" />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe?.getAttribute('src')).toContain('cal.com');
    expect(iframe?.getAttribute('src')).toContain('mash-mushroom');
  });

  it('uses correct event type slug', () => {
    const { container } = render(<CalendarScheduler eventType="15min" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('15min');
  });

  it('applies theme parameter for explicit dark', () => {
    const { container } = render(<CalendarScheduler theme="dark" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('theme=dark');
  });

  it('applies theme parameter for explicit light', () => {
    const { container } = render(<CalendarScheduler theme="light" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('theme=light');
  });

  it('applies layout parameter', () => {
    const { container } = render(<CalendarScheduler layout="week_view" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('layout=week_view');
  });

  it('adds hideEventTypeDetails param when true', () => {
    const { container } = render(<CalendarScheduler hideEventTypeDetails={true} />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('hideEventTypeDetails=true');
  });

  it('does not add hideEventTypeDetails param when false', () => {
    const { container } = render(<CalendarScheduler hideEventTypeDetails={false} />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).not.toContain('hideEventTypeDetails');
  });

  it('hides loading state when iframe loads', () => {
    const { container } = render(<CalendarScheduler />);
    expect(screen.getByText('Loading calendar...')).toBeInTheDocument();

    const iframe = container.querySelector('iframe')!;
    act(() => {
      fireEvent.load(iframe);
    });

    expect(screen.queryByText('Loading calendar...')).not.toBeInTheDocument();
  });

  it('detects dark theme from document class on initial render', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<CalendarScheduler theme="auto" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('theme=dark');
  });

  it('detects light theme from document class on initial render', () => {
    document.documentElement.classList.remove('dark');
    const { container } = render(<CalendarScheduler theme="auto" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('theme=light');
  });

  it('updates theme via MutationObserver when class changes', () => {
    document.documentElement.classList.remove('dark');
    const { container } = render(<CalendarScheduler theme="auto" />);

    // Initially light
    let iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('theme=light');

    // Simulate class mutation to dark
    document.documentElement.classList.add('dark');
    act(() => {
      if (mutationCallback) {
        mutationCallback(
          [{ attributeName: 'class' } as MutationRecord],
          {} as MutationObserver
        );
      }
    });

    iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('theme=dark');
  });

  it('does not create MutationObserver when theme is not auto', () => {
    mutationCallback = null;
    render(<CalendarScheduler theme="dark" />);
    // MutationObserver constructor is called but the effect should exit early
    // The key is that even if constructor is called, observe should not be called
    // for non-auto theme because the effect returns early
    expect(mutationCallback).toBeNull();
  });

  it('ignores non-class mutation attributes', () => {
    document.documentElement.classList.remove('dark');
    const { container } = render(<CalendarScheduler theme="auto" />);

    // Simulate a non-class mutation
    act(() => {
      if (mutationCallback) {
        mutationCallback(
          [{ attributeName: 'id' } as MutationRecord],
          {} as MutationObserver
        );
      }
    });

    const iframe = container.querySelector('iframe');
    // Should still be light (unchanged)
    expect(iframe?.getAttribute('src')).toContain('theme=light');
  });

  it('updates theme to light via MutationObserver when dark class removed', () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<CalendarScheduler theme="auto" />);

    // Initially dark
    let iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('theme=dark');

    // Remove dark class and trigger mutation
    document.documentElement.classList.remove('dark');
    act(() => {
      if (mutationCallback) {
        mutationCallback(
          [{ attributeName: 'class' } as MutationRecord],
          {} as MutationObserver
        );
      }
    });

    iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toContain('theme=light');
  });
});
