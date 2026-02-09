/**
 * Promotion Schema
 * Seasonal sales and special offers
 */

import {defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export const promotion = defineType({
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    // Promotion Identification
    defineField({
      name: 'name',
      title: 'Promotion Name',
      type: 'string',
      description: 'Internal name for this promotion (e.g., "Black Friday 2025")',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),

    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Public-facing name shown to customers',
      validation: (Rule) => Rule.required().min(3).max(80),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short promotional text (e.g., "Up to 50% OFF!")',
      validation: (Rule) => Rule.max(60),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Detailed description of the promotion',
      validation: (Rule) => Rule.required().max(500),
    }),

    // Visual Assets
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      description: 'Main promotional banner (1920x600px recommended)',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Small preview image (400x400px)',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code for banner background',
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
          invert: false,
        }),
    }),

    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color code for banner text',
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
          invert: false,
        }),
    }),

    // Promotion Type
    defineField({
      name: 'promotionType',
      title: 'Promotion Type',
      type: 'string',
      options: {
        list: [
          {title: '🔥 Flash Sale', value: 'flash-sale'},
          {title: '🎉 Seasonal Sale', value: 'seasonal'},
          {title: '💝 Bundle Deal', value: 'bundle'},
          {title: '🆕 New Arrival', value: 'new-arrival'},
          {title: '🎁 Buy One Get One', value: 'bogo'},
          {title: '📦 Free Shipping', value: 'free-shipping'},
          {title: '⭐ Featured Deal', value: 'featured'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // Discount Configuration
    defineField({
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          {title: 'Percentage Off', value: 'percentage'},
          {title: 'Fixed Amount Off', value: 'fixed'},
          {title: 'No Discount (Informational)', value: 'none'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      description: 'Percentage (0-100) or fixed amount (₱)',
      hidden: ({parent}) => parent?.discountType === 'none',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const discountType = (context.parent as any)?.discountType
          if (discountType === 'none') return true
          if (!value) return 'Discount value is required'
          if (discountType === 'percentage' && (value < 0 || value > 100)) {
            return 'Percentage must be between 0 and 100'
          }
          if (discountType === 'fixed' && value <= 0) {
            return 'Fixed amount must be greater than 0'
          }
          return true
        }),
    }),

    // Applicable Products
    defineField({
      name: 'applicableProducts',
      title: 'Applicable To',
      type: 'string',
      options: {
        list: [
          {title: 'All Products', value: 'all'},
          {title: 'Specific Products', value: 'products'},
          {title: 'Specific Categories', value: 'categories'},
          {title: 'Specific Bundles', value: 'bundles'},
        ],
      },
      initialValue: 'all',
    }),

    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      hidden: ({parent}) => parent?.applicableProducts !== 'products',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const applicableProducts = (context.parent as any)?.applicableProducts
          if (applicableProducts === 'products' && (!value || value.length === 0)) {
            return 'Select at least one product'
          }
          return true
        }),
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      hidden: ({parent}) => parent?.applicableProducts !== 'categories',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const applicableProducts = (context.parent as any)?.applicableProducts
          if (applicableProducts === 'categories' && (!value || value.length === 0)) {
            return 'Select at least one category'
          }
          return true
        }),
    }),

    defineField({
      name: 'bundles',
      title: 'Bundles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'productBundle'}]}],
      hidden: ({parent}) => parent?.applicableProducts !== 'bundles',
    }),

    // Validity Period
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When this promotion starts',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When this promotion ends',
      validation: (Rule) =>
        Rule.required().custom((endDate, context) => {
          const startDate = (context.parent as any)?.startDate
          if (!startDate || !endDate) return true
          if (new Date(endDate) <= new Date(startDate)) {
            return 'End date must be after start date'
          }
          return true
        }),
    }),

    // Display Settings
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Display this promotion on the homepage banner',
      initialValue: false,
    }),

    defineField({
      name: 'showOnProductPages',
      title: 'Show on Product Pages',
      type: 'boolean',
      description: 'Show promotion badge on applicable products',
      initialValue: true,
    }),

    defineField({
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      description: 'Higher numbers show first (0-100)',
      initialValue: 50,
      validation: (Rule) => Rule.min(0).max(100),
    }),

    // Call to Action
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Button text (e.g., "Shop Now", "View Deals")',
      initialValue: 'Shop Now',
      validation: (Rule) => Rule.max(30),
    }),

    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'Where the CTA button should link to (e.g., /shop, /category/mushrooms)',
    }),

    // Status
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Enable/disable this promotion',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark as featured promotion (shows prominently)',
      initialValue: false,
    }),

    // Tracking
    defineField({
      name: 'impressions',
      title: 'Impressions',
      type: 'number',
      description: 'Number of times viewed',
      initialValue: 0,
      readOnly: true,
    }),

    defineField({
      name: 'clicks',
      title: 'Clicks',
      type: 'number',
      description: 'Number of times clicked',
      initialValue: 0,
      readOnly: true,
    }),

    defineField({
      name: 'conversions',
      title: 'Conversions',
      type: 'number',
      description: 'Number of orders attributed to this promotion',
      initialValue: 0,
      readOnly: true,
    }),

    // Additional Info
    defineField({
      name: 'terms',
      title: 'Terms & Conditions',
      type: 'text',
      rows: 4,
      description: 'Legal terms for this promotion',
    }),

    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    }),
  ],

  preview: {
    select: {
      name: 'displayName',
      promotionType: 'promotionType',
      discountType: 'discountType',
      discountValue: 'discountValue',
      isActive: 'isActive',
      isFeatured: 'isFeatured',
      startDate: 'startDate',
      endDate: 'endDate',
      conversions: 'conversions',
    },
    prepare({
      name,
      promotionType,
      discountType,
      discountValue,
      isActive,
      isFeatured,
      startDate,
      endDate,
      conversions,
    }) {
      // Type emoji
      const typeEmojis: Record<string, string> = {
        'flash-sale': '🔥',
        seasonal: '🎉',
        bundle: '💝',
        'new-arrival': '🆕',
        bogo: '🎁',
        'free-shipping': '📦',
        featured: '⭐',
      }
      const typeEmoji = typeEmojis[promotionType] || '🎯'

      // Discount display
      let discount = ''
      if (discountType === 'percentage') {
        discount = `${discountValue}% OFF`
      } else if (discountType === 'fixed') {
        discount = `₱${discountValue} OFF`
      }

      // Status
      const statusEmoji = isActive ? '✅' : '❌'
      const featuredBadge = isFeatured ? '⭐' : ''

      // Date status
      const now = new Date()
      const start = new Date(startDate)
      const end = new Date(endDate)
      let dateStatus = ''
      if (now < start) {
        dateStatus = '🔜 Upcoming'
      } else if (now > end) {
        dateStatus = '⏰ Expired'
      } else {
        dateStatus = '🟢 Active'
      }

      return {
        title: `${statusEmoji} ${featuredBadge} ${typeEmoji} ${name}`,
        subtitle: `${discount} • ${dateStatus} • ${conversions} conversions`,
      }
    },
  },

  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [{field: 'priority', direction: 'desc'}],
    },
    {
      title: 'Start Date (Newest)',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
    {
      title: 'End Date (Soonest)',
      name: 'endingSoon',
      by: [{field: 'endDate', direction: 'asc'}],
    },
    {
      title: 'Most Conversions',
      name: 'mostConversions',
      by: [{field: 'conversions', direction: 'desc'}],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'isFeatured', direction: 'desc'},
        {field: 'priority', direction: 'desc'},
      ],
    },
  ],
})
