/**
 * Banner Schema
 * Phase 7: Promotional Banners for Marketing
 * 
 * Displays promotional banners at specific positions throughout the site.
 * Supports scheduling, mobile images, and call-to-action buttons.
 * 
 * @file studio/src/schemaTypes/documents/banner.ts
 * @created November 27, 2025
 */

import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const banner = defineType({
  name: 'banner',
  title: 'Promotional Banner',
  type: 'document',
  icon: ImageIcon,
  groups: [
    {name: 'content', title: '📝 Content', default: true},
    {name: 'media', title: '📸 Images'},
    {name: 'styling', title: '🎨 Styling'},
    {name: 'action', title: '🔗 Call to Action'},
    {name: 'scheduling', title: '📅 Scheduling'},
    {name: 'settings', title: '⚙️ Settings'},
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════
    // CONTENT GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().min(3).max(100),
      description: 'Internal name for this banner (not shown on website)',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.max(60),
      description: 'Main banner headline (e.g., "Flash Sale! 30% Off All Products")',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.max(100),
      description: 'Secondary text (e.g., "Limited time only - ends Sunday!")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (rule) => rule.max(200),
      description: 'Optional longer description for full-width banners',
    }),
    defineField({
      name: 'promoCode',
      title: 'Promo Code',
      type: 'string',
      group: 'content',
      description: 'Optional promo code to display (e.g., "MASH30")',
    }),
    
    // ═══════════════════════════════════════════════════════════════
    // MEDIA GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'desktopImage',
      title: 'Desktop Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
      description: 'Banner image for desktop (recommended: 1920x400 or 1920x600)',
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      description: 'Optional: Square or portrait image for mobile (recommended: 600x600 or 600x800)',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Image Overlay Opacity',
      type: 'number',
      group: 'media',
      initialValue: 0.3,
      validation: (rule) => rule.min(0).max(1),
      description: 'Dark overlay for text readability (0 = none, 1 = full)',
    }),
    
    // ═══════════════════════════════════════════════════════════════
    // STYLING GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      group: 'styling',
      description: 'Fallback color if no image (e.g., "#1E392A" or "primary")',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      group: 'styling',
      options: {
        list: [
          {title: '⚪ White', value: 'white'},
          {title: '⚫ Black', value: 'black'},
          {title: '🟢 Primary (Dark Green)', value: 'primary'},
          {title: '🟡 Accent (Light Green)', value: 'accent'},
        ],
      },
      initialValue: 'white',
      description: 'Text color for the banner',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      group: 'styling',
      options: {
        list: [
          {title: '⬅️ Left', value: 'left'},
          {title: '↔️ Center', value: 'center'},
          {title: '➡️ Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'bannerHeight',
      title: 'Banner Height',
      type: 'string',
      group: 'styling',
      options: {
        list: [
          {title: '📏 Small (200px)', value: 'small'},
          {title: '📐 Medium (300px)', value: 'medium'},
          {title: '📊 Large (400px)', value: 'large'},
          {title: '🖼️ Full (600px)', value: 'full'},
        ],
      },
      initialValue: 'medium',
    }),
    
    // ═══════════════════════════════════════════════════════════════
    // CALL TO ACTION GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      group: 'action',
      description: 'Call-to-action button text (e.g., "Shop Now")',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      group: 'action',
      description: 'URL path or full URL (e.g., "/shop?promo=flash30")',
    }),
    defineField({
      name: 'buttonStyle',
      title: 'Button Style',
      type: 'string',
      group: 'action',
      options: {
        list: [
          {title: '🟢 Primary (Green)', value: 'primary'},
          {title: '⬜ Outline (White Border)', value: 'outline'},
          {title: '⬛ Secondary (Dark)', value: 'secondary'},
          {title: '🟡 Accent', value: 'accent'},
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      group: 'action',
      description: 'Optional second button (e.g., "Learn More")',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
      group: 'action',
    }),
    
    // ═══════════════════════════════════════════════════════════════
    // SCHEDULING GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      group: 'scheduling',
      description: 'When banner becomes visible (leave empty for immediate)',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      group: 'scheduling',
      description: 'When banner stops showing (leave empty for no end date)',
    }),
    
    // ═══════════════════════════════════════════════════════════════
    // SETTINGS GROUP
    // ═══════════════════════════════════════════════════════════════
    defineField({
      name: 'position',
      title: 'Display Position',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: '🏠 Homepage - Top (Below Hero)', value: 'homepage-top'},
          {title: '🏠 Homepage - Middle (Before Growers)', value: 'homepage-middle'},
          {title: '🏠 Homepage - Bottom (Before Footer)', value: 'homepage-bottom'},
          {title: '🛒 Shop - Top', value: 'shop-top'},
          {title: '🛒 Shop - Sidebar', value: 'shop-sidebar'},
          {title: '📦 Product Detail - Bottom', value: 'product-bottom'},
          {title: '🛍️ Cart - Top', value: 'cart-top'},
          {title: '💳 Checkout - Bottom', value: 'checkout-bottom'},
          {title: '📄 All Pages - Announcement Bar', value: 'announcement'},
        ],
      },
      validation: (rule) => rule.required(),
      description: 'Where should this banner appear?',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      group: 'settings',
      initialValue: 10,
      validation: (rule) => rule.min(1).max(100),
      description: 'Priority when multiple banners target same position (lower = higher priority)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Enable/disable banner (false = hidden)',
    }),
    defineField({
      name: 'showOnMobile',
      title: 'Show on Mobile',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Display on mobile devices',
    }),
    defineField({
      name: 'showOnDesktop',
      title: 'Show on Desktop',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Display on desktop/tablet',
    }),
  ],
  orderings: [
    {
      title: 'Position, then Priority',
      name: 'positionPriority',
      by: [
        {field: 'position', direction: 'asc'},
        {field: 'sortOrder', direction: 'asc'},
      ],
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        {field: 'isActive', direction: 'desc'},
        {field: 'sortOrder', direction: 'asc'},
      ],
    },
    {
      title: 'End Date (Expiring Soon)',
      name: 'expiringSoon',
      by: [{field: 'endDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      position: 'position',
      startDate: 'startDate',
      endDate: 'endDate',
      isActive: 'isActive',
      media: 'desktopImage',
    },
    prepare({title, position, startDate, endDate, isActive, media}) {
      const positionLabel = position?.replace('-', ' → ').replace(/^\w/, (c: string) => c.toUpperCase()) || 'No position'
      const activeBadge = isActive ? '✅' : '⏸️'
      
      // Check if banner is scheduled
      const now = new Date()
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null
      
      let scheduleStatus = ''
      if (start && start > now) {
        scheduleStatus = ' 📅 Scheduled'
      } else if (end && end < now) {
        scheduleStatus = ' ⏰ Expired'
      }
      
      return {
        title: `${activeBadge} ${title}${scheduleStatus}`,
        subtitle: `📍 ${positionLabel}`,
        media,
      }
    },
  },
})
