import { CogIcon } from '@sanity/icons'
import { defineField, defineType, defineArrayMember } from 'sanity'

/**
 * Site Settings Schema - Phase 5
 * Comprehensive site-wide settings for MASH E-Commerce
 * 
 * Features:
 * - Company Information (name, logo, tagline)
 * - Contact Details (email, phone, address)
 * - Social Media Links (6 platforms)
 * - Announcement Bar (toggle, message, colors)
 * - Footer Configuration (columns, newsletter)
 * - SEO Defaults (meta title, description, OG image)
 * - Business Hours (Monday-Sunday)
 * - Feature Toggles (blog, shop, reviews, wishlist)
 * 
 * @see src/hooks/useSanitySiteSettings.ts for hook integration
 */

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'company', title: '🏢 Company Info', default: true },
    { name: 'contact', title: '📞 Contact' },
    { name: 'social', title: '📱 Social Media' },
    { name: 'announcement', title: '📢 Announcement Bar' },
    { name: 'footer', title: '🔗 Footer' },
    { name: 'seo', title: '🔍 SEO' },
    { name: 'hours', title: '🕐 Business Hours' },
    { name: 'features', title: '⚙️ Features' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════════
    // COMPANY INFORMATION GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'company',
      description: 'The main company/site name displayed throughout the site',
      validation: (Rule) => Rule.required().max(100),
      initialValue: 'MASH Mushroom E-Commerce',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'company',
      description: 'Short catchy phrase (e.g., "Fresh Mushrooms Delivered Daily")',
      validation: (Rule) => Rule.max(150),
      initialValue: 'Premium Quality Mushrooms',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'company',
      rows: 3,
      description: 'Brief description of your business (used in SEO and footer)',
      initialValue: 'Premium quality fresh, dried, and specialty mushrooms delivered same-day across Metro Manila.',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      group: 'company',
      description: 'Main logo used in header and footer (recommended: 180x60px)',
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the logo for accessibility',
          initialValue: 'MASH Market Logo',
        }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'company',
      description: 'Small icon shown in browser tabs (recommended: 32x32px or 64x64px)',
      options: {
        accept: 'image/x-icon,image/png',
      },
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTACT INFORMATION GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
      description: 'Primary contact email displayed site-wide',
      validation: (Rule) => Rule.email(),
      initialValue: 'hello@mashmushrooms.ph',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      group: 'contact',
      description: 'Primary phone number (e.g., +63 966 169 2000)',
      initialValue: '+63 966 169 2000',
    }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'object',
      group: 'contact',
      description: 'Physical business address',
      fields: [
        defineField({
          name: 'street',
          title: 'Street Address',
          type: 'string',
          initialValue: '1019 Quirino Highway, Brgy Sta. Monica',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          initialValue: 'Novaliches, Quezon City',
        }),
        defineField({
          name: 'state',
          title: 'State/Province',
          type: 'string',
          initialValue: 'Metro Manila',
        }),
        defineField({
          name: 'zipCode',
          title: 'ZIP/Postal Code',
          type: 'string',
          initialValue: '1116',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'Philippines',
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SOCIAL MEDIA GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      description: 'Links to your social media profiles',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'Full URL (e.g., https://facebook.com/mashmushrooms)',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Full URL (e.g., https://instagram.com/mashmushrooms)',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
          description: 'Full URL (e.g., https://twitter.com/mashmushrooms)',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'Full URL to company page',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          description: 'Full URL to channel',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
          description: 'Full URL (e.g., https://tiktok.com/@mashmushrooms)',
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // ANNOUNCEMENT BAR GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      group: 'announcement',
      description: 'Banner shown at top of site for promotions/announcements',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Announcement Bar',
          type: 'boolean',
          initialValue: false,
          description: 'Toggle to show/hide the announcement bar',
        }),
        defineField({
          name: 'message',
          title: 'Message',
          type: 'string',
          description: 'Announcement text (e.g., "🎉 Free Shipping on Orders Over ₱1500!")',
          validation: (Rule) => Rule.max(200),
        }),
        defineField({
          name: 'link',
          title: 'Link URL',
          type: 'url',
          description: 'Optional link when clicking the announcement',
        }),
        defineField({
          name: 'linkText',
          title: 'Link Text',
          type: 'string',
          description: 'Text for the link button (e.g., "Shop Now")',
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          description: 'Hex color code (e.g., #1E392A)',
          initialValue: '#1E392A',
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          description: 'Hex color code (e.g., #FFFFFF)',
          initialValue: '#FFFFFF',
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // FOOTER GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'footer',
      title: 'Footer Configuration',
      type: 'object',
      group: 'footer',
      description: 'Customize the website footer content',
      fields: [
        defineField({
          name: 'aboutText',
          title: 'About Text',
          type: 'text',
          rows: 3,
          description: 'Short about text displayed in footer',
        }),
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description: 'Copyright notice (use {year} for current year)',
          initialValue: '© {year} MASH Market. All rights reserved.',
        }),
        defineField({
          name: 'showNewsletter',
          title: 'Show Newsletter Signup',
          type: 'boolean',
          initialValue: true,
          description: 'Display newsletter subscription form in footer',
        }),
        defineField({
          name: 'newsletterTitle',
          title: 'Newsletter Title',
          type: 'string',
          initialValue: 'Stay Updated',
          hidden: ({ parent }) => !parent?.showNewsletter,
        }),
        defineField({
          name: 'newsletterDescription',
          title: 'Newsletter Description',
          type: 'string',
          initialValue: 'Subscribe to get updates on new products and special offers.',
          hidden: ({ parent }) => !parent?.showNewsletter,
        }),
        defineField({
          name: 'links',
          title: 'Footer Links',
          type: 'array',
          description: 'Quick links displayed in footer',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'footerLink',
              title: 'Footer Link',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Link Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                  description: 'Internal path (e.g., /about) or external URL',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'external',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'url',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SEO GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'seo',
      title: 'SEO Defaults',
      type: 'object',
      group: 'seo',
      description: 'Default SEO settings for pages without specific metadata',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          description: 'Default page title for search engines',
          validation: (Rule) => Rule.max(60),
          initialValue: 'MASH - Fresh Mushrooms Delivered Same-Day',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
          description: 'Default description for search results',
          validation: (Rule) => Rule.max(160),
          initialValue: 'Order premium fresh, dried, and specialty mushrooms online. Same-day delivery in Metro Manila. Farm-fresh quality guaranteed.',
        }),
        defineField({
          name: 'keywords',
          title: 'Default Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Default SEO keywords',
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'ogImage',
          title: 'Default Open Graph Image',
          type: 'image',
          description: 'Default social sharing image (1200x630px recommended)',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // BUSINESS HOURS GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      group: 'hours',
      description: 'Operating hours displayed on contact page and footer',
      fields: [
        defineField({
          name: 'monday',
          title: 'Monday',
          type: 'string',
          placeholder: '8:00 AM - 6:00 PM',
        }),
        defineField({
          name: 'tuesday',
          title: 'Tuesday',
          type: 'string',
          placeholder: '8:00 AM - 6:00 PM',
        }),
        defineField({
          name: 'wednesday',
          title: 'Wednesday',
          type: 'string',
          placeholder: '8:00 AM - 6:00 PM',
        }),
        defineField({
          name: 'thursday',
          title: 'Thursday',
          type: 'string',
          placeholder: '8:00 AM - 6:00 PM',
        }),
        defineField({
          name: 'friday',
          title: 'Friday',
          type: 'string',
          placeholder: '8:00 AM - 6:00 PM',
        }),
        defineField({
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          placeholder: '9:00 AM - 4:00 PM',
        }),
        defineField({
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          placeholder: 'Closed',
        }),
        defineField({
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          initialValue: 'Asia/Manila (GMT+8)',
        }),
        defineField({
          name: 'note',
          title: 'Additional Note',
          type: 'string',
          description: 'e.g., "Holiday hours may vary"',
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // FEATURES GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'features',
      title: 'Feature Toggles',
      type: 'object',
      group: 'features',
      description: 'Enable/disable major site features',
      fields: [
        defineField({
          name: 'enableBlog',
          title: 'Enable Blog',
          type: 'boolean',
          initialValue: true,
          description: 'Show blog section and posts',
        }),
        defineField({
          name: 'enableShop',
          title: 'Enable Shop',
          type: 'boolean',
          initialValue: true,
          description: 'Show product shop functionality',
        }),
        defineField({
          name: 'enableGrowerProfiles',
          title: 'Enable Grower Profiles',
          type: 'boolean',
          initialValue: true,
          description: 'Show grower/farm profiles section',
        }),
        defineField({
          name: 'enableReviews',
          title: 'Enable Reviews',
          type: 'boolean',
          initialValue: true,
          description: 'Allow customer product reviews',
        }),
        defineField({
          name: 'enableWishlist',
          title: 'Enable Wishlist',
          type: 'boolean',
          initialValue: true,
          description: 'Allow users to save products to wishlist',
        }),
        defineField({
          name: 'enableSameDayDelivery',
          title: 'Enable Same-Day Delivery',
          type: 'boolean',
          initialValue: true,
          description: 'Show Lalamove same-day delivery option',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'tagline',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || 'Configure your website',
        media: media || CogIcon,
      }
    },
  },
})
