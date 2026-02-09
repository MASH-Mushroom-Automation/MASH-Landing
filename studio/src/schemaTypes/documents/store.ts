import { PinIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Store/Location Schema - Phase 6
 * 
 * Manages physical store locations, pickup points, and partner stores.
 * Includes operating hours, services, coordinates for map display.
 * 
 * Features:
 * - Multiple store types (main, pickup, partner)
 * - Full address with coordinates for Google Maps
 * - Operating hours for each day
 * - Available services (pickup, delivery, workshops)
 * - Contact information
 * - Store images and gallery
 * 
 * @see src/hooks/useSanityStores.ts for frontend integration
 */

export const store = defineType({
  name: 'store',
  title: 'Store Location',
  type: 'document',
  icon: PinIcon,
  groups: [
    { name: 'basic', title: '📍 Basic Info', default: true },
    { name: 'location', title: '🗺️ Location' },
    { name: 'hours', title: '🕐 Operating Hours' },
    { name: 'contact', title: '📞 Contact' },
    { name: 'services', title: '🛒 Services' },
    { name: 'media', title: '📸 Media' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════════
    // BASIC INFO GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'name',
      title: 'Store Name',
      type: 'string',
      group: 'basic',
      description: 'e.g., "MASH Main Store - Novaliches" or "Caloocan Pickup Point"',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storeType',
      title: 'Store Type',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: '🏪 Main Store', value: 'main' },
          { title: '📦 Pickup Point', value: 'pickup' },
          { title: '🤝 Partner Store', value: 'partner' },
          { title: '🚚 Distribution Center', value: 'distribution' },
        ],
        layout: 'radio',
      },
      initialValue: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'basic',
      rows: 3,
      description: 'Brief description of this location',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      group: 'basic',
      description: 'Inactive stores will not be shown on the website',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Location',
      type: 'boolean',
      group: 'basic',
      description: 'Show this location prominently on the stores page',
      initialValue: false,
    }),
    defineField({
      name: 'growers',
      title: 'Associated Growers',
      type: 'array',
      group: 'basic',
      of: [{
        type: 'reference',
        to: [{ type: 'grower' }],
      }],
      description: 'Growers who supply products to this store location',
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      group: 'basic',
      description: 'Lower numbers appear first (0 = top)',
      initialValue: 0,
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // LOCATION GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      group: 'location',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
          description: 'e.g., "1019 Quirino Highway, Brgy Sta. Monica"',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          description: 'e.g., "Novaliches, Quezon City"',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'state',
          title: 'State/Province',
          type: 'string',
          description: 'e.g., "Metro Manila"',
        },
        {
          name: 'zipCode',
          title: 'ZIP Code',
          type: 'string',
          description: 'e.g., "1116"',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'Philippines',
        },
        {
          name: 'landmark',
          title: 'Landmark',
          type: 'string',
          description: 'e.g., "In front of BDO Novaliches"',
        },
      ],
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'object',
      group: 'location',
      description: 'Get coordinates from Google Maps (right-click → What\'s here?)',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          description: 'e.g., 14.724177',
          validation: (Rule) => Rule.required().min(-90).max(90),
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          description: 'e.g., 121.038662',
          validation: (Rule) => Rule.required().min(-180).max(180),
        },
      ],
    }),
    defineField({
      name: 'directionsUrl',
      title: 'Google Maps Directions URL',
      type: 'url',
      group: 'location',
      description: 'Direct link to Google Maps for this location',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // OPERATING HOURS GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'object',
      group: 'hours',
      description: 'Leave blank for closed days',
      fields: [
        { name: 'monday', title: 'Monday', type: 'string', description: 'e.g., "9:00 AM - 6:00 PM"' },
        { name: 'tuesday', title: 'Tuesday', type: 'string' },
        { name: 'wednesday', title: 'Wednesday', type: 'string' },
        { name: 'thursday', title: 'Thursday', type: 'string' },
        { name: 'friday', title: 'Friday', type: 'string' },
        { name: 'saturday', title: 'Saturday', type: 'string' },
        { name: 'sunday', title: 'Sunday', type: 'string' },
      ],
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      group: 'hours',
      initialValue: 'Asia/Manila',
      options: {
        list: [
          { title: 'Asia/Manila (PHT)', value: 'Asia/Manila' },
          { title: 'UTC', value: 'UTC' },
        ],
      },
    }),
    defineField({
      name: 'hoursNote',
      title: 'Hours Note',
      type: 'text',
      group: 'hours',
      rows: 2,
      description: 'e.g., "Closed during holidays" or "Extended hours during sale events"',
    }),
    defineField({
      name: 'isOpen24Hours',
      title: 'Open 24 Hours',
      type: 'boolean',
      group: 'hours',
      initialValue: false,
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTACT GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
      description: 'e.g., "+63 966 169 2000"',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'contact',
      description: 'For WhatsApp chat link',
    }),
    defineField({
      name: 'messenger',
      title: 'Facebook Messenger',
      type: 'url',
      group: 'contact',
      description: 'Messenger link (m.me/...)',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SERVICES GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'services',
      title: 'Available Services',
      type: 'array',
      group: 'services',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🛒 In-Store Shopping', value: 'shopping' },
          { title: '📦 In-Store Pickup', value: 'pickup' },
          { title: '🚚 Same-Day Delivery (Lalamove)', value: 'same-day-delivery' },
          { title: '📬 Standard Delivery', value: 'standard-delivery' },
          { title: '🍄 Product Demo', value: 'demo' },
          { title: '📚 Growing Workshops', value: 'workshops' },
          { title: '🌱 Mushroom Farm Tour', value: 'farm-tour' },
          { title: '💳 Card Payment', value: 'card-payment' },
          { title: '💵 Cash on Delivery', value: 'cod' },
          { title: '📱 GCash/PayMaya', value: 'e-wallet' },
        ],
      },
    }),
    defineField({
      name: 'deliveryZones',
      title: 'Delivery Zones',
      type: 'array',
      group: 'services',
      of: [{ type: 'string' }],
      description: 'Areas this store delivers to (for Lalamove)',
    }),
    defineField({
      name: 'pickupInstructions',
      title: 'Pickup Instructions',
      type: 'text',
      group: 'services',
      rows: 3,
      description: 'Special instructions for customers picking up orders',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // MEDIA GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'image',
      title: 'Store Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Description for accessibility',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      storeType: 'storeType',
      city: 'address.city',
      isActive: 'isActive',
      media: 'image',
    },
    prepare({ title, storeType, city, isActive, media }) {
      const typeEmoji = {
        main: '🏪',
        pickup: '📦',
        partner: '🤝',
        distribution: '🚚',
      }[storeType as string] || '📍'
      
      return {
        title: `${typeEmoji} ${title}`,
        subtitle: `${city || 'No city'} ${isActive ? '' : '(Inactive)'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
