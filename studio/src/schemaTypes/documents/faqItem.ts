import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Question',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The frequently asked question',
      validation: (rule) => rule.required().min(10).max(500),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      description: 'The answer to this question (supports plain text, use markdown-like formatting)',
      rows: 6,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: 'richAnswer',
      title: 'Rich Answer (Optional)',
      type: 'array',
      description: 'Rich text answer with formatting, links, and images (overrides plain text answer if provided)',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'faqCategory' }],
      description: 'Which category does this question belong to?',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order within the category (lower numbers appear first)',
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this FAQ is visible on the website',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      description: 'Show this FAQ in the featured/popular section',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for search and filtering (e.g., "payment", "shipping", "returns")',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'relatedFAQs',
      title: 'Related FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faqItem' }],
        },
      ],
      description: 'Link to other related FAQs for better navigation',
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: 'helpfulCount',
      title: 'Helpful Count',
      type: 'number',
      description: 'Number of users who found this FAQ helpful',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'notHelpfulCount',
      title: 'Not Helpful Count',
      type: 'number',
      description: 'Number of users who did not find this FAQ helpful',
      initialValue: 0,
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Most Helpful',
      name: 'helpfulDesc',
      by: [{ field: 'helpfulCount', direction: 'desc' }],
    },
    {
      title: 'Recently Updated',
      name: 'updatedAtDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'question',
      categoryName: 'category.name',
      displayOrder: 'displayOrder',
      isActive: 'isActive',
      isFeatured: 'isFeatured',
    },
    prepare({ title, categoryName, displayOrder, isActive, isFeatured }) {
      const badges = []
      if (isFeatured) badges.push('⭐')
      if (!isActive) badges.push('❌')
      
      return {
        title: title || 'Untitled Question',
        subtitle: `${categoryName || 'No Category'} • Order: ${displayOrder ?? 0} ${badges.join(' ')}`,
      }
    },
  },
})
