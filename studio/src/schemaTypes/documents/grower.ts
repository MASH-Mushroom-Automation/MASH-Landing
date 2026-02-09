/**
 * Grower / Farm Schema
 * 
 * This schema represents mushroom farms and growers that supply products to MASH.
 * It replaces the hardcoded MOCK_GROWERS data in src/lib/api/main.ts
 * 
 * Usage:
 * - Display on "Meet Our Growers" section on homepage
 * - Full growers list page (/grower)
 * - Individual grower detail pages (/grower/[slug])
 * 
 * Created: Phase 1 of SANITY_CMS_MASTER_PLAN.md
 */

import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const grower = defineType({
  name: 'grower',
  title: 'Grower / Farm',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'basic', title: 'Basic Info', default: true},
    {name: 'contact', title: 'Contact Details'},
    {name: 'location', title: 'Location & Map'},
    {name: 'products', title: 'Products'},
    {name: 'social', title: 'Social & Links'},
    {name: 'appointments', title: 'Appointments (Cal.com)'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    // ===== BASIC INFO =====
    defineField({
      name: 'name',
      title: 'Farm/Grower Name',
      type: 'string',
      group: 'basic',
      description: 'The name of the mushroom farm or grower',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      description: 'URL-friendly identifier (auto-generated from name)',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo/Photo',
      type: 'image',
      group: 'basic',
      description: 'Farm logo or grower photo (square format recommended)',
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describes the image for accessibility and SEO',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover/Banner Image',
      type: 'image',
      group: 'basic',
      description: 'Banner image displayed at top of grower card and profile page (landscape format recommended, 16:9 ratio)',
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describes the image for accessibility and SEO',
        },
      ],
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'basic',
      description: 'Short slogan or description (e.g., "Urban-grown gourmet mushrooms")',
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      group: 'basic',
      rows: 4,
      description: 'Detailed description of the farm and their mushroom growing practices',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      group: 'basic',
      description: 'Aggregate rating for the grower (1.0 - 5.0). This is computed from product reviews; editors can set initial values here.',
      initialValue: 0,
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'story',
      title: 'Grower Story',
      type: 'array',
      group: 'basic',
      of: [{type: 'block'}],
      description: 'Rich text story about the grower (for detail page)',
    }),

    // ===== CONTACT DETAILS =====
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
      description: 'Primary contact number (e.g., +63 956 955 2808)',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          name: 'email',
          invert: false,
        }).warning('Please enter a valid email address'),
    }),
    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'string',
      group: 'contact',
      description: 'e.g., "7AM - 9PM, Mon-Fri"',
    }),

    // ===== LOCATION & MAP =====
    defineField({
      name: 'location',
      title: 'Location (Short)',
      type: 'string',
      group: 'location',
      description: 'Short location name (e.g., "Caloocan City, Metro Manila")',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      group: 'location',
      rows: 2,
      description: 'Complete street address for deliveries',
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'object',
      group: 'location',
      description: 'GPS coordinates for map display',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: (Rule) => Rule.min(-90).max(90),
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          validation: (Rule) => Rule.min(-180).max(180),
        },
      ],
    }),
    defineField({
      name: 'deliveryZones',
      title: 'Delivery Zones',
      type: 'array',
      group: 'location',
      of: [{type: 'string'}],
      description: 'Areas where this grower delivers',
      options: {
        layout: 'tags',
      },
    }),

    // ===== PRODUCTS =====
    defineField({
      name: 'products',
      title: 'All Products',
      type: 'array',
      group: 'products',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'All products from this grower (linked from product.grower reference)',
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      group: 'products',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Products from this grower to showcase on homepage (max 8)',
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'suppliesTo',
      title: 'Supplies To (Stores)',
      type: 'array',
      group: 'products',
      of: [{type: 'reference', to: [{type: 'store'}]}],
      description: 'Store locations this grower supplies mushrooms to',
      validation: (Rule) => Rule.max(10),
    }),
    // Legacy field - kept for backward compatibility with existing data
    // This field was previously used but 'suppliesTo' is the canonical field
    defineField({
      name: 'availableAtStores',
      title: 'Available At Stores (Legacy)',
      type: 'array',
      group: 'products',
      of: [{type: 'reference', to: [{type: 'store'}]}],
      description: '⚠️ DEPRECATED: Use "Supplies To (Stores)" instead. This field is kept for backward compatibility.',
      hidden: true, // Hide in studio but keep for data compatibility
    }),
    defineField({
      name: 'specialties',
      title: 'Mushroom Specialties',
      type: 'array',
      group: 'products',
      of: [{type: 'string'}],
      description: 'Types of mushrooms this grower specializes in',
      options: {
        list: [
          {title: 'Oyster Mushrooms', value: 'oyster'},
          {title: 'Shiitake', value: 'shiitake'},
          {title: "Lion's Mane", value: 'lions-mane'},
          {title: 'King Trumpet', value: 'king-trumpet'},
          {title: 'Enoki', value: 'enoki'},
          {title: 'Maitake', value: 'maitake'},
          {title: 'Reishi', value: 'reishi'},
          {title: 'Chanterelle', value: 'chanterelle'},
          {title: 'Portobello', value: 'portobello'},
          {title: 'White Button', value: 'white-button'},
        ],
      },
    }),

    // ===== CERTIFICATIONS =====
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      group: 'products',
      of: [{type: 'string'}],
      description: 'Quality and safety certifications',
      options: {
        list: [
          {title: 'Organic Certified', value: 'organic'},
          {title: 'GAP Certified (Good Agricultural Practices)', value: 'gap'},
          {title: 'HACCP', value: 'haccp'},
          {title: 'FDA Registered', value: 'fda'},
          {title: 'ISO Certified', value: 'iso'},
          {title: 'BFAD Approved', value: 'bfad'},
        ],
      },
    }),

    // ===== SOCIAL & LINKS =====
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      type: 'object',
      group: 'social',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({scheme: ['http', 'https']}).warning('Please enter a valid URL'),
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({scheme: ['http', 'https']}).warning('Please enter a valid URL'),
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({scheme: ['http', 'https']}).warning('Please enter a valid URL'),
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({scheme: ['http', 'https']}).warning('Please enter a valid URL'),
        },
      ],
    }),

    // ===== SETTINGS =====
    defineField({
      name: 'isFeatured',
      title: 'Featured Grower',
      type: 'boolean',
      group: 'settings',
      description: 'Show on homepage "Meet Our Growers" section',
      initialValue: false,
    }),

    // ===== APPOINTMENTS (CAL.COM) =====
    defineField({
      name: 'calendlyEnabled',
      title: 'Enable Appointment Booking',
      type: 'boolean',
      group: 'appointments',
      description: 'Allow buyers to book appointments with this grower via Cal.com',
      initialValue: false,
    }),
    defineField({
      name: 'calendlyUsername',
      title: 'Cal.com Username (Canonical)',
      type: 'string',
      group: 'appointments',
      description: 'Your Cal.com username (e.g., mash-mushroom). Find it in your Cal.com URL: cal.com/YOUR-USERNAME',
      placeholder: 'mash-mushroom',
      hidden: ({parent}) => !parent?.calendlyEnabled,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {calendlyEnabled?: boolean}
          if (parent?.calendlyEnabled && !value) {
            return 'Cal.com username is required when appointments are enabled'
          }
          if (value && !/^[a-z0-9-]+$/.test(value)) {
            return 'Username should only contain lowercase letters, numbers, and hyphens'
          }
          return true
        }),
    }),
    // Backwards-compatible Cal.com fields (optional alias for older content and scripts)
    defineField({
      name: 'calcomUsername',
      title: 'Cal.com Username (Alias, optional)',
      type: 'string',
      group: 'appointments',
      description: 'Alias for `calendlyUsername`. Added for compatibility with storefront code that references `calcomUsername`. Editors should prefer `Cal.com Username (Canonical)`.',
      hidden: true,
    }),
    defineField({
      name: 'defaultEventSlug',
      title: 'Default Event Slug (Alias)',
      type: 'string',
      group: 'appointments',
      description: 'Alias for `calendlyDefaultEvent`. Optional compatibility field for older code paths.',
      hidden: true,
    }),
    defineField({
      name: 'isHighlyRatedBadgeThreshold',
      title: 'Highly Rated Badge Threshold',
      type: 'number',
      group: 'settings',
      initialValue: 4.5,
      description: 'Threshold rating above which the grower shows the "Highly rated on Marketplace" badge (default 4.5).',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'calendlyDefaultEvent',
      title: 'Default Event Slug',
      type: 'string',
      group: 'appointments',
      description: 'The default event type slug (e.g., "30min", "15min", "1-hour-meeting"). This appears after your username in the URL: cal.com/YOUR-USERNAME/EVENT-SLUG',
      placeholder: '30min',
      hidden: ({parent}) => !parent?.calendlyEnabled,
      initialValue: '30min',
      options: {
        list: [
          {title: '15 minutes', value: '15min'},
          {title: '30 minutes (Recommended)', value: '30min'},
          {title: '1 hour', value: '1-hour-meeting'},
          {title: 'Secret meeting', value: 'secret'},
        ],
      },
    }),

    // Theme preference for Cal.com embed
    defineField({
      name: 'calcomTheme',
      title: 'Cal.com Widget Theme',
      type: 'string',
      group: 'appointments',
      description: 'Theme for the Cal.com booking widget. Auto follows the user\'s system theme.',
      hidden: ({parent}) => !parent?.calendlyEnabled,
      initialValue: 'auto',
      options: {
        list: [
          {title: 'Auto (Follow System Theme)', value: 'auto'},
          {title: 'Light Mode', value: 'light'},
          {title: 'Dark Mode', value: 'dark'},
        ],
      },
    }),

    // Editor-customizable CTA text for Cal.com appointment buttons
    defineField({
      name: 'calcomButtonText',
      title: 'Cal.com Button Text',
      type: 'string',
      group: 'appointments',
      description: 'Custom label for the appointment CTA shown on product and grower pages. Defaults to "Schedule with Grower".',
      initialValue: 'Schedule with Grower',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'appointmentTypes',
      title: 'Available Appointment Types',
      type: 'array',
      group: 'appointments',
      description: 'Different appointment options buyers can choose from (15min, 30min, 1 hour, etc.)',
      hidden: ({parent}) => !parent?.calendlyEnabled,
      of: [
        {
          type: 'object',
          name: 'appointmentType',
          title: 'Appointment Type',
          fields: [
            {
              name: 'name',
              title: 'Appointment Name',
              type: 'string',
              description: 'Display name (e.g., "Product Consultation", "Farm Tour")',
              placeholder: '30 Min Meeting',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'eventSlug',
              title: 'Cal.com Event Slug',
              type: 'string',
              description: 'The URL slug for this event type on Cal.com (e.g., "30min", "15min", "1-hour-meeting", "secret")',
              placeholder: '30min',
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  if (value && !/^[a-z0-9-]+$/.test(value)) {
                    return 'Event slug should only contain lowercase letters, numbers, and hyphens'
                  }
                  return true
                }),
              options: {
                list: [
                  {title: '15 minutes', value: '15min'},
                  {title: '30 minutes', value: '30min'},
                  {title: '1 hour', value: '1-hour-meeting'},
                  {title: 'Secret meeting', value: 'secret'},
                ],
              },
            },
            {
              name: 'duration',
              title: 'Duration (minutes)',
              type: 'number',
              description: 'Appointment duration in minutes',
              initialValue: 30,
              validation: (Rule) => Rule.required().min(15).max(180),
            },
            {
              name: 'meetingType',
              title: 'Meeting Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Online (Google Meet)', value: 'online'},
                  {title: 'In-Person Store Visit', value: 'in-person'},
                  {title: 'Phone Call', value: 'phone'},
                ],
                layout: 'radio',
              },
              initialValue: 'online',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Brief description shown to buyers',
            },
            {
              name: 'isDefault',
              title: 'Default Option',
              type: 'boolean',
              description: 'Show this as the primary/recommended option',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'name',
              duration: 'duration',
              type: 'meetingType',
            },
            prepare({title, duration, type}) {
              const typeEmoji = type === 'online' ? '💻' : type === 'in-person' ? '🏪' : '📞'
              return {
                title: `${typeEmoji} ${title}`,
                subtitle: `${duration} minutes`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'appointmentNotes',
      title: 'Booking Page Notes',
      type: 'text',
      group: 'appointments',
      rows: 3,
      description: 'Additional information shown on the booking page (e.g., what to expect, preparation needed)',
      hidden: ({parent}) => !parent?.calendlyEnabled,
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      group: 'settings',
      description: 'Only active growers are displayed on the website',
      initialValue: true,
    }),
    defineField({
      name: 'isVerified',
      title: 'Verified Seller',
      type: 'boolean',
      group: 'settings',
      description: 'Indicates this is a verified and trusted seller',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      group: 'settings',
      description: 'Lower numbers appear first (0 = highest priority)',
      initialValue: 0,
    }),
    defineField({
      name: 'joinedDate',
      title: 'Joined Date',
      type: 'date',
      group: 'settings',
      description: 'When this grower joined MASH',
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
    }),
  ],

  // Preview configuration for Sanity Studio
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'logo',
      isFeatured: 'isFeatured',
      isActive: 'isActive',
    },
    prepare({title, subtitle, media, isFeatured, isActive}) {
      const badges = []
      if (isFeatured) badges.push('⭐ Featured')
      if (!isActive) badges.push('🔴 Inactive')

      return {
        title,
        subtitle: badges.length > 0 ? `${subtitle} • ${badges.join(' ')}` : subtitle,
        media,
      }
    },
  },

  // Default ordering in Sanity Studio
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Newest First',
      name: 'joinedDateDesc',
      by: [{field: 'joinedDate', direction: 'desc'}],
    },
  ],
})
