import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main heading for the hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Subtitle text for the hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video',
      type: 'file',
      description: 'Background video for the hero section (MP4 format recommended)',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'heroButtons',
      title: 'Hero Call-to-Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text' },
            { name: 'href', type: 'string', title: 'Button Link' },
            { name: 'variant', type: 'string', title: 'Button Variant', options: { list: ['default', 'outline', 'ghost'] } },
          ],
        },
      ],
    }),

    // Features Section
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Feature Title' },
            { name: 'description', type: 'text', title: 'Feature Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
          ],
        },
      ],
    }),

    // Demo Section
    defineField({
      name: 'demoTitle',
      title: 'Demo Section Title',
      type: 'string',
    }),
    defineField({
      name: 'demoVideos',
      title: 'Demo Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Video Title' },
            { name: 'description', type: 'text', title: 'Video Description' },
            { name: 'video', type: 'file', title: 'Video File', options: { accept: 'video/*' } },
            { name: 'thumbnail', type: 'image', title: 'Video Thumbnail' },
          ],
        },
      ],
    }),

    // Documentation Section
    defineField({
      name: 'documentationTitle',
      title: 'Documentation Section Title',
      type: 'string',
    }),
    defineField({
      name: 'documentationDescription',
      title: 'Documentation Description',
      type: 'text',
    }),
    defineField({
      name: 'documentationLinks',
      title: 'Documentation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Link Title' },
            { name: 'description', type: 'text', title: 'Link Description' },
            { name: 'href', type: 'string', title: 'Link URL' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
          ],
        },
      ],
    }),

    // Scope Section
    defineField({
      name: 'scopeTitle',
      title: 'Scope Section Title',
      type: 'string',
    }),
    defineField({
      name: 'scopeContent',
      title: 'Scope Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content for the scope section',
    }),
    defineField({
      name: 'scopeFeatures',
      title: 'Scope Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Feature Title' },
            { name: 'description', type: 'text', title: 'Feature Description' },
            { name: 'capabilities', type: 'array', of: [{ type: 'string' }], title: 'Capabilities' },
          ],
        },
      ],
    }),

    // Support Section
    defineField({
      name: 'supportTitle',
      title: 'Support Section Title',
      type: 'string',
    }),
    defineField({
      name: 'supportContent',
      title: 'Support Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content for the support section',
    }),
    defineField({
      name: 'supportChannels',
      title: 'Support Channels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Channel Name' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'link', type: 'string', title: 'Link' },
          ],
        },
      ],
    }),

    // Booking Section
    defineField({
      name: 'bookingTitle',
      title: 'Booking Section Title',
      type: 'string',
    }),
    defineField({
      name: 'bookingDescription',
      title: 'Booking Description',
      type: 'text',
    }),

    // IoT Device Section
    defineField({
      name: 'iotDeviceModel',
      title: 'IoT Device 3D Model',
      type: 'file',
      description: '3D model file of the MASH IoT device (GLB/GLTF format)',
      options: {
        accept: '.glb,.gltf',
      },
    }),

    // Download Section
    defineField({
      name: 'downloadTitle',
      title: 'Download Section Title',
      type: 'string',
    }),
    defineField({
      name: 'downloadDescription',
      title: 'Download Description',
      type: 'text',
    }),
    defineField({
      name: 'downloadApk',
      title: 'Android APK File',
      type: 'file',
      description: 'Android application package file',
      options: {
        accept: '.apk',
      },
    }),
    defineField({
      name: 'downloadVersion',
      title: 'App Version',
      type: 'string',
      description: 'Current version of the app',
    }),
    defineField({
      name: 'downloadSize',
      title: 'File Size',
      type: 'string',
      description: 'Size of the APK file (e.g., "25 MB")',
    }),
    defineField({
      name: 'downloadReleaseDate',
      title: 'Release Date',
      type: 'date',
      description: 'Date of the latest release',
    }),
    defineField({
      name: 'downloadReleaseNotes',
      title: 'Release Notes',
      type: 'text',
      description: 'What\'s new in this version',
    }),

    // Floating Navigation
    defineField({
      name: 'floatingNav',
      title: 'Floating Navigation',
      type: 'object',
      description: 'Configuration for the modern floating navigation header',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
        { name: 'transparentUntilScroll', type: 'boolean', title: 'Transparent Until Scroll', initialValue: true },
        { name: 'backdrop', type: 'boolean', title: 'Use Backdrop Blur', initialValue: true },
        { name: 'logoText', type: 'string', title: 'Logo Text', initialValue: 'MASH' },
        { name: 'logoHref', type: 'string', title: 'Logo Link', initialValue: '/' },
        {
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'text', type: 'string', title: 'Button Text' },
                { name: 'href', type: 'string', title: 'Button Link' },
                { name: 'variant', type: 'string', title: 'Variant', options: { list: ['default', 'outline', 'ghost'] } },
              ],
            },
          ],
        },
      ],
    }),

    // Brand Palette
    defineField({
      name: 'brandPalette',
      title: 'Brand Palette',
      type: 'object',
      description: 'Brand identity settings',
      fields: [
        { name: 'brandName', type: 'string', title: 'Brand Name', initialValue: 'MASH' },
      ],
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Description for search engines',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      description: 'Open Graph image for social media sharing',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'heroSubtitle',
    },
  },
});
