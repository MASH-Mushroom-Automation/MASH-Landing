import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'features', title: 'Features Section' },
    { name: 'demo', title: 'Demo Section' },
    { name: 'documentation', title: 'Documentation Section' },
    { name: 'scope', title: 'Scope Section' },
    { name: 'mobileApp', title: 'Mobile App Showcase' },
    { name: 'iotDevice', title: 'IoT Device Section' },
    { name: 'booking', title: 'Booking Section' },
    { name: 'support', title: 'Support Section' },
    { name: 'download', title: 'Download Section' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'faq', title: 'FAQ Page' },
    { name: 'seo', title: 'SEO Settings' },
  ],
  fields: [
    // ========================
    // HERO SECTION
    // ========================
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      description: 'Main heading for the hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      description: 'Subtitle text displayed below the hero title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video',
      type: 'file',
      group: 'hero',
      description: 'Background video for the hero section (MP4 format recommended)',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'heroButtons',
      title: 'Hero CTA Buttons',
      type: 'array',
      group: 'hero',
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
    }),
    defineField({
      name: 'heroCards',
      title: 'Hero Highlight Cards',
      type: 'array',
      group: 'hero',
      description: 'Cards shown below the hero CTA (e.g., Smart Monitoring 24/7)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Card Title' },
            { name: 'value', type: 'string', title: 'Card Value' },
            { name: 'icon', type: 'string', title: 'Icon Name', description: 'e.g., activity, settings, bar-chart' },
          ],
        },
      ],
    }),

    // ========================
    // FEATURES SECTION
    // ========================
    defineField({
      name: 'featuresTitle',
      title: 'Features Section Title',
      type: 'string',
      group: 'features',
    }),
    defineField({
      name: 'featuresSubtitle',
      title: 'Features Section Subtitle',
      type: 'text',
      group: 'features',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'features',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Feature Title' },
            { name: 'description', type: 'text', title: 'Feature Description' },
            { name: 'icon', type: 'string', title: 'Icon Name', description: 'Identifier for the feature icon (e.g., monitoring, wifi, climate)' },
          ],
        },
      ],
    }),

    // ========================
    // DEMO SECTION
    // ========================
    defineField({
      name: 'demoTitle',
      title: 'Demo Section Title',
      type: 'string',
      group: 'demo',
    }),
    defineField({
      name: 'demoSubtitle',
      title: 'Demo Section Subtitle',
      type: 'text',
      group: 'demo',
    }),
    defineField({
      name: 'demoStats',
      title: 'Demo Statistics',
      type: 'array',
      group: 'demo',
      description: 'Stats displayed in the demo section (e.g., 99.9% System Uptime)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Stat Value' },
            { name: 'label', type: 'string', title: 'Stat Label' },
          ],
        },
      ],
    }),
    defineField({
      name: 'demoVideos',
      title: 'Demo Videos',
      type: 'array',
      group: 'demo',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Video ID' },
            { name: 'title', type: 'string', title: 'Video Title' },
            { name: 'description', type: 'text', title: 'Video Description' },
            { name: 'video', type: 'file', title: 'Video File', options: { accept: 'video/*' } },
            { name: 'thumbnail', type: 'image', title: 'Video Thumbnail' },
          ],
        },
      ],
    }),

    // ========================
    // DOCUMENTATION SECTION
    // ========================
    defineField({
      name: 'documentationTitle',
      title: 'Documentation Section Title',
      type: 'string',
      group: 'documentation',
    }),
    defineField({
      name: 'documentationDescription',
      title: 'Documentation Description',
      type: 'text',
      group: 'documentation',
    }),
    defineField({
      name: 'documentationCategories',
      title: 'Documentation Categories',
      type: 'array',
      group: 'documentation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Category Title' },
            { name: 'description', type: 'text', title: 'Category Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', type: 'string', title: 'Link Name' },
                    { name: 'href', type: 'string', title: 'Link URL' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    // ========================
    // SCOPE SECTION
    // ========================
    defineField({
      name: 'scopeTitle',
      title: 'Scope Section Title',
      type: 'string',
      group: 'scope',
    }),
    defineField({
      name: 'scopeDescription',
      title: 'Scope Description',
      type: 'text',
      group: 'scope',
    }),
    defineField({
      name: 'scopeCategories',
      title: 'Scope Categories',
      type: 'array',
      group: 'scope',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Category Title' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'items', type: 'array', title: 'Items', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),
    defineField({
      name: 'scopeArchitectureTitle',
      title: 'Architecture Section Title',
      type: 'string',
      group: 'scope',
    }),
    defineField({
      name: 'scopeArchitectureDescription',
      title: 'Architecture Description',
      type: 'text',
      group: 'scope',
    }),
    defineField({
      name: 'scopeArchitectureLayers',
      title: 'Architecture Layers',
      type: 'array',
      group: 'scope',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Layer Name' },
            { name: 'items', type: 'array', title: 'Components', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),

    // ========================
    // MOBILE APP SHOWCASE
    // ========================
    defineField({
      name: 'mobileAppTitle',
      title: 'Mobile App Section Title',
      type: 'string',
      group: 'mobileApp',
    }),
    defineField({
      name: 'mobileAppSubtitle',
      title: 'Mobile App Subtitle',
      type: 'text',
      group: 'mobileApp',
    }),
    defineField({
      name: 'mobileAppScreens',
      title: 'App Screens',
      type: 'array',
      group: 'mobileApp',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Screen ID' },
            { name: 'title', type: 'string', title: 'Screen Title' },
            { name: 'subtitle', type: 'text', title: 'Screen Subtitle' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'color', type: 'string', title: 'Accent Color', description: 'Tailwind color class (e.g., green, blue, purple, orange)' },
            { name: 'features', type: 'array', title: 'Screen Features', of: [{ type: 'string' }] },
          ],
        },
      ],
    }),

    // ========================
    // IOT DEVICE SECTION
    // ========================
    defineField({
      name: 'iotDeviceTitle',
      title: 'IoT Device Section Title',
      type: 'string',
      group: 'iotDevice',
    }),
    defineField({
      name: 'iotDeviceSubtitle',
      title: 'IoT Device Subtitle',
      type: 'text',
      group: 'iotDevice',
    }),
    defineField({
      name: 'iotDeviceDescription',
      title: 'IoT Device Description',
      type: 'text',
      group: 'iotDevice',
    }),
    defineField({
      name: 'iotDeviceModel',
      title: 'IoT Device 3D Model',
      type: 'file',
      group: 'iotDevice',
      description: '3D model file (GLB/GLTF format)',
      options: { accept: '.glb,.gltf' },
    }),
    defineField({
      name: 'iotDeviceSpecs',
      title: 'Device Specifications',
      type: 'array',
      group: 'iotDevice',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Spec ID' },
            { name: 'label', type: 'string', title: 'Spec Label' },
            { name: 'value', type: 'string', title: 'Spec Value' },
            { name: 'unit', type: 'string', title: 'Unit' },
            { name: 'description', type: 'text', title: 'Description' },
            {
              name: 'details',
              type: 'array',
              title: 'Technical Details',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Detail Label' },
                    { name: 'value', type: 'string', title: 'Detail Value' },
                  ],
                },
              ],
            },
            {
              name: 'metrics',
              type: 'array',
              title: 'Key Metrics',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'value', type: 'string', title: 'Metric Value' },
                    { name: 'label', type: 'string', title: 'Metric Label' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    // ========================
    // BOOKING SECTION
    // ========================
    defineField({
      name: 'bookingTitle',
      title: 'Booking Section Title',
      type: 'string',
      group: 'booking',
    }),
    defineField({
      name: 'bookingDescription',
      title: 'Booking Description',
      type: 'text',
      group: 'booking',
    }),
    defineField({
      name: 'bookingFeatures',
      title: 'Booking Features',
      type: 'array',
      group: 'booking',
      of: [{ type: 'string' }],
    }),

    // ========================
    // SUPPORT SECTION
    // ========================
    defineField({
      name: 'supportTitle',
      title: 'Support Section Title',
      type: 'string',
      group: 'support',
    }),
    defineField({
      name: 'supportDescription',
      title: 'Support Description',
      type: 'text',
      group: 'support',
    }),
    defineField({
      name: 'supportChannels',
      title: 'Support Channels',
      type: 'array',
      group: 'support',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Channel Name' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
            { name: 'link', type: 'string', title: 'Link' },
            { name: 'linkText', type: 'string', title: 'Link Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'supportFaqs',
      title: 'Support FAQs',
      type: 'array',
      group: 'support',
      description: 'FAQ items shown in the support section',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
    }),

    // ========================
    // DOWNLOAD SECTION
    // ========================
    defineField({
      name: 'downloadTitle',
      title: 'Download Section Title',
      type: 'string',
      group: 'download',
    }),
    defineField({
      name: 'downloadDescription',
      title: 'Download Description',
      type: 'text',
      group: 'download',
    }),
    defineField({
      name: 'downloadAppFeatures',
      title: 'App Features List',
      type: 'array',
      group: 'download',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'downloadApk',
      title: 'Android APK File',
      type: 'file',
      group: 'download',
      description: 'Android application package file',
      options: { accept: '.apk' },
    }),
    defineField({
      name: 'downloadVersion',
      title: 'App Version',
      type: 'string',
      group: 'download',
    }),
    defineField({
      name: 'downloadSize',
      title: 'File Size',
      type: 'string',
      group: 'download',
    }),
    defineField({
      name: 'downloadReleaseDate',
      title: 'Release Date',
      type: 'date',
      group: 'download',
    }),
    defineField({
      name: 'downloadReleaseNotes',
      title: 'Release Notes',
      type: 'text',
      group: 'download',
    }),

    // ========================
    // NAVIGATION
    // ========================
    defineField({
      name: 'navigationBrand',
      title: 'Brand Name',
      type: 'string',
      group: 'navigation',
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Link Label' },
            { name: 'href', type: 'string', title: 'Link URL' },
          ],
        },
      ],
    }),

    // ========================
    // FOOTER
    // ========================
    defineField({
      name: 'footerBrand',
      title: 'Footer Brand Name',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      group: 'footer',
    }),
    defineField({
      name: 'footerSections',
      title: 'Footer Link Sections',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Section Title' },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Link Label' },
                    { name: 'href', type: 'string', title: 'Link URL' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Copyright Text',
      type: 'string',
      group: 'footer',
    }),

    // ========================
    // FAQ PAGE
    // ========================
    defineField({
      name: 'faqTitle',
      title: 'FAQ Page Title',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqSubtitle',
      title: 'FAQ Page Subtitle',
      type: 'text',
      group: 'faq',
    }),
    defineField({
      name: 'faqCategories',
      title: 'FAQ Categories',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Category Name' },
            {
              name: 'faqs',
              type: 'array',
              title: 'FAQ Items',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'question', type: 'string', title: 'Question' },
                    { name: 'answer', type: 'text', title: 'Answer' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'faqCtaTitle',
      title: 'FAQ CTA Title',
      type: 'string',
      group: 'faq',
    }),
    defineField({
      name: 'faqCtaDescription',
      title: 'FAQ CTA Description',
      type: 'text',
      group: 'faq',
    }),

    // ========================
    // SEO SETTINGS
    // ========================
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      group: 'seo',
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
