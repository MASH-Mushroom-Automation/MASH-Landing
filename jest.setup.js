// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock environment variables
process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud'
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
