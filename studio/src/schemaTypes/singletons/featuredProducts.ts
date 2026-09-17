import {SparklesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const featuredProducts = defineType({
  name: 'featuredProducts',
  title: 'Featured Products',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Featured Products',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Discover our best-selling medicines, vitamins, and personal care items',
    }),
    defineField({
      name: 'products',
      title: 'Featured Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      validation: (rule) => rule.min(4).max(8).error('Please select between 4 and 8 products'),
      description: 'Select 4-8 products to feature on the homepage',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      products: 'products',
    },
    prepare({title, products}) {
      return {
        title: title || 'Featured Products',
        subtitle: products ? `${products.length} products selected` : 'No products selected',
      }
    },
  },
})
