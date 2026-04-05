/**
 * Email Campaign Schema
 * Marketing email campaigns and newsletters
 */

import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const emailCampaign = defineType({
  name: 'emailCampaign',
  title: 'Email Campaign',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    // Campaign Identification
    defineField({
      name: 'name',
      title: 'Campaign Name',
      type: 'string',
      description: 'Internal campaign name',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),

    defineField({
      name: 'subject',
      title: 'Email Subject',
      type: 'string',
      description: 'Subject line (keep under 50 characters for better open rates)',
      validation: (Rule) => Rule.required().min(5).max(150),
    }),

    defineField({
      name: 'preheader',
      title: 'Preheader Text',
      type: 'string',
      description: 'Preview text shown after subject line',
      validation: (Rule) => Rule.max(100),
    }),

    // Campaign Type
    defineField({
      name: 'campaignType',
      title: 'Campaign Type',
      type: 'string',
      options: {
        list: [
          {title: '📰 Newsletter', value: 'newsletter'},
          {title: '🎯 Promotional', value: 'promotional'},
          {title: '🎉 Announcement', value: 'announcement'},
          {title: '📦 Product Launch', value: 'product-launch'},
          {title: '🛒 Abandoned Cart', value: 'abandoned-cart'},
          {title: '🎂 Birthday/Special', value: 'special'},
          {title: '📋 Transactional', value: 'transactional'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // Email Content
    defineField({
      name: 'content',
      title: 'Email Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
          ],
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      description: 'Main email content (will be converted to HTML)',
    }),

    defineField({
      name: 'plainTextContent',
      title: 'Plain Text Version',
      type: 'text',
      rows: 10,
      description: 'Plain text fallback for email clients that don\'t support HTML',
    }),

    // Call to Action
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required().max(30),
            },
            {
              name: 'url',
              title: 'Button URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Outline', value: 'outline'},
                ],
              },
              initialValue: 'primary',
            },
          ],
          preview: {
            select: {
              text: 'text',
              url: 'url',
              style: 'style',
            },
            prepare({text, url, style}) {
              return {
                title: text,
                subtitle: `${style} • ${url}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // Featured Products
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Products to showcase in this email',
      validation: (Rule) => Rule.max(6),
    }),

    // Audience Targeting
    defineField({
      name: 'audience',
      title: 'Target Audience',
      type: 'string',
      options: {
        list: [
          {title: 'All Subscribers', value: 'all'},
          {title: 'New Subscribers', value: 'new'},
          {title: 'Active Customers', value: 'active'},
          {title: 'Inactive Customers', value: 'inactive'},
          {title: 'VIP Customers', value: 'vip'},
          {title: 'Custom Segment', value: 'custom'},
        ],
      },
      initialValue: 'all',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'customSegment',
      title: 'Custom Segment',
      type: 'text',
      rows: 2,
      description: 'Describe the custom segment criteria',
      hidden: ({parent}) => parent?.audience !== 'custom',
    }),

    // Scheduling
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: '📝 Draft', value: 'draft'},
          {title: '⏰ Scheduled', value: 'scheduled'},
          {title: '📤 Sent', value: 'sent'},
          {title: '❌ Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'scheduledDate',
      title: 'Scheduled Send Date',
      type: 'datetime',
      description: 'When to send this email',
      hidden: ({parent}) => parent?.status !== 'scheduled',
    }),

    defineField({
      name: 'sentDate',
      title: 'Sent Date',
      type: 'datetime',
      description: 'When this email was actually sent',
      readOnly: true,
    }),

    // A/B Testing
    defineField({
      name: 'enableABTest',
      title: 'Enable A/B Testing',
      type: 'boolean',
      description: 'Test different subject lines or content',
      initialValue: false,
    }),

    defineField({
      name: 'variantBSubject',
      title: 'Variant B Subject',
      type: 'string',
      description: 'Alternative subject line for A/B test',
      hidden: ({parent}) => !parent?.enableABTest,
    }),

    // Email Settings
    defineField({
      name: 'fromName',
      title: 'From Name',
      type: 'string',
      description: 'Sender name (e.g., "MASH Team")',
      initialValue: 'MASH',
    }),

    defineField({
      name: 'replyToEmail',
      title: 'Reply-To Email',
      type: 'string',
      description: 'Email address for replies',
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
          name: 'email',
          invert: false,
        }),
    }),

    // Performance Tracking
    defineField({
      name: 'recipientCount',
      title: 'Recipients',
      type: 'number',
      description: 'Number of recipients',
      initialValue: 0,
      readOnly: true,
    }),

    defineField({
      name: 'opens',
      title: 'Opens',
      type: 'number',
      description: 'Number of times opened',
      initialValue: 0,
      readOnly: true,
    }),

    defineField({
      name: 'uniqueOpens',
      title: 'Unique Opens',
      type: 'number',
      description: 'Number of unique recipients who opened',
      initialValue: 0,
      readOnly: true,
    }),

    defineField({
      name: 'clicks',
      title: 'Clicks',
      type: 'number',
      description: 'Number of link clicks',
      initialValue: 0,
      readOnly: true,
    }),

    defineField({
      name: 'uniqueClicks',
      title: 'Unique Clicks',
      type: 'number',
      description: 'Number of unique recipients who clicked',
      initialValue: 0,
      readOnly: true,
    }),

    defineField({
      name: 'bounces',
      title: 'Bounces',
      type: 'number',
      description: 'Number of bounced emails',
      initialValue: 0,
      readOnly: true,
    }),

    defineField({
      name: 'unsubscribes',
      title: 'Unsubscribes',
      type: 'number',
      description: 'Number of unsubscribes',
      initialValue: 0,
      readOnly: true,
    }),

    // Additional Info
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],

  preview: {
    select: {
      name: 'name',
      subject: 'subject',
      campaignType: 'campaignType',
      status: 'status',
      recipientCount: 'recipientCount',
      opens: 'opens',
      uniqueOpens: 'uniqueOpens',
      clicks: 'clicks',
      sentDate: 'sentDate',
    },
    prepare({
      name,
      subject,
      campaignType,
      status,
      recipientCount,
      opens,
      uniqueOpens,
      clicks,
      sentDate,
    }) {
      // Status emoji
      const statusEmojis: Record<string, string> = {
        draft: '📝',
        scheduled: '⏰',
        sent: '📤',
        cancelled: '❌',
      }
      const statusEmoji = statusEmojis[status] || '📧'

      // Type badge
      const typeLabels: Record<string, string> = {
        newsletter: 'Newsletter',
        promotional: 'Promo',
        announcement: 'Announce',
        'product-launch': 'Launch',
        'abandoned-cart': 'Cart',
        special: 'Special',
        transactional: 'Trans',
      }
      const typeLabel = typeLabels[campaignType] || campaignType

      // Performance metrics
      const openRate =
        status === 'sent' && recipientCount > 0
          ? `${Math.round((uniqueOpens / recipientCount) * 100)}% open`
          : ''
      const clickRate =
        status === 'sent' && uniqueOpens > 0
          ? `${Math.round((clicks / uniqueOpens) * 100)}% click`
          : ''

      const metrics =
        status === 'sent' ? `${recipientCount} sent • ${openRate} • ${clickRate}` : typeLabel

      return {
        title: `${statusEmoji} ${name}`,
        subtitle: `"${subject}" • ${metrics}`,
      }
    },
  },

  orderings: [
    {
      title: 'Sent Date (Newest)',
      name: 'sentDateDesc',
      by: [{field: 'sentDate', direction: 'desc'}],
    },
    {
      title: 'Scheduled Date',
      name: 'scheduledDate',
      by: [{field: 'scheduledDate', direction: 'asc'}],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{field: 'status', direction: 'asc'}],
    },
    {
      title: 'Best Open Rate',
      name: 'bestOpenRate',
      by: [{field: 'uniqueOpens', direction: 'desc'}],
    },
    {
      title: 'Most Clicks',
      name: 'mostClicks',
      by: [{field: 'clicks', direction: 'desc'}],
    },
  ],
})
