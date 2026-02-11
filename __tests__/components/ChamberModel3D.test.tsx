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

  // Sanity CMS integration tests
  it('uses default local model path when no modelUrl provided', () => {
    render(<ChamberModel3D />);
    // Component should render without crashing using default /assets/Chamber.glb
    expect(screen.getByTestId('chamber-model-container')).toBeInTheDocument();
  });

  it('accepts a Sanity CDN modelUrl', () => {
    const sanityUrl = 'https://cdn.sanity.io/files/gerattrr/production/abc123.glb';
    render(<ChamberModel3D modelUrl={sanityUrl} />);
    expect(screen.getByTestId('chamber-model-container')).toBeInTheDocument();
  });

  it('accepts a local modelUrl override', () => {
    render(<ChamberModel3D modelUrl="/assets/custom-model.glb" />);
    expect(screen.getByTestId('chamber-model-container')).toBeInTheDocument();
  });

  it('renders with all props combined', () => {
    render(
      <ChamberModel3D
        className="test-class"
        autoRotate={false}
        height="600px"
        modelUrl="https://cdn.sanity.io/files/test/production/model.glb"
      />
    );
    const container = screen.getByTestId('chamber-model-container');
    expect(container).toHaveClass('test-class');
    expect(container.style.height).toBe('600px');
  });
});
