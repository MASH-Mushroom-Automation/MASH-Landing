import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

describe('Card', () => {
  it('renders with children', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveTextContent('Content');
  });

  it('applies custom className', () => {
    render(<Card data-testid="card" className="custom">Content</Card>);
    expect(screen.getByTestId('card').className).toContain('custom');
  });

  it('has displayName', () => {
    expect(Card.displayName).toBe('Card');
  });
});

describe('CardHeader', () => {
  it('renders', () => {
    render(<CardHeader data-testid="h">Header</CardHeader>);
    expect(screen.getByTestId('h')).toHaveTextContent('Header');
  });
  it('has displayName', () => {
    expect(CardHeader.displayName).toBe('CardHeader');
  });
});

describe('CardTitle', () => {
  it('renders', () => {
    render(<CardTitle data-testid="t">Title</CardTitle>);
    expect(screen.getByTestId('t')).toHaveTextContent('Title');
  });
  it('has displayName', () => {
    expect(CardTitle.displayName).toBe('CardTitle');
  });
});

describe('CardDescription', () => {
  it('renders', () => {
    render(<CardDescription data-testid="d">Desc</CardDescription>);
    expect(screen.getByTestId('d')).toHaveTextContent('Desc');
  });
  it('has displayName', () => {
    expect(CardDescription.displayName).toBe('CardDescription');
  });
});

describe('CardContent', () => {
  it('renders', () => {
    render(<CardContent data-testid="c">Body</CardContent>);
    expect(screen.getByTestId('c')).toHaveTextContent('Body');
  });
  it('has displayName', () => {
    expect(CardContent.displayName).toBe('CardContent');
  });
});

describe('CardFooter', () => {
  it('renders', () => {
    render(<CardFooter data-testid="f">Foot</CardFooter>);
    expect(screen.getByTestId('f')).toHaveTextContent('Foot');
  });
  it('has displayName', () => {
    expect(CardFooter.displayName).toBe('CardFooter');
  });
});
