import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Contact Page Singleton - Phase 8
 * 
 * CMS-managed content for the Contact page.
 * Includes contact information, business hours, social links, and map location.
 * 
 * This is a SINGLETON - only one instance exists.
 * Use document ID: 'contactPageContent' when querying.
 * 
 * @see src/hooks/useSanityContactPage.ts for frontend integration
 */

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    { name: 'header', title: '📋 Page Header', default: true },
    { name: 'contact', title: '📞 Contact Info' },
    { name: 'hours', title: '🕐 Business Hours' },
    { name: 'social', title: '🔗 Social Media' },
    { name: 'location', title: '📍 Location' },
    { name: 'form', title: '📝 Contact Form' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════════
    // PAGE HEADER
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'header',
      description: 'Main headline for the Contact page',
      initialValue: 'Get in Touch',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      group: 'header',
      description: 'Supporting text below the title',
      rows: 2,
      initialValue: "Have questions about our products or services? We'd love to hear from you!",
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      group: 'header',
      description: 'Optional header/banner image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTACT INFORMATION
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'array',
      group: 'contact',
      description: 'Different ways customers can reach you',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Contact Type',
              type: 'string',
              options: {
                list: [
                  { title: '📞 Phone', value: 'phone' },
                  { title: '📧 Email', value: 'email' },
                  { title: '📍 Address', value: 'address' },
                  { title: '💬 WhatsApp', value: 'whatsapp' },
                  { title: '📱 Viber', value: 'viber' },
                  { title: '✈️ Telegram', value: 'telegram' },
                  { title: '💬 Messenger', value: 'messenger' },
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Display label (e.g., "Main Office", "Customer Support")',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'Phone number, email address, or full address',
              validation: (rule) => rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Additional info (e.g., "Mon-Fri: 8AM-6PM")',
            },
            {
              name: 'link',
              title: 'Link URL',
              type: 'string',
              description: 'Optional link (e.g., "tel:+639171234567" or "mailto:support@mash.ph")',
            },
            {
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              initialValue: 50,
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'value', type: 'type' },
            prepare({ title, subtitle, type }) {
              const emojiMap: Record<string, string> = {
                phone: '📞',
                email: '📧',
                address: '📍',
                whatsapp: '💬',
                viber: '📱',
                telegram: '✈️',
                messenger: '💬',
              }
              const emoji = emojiMap[type] || '📋'
              return {
                title: `${emoji} ${title || type}`,
                subtitle,
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // BUSINESS HOURS
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'businessHoursTitle',
      title: 'Business Hours Section Title',
      type: 'string',
      group: 'hours',
      initialValue: 'Business Hours',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      group: 'hours',
      description: 'Operating hours for each day of the week',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'openTime',
              title: 'Open Time',
              type: 'string',
              description: 'e.g., "9:00 AM" or "08:00"',
            },
            {
              name: 'closeTime',
              title: 'Close Time',
              type: 'string',
              description: 'e.g., "6:00 PM" or "18:00"',
            },
            {
              name: 'isClosed',
              title: 'Closed',
              type: 'boolean',
              description: 'Check if closed on this day',
              initialValue: false,
            },
            {
              name: 'note',
              title: 'Note',
              type: 'string',
              description: 'Optional note (e.g., "By appointment only")',
            },
          ],
          preview: {
            select: { day: 'day', open: 'openTime', close: 'closeTime', isClosed: 'isClosed' },
            prepare({ day, open, close, isClosed }) {
              const dayLabel = day?.charAt(0).toUpperCase() + day?.slice(1) || 'Day'
              return {
                title: dayLabel,
                subtitle: isClosed ? '❌ Closed' : `${open} - ${close}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'holidayNote',
      title: 'Holiday Hours Note',
      type: 'text',
      group: 'hours',
      rows: 2,
      description: 'Special notice for holiday hours or closures',
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      group: 'hours',
      description: 'Display timezone (e.g., "Philippine Time (GMT+8)")',
      initialValue: 'Philippine Time (GMT+8)',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // SOCIAL MEDIA
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'socialMediaTitle',
      title: 'Social Media Section Title',
      type: 'string',
      group: 'social',
      initialValue: 'Follow Us',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: '📘 Facebook', value: 'facebook' },
                  { title: '📸 Instagram', value: 'instagram' },
                  { title: '🐦 Twitter / X', value: 'twitter' },
                  { title: '💼 LinkedIn', value: 'linkedin' },
                  { title: '📹 YouTube', value: 'youtube' },
                  { title: '🎵 TikTok', value: 'tiktok' },
                  { title: '💻 GitHub', value: 'github' },
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            },
            {
              name: 'handle',
              title: 'Handle / Username',
              type: 'string',
              description: 'Display handle (e.g., "@mashmushrooms")',
            },
            {
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              initialValue: 50,
            },
          ],
          preview: {
            select: { platform: 'platform', handle: 'handle' },
            prepare({ platform, handle }) {
              const emojiMap: Record<string, string> = {
                facebook: '📘',
                instagram: '📸',
                twitter: '🐦',
                linkedin: '💼',
                youtube: '📹',
                tiktok: '🎵',
                github: '💻',
              }
              const emoji = emojiMap[platform] || '🔗'
              return {
                title: `${emoji} ${platform?.charAt(0).toUpperCase() + platform?.slice(1)}`,
                subtitle: handle || '',
              }
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // LOCATION / MAP
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'locationTitle',
      title: 'Location Section Title',
      type: 'string',
      group: 'location',
      initialValue: 'Visit Us',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'object',
      group: 'location',
      fields: [
        { name: 'street', title: 'Street Address', type: 'string' },
        { name: 'barangay', title: 'Barangay', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'province', title: 'Province/State', type: 'string' },
        { name: 'zipCode', title: 'ZIP/Postal Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string', initialValue: 'Philippines' },
      ],
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'object',
      group: 'location',
      description: 'GPS coordinates for map display',
      fields: [
        {
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
          description: 'e.g., 14.724177785776938',
        },
        {
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
          description: 'e.g., 121.03866187637956',
        },
      ],
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      group: 'location',
      description: 'Embed URL from Google Maps (Share > Embed a map)',
    }),
    defineField({
      name: 'directionsLink',
      title: 'Directions Link',
      type: 'url',
      group: 'location',
      description: 'Google Maps directions link',
    }),
    defineField({
      name: 'locationImage',
      title: 'Location Image',
      type: 'image',
      group: 'location',
      description: 'Photo of the store/office exterior',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),
    defineField({
      name: 'nearbyLandmarks',
      title: 'Nearby Landmarks',
      type: 'text',
      group: 'location',
      rows: 2,
      description: 'Helpful landmarks for finding the location (e.g., "In front of BDO, near SM Fairview")',
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // CONTACT FORM SETTINGS
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: 'formTitle',
      title: 'Contact Form Title',
      type: 'string',
      group: 'form',
      initialValue: 'Send Us a Message',
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Contact Form Subtitle',
      type: 'text',
      group: 'form',
      rows: 2,
      initialValue: "Fill out the form below and we'll get back to you as soon as possible.",
    }),
    defineField({
      name: 'formRecipientEmail',
      title: 'Form Recipient Email',
      type: 'string',
      group: 'form',
      description: 'Email address where form submissions are sent',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'formSuccessMessage',
      title: 'Success Message',
      type: 'text',
      group: 'form',
      rows: 2,
      description: 'Message shown after successful form submission',
      initialValue: "Thank you for your message! We'll respond within 24 hours.",
    }),
    defineField({
      name: 'showContactForm',
      title: 'Show Contact Form',
      type: 'boolean',
      group: 'form',
      description: 'Enable or disable the contact form',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page Content',
        subtitle: 'Singleton - Only one instance exists',
      }
    },
  },
})
