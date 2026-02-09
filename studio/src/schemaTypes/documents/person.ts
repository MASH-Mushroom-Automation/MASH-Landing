import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Person / Team Member Schema - Phase 8 Enhanced
 * 
 * Represents authors for blog posts AND team members for About page.
 * Enhanced with role, bio, contact info, and social links.
 * 
 * Usage:
 * - Blog post authors with bio displayed at bottom of posts
 * - Team members on About page
 * - Academic adviser / mentor profiles
 * 
 * @see src/hooks/useSanityAboutPage.ts for team member fetching
 * @see src/hooks/useSanityBlogPosts.ts for author fetching
 */

export const person = defineType({
  name: 'person',
  title: 'Person / Team Member',
  icon: UserIcon,
  type: 'document',
  groups: [
    { name: 'basic', title: '👤 Basic Info', default: true },
    { name: 'bio', title: '📝 Bio & Role' },
    { name: 'contact', title: '📧 Contact' },
    { name: 'social', title: '🔗 Social Links' },
    { name: 'settings', title: '⚙️ Settings' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════════
    // BASIC INFO GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required().min(1).max(50),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required().min(1).max(50),
    }),
    defineField({
      name: 'picture',
      title: 'Profile Picture',
      type: 'image',
      group: 'basic',
      description: 'Square photo recommended (min 400x400px)',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describes the image for accessibility and SEO',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return 'Alt text is required when an image is uploaded'
              }
              return true
            })
          },
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // BIO & ROLE GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      group: 'bio',
      description: 'e.g., "Lead Developer", "UI/UX Designer", "Thesis Adviser"',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'personType',
      title: 'Person Type',
      type: 'string',
      group: 'bio',
      description: 'Categorize for filtering on About page',
      options: {
        list: [
          { title: '👨‍💻 Team Member', value: 'team' },
          { title: '👨‍🏫 Mentor / Adviser', value: 'mentor' },
          { title: '✍️ Blog Author', value: 'author' },
          { title: '🤝 Partner / Contributor', value: 'partner' },
        ],
        layout: 'radio',
      },
      initialValue: 'team',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      group: 'bio',
      description: 'Brief description (1-2 sentences, shown on team cards)',
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'bio',
      title: 'Full Bio',
      type: 'blockContent',
      group: 'bio',
      description: 'Detailed biography (shown on author pages and expanded profiles)',
    }),
    defineField({
      name: 'specializations',
      title: 'Specializations / Skills',
      type: 'array',
      group: 'bio',
      description: 'Areas of expertise (e.g., "React", "UX Design", "Mushroom Cultivation")',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTACT GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      description: 'Contact email (optional, shown on author pages)',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
      description: 'Contact phone (optional)',
    }),
    defineField({
      name: 'website',
      title: 'Personal Website',
      type: 'url',
      group: 'contact',
      description: 'Personal portfolio or website URL',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SOCIAL LINKS GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      description: 'Social media profiles',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'Facebook profile URL',
        },
        {
          name: 'twitter',
          title: 'Twitter / X',
          type: 'url',
          description: 'Twitter profile URL',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Instagram profile URL',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'LinkedIn profile URL',
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
          description: 'GitHub profile URL',
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
          description: 'TikTok profile URL',
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SETTINGS GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'settings',
      description: 'Order on team page (lower numbers first, 1-100)',
      initialValue: 50,
      validation: (rule) => rule.min(1).max(100),
    }),
    defineField({
      name: 'showOnAboutPage',
      title: 'Show on About Page',
      type: 'boolean',
      group: 'settings',
      description: 'Display this person in the team section of the About page',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Member',
      type: 'boolean',
      group: 'settings',
      description: 'Highlight this person in the team section',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      description: 'Inactive persons are hidden from the website',
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
      title: 'Last Name A-Z',
      name: 'lastNameAsc',
      by: [{ field: 'lastName', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'role',
      personType: 'personType',
      picture: 'picture',
      isActive: 'isActive',
    },
    prepare({ firstName, lastName, role, personType, picture, isActive }) {
      const typeEmoji: Record<string, string> = {
        team: '👨‍💻',
        mentor: '👨‍🏫',
        author: '✍️',
        partner: '🤝',
      }
      const emoji = typeEmoji[personType || 'team'] || '👤'

      return {
        title: `${isActive ? '' : '🚫 '}${firstName} ${lastName}`,
        subtitle: `${emoji} ${role || 'No role set'}`,
        media: picture,
      }
    },
  },
})
