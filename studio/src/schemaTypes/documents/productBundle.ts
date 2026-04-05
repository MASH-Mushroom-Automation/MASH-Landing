/**
 * Product Bundle Schema
 * Defines product bundles (multi-product packages) with bundle pricing and discounts
 */

import {PackageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productBundle = defineType({
  name: 'productBundle',
  title: 'Product Bundle',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'bundleName',
      title: 'Bundle Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
      description: 'Name of the bundle (e.g., "Gourmet Mushroom Starter Pack")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'bundleName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly identifier',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(500),
      description: 'Short description of the bundle benefits',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.max(100),
      description: 'Short promotional tagline (e.g., "Save 20% when you buy together!")',
    }),

    // Bundle Products
    defineField({
      name: 'products',
      title: 'Products in Bundle',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{type: 'product'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).integer(),
              initialValue: 1,
              description: 'Number of units of this product in the bundle',
            },
            {
              name: 'variant',
              title: 'Specific Variant (Optional)',
              type: 'reference',
              to: [{type: 'productVariant'}],
              description: 'Select a specific variant, or leave blank for default',
            },
          ],
          preview: {
            select: {
              productName: 'product.name',
              quantity: 'quantity',
              variantName: 'variant.variantName',
            },
            prepare({productName, quantity, variantName}) {
              return {
                title: productName || 'Unknown Product',
                subtitle: variantName ? `${quantity}x - ${variantName}` : `${quantity}x`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(10),
      description: 'Select 2-10 products for this bundle',
    }),

    // Pricing
    defineField({
      name: 'bundlePrice',
      title: 'Bundle Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Special bundle price (should be less than sum of individual prices)',
    }),
    defineField({
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
      description: 'Percentage discount (calculated automatically, can override)',
      readOnly: false,
    }),
    defineField({
      name: 'savingsAmount',
      title: 'Savings Amount',
      type: 'number',
      description: 'Amount saved vs buying separately (auto-calculated)',
      readOnly: true,
    }),

    // Images
    defineField({
      name: 'bundleImage',
      title: 'Bundle Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Main image for the bundle',
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Additional bundle images',
    }),

    // Availability
    defineField({
      name: 'isActive',
      title: 'Bundle Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to activate/deactivate this bundle',
    }),
    defineField({
      name: 'availableFrom',
      title: 'Available From',
      type: 'datetime',
      description: 'Date when bundle becomes available (optional)',
    }),
    defineField({
      name: 'availableUntil',
      title: 'Available Until',
      type: 'datetime',
      description: 'Date when bundle expires (optional)',
    }),
    defineField({
      name: 'stockLimit',
      title: 'Stock Limit',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
      description: 'Maximum number of bundles available (leave blank for unlimited)',
    }),

    // Display
    defineField({
      name: 'featured',
      title: 'Featured Bundle',
      type: 'boolean',
      initialValue: false,
      description: 'Show on homepage or featured sections',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          {title: 'Best Value', value: 'best-value'},
          {title: 'Most Popular', value: 'popular'},
          {title: 'Limited Time', value: 'limited'},
          {title: 'New', value: 'new'},
          {title: 'Exclusive', value: 'exclusive'},
        ],
      },
      description: 'Display badge for this bundle',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (Rule) => Rule.integer(),
      initialValue: 0,
      description: 'Display order (lower numbers appear first)',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'bundleName',
      bundlePrice: 'bundlePrice',
      discountPercentage: 'discountPercentage',
      isActive: 'isActive',
      featured: 'featured',
      badge: 'badge',
      products: 'products',
      image: 'bundleImage',
    },
    prepare({title, bundlePrice, discountPercentage, isActive, featured, badge, products, image}) {
      const activeEmoji = isActive ? '✅' : '❌'
      const featuredEmoji = featured ? '⭐' : ''
      const productCount = products?.length || 0
      const discount = discountPercentage ? `${discountPercentage}% OFF` : ''
      const badgeText = badge ? ` • ${badge.toUpperCase()}` : ''

      return {
        title: `${title} ${activeEmoji} ${featuredEmoji}`,
        subtitle: `₱${bundlePrice?.toFixed(2)} • ${discount} • ${productCount} products${badgeText}`,
        media: image || PackageIcon,
      }
    },
  },

  orderings: [
    {
      title: 'Bundle Name',
      name: 'name',
      by: [{field: 'bundleName', direction: 'asc'}],
    },
    {
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [{field: 'bundlePrice', direction: 'asc'}],
    },
    {
      title: 'Discount (High to Low)',
      name: 'discount',
      by: [{field: 'discountPercentage', direction: 'desc'}],
    },
    {
      title: 'Featured First',
      name: 'featured',
      by: [{field: 'featured', direction: 'desc'}],
    },
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
})
