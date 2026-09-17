/**
 * Testimonial Schema
 * Phase 7: Customer Testimonials for Homepage & Marketing
 * 
 * Displays customer reviews and success stories to build trust.
 * Can reference specific products they purchased.
 * 
 * @file studio/src/schemaTypes/documents/testimonial.ts
 * @created November 27, 2025
 */

import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Customer Testimonial',
  type: 'document',
  icon: StarIcon,
  groups: [
    {name: 'customer', title: '👤 Customer Info', default: true},
    {name: 'content', title: '💬 Testimonial Content'},
    {name: 'media', title: '📸 Media'},
    {name: 'settings', title: '⚙️ Display Settings'},
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════
    // CUSTOMER INFO GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      group: 'customer',
      validation: (rule) => rule.required().min(2).max(100),
      description: 'Full name of the customer (e.g., "Maria Santos")',
    }),
    defineField({
      name: 'customerTitle',
      title: 'Customer Title/Role',
      type: 'string',
      group: 'customer',
      description: 'Optional: Their role or title (e.g., "Home Chef", "Restaurant Owner")',
    }),
    defineField({
      name: 'customerImage',
      title: 'Customer Photo',
      type: 'image',
      group: 'customer',
      options: {
        hotspot: true,
      },
      description: 'Customer profile photo (square format recommended)',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'customer',
      description: 'City or area (e.g., "Quezon City, Metro Manila")',
    }),
    defineField({
      name: 'isVerifiedPurchase',
      title: 'Verified Purchase',
      type: 'boolean',
      group: 'customer',
      initialValue: true,
      description: 'Customer actually purchased from MASH',
    }),
    
    // ═══════════════════════════════════════════════════════════════
    // TESTIMONIAL CONTENT GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      group: 'content',
      validation: (rule) => rule.required().min(1).max(5).integer(),
      description: 'Star rating (1-5)',
      options: {
        list: [
          {title: '⭐ 1 Star', value: 1},
          {title: '⭐⭐ 2 Stars', value: 2},
          {title: '⭐⭐⭐ 3 Stars', value: 3},
          {title: '⭐⭐⭐⭐ 4 Stars', value: 4},
          {title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5},
        ],
      },
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().min(5).max(100),
      description: 'Short catchy headline (e.g., "Best mushrooms I\'ve ever had!")',
    }),
    defineField({
      name: 'quote',
      title: 'Full Testimonial',
      type: 'text',
      group: 'content',
      rows: 5,
      validation: (rule) => rule.required().min(20).max(500),
      description: 'The full customer testimonial/review',
    }),
    defineField({
      name: 'productPurchased',
      title: 'Product Purchased',
      type: 'reference',
      to: [{type: 'product'}],
      group: 'content',
      description: 'Link to the product they reviewed (optional)',
    }),
    defineField({
      name: 'grower',
      title: 'Grower/Farm',
      type: 'reference',
      to: [{type: 'grower'}],
      group: 'content',
      description: 'Link to the grower if testimonial is about a specific farm',
    }),
    defineField({
      name: 'date',
      title: 'Testimonial Date',
      type: 'date',
      group: 'content',
      initialValue: () => new Date().toISOString().split('T')[0],
      description: 'When the testimonial was given',
    }),
    
    // ═══════════════════════════════════════════════════════════════
    // MEDIA GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'images',
      title: 'Customer Images',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Photos of the product or customer experience',
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'media',
      description: 'Optional video testimonial (YouTube, Vimeo)',
    }),
    
    // ═══════════════════════════════════════════════════════════════
    // DISPLAY SETTINGS GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'displayPosition',
      title: 'Display Position',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: '🏠 Homepage', value: 'homepage'},
          {title: '🛒 Shop Page', value: 'shop'},
          {title: '📦 Product Pages', value: 'product'},
          {title: '🌾 Grower Pages', value: 'grower'},
          {title: '🔄 All Pages', value: 'all'},
        ],
        layout: 'radio',
      },
      initialValue: 'homepage',
      description: 'Where should this testimonial appear?',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      group: 'settings',
      initialValue: 10,
      validation: (rule) => rule.min(1).max(100),
      description: 'Lower numbers appear first (1-100)',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Testimonial',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
      description: 'Show in featured testimonials section',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Show on website (set to false to hide)',
    }),
  ],
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'isFeatured', direction: 'desc'},
        {field: 'sortOrder', direction: 'asc'},
      ],
    },
    {
      title: 'Highest Rated',
      name: 'highestRated',
      by: [{field: 'rating', direction: 'desc'}],
    },
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'customerName',
      headline: 'headline',
      rating: 'rating',
      isFeatured: 'isFeatured',
      isActive: 'isActive',
      media: 'customerImage',
    },
    prepare({title, headline, rating, isFeatured, isActive, media}) {
      const stars = '⭐'.repeat(rating || 0)
      const featuredBadge = isFeatured ? ' 🌟' : ''
      const activeBadge = isActive ? '' : ' ⏸️'
      
      return {
        title: `${title}${featuredBadge}${activeBadge}`,
        subtitle: `${stars} - "${headline}"`,
        media,
      }
    },
  },
})
