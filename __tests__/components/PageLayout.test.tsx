import React from 'react';
import { render, screen } from '@testing-library/react';
import PageLayout from '@/components/layout/PageLayout';

// Mock Navigation component
jest.mock('@/components/Navigation', () => {
  return function MockNavigation() {
    return <nav data-testid="mock-navigation">Navigation</nav>;
  };
});

// Mock Footer component
jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="mock-footer">Footer</footer>;
  };
});

describe('PageLayout', () => {
  it('renders children content', () => {
    render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Navigation component', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );
    expect(screen.getByTestId('mock-navigation')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('wraps content in main element', () => {
    render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toContainElement(screen.getByText('Test Content'));
  });

  it('has min-h-screen on wrapper', () => {
    const { container } = render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('min-h-screen');
  });

  it('has flex-col layout', () => {
    const { container } = render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain('flex');
    expect(wrapper?.className).toContain('flex-col');
  });

  it('main element has flex-grow', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );
    const main = screen.getByRole('main');
    expect(main.className).toContain('flex-grow');
  });

  it('main element has top padding for fixed navigation', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );
    const main = screen.getByRole('main');
    expect(main.className).toContain('pt-16');
  });

  it('renders Navigation before main content', () => {
    const { container } = render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );
    const wrapper = container.firstElementChild;
    const children = wrapper?.children;
    if (children) {
      expect(children[0].tagName).toBe('NAV');
      expect(children[1].tagName).toBe('MAIN');
      expect(children[2].tagName).toBe('FOOTER');
    }
  });

  it('renders with multiple children', () => {
    render(
      <PageLayout>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </PageLayout>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});
