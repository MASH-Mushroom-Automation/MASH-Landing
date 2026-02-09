import { InfoOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * About Page Singleton - Phase 8
 * 
 * CMS-managed content for the About page.
 * Includes hero section, challenges, solutions, vision, mentor, and team members.
 * 
 * This is a SINGLETON - only one instance exists.
 * Use document ID: 'aboutPageContent' when querying.
 * 
 * @see src/hooks/useSanityAboutPage.ts for frontend integration
 */

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    { name: 'hero', title: '🏠 Hero Section', default: true },
    { name: 'challenges', title: '⚠️ Challenges' },
    { name: 'solutions', title: '💡 Solutions' },
    { name: 'vision', title: '🎯 Vision' },
    { name: 'mentor', title: '👨‍🏫 Mentor' },
    { name: 'team', title: '👥 Team' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════════
    // HERO SECTION
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      description: 'Main headline for the About page',
      initialValue: 'Cultivating the Future of Philippine Agriculture',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      description: 'Supporting text below the title',
      rows: 2,
      initialValue: 'We are a team of student innovators from the University of Caloocan City dedicated to bridging the gap between technology and farming.',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      description: 'Background image for the hero section (16:9 ratio recommended)',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // CHALLENGES SECTION
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'challengesTitle',
      title: 'Challenges Section Title',
      type: 'string',
      group: 'challenges',
      initialValue: 'The Challenge Facing Filipino Growers',
    }),
    defineField({
      name: 'challengesSubtitle',
      title: 'Challenges Section Subtitle',
      type: 'text',
      group: 'challenges',
      rows: 2,
      initialValue: 'Mushroom production in the Philippines holds immense potential, but small-scale farmers face persistent obstacles.',
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges List',
      type: 'array',
      group: 'challenges',
      description: 'List of challenges faced by Filipino growers',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Challenge Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  { title: '🌡️ Temperature', value: 'thermometer' },
                  { title: '🐛 Pests', value: 'bug' },
                  { title: '⏱️ Labor', value: 'clock' },
                  { title: '🏪 Market', value: 'store' },
                  { title: '💰 Pricing', value: 'dollar-sign' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SOLUTIONS SECTION (M.A.S.H. System)
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'solutionsTitle',
      title: 'Solutions Section Title',
      type: 'string',
      group: 'solutions',
      initialValue: 'Our Solution: The M.A.S.H. System',
    }),
    defineField({
      name: 'solutionsSubtitle',
      title: 'Solutions Section Subtitle',
      type: 'text',
      group: 'solutions',
      rows: 2,
      initialValue: 'M.A.S.H. (Mushroom Automation with Smart Hydro-environment) is an integrated ecosystem designed to solve these challenges.',
    }),
    defineField({
      name: 'solutionsAcronym',
      title: 'Acronym Explanation',
      type: 'text',
      group: 'solutions',
      description: 'Full explanation of M.A.S.H. acronym',
      rows: 2,
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions List',
      type: 'array',
      group: 'solutions',
      description: 'Key solutions provided by MASH',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Solution Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  { title: '🤖 Automation', value: 'cpu' },
                  { title: '🧠 AI', value: 'brain' },
                  { title: '🛒 E-Commerce', value: 'shopping-cart' },
                  { title: '📊 Analytics', value: 'bar-chart' },
                  { title: '🌐 IoT', value: 'wifi' },
                ],
              },
            },
            {
              name: 'image',
              type: 'image',
              title: 'Solution Image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // VISION SECTION
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'visionTitle',
      title: 'Vision Section Title',
      type: 'string',
      group: 'vision',
      initialValue: 'Our Vision for a Greener Tomorrow',
    }),
    defineField({
      name: 'visionContent',
      title: 'Vision Content',
      type: 'blockContent',
      group: 'vision',
      description: 'Detailed vision statement with rich text formatting',
    }),
    defineField({
      name: 'visionCTA',
      title: 'Vision Call to Action',
      type: 'string',
      group: 'vision',
      description: 'Call-to-action text at the end of vision section',
      initialValue: 'Join us in growing the mushroom movement!',
    }),
    defineField({
      name: 'visionImage',
      title: 'Vision Section Image',
      type: 'image',
      group: 'vision',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // MENTOR / ADVISER SECTION
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'mentorTitle',
      title: 'Mentor Section Title',
      type: 'string',
      group: 'mentor',
      initialValue: 'Our Academic Adviser',
    }),
    defineField({
      name: 'mentorSubtitle',
      title: 'Mentor Section Subtitle',
      type: 'text',
      group: 'mentor',
      rows: 2,
      initialValue: 'We are grateful for the guidance and expertise of our Thesis Adviser in bringing this project to life.',
    }),
    defineField({
      name: 'mentor',
      title: 'Mentor / Adviser',
      type: 'reference',
      group: 'mentor',
      description: 'Select the mentor/adviser from persons list',
      to: [{ type: 'person' }],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // TEAM SECTION
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'teamTitle',
      title: 'Team Section Title',
      type: 'string',
      group: 'team',
      initialValue: 'Meet the Team',
    }),
    defineField({
      name: 'teamSubtitle',
      title: 'Team Section Subtitle',
      type: 'text',
      group: 'team',
      rows: 2,
      initialValue: 'The brilliant minds behind MASH - passionate about technology and sustainable agriculture.',
    }),
    // Legacy field aliases (for backwards compatibility with imported data)
    defineField({
      name: 'teamSectionTitle',
      title: 'Team Section Title (Legacy)',
      type: 'string',
      group: 'team',
      hidden: true,
      description: 'Legacy field - use teamTitle instead',
    }),
    defineField({
      name: 'teamSectionSubtitle',
      title: 'Team Section Subtitle (Legacy)',
      type: 'text',
      group: 'team',
      hidden: true,
      description: 'Legacy field - use teamSubtitle instead',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      group: 'team',
      description: 'Select team members to display (or leave empty to auto-fetch from persons)',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
    }),
    defineField({
      name: 'autoFetchTeam',
      title: 'Auto-fetch Team Members',
      type: 'boolean',
      group: 'team',
      description: 'If enabled, automatically fetch all persons with showOnAboutPage=true instead of using manual selection above',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content',
        subtitle: 'Singleton - Only one instance exists',
      }
    },
  },
})
