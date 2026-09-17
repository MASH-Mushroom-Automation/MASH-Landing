import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

/**
 * Blog Post Schema - Phase 8 Enhanced
 * 
 * Full-featured blog post with categories, tags, SEO, and rich content.
 * Used on /blog and /blog/[slug] pages.
 * 
 * Features:
 * - Multiple categories for organization
 * - Tags for topic discovery
 * - SEO meta fields for search optimization
 * - Featured flag for homepage display
 * - Read time estimation (based on word count)
 * - Author with bio
 * 
 * @see src/hooks/useSanityBlogPosts.ts for frontend integration
 */

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  icon: DocumentTextIcon,
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Content', default: true },
    { name: 'media', title: '🖼️ Media' },
    { name: 'organization', title: '📂 Organization' },
    { name: 'seo', title: '🔍 SEO' },
    { name: 'settings', title: '⚙️ Settings' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════════
    // CONTENT GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The headline of the blog post',
      validation: (rule) => rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'URL-friendly identifier (auto-generated from title)',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      description: 'Short summary shown in blog list (150-200 characters recommended)',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
      description: 'Full blog post content with rich text formatting',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // MEDIA GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'media',
      description: 'Featured image shown at top of post (16:9 ratio recommended, min 1200x675px)',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describes the image for accessibility and SEO',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Alt text is required when an image is uploaded'
              }
              return true
            })
          },
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption to display below the image',
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      group: 'media',
      description: 'Additional images to include in the post',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // ORGANIZATION GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'organization',
      to: [{ type: 'person' }],
      description: 'Who wrote this post',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'organization',
      description: 'Assign to one or more blog categories',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blogCategory' }],
        },
      ],
      validation: (rule) => rule.min(1).error('At least one category is required'),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'organization',
      description: 'Keywords for topic discovery (e.g., "recipes", "growing tips", "nutrition")',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      group: 'organization',
      description: 'Manually select related posts to display at the bottom',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'datetime',
      group: 'organization',
      description: 'When this post was published',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      group: 'organization',
      description: 'When this post was last updated',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SEO GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      description: 'Search engine optimization settings',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Override the page title for search results (50-60 characters)',
          validation: (rule) => rule.max(70),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Summary shown in search results (150-160 characters)',
          validation: (rule) => rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
          description: 'Keywords for SEO (optional, tags are used by default)',
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image for social media sharing (1200x630px recommended)',
          options: { hotspot: true },
        },
        {
          name: 'noIndex',
          title: 'Hide from Search Engines',
          type: 'boolean',
          description: 'Enable to prevent this post from appearing in search results',
          initialValue: false,
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SETTINGS GROUP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      group: 'settings',
      description: 'Display this post prominently on the blog page and homepage',
      initialValue: false,
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      group: 'settings',
      description: 'Only published posts are visible on the website',
      initialValue: true,
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      group: 'settings',
      description: 'Estimated reading time (auto-calculated or manual override)',
      validation: (rule) => rule.min(1).max(60),
    }),
    defineField({
      name: 'allowComments',
      title: 'Allow Comments',
      type: 'boolean',
      group: 'settings',
      description: 'Enable or disable comments on this post',
      initialValue: true,
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      title: 'title',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      media: 'coverImage',
      isFeatured: 'isFeatured',
      isPublished: 'isPublished',
    },
    prepare({ title, media, authorFirstName, authorLastName, date, isFeatured, isPublished }) {
      const status = !isPublished ? '🚫 ' : isFeatured ? '⭐ ' : ''
      const subtitles = [
        authorFirstName && authorLastName && `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {
        title: `${status}${title}`,
        media,
        subtitle: subtitles.join(' '),
      }
    },
  },
})
