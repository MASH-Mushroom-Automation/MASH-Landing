# MASH Landing Page

Landing Page for MASH Mushroom Automation, includes scopes and details about project as well as a bridge for mobile application download.

## Overview

This is a professional Next.js landing page for the MASH (Mushroom Automation System Hub) project. The website showcases the features, capabilities, and documentation for the MASH mushroom cultivation automation platform.

## Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS
- **Performance Optimized**: Static site generation for fast loading times
- **SEO Ready**: Proper meta tags and semantic HTML structure

## Sections

1. **Hero Section**: Eye-catching introduction with video background support
2. **Features**: Comprehensive overview of MASH capabilities
3. **Demo**: Interactive video demonstrations of the system
4. **Documentation**: Links to guides and API documentation
5. **Scope**: Detailed breakdown of project capabilities and architecture
6. **Support**: Help resources and FAQ
7. **Download**: Mobile app download links for iOS and Android

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
/app
  layout.tsx      # Root layout with metadata
  page.tsx        # Main landing page
  globals.css     # Global styles

/components
  Navigation.tsx           # Header navigation
  HeroSection.tsx         # Hero section with video
  FeaturesSection.tsx     # Features showcase
  DemoSection.tsx         # Demo videos
  DocumentationSection.tsx # Documentation links
  ScopeSection.tsx        # Project scope
  SupportSection.tsx      # Support and FAQ
  DownloadSection.tsx     # App download CTAs
  Footer.tsx              # Footer component

/public/assets
  /images         # Logo, screenshots, images
  /icons          # Icon files
  /fonts          # Custom fonts
  /videos         # Demo and promotional videos
```

## Adding Assets

**Important**: All media assets are now hosted on Cloudinary CDN to reduce GitHub traffic and improve performance.

### Setup Cloudinary

1. **Environment Variables**: The `.env.local` file has been configured with your Cloudinary credentials
2. **Upload Assets**: Use one of these methods to upload your assets:

   **Method 1 - Automated Script (Recommended)**:
   ```bash
   npm run upload:cloudinary
   ```

   **Method 2 - Cloudinary Web Dashboard**:
   - Log in to [Cloudinary Console](https://cloudinary.com/console)
   - Upload files to the `mash/` folder
   - See `CLOUDINARY_SETUP.md` for detailed instructions

3. **Verify**: Run `npm run dev` and check that all images and videos load correctly

### Asset Requirements

Upload these files to Cloudinary under the `mash/` folder:

- **Images**:
  - `logo.png` - MASH logo (58x62px recommended)
  - `poster.png` or `poster.jpg` - Video thumbnail

- **Videos**:
  - `demo.mp4` / `demo.webm` - Background video for hero section
  - `overview.mp4` / `overview.webm` - System overview
  - `setup.mp4` / `setup.webm` - Installation guide
  - `mobile.mp4` / `mobile.webm` - Mobile app demo

See `CLOUDINARY_SETUP.md` for complete upload instructions.

## Technologies

- **Framework**: Next.js 16.1.1
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint with Next.js config

## Code Standards

- No emoji ASCII characters in codebase
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture
- Responsive design patterns

For static export:
```bash
npm run build
```

## License

Copyright 2026 MASH Mushroom Automation. All rights reserved.

## Support

For questions or issues, please contact mash.mushroom.automation@gmail.com

