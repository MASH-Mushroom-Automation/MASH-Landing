import {defineField, defineType} from 'sanity'
import {DocumentTextIcon, BookIcon} from '@sanity/icons'

/**
 * Recipe Schema - Mushroom Cooking Recipes
 * 
 * Features:
 * - YouTube video integration for recipe tutorials
 * - Ingredients linked to product catalog (for "Shop Ingredients" feature)
 * - Step-by-step instructions with images
 * - Nutrition facts and dietary tags
 * - Related products for cross-selling
 * 
 * @see .github/BLOG_AND_RECIPES_PLAN.md for full documentation
 */
export const recipe = defineType({
  name: 'recipe',
  title: 'Recipes',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media & Video'},
    {name: 'ingredients', title: 'Ingredients'},
    {name: 'instructions', title: 'Instructions'},
    {name: 'nutrition', title: 'Nutrition'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════
    // BASIC CONTENT
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      description: 'E.g., "Crispy Mushroom Chicharon" or "Creamy Shiitake Pasta"',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL-friendly version of the title (auto-generated)',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      description: 'Brief description for recipe cards and previews (max 200 characters)',
      group: 'content',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'blockContent',
      description: 'Detailed recipe introduction, story, or tips',
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Recipe Author',
      type: 'reference',
      to: [{type: 'person'}],
      description: 'Who created this recipe?',
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Recipe Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Main Dish', value: 'main-dish'},
          {title: 'Appetizer', value: 'appetizer'},
          {title: 'Side Dish', value: 'side-dish'},
          {title: 'Soup', value: 'soup'},
          {title: 'Salad', value: 'salad'},
          {title: 'Snack', value: 'snack'},
          {title: 'Dessert', value: 'dessert'},
          {title: 'Beverage', value: 'beverage'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cuisine',
      title: 'Cuisine Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Filipino', value: 'filipino'},
          {title: 'Asian Fusion', value: 'asian-fusion'},
          {title: 'Chinese', value: 'chinese'},
          {title: 'Japanese', value: 'japanese'},
          {title: 'Korean', value: 'korean'},
          {title: 'Italian', value: 'italian'},
          {title: 'American', value: 'american'},
          {title: 'Mediterranean', value: 'mediterranean'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: '🟢 Beginner', value: 'beginner'},
          {title: '🟡 Intermediate', value: 'intermediate'},
          {title: '🔴 Advanced', value: 'advanced'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'beginner',
    }),
    defineField({
      name: 'tags',
      title: 'Recipe Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'E.g., vegetarian, keto, quick-meal, comfort-food',
      group: 'content',
      options: {
        layout: 'tags',
      },
    }),

    // ═══════════════════════════════════════════════════════════
    // TIMING
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number',
      description: 'Time to prepare ingredients',
      group: 'content',
      validation: (Rule) => Rule.min(0).max(480),
    }),
    defineField({
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number',
      description: 'Active cooking time',
      group: 'content',
      validation: (Rule) => Rule.min(0).max(480),
    }),
    defineField({
      name: 'totalTime',
      title: 'Total Time (minutes)',
      type: 'number',
      description: 'Auto-calculated or manually set (includes resting, chilling, etc.)',
      group: 'content',
      validation: (Rule) => Rule.min(0).max(1440),
    }),
    defineField({
      name: 'servings',
      title: 'Number of Servings',
      type: 'number',
      description: 'How many people does this recipe serve?',
      group: 'content',
      initialValue: 4,
      validation: (Rule) => Rule.min(1).max(50),
    }),

    // ═══════════════════════════════════════════════════════════
    // MEDIA & YOUTUBE VIDEO
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'mainImage',
      title: 'Main Recipe Image',
      type: 'image',
      description: 'High-quality photo of the finished dish (1200x800px recommended)',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional caption to display below the image',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Recipe Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
      description: 'Additional photos showing cooking process or plating variations',
      group: 'media',
    }),
    defineField({
      name: 'youtubeVideo',
      title: 'YouTube Recipe Video',
      type: 'object',
      description: 'Embed a YouTube video tutorial for this recipe',
      group: 'media',
      fields: [
        defineField({
          name: 'videoId',
          title: 'YouTube Video ID',
          type: 'string',
          description: 'The ID from the YouTube URL (e.g., "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ)',
          validation: (Rule) =>
            Rule.regex(/^[a-zA-Z0-9_-]{11}$/, {
              name: 'YouTube Video ID',
              invert: false,
            }).error('Must be a valid 11-character YouTube video ID'),
        }),
        defineField({
          name: 'title',
          title: 'Video Title',
          type: 'string',
          description: 'Displayed above the video player',
        }),
        defineField({
          name: 'startTime',
          title: 'Start Time (seconds)',
          type: 'number',
          description: 'Start the video at a specific timestamp (optional)',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'showOnRecipePage',
          title: 'Show Video on Recipe Page',
          type: 'boolean',
          description: 'Display video prominently on the recipe detail page',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'additionalVideos',
      title: 'Additional Tutorial Videos',
      type: 'array',
      group: 'media',
      description: 'Extra technique videos (e.g., "How to Clean Mushrooms", "Knife Skills")',
      of: [
        {
          type: 'object',
          name: 'youtubeLink',
          title: 'YouTube Video',
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
                media: BookIcon,
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════
    // INGREDIENTS (with product links)
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'ingredientGroups',
      title: 'Ingredient Groups',
      type: 'array',
      group: 'ingredients',
      description: 'Organize ingredients by group (e.g., "For the Sauce", "For the Mushrooms")',
      of: [
        {
          type: 'object',
          name: 'ingredientGroup',
          title: 'Ingredient Group',
          fields: [
            defineField({
              name: 'groupName',
              title: 'Group Name',
              type: 'string',
              description: 'E.g., "For the Marinade" (leave empty for single group)',
            }),
            defineField({
              name: 'ingredients',
              title: 'Ingredients',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'ingredient',
                  title: 'Ingredient',
                  fields: [
                    defineField({
                      name: 'quantity',
                      title: 'Quantity',
                      type: 'string',
                      description: 'E.g., "200g", "2 cups", "1 tbsp"',
                    }),
                    defineField({
                      name: 'name',
                      title: 'Ingredient Name',
                      type: 'string',
                      description: 'E.g., "Oyster Mushrooms", "Soy Sauce"',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'preparation',
                      title: 'Preparation',
                      type: 'string',
                      description: 'E.g., "sliced thin", "minced", "at room temperature"',
                    }),
                    defineField({
                      name: 'isOptional',
                      title: 'Optional Ingredient',
                      type: 'boolean',
                      description: 'Mark as optional if not essential to the recipe',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'product',
                      title: 'Link to Product',
                      type: 'reference',
                      to: [{type: 'product'}],
                      description: 'Link to MASH product for "Shop Ingredients" feature',
                    }),
                    defineField({
                      name: 'substitutes',
                      title: 'Substitutes',
                      type: 'array',
                      of: [{type: 'string'}],
                      description: 'Alternative ingredients if this one is unavailable',
                    }),
                  ],
                  preview: {
                    select: {
                      quantity: 'quantity',
                      name: 'name',
                      preparation: 'preparation',
                      isOptional: 'isOptional',
                      productName: 'product.name',
                    },
                    prepare({quantity, name, preparation, isOptional, productName}) {
                      const prepText = preparation ? `, ${preparation}` : ''
                      const optionalText = isOptional ? ' (optional)' : ''
                      const linkedText = productName ? ' 🔗' : ''
                      return {
                        title: `${quantity || ''} ${name || 'Unnamed'}${prepText}${optionalText}`,
                        subtitle: productName ? `Linked to: ${productName}` : 'Not linked to product',
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              groupName: 'groupName',
              ingredients: 'ingredients',
            },
            prepare({groupName, ingredients}) {
              const count = ingredients?.length || 0
              return {
                title: groupName || 'Main Ingredients',
                subtitle: `${count} ingredient${count !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'equipmentNeeded',
      title: 'Equipment Needed',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Kitchen tools required (e.g., "wok", "deep fryer", "food processor")',
      group: 'ingredients',
      options: {
        layout: 'tags',
      },
    }),

    // ═══════════════════════════════════════════════════════════
    // INSTRUCTIONS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'instructions',
      title: 'Cooking Instructions',
      type: 'array',
      group: 'instructions',
      description: 'Step-by-step cooking instructions',
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
              description: 'Auto-increments if left empty',
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              description: 'Optional heading (e.g., "Prepare the Mushrooms")',
            }),
            defineField({
              name: 'instruction',
              title: 'Instruction',
              type: 'text',
              description: 'Detailed instruction for this step',
              rows: 3,
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
              description: 'Photo showing this step (optional)',
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
          ],
          preview: {
            select: {
              stepNumber: 'stepNumber',
              title: 'title',
              instruction: 'instruction',
              image: 'image',
            },
            prepare({stepNumber, title, instruction, image}) {
              const preview = instruction?.slice(0, 80) + (instruction?.length > 80 ? '...' : '')
              return {
                title: `Step ${stepNumber || '?'}: ${title || 'Untitled'}`,
                subtitle: preview,
                media: image,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'chefNotes',
      title: "Chef's Notes",
      type: 'blockContent',
      description: 'Additional tips, serving suggestions, or storage instructions',
      group: 'instructions',
    }),

    // ═══════════════════════════════════════════════════════════
    // NUTRITION
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'nutritionFacts',
      title: 'Nutrition Facts (per serving)',
      type: 'object',
      group: 'nutrition',
      description: 'Optional nutrition information per serving',
      fields: [
        defineField({name: 'calories', title: 'Calories', type: 'number'}),
        defineField({name: 'protein', title: 'Protein (g)', type: 'number'}),
        defineField({name: 'carbohydrates', title: 'Carbohydrates (g)', type: 'number'}),
        defineField({name: 'fat', title: 'Fat (g)', type: 'number'}),
        defineField({name: 'fiber', title: 'Fiber (g)', type: 'number'}),
        defineField({name: 'sodium', title: 'Sodium (mg)', type: 'number'}),
        defineField({name: 'sugar', title: 'Sugar (g)', type: 'number'}),
      ],
    }),
    defineField({
      name: 'dietaryInfo',
      title: 'Dietary Information',
      type: 'array',
      of: [{type: 'string'}],
      group: 'nutrition',
      options: {
        list: [
          {title: '🥬 Vegetarian', value: 'vegetarian'},
          {title: '🌱 Vegan', value: 'vegan'},
          {title: '🍞 Gluten-Free', value: 'gluten-free'},
          {title: '🥛 Dairy-Free', value: 'dairy-free'},
          {title: '🥜 Nut-Free', value: 'nut-free'},
          {title: '🔥 Keto-Friendly', value: 'keto'},
          {title: '⚡ Low-Carb', value: 'low-carb'},
          {title: '❤️ Heart-Healthy', value: 'heart-healthy'},
        ],
      },
    }),
    defineField({
      name: 'allergens',
      title: 'Allergen Warnings',
      type: 'array',
      of: [{type: 'string'}],
      group: 'nutrition',
      options: {
        list: [
          {title: 'Contains Gluten', value: 'gluten'},
          {title: 'Contains Dairy', value: 'dairy'},
          {title: 'Contains Eggs', value: 'eggs'},
          {title: 'Contains Soy', value: 'soy'},
          {title: 'Contains Nuts', value: 'nuts'},
          {title: 'Contains Shellfish', value: 'shellfish'},
          {title: 'Contains Sesame', value: 'sesame'},
        ],
      },
    }),

    // ═══════════════════════════════════════════════════════════
    // RELATED CONTENT
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'relatedRecipes',
      title: 'Related Recipes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'recipe'}]}],
      description: 'Similar recipes the user might enjoy',
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Products highlighted in this recipe (for "Shop This Recipe" section)',
      validation: (Rule) => Rule.max(8),
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
      title: 'Featured Recipe',
      type: 'boolean',
      description: 'Show this recipe prominently on the recipes page',
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
      category: 'category',
      difficulty: 'difficulty',
      totalTime: 'totalTime',
      media: 'mainImage',
      status: 'status',
    },
    prepare({title, category, difficulty, totalTime, media, status}) {
      const categoryMap: Record<string, string> = {
        'main-dish': '🍽️ Main',
        'appetizer': '🥢 Appetizer',
        'side-dish': '🥗 Side',
        'soup': '🍲 Soup',
        'salad': '🥬 Salad',
        'snack': '🍿 Snack',
        'dessert': '🍰 Dessert',
        'beverage': '🍵 Beverage',
      }
      const difficultyMap: Record<string, string> = {
        'beginner': '🟢',
        'intermediate': '🟡',
        'advanced': '🔴',
      }
      const statusEmoji = status === 'published' ? '✅' : status === 'draft' ? '📝' : '📦'
      const categoryLabel = category ? categoryMap[category] || category : ''
      const timeLabel = totalTime ? `⏱️ ${totalTime}min` : ''
      const diffLabel = difficulty ? difficultyMap[difficulty] : ''
      
      return {
        title: `${statusEmoji} ${title || 'Untitled Recipe'}`,
        subtitle: [categoryLabel, diffLabel, timeLabel].filter(Boolean).join(' • '),
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
      title: 'Quickest First',
      name: 'totalTimeAsc',
      by: [{field: 'totalTime', direction: 'asc'}],
    },
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [{field: 'isFeatured', direction: 'desc'}],
    },
  ],
})
