// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock @radix-ui/react-slot
jest.mock('@radix-ui/react-slot', () => {
  const React = require('react')
  const Slot = React.forwardRef((props, ref) => {
    const { children, ...slotProps } = props
    // Find the first valid React element among children (handles [false, <a>] etc.)
    const childArray = React.Children.toArray(children)
    const childElement = childArray.find(c => React.isValidElement(c))
    if (childElement && React.isValidElement(childElement)) {
      const childProps = { ...(childElement.props || {}) }
      const mergedClassName = [slotProps.className, childProps.className].filter(Boolean).join(' ')
      const merged = { ...slotProps, ...childProps, className: mergedClassName || undefined, ref }
      // Include the other non-element children (like text, false, etc.)
      return React.cloneElement(childElement, merged)
    }
    return React.createElement('span', { ...slotProps, ref }, children)
  })
  Slot.displayName = 'Slot'
  return { Slot }
})

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  const React = require('react')
  return new Proxy({}, {
    get: (_, name) => {
      if (name === '__esModule') return true
      const Icon = React.forwardRef((props, ref) =>
        React.createElement('svg', { ...props, ref, 'data-testid': `icon-${String(name)}` })
      )
      Icon.displayName = String(name)
      return Icon
    },
  })
})

// Mock environment variables
process.env.NEXT_PUBLIC_CAL_USERNAME = 'test-user'
process.env.NEXT_PUBLIC_CAL_15MIN_SLUG = '15min'
process.env.NEXT_PUBLIC_CAL_30MIN_SLUG = '30min'
process.env.NEXT_PUBLIC_CAL_1HOUR_SLUG = '1-hour-meeting'
process.env.NEXT_PUBLIC_CAL_PROFILE_URL = 'https://cal.com/test-user'
process.env.NEXT_PUBLIC_CONTACT_EMAIL = 'test@example.com'

// Mock Sanity environment variables
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project'
process.env.NEXT_PUBLIC_SANITY_DATASET = 'production'
process.env.NEXT_PUBLIC_SANITY_API_VERSION = '2024-11-26'
process.env.NEXT_PUBLIC_SANITY_USE_CDN = 'true'
process.env.SANITY_API_READ_TOKEN = 'test-token'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }) => children,
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
    themes: ['light', 'dark'],
  }),
}))

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react')
  const forwardRef = React.forwardRef

  // Create a motion component factory
  const createMotionComponent = (tag) => {
    const Component = forwardRef((props, ref) => {
      const { initial, animate, exit, whileHover, whileInView, whileTap, variants, transition, viewport, style, ...rest } = props
      return React.createElement(tag, { ...rest, ref, style })
    })
    Component.displayName = `motion.${tag}`
    return Component
  }

  const motion = new Proxy({}, {
    get: (_, tag) => createMotionComponent(tag),
  })

  // m is an alias for motion
  const m = new Proxy({}, {
    get: (_, tag) => createMotionComponent(tag),
  })

  return {
    __esModule: true,
    motion,
    m,
    AnimatePresence: ({ children }) => children,
    LazyMotion: ({ children }) => children,
    domAnimation: {},
    useScroll: () => ({
      scrollYProgress: { get: () => 0.5, onChange: jest.fn() },
      scrollXProgress: { get: () => 0 },
    }),
    useTransform: (value, inputRange, outputRange) => {
      if (Array.isArray(outputRange) && outputRange.length > 0) {
        return { get: () => outputRange[Math.floor(outputRange.length / 2)] }
      }
      return { get: () => 0 }
    },
    useMotionValue: (initial) => ({
      get: () => initial,
      set: jest.fn(),
      onChange: jest.fn(),
    }),
    useSpring: (value) => value,
    useInView: () => true,
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
    }),
  }
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}

// Mock ResizeObserver (needed for Three.js canvas)
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock @react-three/fiber
jest.mock('@react-three/fiber', () => {
  const React = require('react')
  return {
    Canvas: ({ children, ...props }) => React.createElement('div', { 'data-testid': 'r3f-canvas', ...props }, children),
    useFrame: jest.fn(),
    useThree: () => ({
      gl: {},
      scene: {},
      camera: {},
      size: { width: 800, height: 600 },
    }),
  }
})

// Mock @react-three/drei
jest.mock('@react-three/drei', () => {
  const React = require('react')
  return {
    OrbitControls: (props) => React.createElement('div', { 'data-testid': 'orbit-controls', ...props }),
    useGLTF: Object.assign(
      () => ({
        scene: {},
        nodes: {},
        materials: {},
      }),
      { preload: jest.fn() }
    ),
    Environment: (props) => React.createElement('div', { 'data-testid': 'environment', ...props }),
    ContactShadows: (props) => React.createElement('div', { 'data-testid': 'contact-shadows', ...props }),
  }
})
