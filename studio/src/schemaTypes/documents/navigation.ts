import { MenuIcon } from '@sanity/icons'
import { defineField, defineType, defineArrayMember } from 'sanity'

/**
 * Navigation Schema - Phase 5
 * Manages header and footer navigation menus
 * 
 * Features:
 * - Multiple menu types (header-main, header-secondary, footer-shop, footer-support, etc.)
 * - Nested menu support (dropdown menus)
 * - Internal/external link support
 * - Icon support for menu items
 * - Active/inactive toggle
 * - Sort ordering
 * 
 * @see src/components/layout/header.tsx
 * @see src/components/layout/footer.tsx
 */

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation Menu',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal name for this menu (e.g., "Main Navigation", "Footer Shop Links")',
    }),
    defineField({
      name: 'slug',
      title: 'Menu Identifier',
      type: 'slug',
      description: 'Unique identifier used to fetch this menu (e.g., "header-main", "footer-shop")',
      options: {
        source: 'title',
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'menuType',
      title: 'Menu Type',
      type: 'string',
      options: {
        list: [
          { title: '📍 Header - Main Navigation', value: 'header-main' },
          { title: '📍 Header - Secondary (Top Bar)', value: 'header-secondary' },
          { title: '📍 Header - Mobile Menu', value: 'header-mobile' },
          { title: '🔗 Footer - Shop Links', value: 'footer-shop' },
          { title: '🔗 Footer - Customer Service', value: 'footer-support' },
          { title: '🔗 Footer - About Links', value: 'footer-about' },
          { title: '🔗 Footer - Legal Links', value: 'footer-legal' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(50),
              description: 'Display text for the menu item',
            }),
            defineField({
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              initialValue: 'internal',
              options: {
                list: [
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' },
                  { title: 'Reference to Page', value: 'pageRef' },
                  { title: 'No Link (Header Only)', value: 'none' },
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'internalPath',
              title: 'Internal Path',
              type: 'string',
              description: 'Path starting with / (e.g., /shop, /about, /contact)',
              hidden: ({ parent }) => parent?.linkType !== 'internal',
            }),
            defineField({
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              description: 'Full URL including https://',
              hidden: ({ parent }) => parent?.linkType !== 'external',
            }),
            defineField({
              name: 'pageReference',
              title: 'Page Reference',
              type: 'reference',
              to: [{ type: 'page' }],
              hidden: ({ parent }) => parent?.linkType !== 'pageRef',
            }),
            defineField({
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
              hidden: ({ parent }) => parent?.linkType === 'none',
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., "ShoppingBag", "User", "Heart")',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: '🏠 Home', value: 'Home' },
                  { title: '🛒 ShoppingBag', value: 'ShoppingBag' },
                  { title: '🛍️ Store', value: 'Store' },
                  { title: '👤 User', value: 'User' },
                  { title: '❤️ Heart', value: 'Heart' },
                  { title: '📝 FileText', value: 'FileText' },
                  { title: '❓ HelpCircle', value: 'HelpCircle' },
                  { title: '📧 Mail', value: 'Mail' },
                  { title: '📞 Phone', value: 'Phone' },
                  { title: '📍 MapPin', value: 'MapPin' },
                  { title: '📰 Newspaper', value: 'Newspaper' },
                  { title: '🌱 Sprout', value: 'Sprout' },
                  { title: '🤝 Handshake', value: 'Handshake' },
                ],
              },
            }),
            defineField({
              name: 'highlight',
              title: 'Highlight Item',
              type: 'boolean',
              initialValue: false,
              description: 'Make this item stand out (e.g., "New!", "Sale")',
            }),
            defineField({
              name: 'highlightText',
              title: 'Highlight Badge Text',
              type: 'string',
              description: 'Text for highlight badge (e.g., "New", "Sale", "Hot")',
              hidden: ({ parent }) => !parent?.highlight,
            }),
            // Nested children for dropdown support
            defineField({
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              description: 'Nested menu items (for dropdown menus)',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'childMenuItem',
                  title: 'Child Menu Item',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required().max(50),
                    }),
                    defineField({
                      name: 'linkType',
                      title: 'Link Type',
                      type: 'string',
                      initialValue: 'internal',
                      options: {
                        list: [
                          { title: 'Internal Page', value: 'internal' },
                          { title: 'External URL', value: 'external' },
                        ],
                        layout: 'radio',
                      },
                    }),
                    defineField({
                      name: 'internalPath',
                      title: 'Internal Path',
                      type: 'string',
                      hidden: ({ parent }) => parent?.linkType !== 'internal',
                    }),
                    defineField({
                      name: 'externalUrl',
                      title: 'External URL',
                      type: 'url',
                      hidden: ({ parent }) => parent?.linkType !== 'external',
                    }),
                    defineField({
                      name: 'openInNewTab',
                      title: 'Open in New Tab',
                      type: 'boolean',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Icon Name',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'None', value: '' },
                          { title: '🏠 Home', value: 'Home' },
                          { title: '🛒 ShoppingBag', value: 'ShoppingBag' },
                          { title: '🛍️ Store', value: 'Store' },
                          { title: '📝 FileText', value: 'FileText' },
                          { title: '❓ HelpCircle', value: 'HelpCircle' },
                          { title: '📧 Mail', value: 'Mail' },
                        ],
                      },
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      path: 'internalPath',
                    },
                    prepare(selection: Record<string, unknown>) {
                      const { title, path } = selection;
                      return {
                        title: String(title || 'Untitled'),
                        subtitle: String(path || 'No link'),
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'label',
              linkType: 'linkType',
              path: 'internalPath',
              url: 'externalUrl',
            },
            prepare(selection: Record<string, unknown>) {
              const { title, linkType, path, url } = selection;
              const subtitle = linkType === 'internal' ? path : linkType === 'external' ? url : linkType;
              return {
                title: String(title || 'Untitled'),
                subtitle: String(subtitle || 'No link'),
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Add at least one menu item'),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Enable or disable this menu',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first (if multiple menus of same type)',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Menu Type',
      name: 'menuTypeAsc',
      by: [{ field: 'menuType', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      menuType: 'menuType',
      isActive: 'isActive',
    },
    prepare(selection: Record<string, unknown>) {
      const { title, menuType, isActive } = selection;
      const typeLabels: Record<string, string> = {
        'header-main': '📍 Header Main',
        'header-secondary': '📍 Header Secondary',
        'header-mobile': '📍 Mobile Menu',
        'footer-shop': '🔗 Footer Shop',
        'footer-support': '🔗 Footer Support',
        'footer-about': '🔗 Footer About',
        'footer-legal': '🔗 Footer Legal',
      };
      return {
        title: String(title || 'Untitled Menu'),
        subtitle: `${typeLabels[String(menuType)] || menuType} ${!isActive ? '(Inactive)' : ''}`,
      };
    },
  },
})
