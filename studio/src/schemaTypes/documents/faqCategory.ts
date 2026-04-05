import { defineField, defineType } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export const faqCategory = defineType({
  name: 'faqCategory',
  title: 'FAQ Category',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'The name of this FAQ category (e.g., "Ordering & Payment", "Shipping & Delivery")',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for this category',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of what questions this category covers',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from Lucide icons (e.g., "ShoppingCart", "Truck", "CreditCard")',
      options: {
        list: [
          { title: 'Shopping Cart', value: 'ShoppingCart' },
          { title: 'Truck (Shipping)', value: 'Truck' },
          { title: 'Credit Card (Payment)', value: 'CreditCard' },
          { title: 'Package', value: 'Package' },
          { title: 'User', value: 'User' },
          { title: 'Leaf (Products)', value: 'Leaf' },
          { title: 'Settings', value: 'Settings' },
          { title: 'Help Circle', value: 'HelpCircle' },
          { title: 'Phone', value: 'Phone' },
          { title: 'Mail', value: 'Mail' },
          { title: 'Clock', value: 'Clock' },
          { title: 'Shield', value: 'Shield' },
          { title: 'Undo (Returns)', value: 'Undo' },
        ],
      },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category appears (lower numbers appear first)',
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this category is visible on the website',
      initialValue: true,
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
      displayOrder: 'displayOrder',
      isActive: 'isActive',
    },
    prepare({ title, displayOrder, isActive }) {
      return {
        title: title || 'Untitled Category',
        subtitle: `Order: ${displayOrder ?? 0} • ${isActive ? '✅ Active' : '❌ Inactive'}`,
      }
    },
  },
})
