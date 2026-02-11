import { render, screen } from '@testing-library/react';
import ChamberModel3D from '@/components/ChamberModel3D';

// The global jest.setup.js mocks @react-three/fiber and @react-three/drei

describe('ChamberModel3D', () => {
  it('renders the container with data-testid', () => {
    render(<ChamberModel3D />);
    expect(screen.getByTestId('chamber-model-container')).toBeInTheDocument();
  });

  it('applies default height of 400px', () => {
    render(<ChamberModel3D />);
    const container = screen.getByTestId('chamber-model-container');
    expect(container.style.height).toBe('400px');
  });

  it('applies custom height', () => {
    render(<ChamberModel3D height="500px" />);
    const container = screen.getByTestId('chamber-model-container');
    expect(container.style.height).toBe('500px');
  });

  it('applies custom className', () => {
    render(<ChamberModel3D className="custom-class" />);
    const container = screen.getByTestId('chamber-model-container');
    expect(container).toHaveClass('custom-class');
  });

  it('renders the Three.js canvas', () => {
    render(<ChamberModel3D />);
    // The mock Canvas gets data-testid from component props (chamber-canvas overrides r3f-canvas)
    expect(screen.getByTestId('chamber-canvas')).toBeInTheDocument();
  });

  it('renders with autoRotate prop', () => {
    render(<ChamberModel3D autoRotate={false} />);
    expect(screen.getByTestId('chamber-model-container')).toBeInTheDocument();
  });

  it('renders orbit controls', () => {
    render(<ChamberModel3D />);
    expect(screen.getByTestId('orbit-controls')).toBeInTheDocument();
  });

  it('renders environment lighting', () => {
    render(<ChamberModel3D />);
    expect(screen.getByTestId('environment')).toBeInTheDocument();
  });

  it('renders contact shadows', () => {
    render(<ChamberModel3D />);
    expect(screen.getByTestId('contact-shadows')).toBeInTheDocument();
  });

  it('has full width by default', () => {
    render(<ChamberModel3D />);
    const container = screen.getByTestId('chamber-model-container');
    expect(container).toHaveClass('w-full');
  });
});
