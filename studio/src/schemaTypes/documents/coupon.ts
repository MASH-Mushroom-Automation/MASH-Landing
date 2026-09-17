/**
 * Coupon Schema
 * Discount codes for customer orders
 */

import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const coupon = defineType({
  name: 'coupon',
  title: 'Coupon',
  type: 'document',
  icon: TagIcon,
  fields: [
    // Coupon Identification
    defineField({
      name: 'code',
      title: 'Coupon Code',
      type: 'string',
      description: 'Unique coupon code (e.g., SAVE20, NEWUSER10)',
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(20)
          .uppercase()
          .regex(/^[A-Z0-9]+$/, {
            name: 'alphanumeric uppercase',
            invert: false,
          }),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Internal description of this coupon',
      validation: (Rule) => Rule.required().max(200),
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
          {title: 'Free Shipping', value: 'free-shipping'},
          {title: 'Buy X Get Y', value: 'bogo'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      description: 'Percentage (0-100) or fixed amount (₱)',
      hidden: ({parent}) => parent?.discountType === 'free-shipping',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const discountType = (context.parent as any)?.discountType
          if (discountType === 'free-shipping') return true
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

    defineField({
      name: 'minimumPurchase',
      title: 'Minimum Purchase Amount',
      type: 'number',
      description: 'Minimum order total required to use this coupon (₱)',
      initialValue: 0,
    }),

    defineField({
      name: 'maximumDiscount',
      title: 'Maximum Discount Amount',
      type: 'number',
      description: 'Cap the discount amount (for percentage discounts)',
      hidden: ({parent}) => parent?.discountType !== 'percentage',
    }),

    // Applicable Products
    defineField({
      name: 'applicableProducts',
      title: 'Applicable Products',
      type: 'string',
      options: {
        list: [
          {title: 'All Products', value: 'all'},
          {title: 'Specific Products', value: 'specific'},
          {title: 'Specific Categories', value: 'categories'},
        ],
      },
      initialValue: 'all',
    }),

    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      hidden: ({parent}) => parent?.applicableProducts !== 'specific',
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      hidden: ({parent}) => parent?.applicableProducts !== 'categories',
    }),

    // Usage Limits
    defineField({
      name: 'usageLimit',
      title: 'Total Usage Limit',
      type: 'number',
      description: 'Maximum number of times this coupon can be used (blank = unlimited)',
    }),

    defineField({
      name: 'usageLimitPerCustomer',
      title: 'Usage Limit Per Customer',
      type: 'number',
      description: 'Maximum uses per customer (blank = unlimited)',
      initialValue: 1,
    }),

    defineField({
      name: 'usageCount',
      title: 'Usage Count',
      type: 'number',
      description: 'Number of times this coupon has been used',
      initialValue: 0,
      readOnly: true,
    }),

    // Validity Period
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When this coupon becomes active',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When this coupon expires',
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

    // Status
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Enable/disable this coupon',
      initialValue: true,
    }),

    defineField({
      name: 'isPublic',
      title: 'Public',
      type: 'boolean',
      description: 'Show this coupon on website (or keep it private for targeted campaigns)',
      initialValue: false,
    }),

    // Additional Settings
    defineField({
      name: 'combinableWithOtherCoupons',
      title: 'Combinable with Other Coupons',
      type: 'boolean',
      description: 'Allow using this coupon with other coupons',
      initialValue: false,
    }),

    defineField({
      name: 'customerEligibility',
      title: 'Customer Eligibility',
      type: 'string',
      options: {
        list: [
          {title: 'All Customers', value: 'all'},
          {title: 'New Customers Only', value: 'new'},
          {title: 'Existing Customers Only', value: 'existing'},
        ],
      },
      initialValue: 'all',
    }),

    // Tracking
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where this coupon is distributed (email, social, website)',
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
      code: 'code',
      discountType: 'discountType',
      discountValue: 'discountValue',
      isActive: 'isActive',
      usageCount: 'usageCount',
      usageLimit: 'usageLimit',
      endDate: 'endDate',
    },
    prepare({code, discountType, discountValue, isActive, usageCount, usageLimit, endDate}) {
      // Discount display
      let discount = ''
      if (discountType === 'percentage') {
        discount = `${discountValue}% OFF`
      } else if (discountType === 'fixed') {
        discount = `₱${discountValue} OFF`
      } else if (discountType === 'free-shipping') {
        discount = 'FREE SHIPPING'
      } else if (discountType === 'bogo') {
        discount = 'BOGO'
      }

      // Status
      const statusEmoji = isActive ? '✅' : '❌'

      // Usage
      const usage = usageLimit ? `${usageCount}/${usageLimit} used` : `${usageCount} used`

      // Expiration
      const now = new Date()
      const expires = new Date(endDate)
      const isExpired = expires < now
      const expiryStatus = isExpired ? '⏰ EXPIRED' : ''

      return {
        title: `${statusEmoji} ${code} - ${discount}`,
        subtitle: `${usage} • ${expiryStatus}`,
      }
    },
  },

  orderings: [
    {
      title: 'Code (A-Z)',
      name: 'codeAsc',
      by: [{field: 'code', direction: 'asc'}],
    },
    {
      title: 'Most Used',
      name: 'mostUsed',
      by: [{field: 'usageCount', direction: 'desc'}],
    },
    {
      title: 'End Date (Soonest)',
      name: 'endingSoon',
      by: [{field: 'endDate', direction: 'asc'}],
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        {field: 'isActive', direction: 'desc'},
        {field: 'endDate', direction: 'asc'},
      ],
    },
  ],
})
