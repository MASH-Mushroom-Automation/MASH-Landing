// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

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
