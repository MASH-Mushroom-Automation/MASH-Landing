/**
 * Review Schema
 * 
 * Product review document with ratings, images, and moderation.
 * Phase 8: Customer Reviews System
 */

import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Product Review',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (rule) => rule.required(),
      description: 'The product being reviewed',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'email',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).integer(),
      description: '1-5 stars',
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(100),
      description: 'Short summary of the review',
    }),
    defineField({
      name: 'content',
      title: 'Review Content',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().min(10).max(1000),
      description: 'Detailed review',
    }),
    defineField({
      name: 'images',
      title: 'Review Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Customer photos of the product',
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'verifiedPurchase',
      title: 'Verified Purchase',
      type: 'boolean',
      initialValue: false,
      description: 'Customer actually purchased this product',
    }),
    defineField({
      name: 'status',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          {title: '⏳ Pending Review', value: 'pending'},
          {title: '✅ Approved', value: 'approved'},
          {title: '❌ Rejected', value: 'rejected'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      description: 'Moderation status',
    }),
    defineField({
      name: 'rejectionReason',
      title: 'Rejection Reason',
      type: 'text',
      rows: 3,
      hidden: ({document}) => document?.status !== 'rejected',
      description: 'Why was this review rejected?',
    }),
    defineField({
      name: 'helpfulCount',
      title: 'Helpful Votes',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
      description: 'Number of people who found this review helpful',
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'moderatedBy',
      title: 'Moderated By',
      type: 'string',
      description: 'Admin who moderated this review',
      readOnly: true,
    }),
    defineField({
      name: 'moderatedAt',
      title: 'Moderated At',
      type: 'datetime',
      description: 'When the review was moderated',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      rating: 'rating',
      customer: 'customerName',
      status: 'status',
      productName: 'product.name',
      verifiedPurchase: 'verifiedPurchase',
    },
    prepare({title, rating, customer, status, productName, verifiedPurchase}) {
      const stars = '⭐'.repeat(rating)
      const verified = verifiedPurchase ? '✓ Verified' : ''
      const statusEmoji = status === 'approved' ? '✅' : status === 'rejected' ? '❌' : '⏳'
      
      return {
        title: `${stars} - ${title}`,
        subtitle: `${customer} ${verified ? '• ' + verified : ''} • ${productName || 'No product'} ${statusEmoji}`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{field: 'reviewDate', direction: 'desc'}],
    },
    {
      title: 'Highest Rated',
      name: 'highestRated',
      by: [{field: 'rating', direction: 'desc'}],
    },
    {
      title: 'Most Helpful',
      name: 'mostHelpful',
      by: [{field: 'helpfulCount', direction: 'desc'}],
    },
  ],
})
