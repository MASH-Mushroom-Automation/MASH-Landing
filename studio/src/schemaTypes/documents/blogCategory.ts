import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Blog Category Schema - Phase 8
 * 
 * Organizes blog posts into categories for better navigation and filtering.
 * Used in blog list page for filtering and in individual post pages.
 * 
 * Features:
 * - Colored category badges
 * - Custom icons per category
 * - SEO-friendly slugs
 * - Display order for consistent ordering
 * 
 * @see src/hooks/useSanityBlogPosts.ts for frontend integration
 */

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., "Recipes", "Growing Tips", "Nutrition"',
      validation: (rule) => rule.required().min(2).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (auto-generated from name)',
      options: {
        source: 'name',
        maxLength: 50,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this category (shown on category pages)',
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "utensils", "sprout", "heart-pulse")',
      options: {
        list: [
          { title: '🍳 Utensils (Recipes)', value: 'utensils' },
          { title: '🌱 Sprout (Growing Tips)', value: 'sprout' },
          { title: '💊 Heart Pulse (Health)', value: 'heart-pulse' },
          { title: '📰 Newspaper (News)', value: 'newspaper' },
          { title: '🎓 Graduation Cap (Education)', value: 'graduation-cap' },
          { title: '👨‍🌾 Users (Community)', value: 'users' },
          { title: '🏪 Store (Market)', value: 'store' },
          { title: '💡 Lightbulb (Tips)', value: 'lightbulb' },
          { title: '📦 Package (Products)', value: 'package' },
          { title: '🌍 Globe (Sustainability)', value: 'globe' },
        ],
      },
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      description: 'Badge color for this category',
      options: {
        list: [
          { title: '🟢 Green (Primary)', value: 'green' },
          { title: '🔵 Blue', value: 'blue' },
          { title: '🟣 Purple', value: 'purple' },
          { title: '🟠 Orange', value: 'orange' },
          { title: '🔴 Red', value: 'red' },
          { title: '🟡 Yellow', value: 'yellow' },
          { title: '⚫ Gray', value: 'gray' },
        ],
        layout: 'radio',
      },
      initialValue: 'green',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      description: 'Optional image for category pages',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1-100)',
      initialValue: 50,
      validation: (rule) => rule.min(1).max(100),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Inactive categories are hidden from the website',
      initialValue: true,
    }),
    defineField({
      name: 'postCount',
      title: 'Post Count',
      type: 'number',
      description: 'Number of posts in this category (auto-updated)',
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
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, isActive }) {
      return {
        title: `${isActive ? '' : '🚫 '}${title}`,
        subtitle: subtitle || 'No description',
        media,
      }
    },
  },
})
