/**
 * Growing Guide Schema
 * =====================
 * For mushroom cultivation guides linked to growing kits
 * Includes step-by-step instructions with images and videos
 * 
 * Created: December 2025
 * Phase: Blog & Recipes Implementation
 */

import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const growingGuide = defineType({
  name: 'growingGuide',
  title: 'Growing Guide',
  type: 'document',
  icon: DocumentIcon,
  
  // ═══════════════════════════════════════════════════════════
  // FIELD GROUPS
  // ═══════════════════════════════════════════════════════════
  groups: [
    {name: 'basic', title: '📝 Basic Info', default: true},
    {name: 'video', title: '🎬 Video'},
    {name: 'overview', title: '📋 Overview'},
    {name: 'steps', title: '📖 Growing Steps'},
    {name: 'troubleshooting', title: '⚠️ Troubleshooting'},
    {name: 'products', title: '🛒 Products'},
    {name: 'seo', title: '🔍 SEO'},
  ],

  fields: [
    // ═══════════════════════════════════════════════════════════
    // BASIC INFO
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'title',
      title: 'Guide Title',
      type: 'string',
      description: 'E.g., "How to Grow Oyster Mushrooms at Home"',
      group: 'basic',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      group: 'basic',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short description for previews and SEO (150-160 characters)',
      group: 'basic',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Main image for the guide (16:9 ratio recommended)',
      group: 'basic',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'mushroomType',
      title: 'Mushroom Type',
      type: 'string',
      description: 'Which mushroom species this guide covers',
      group: 'basic',
      options: {
        list: [
          {title: '🦪 Oyster Mushrooms', value: 'oyster'},
          {title: '🍄 Shiitake Mushrooms', value: 'shiitake'},
          {title: '🦁 Lion\'s Mane', value: 'lions-mane'},
          {title: '👑 King Oyster', value: 'king-oyster'},
          {title: '🌸 Pink Oyster', value: 'pink-oyster'},
          {title: '💙 Blue Oyster', value: 'blue-oyster'},
          {title: '🟡 Golden Oyster', value: 'golden-oyster'},
          {title: '🌿 Multiple/General', value: 'general'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      description: 'How challenging is this growing process?',
      group: 'basic',
      options: {
        list: [
          {title: '🟢 Beginner - Easy to grow, forgiving', value: 'beginner'},
          {title: '🟡 Intermediate - Some experience helpful', value: 'intermediate'},
          {title: '🔴 Advanced - Requires precise conditions', value: 'advanced'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'beginner',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
      description: 'Who wrote this guide',
      group: 'basic',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this guide was published',
      group: 'basic',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When this guide was last revised',
      group: 'basic',
    }),

    // ═══════════════════════════════════════════════════════════
    // VIDEO CONTENT
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'youtubeVideo',
      title: 'Main YouTube Video',
      type: 'object',
      description: 'Primary video tutorial for this growing guide',
      group: 'video',
      fields: [
        defineField({
          name: 'videoId',
          title: 'YouTube Video ID',
          type: 'string',
          description: 'The 11-character ID from the YouTube URL (e.g., "dQw4w9WgXcQ")',
          validation: (Rule) =>
            Rule.regex(/^[a-zA-Z0-9_-]{11}$/).error('Must be a valid 11-character YouTube video ID'),
        }),
        defineField({
          name: 'title',
          title: 'Video Title',
          type: 'string',
          description: 'Display title for the video',
        }),
        defineField({
          name: 'startTime',
          title: 'Start Time (seconds)',
          type: 'number',
          description: 'Start video at this timestamp (optional)',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'showOnGuidePage',
          title: 'Show Video on Guide Page',
          type: 'boolean',
          description: 'Display embedded video on the guide page',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'additionalVideos',
      title: 'Additional Videos',
      type: 'array',
      description: 'More videos related to this growing process',
      group: 'video',
      of: [
        {
          type: 'object',
          name: 'video',
          title: 'Video',
          fields: [
            defineField({
              name: 'videoId',
              title: 'YouTube Video ID',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^[a-zA-Z0-9_-]{11}$/).error('Must be valid YouTube ID'),
            }),
            defineField({
              name: 'title',
              title: 'Video Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              videoId: 'videoId',
            },
            prepare({title, videoId}) {
              return {
                title: title || 'Untitled Video',
                subtitle: videoId ? `youtu.be/${videoId}` : 'No video ID',
                media: DocumentIcon,
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // OVERVIEW
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent',
      description: 'Introduce the mushroom type and what makes it special',
      group: 'overview',
    }),
    defineField({
      name: 'timeToFirstHarvest',
      title: 'Time to First Harvest',
      type: 'string',
      description: 'E.g., "7-14 days from setup"',
      group: 'overview',
    }),
    defineField({
      name: 'harvestWindow',
      title: 'Harvest Window',
      type: 'string',
      description: 'E.g., "1-2 flushes over 3-4 weeks"',
      group: 'overview',
    }),
    defineField({
      name: 'expectedYield',
      title: 'Expected Yield',
      type: 'string',
      description: 'E.g., "200-500g per kit"',
      group: 'overview',
    }),
    defineField({
      name: 'idealConditions',
      title: 'Ideal Growing Conditions',
      type: 'object',
      description: 'Optimal environment for this mushroom',
      group: 'overview',
      fields: [
        defineField({
          name: 'temperature',
          title: 'Temperature Range',
          type: 'string',
          description: 'E.g., "18-24°C (65-75°F)"',
        }),
        defineField({
          name: 'humidity',
          title: 'Humidity Level',
          type: 'string',
          description: 'E.g., "80-90%"',
        }),
        defineField({
          name: 'light',
          title: 'Light Requirements',
          type: 'string',
          description: 'E.g., "Indirect light, 4-6 hours daily"',
        }),
        defineField({
          name: 'airflow',
          title: 'Airflow',
          type: 'string',
          description: 'E.g., "Fresh air exchange 2-3 times daily"',
        }),
      ],
    }),
    defineField({
      name: 'suppliesNeeded',
      title: 'Supplies Needed',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of supplies/tools needed (e.g., "Spray bottle", "Sharp knife")',
      group: 'overview',
      options: {
        layout: 'tags',
      },
    }),

    // ═══════════════════════════════════════════════════════════
    // GROWING STEPS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'growingSteps',
      title: 'Growing Steps',
      type: 'array',
      group: 'steps',
      description: 'Step-by-step growing instructions',
      of: [
        {
          type: 'object',
          name: 'step',
          title: 'Step',
          fields: [
            defineField({
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              description: 'E.g., "Unbox Your Kit", "Soak the Block"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'day',
              title: 'Day/Timeline',
              type: 'string',
              description: 'E.g., "Day 1", "Days 3-7", "Week 2"',
            }),
            defineField({
              name: 'instruction',
              title: 'Instruction',
              type: 'text',
              description: 'Detailed instruction for this step',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tip',
              title: 'Pro Tip',
              type: 'text',
              description: 'Optional tip for better results',
              rows: 2,
            }),
            defineField({
              name: 'image',
              title: 'Step Image',
              type: 'image',
              description: 'Photo showing this step',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'videoTimestamp',
              title: 'Video Timestamp (seconds)',
              type: 'number',
              description: 'Jump to this point in the main video for this step',
            }),
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'How long this step takes (e.g., "5 minutes", "24 hours")',
            }),
          ],
          preview: {
            select: {
              stepNumber: 'stepNumber',
              title: 'title',
              day: 'day',
              image: 'image',
            },
            prepare({stepNumber, title, day, image}) {
              return {
                title: `Step ${stepNumber || '?'}: ${title || 'Untitled'}`,
                subtitle: day || 'No timeline',
                media: image,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'harvestingTips',
      title: 'Harvesting Tips',
      type: 'blockContent',
      description: 'When and how to harvest for best results',
      group: 'steps',
    }),
    defineField({
      name: 'storageTips',
      title: 'Storage Tips',
      type: 'blockContent',
      description: 'How to store harvested mushrooms',
      group: 'steps',
    }),
    defineField({
      name: 'multipleFlushes',
      title: 'Getting Multiple Flushes',
      type: 'blockContent',
      description: 'Instructions for subsequent harvests from the same kit',
      group: 'steps',
    }),

    // ═══════════════════════════════════════════════════════════
    // TROUBLESHOOTING
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'commonProblems',
      title: 'Common Problems & Solutions',
      type: 'array',
      group: 'troubleshooting',
      description: 'Help users troubleshoot issues',
      of: [
        {
          type: 'object',
          name: 'problem',
          title: 'Problem',
          fields: [
            defineField({
              name: 'issue',
              title: 'Problem/Issue',
              type: 'string',
              description: 'E.g., "Green mold appearing on substrate"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'cause',
              title: 'Cause',
              type: 'text',
              description: 'What causes this problem',
              rows: 2,
            }),
            defineField({
              name: 'solution',
              title: 'Solution',
              type: 'text',
              description: 'How to fix or prevent this issue',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'severity',
              title: 'Severity',
              type: 'string',
              options: {
                list: [
                  {title: '🟢 Minor - Easy fix', value: 'minor'},
                  {title: '🟡 Moderate - Needs attention', value: 'moderate'},
                  {title: '🔴 Severe - May lose harvest', value: 'severe'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
            defineField({
              name: 'image',
              title: 'Problem Image',
              type: 'image',
              description: 'Photo showing what the problem looks like',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {
              issue: 'issue',
              severity: 'severity',
              image: 'image',
            },
            prepare({issue, severity, image}) {
              const severityEmoji = {
                minor: '🟢',
                moderate: '🟡',
                severe: '🔴',
              }
              return {
                title: `${severityEmoji[severity as keyof typeof severityEmoji] || '⚪'} ${issue || 'Unknown Problem'}`,
                media: image,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'array',
      group: 'troubleshooting',
      description: 'Frequently asked questions about growing this mushroom',
      of: [
        {
          type: 'object',
          name: 'faq',
          title: 'FAQ',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              question: 'question',
            },
            prepare({question}) {
              return {
                title: question || 'Untitled Question',
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // PRODUCTS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'growingKit',
      title: 'Linked Growing Kit',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'The main growing kit this guide is for',
      group: 'products',
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Other products that complement this guide (supplies, tools, etc.)',
      group: 'products',
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'relatedGuides',
      title: 'Related Guides',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'growingGuide'}]}],
      description: 'Other growing guides the reader might find helpful',
      group: 'products',
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'relatedRecipes',
      title: 'Related Recipes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'recipe'}]}],
      description: 'Recipes for cooking this mushroom type',
      group: 'products',
      validation: (Rule) => Rule.max(6),
    }),

    // ═══════════════════════════════════════════════════════════
    // SEO
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the default page title for search engines (50-60 characters)',
      group: 'seo',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Meta description for search engines (150-160 characters)',
      group: 'seo',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords for search optimization',
      group: 'seo',
      options: {
        layout: 'tags',
      },
    }),

    // ═══════════════════════════════════════════════════════════
    // STATUS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'isFeatured',
      title: 'Featured Guide',
      type: 'boolean',
      description: 'Show this guide prominently on the guides page',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'draft',
    }),
  ],

  // ═══════════════════════════════════════════════════════════
  // PREVIEW CONFIGURATION
  // ═══════════════════════════════════════════════════════════
  preview: {
    select: {
      title: 'title',
      mushroomType: 'mushroomType',
      difficulty: 'difficulty',
      media: 'mainImage',
      status: 'status',
    },
    prepare({title, mushroomType, difficulty, media, status}) {
      const mushroomEmoji: Record<string, string> = {
        'oyster': '🦪',
        'shiitake': '🍄',
        'lions-mane': '🦁',
        'king-oyster': '👑',
        'pink-oyster': '🌸',
        'blue-oyster': '💙',
        'golden-oyster': '🟡',
        'general': '🌿',
      }
      const difficultyEmoji: Record<string, string> = {
        'beginner': '🟢 Easy',
        'intermediate': '🟡 Medium',
        'advanced': '🔴 Hard',
      }
      const statusEmoji = status === 'published' ? '✅' : status === 'draft' ? '📝' : '📦'
      const mushroom = mushroomType ? mushroomEmoji[mushroomType] || mushroomType : ''
      const diff = difficulty ? difficultyEmoji[difficulty] : ''
      
      return {
        title: `${statusEmoji} ${title || 'Untitled Guide'}`,
        subtitle: [mushroom, diff].filter(Boolean).join(' • '),
        media,
      }
    },
  },

  // ═══════════════════════════════════════════════════════════
  // ORDERINGS
  // ═══════════════════════════════════════════════════════════
  orderings: [
    {
      title: 'Title A→Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Easiest First',
      name: 'difficultyAsc',
      by: [{field: 'difficulty', direction: 'asc'}],
    },
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [{field: 'isFeatured', direction: 'desc'}],
    },
  ],
})
