import React from 'react';
import { render, screen } from '@testing-library/react';
import SupportPage from '@/app/support/page';

// Mock layout and icons
jest.mock('@/components/layout/PageLayout', () => ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>);
jest.mock('lucide-react', () => ({
  Mail: (props: any) => <svg data-testid="mail-icon" {...props} />,
  MessageCircle: (props: any) => <svg data-testid="message-icon" {...props} />,
  BookOpen: (props: any) => <svg data-testid="book-icon" {...props} />,
  Clock: (props: any) => <svg data-testid="clock-icon" {...props} />,
  MapPin: (props: any) => <svg data-testid="map-icon" {...props} />,
  Calendar: (props: any) => <svg data-testid="calendar-icon" {...props} />,
}));

describe('Support Page', () => {
  it('renders without crashing', () => {
    render(<SupportPage />);
    expect(screen.getByText('How Can We Help?')).toBeInTheDocument();
  });

  it('renders inside PageLayout', () => {
    render(<SupportPage />);
    expect(screen.getByTestId('page-layout')).toBeInTheDocument();
  });

  it('shows support options', () => {
    render(<SupportPage />);
    expect(screen.getByText('Schedule a Meeting')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Community Forum')).toBeInTheDocument();
    expect(screen.getByText('Email Support')).toBeInTheDocument();
  });

  it('has contact form', () => {
    render(<SupportPage />);
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('has send message button', () => {
    render(<SupportPage />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('shows contact info', () => {
    render(<SupportPage />);
    expect(screen.getByText('Response Time')).toBeInTheDocument();
    expect(screen.getByText(/Usually within 24-48 hours/)).toBeInTheDocument();
    expect(screen.getByText('Philippines')).toBeInTheDocument();
  });
});
