import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Product Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // Legacy field - kept for backwards compatibility with old data
    defineField({
      name: 'categoryName',
      title: 'Category Name (Legacy)',
      type: 'string',
      hidden: true, // Hide from UI since we use 'name' now
      description: 'Legacy field - use "name" instead',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Leave empty for main categories. Select a category to make this a subcategory.',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Category',
      type: 'boolean',
      description: 'Show this category on the homepage or featured sections',
      initialValue: false,
    }),
    // Legacy field - kept for backwards compatibility with old data
    defineField({
      name: 'featuredCategory',
      title: 'Featured Category (Legacy)',
      type: 'boolean',
      hidden: true, // Hide from UI since we use 'featured' now
      description: 'Legacy field - use "featured" instead',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Inactive categories will not be shown on the website',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order in which categories appear (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Page title for search engines (50-60 characters)',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Meta description for search engines (150-160 characters)',
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords for search optimization (add one keyword per item)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
      parentName: 'parentCategory.name',
    },
    prepare({title, subtitle, media, parentName}) {
      return {
        title,
        subtitle: parentName ? `${parentName} → ${subtitle || ''}` : subtitle,
        media,
      }
    },
  },
})
