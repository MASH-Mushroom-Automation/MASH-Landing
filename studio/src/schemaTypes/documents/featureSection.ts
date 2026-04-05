/**
 * Feature Section Schema
 * Phase 4: Homepage "Why MASH" / Feature Highlights Section
 * 
 * Manages the feature cards displayed on the homepage
 * Each section can have multiple feature items with icons
 */

import { SparklesIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const featureSection = defineType({
  name: 'featureSection',
  title: 'Feature Section',
  type: 'document',
  icon: SparklesIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // === CONTENT GROUP ===
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      group: 'content',
      description: 'Main heading for the feature section (e.g., "Why Choose MASH Mushrooms?")',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      group: 'content',
      description: 'Supporting text below the title (e.g., "Quality, Freshness, and Sustainability")',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'features',
      title: 'Feature Items',
      type: 'array',
      group: 'content',
      description: 'Add 3-6 feature highlights. Each will display as a card with an icon.',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          title: 'Feature Item',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., Leaf, Truck, Shield, Heart, Star, Award, CheckCircle, Sprout, Users)',
              options: {
                list: [
                  { title: '🍃 Leaf (Organic/Natural)', value: 'Leaf' },
                  { title: '🚚 Truck (Delivery/Shipping)', value: 'Truck' },
                  { title: '🛡️ Shield (Quality/Protection)', value: 'Shield' },
                  { title: '❤️ Heart (Care/Passion)', value: 'Heart' },
                  { title: '⭐ Star (Premium/Rating)', value: 'Star' },
                  { title: '🏆 Award (Excellence)', value: 'Award' },
                  { title: '✅ CheckCircle (Verified/Trust)', value: 'CheckCircle' },
                  { title: '🌱 Sprout (Growth/Sustainability)', value: 'Sprout' },
                  { title: '👥 Users (Community/Team)', value: 'Users' },
                  { title: '⏰ Clock (Fast/Time)', value: 'Clock' },
                  { title: '💰 DollarSign (Value/Savings)', value: 'DollarSign' },
                  { title: '📦 Package (Products)', value: 'Package' },
                  { title: '🌍 Globe (Worldwide/Global)', value: 'Globe' },
                  { title: '🔒 Lock (Security)', value: 'Lock' },
                  { title: '💬 MessageCircle (Support)', value: 'MessageCircle' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'headline',
              title: 'Headline',
              type: 'string',
              description: 'Short feature title (e.g., "100% Organic")',
              validation: (Rule) => Rule.required().min(3).max(50),
            }),
            defineField({
              name: 'subheadline',
              title: 'Subheadline',
              type: 'string',
              description: 'Brief description (e.g., "Grown without pesticides or chemicals")',
              validation: (Rule) => Rule.required().min(10).max(150),
            }),
            defineField({
              name: 'link',
              title: 'Link (Optional)',
              type: 'url',
              description: 'Optional link when user clicks the feature card',
            }),
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              description: 'Toggle to show/hide this feature',
              initialValue: true,
            }),
            defineField({
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which features appear (lower = first)',
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: 'headline',
              subtitle: 'subheadline',
              icon: 'icon',
              isActive: 'isActive',
            },
            prepare({ title, subtitle, icon, isActive }) {
              const iconEmoji: Record<string, string> = {
                Leaf: '🍃',
                Truck: '🚚',
                Shield: '🛡️',
                Heart: '❤️',
                Star: '⭐',
                Award: '🏆',
                CheckCircle: '✅',
                Sprout: '🌱',
                Users: '👥',
                Clock: '⏰',
                DollarSign: '💰',
                Package: '📦',
                Globe: '🌍',
                Lock: '🔒',
                MessageCircle: '💬',
              };
              return {
                title: `${iconEmoji[icon] || '📌'} ${title}`,
                subtitle: `${isActive ? '✓' : '✗'} ${subtitle}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(8).error('Add between 1-8 feature items'),
    }),

    // === SETTINGS GROUP ===
    defineField({
      name: 'backgroundColor',
      title: 'Background Style',
      type: 'string',
      group: 'settings',
      description: 'Choose the section background style',
      options: {
        list: [
          { title: 'Light (Default)', value: 'light' },
          { title: 'Muted', value: 'muted' },
          { title: 'Dark', value: 'dark' },
          { title: 'Gradient', value: 'gradient' },
        ],
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'columns',
      title: 'Columns Layout',
      type: 'number',
      group: 'settings',
      description: 'Number of columns on desktop (2, 3, or 4)',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns (Recommended)', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      group: 'settings',
      description: 'Display this feature section on the homepage',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Section Display Order',
      type: 'number',
      group: 'settings',
      description: 'Order when multiple feature sections exist (lower = first)',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      description: 'Toggle to enable/disable this entire section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      featuresCount: 'features.length',
      isActive: 'isActive',
      showOnHomepage: 'showOnHomepage',
    },
    prepare({ title, subtitle, isActive, showOnHomepage }) {
      const status = [];
      if (isActive) status.push('Active');
      else status.push('Inactive');
      if (showOnHomepage) status.push('Homepage');
      
      return {
        title: title || 'Untitled Feature Section',
        subtitle: `${status.join(' | ')} - ${subtitle || 'No subtitle'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
