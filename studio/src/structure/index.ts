import {CogIcon, SparklesIcon, ImagesIcon, UsersIcon, PackageIcon, TagIcon, HelpCircleIcon, MenuIcon, StarIcon, DocumentTextIcon, PinIcon, CommentIcon, BlockElementIcon, InfoOutlineIcon, EnvelopeIcon, BookIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 * 
 * Phase 5 Update: Added siteSettings singleton and navigation menus
 * Phase 8 Update: Added aboutPage, contactPage singletons and blogCategory
 */

// Types that are manually placed in the structure (not auto-listed)
const DISABLED_TYPES = [
  'settings',           // Old settings schema (deprecated, replaced by siteSettings)
  'siteSettings',       // Phase 5: New comprehensive site settings singleton
  'featuredProducts', 
  'heroCarousel', 
  'grower', 
  'product', 
  'category', 
  'faqCategory', 
  'faqItem',
  'featureSection',     // Phase 4: Feature sections
  'navigation',         // Phase 5: Navigation menus
  'store',              // Phase 6: Store locations
  'testimonial',        // Phase 7: Customer testimonials
  'banner',             // Phase 7: Promotional banners
  'aboutPage',          // Phase 8: About page singleton
  'contactPage',        // Phase 8: Contact page singleton
  'blogCategory',       // Phase 8: Blog categories
  'person',             // Phase 8: Team members/Authors
  'post',               // Phase 8: Blog posts
  'assist.instruction.context'
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // ===== E-COMMERCE SECTION =====
      S.listItem()
        .title('🛒 E-Commerce')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('E-Commerce')
            .items([
              // Products
              S.listItem()
                .title('Products')
                .icon(PackageIcon)
                .child(
                  S.documentTypeList('product')
                    .title('Products')
                ),
              // Categories
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                ),
              // Growers/Farms (Phase 1)
              S.listItem()
                .title('Growers / Farms')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('grower')
                    .title('Growers / Farms')
                ),
              // Featured Products Singleton
              S.listItem()
                .title('Featured Products')
                .child(S.document().schemaType('featuredProducts').documentId('featuredProducts'))
                .icon(SparklesIcon),
            ])
        ),
      // Divider
      S.divider(),
      // ===== HOMEPAGE SECTION =====
      S.listItem()
        .title('🏠 Homepage')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Homepage Content')
            .items([
              // Hero Carousel Singleton
              S.listItem()
                .title('Hero Carousel')
                .child(S.document().schemaType('heroCarousel').documentId('heroCarousel'))
                .icon(ImagesIcon),
              // Featured Products
              S.listItem()
                .title('Featured Products')
                .child(S.document().schemaType('featuredProducts').documentId('featuredProducts'))
                .icon(SparklesIcon),
            ])
        ),
      // Divider
      S.divider(),
      // ===== FAQ SECTION ===== (Phase 2)
      S.listItem()
        .title('❓ FAQ')
        .icon(HelpCircleIcon)
        .child(
          S.list()
            .title('FAQ Management')
            .items([
              // FAQ Categories
              S.listItem()
                .title('FAQ Categories')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('faqCategory')
                    .title('FAQ Categories')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                ),
              // FAQ Items
              S.listItem()
                .title('FAQ Questions')
                .icon(HelpCircleIcon)
                .child(
                  S.documentTypeList('faqItem')
                    .title('FAQ Questions')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                ),
            ])
        ),
      // Divider
      S.divider(),
      // ===== STORE LOCATIONS SECTION ===== (Phase 6)
      S.listItem()
        .title('📍 Store Locations')
        .icon(PinIcon)
        .child(
          S.documentTypeList('store')
            .title('Store Locations')
            .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
        ),
      // Divider
      S.divider(),
      // ===== BLOG SECTION ===== (Phase 8)
      S.listItem()
        .title('📝 Blog')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Blog Management')
            .items([
              // Blog Posts
              S.listItem()
                .title('Blog Posts')
                .icon(DocumentTextIcon)
                .child(
                  S.documentTypeList('post')
                    .title('Blog Posts')
                    .defaultOrdering([{ field: 'date', direction: 'desc' }])
                ),
              // Blog Categories
              S.listItem()
                .title('Blog Categories')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('blogCategory')
                    .title('Blog Categories')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                ),
              // Authors/Team Members
              S.listItem()
                .title('Authors & Team')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('person')
                    .title('Authors & Team Members')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                ),
            ])
        ),
      // Divider
      S.divider(),
      // ===== MARKETING SECTION ===== (Phase 7)
      S.listItem()
        .title('📣 Marketing')
        .icon(CommentIcon)
        .child(
          S.list()
            .title('Marketing Content')
            .items([
              // Testimonials (Phase 7)
              S.listItem()
                .title('Customer Testimonials')
                .icon(StarIcon)
                .child(
                  S.documentTypeList('testimonial')
                    .title('Testimonials')
                    .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
                ),
              // Promotional Banners (Phase 7)
              S.listItem()
                .title('Promotional Banners')
                .icon(BlockElementIcon)
                .child(
                  S.documentTypeList('banner')
                    .title('Banners')
                    .defaultOrdering([{ field: 'position', direction: 'asc' }, { field: 'sortOrder', direction: 'asc' }])
                ),
            ])
        ),
      // Divider
      S.divider(),
      // ===== OTHER DOCUMENT TYPES =====
      ...S.documentTypeListItems()
        // Filter out managed types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      // Divider
      S.divider(),
      // ===== SETTINGS SECTION ===== (Phase 5)
      S.listItem()
        .title('⚙️ Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Configuration')
            .items([
              // Site Settings Singleton (Phase 5 - Comprehensive)
              S.listItem()
                .title('Site Settings')
                .icon(CogIcon)
                .child(S.document().schemaType('siteSettings').documentId('siteSettingsDoc')),
              // Navigation Menus (Phase 5)
              S.listItem()
                .title('Navigation Menus')
                .icon(MenuIcon)
                .child(
                  S.documentTypeList('navigation')
                    .title('Navigation Menus')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              // Feature Sections (Phase 4)
              S.listItem()
                .title('Feature Sections')
                .icon(StarIcon)
                .child(
                  S.documentTypeList('featureSection')
                    .title('Feature Sections')
                ),
              // Divider within settings
              S.divider(),
              // About Page (Phase 8)
              S.listItem()
                .title('About Page')
                .icon(InfoOutlineIcon)
                .child(S.document().schemaType('aboutPage').documentId('aboutPageDoc')),
              // Contact Page (Phase 8)
              S.listItem()
                .title('Contact Page')
                .icon(EnvelopeIcon)
                .child(S.document().schemaType('contactPage').documentId('contactPageDoc')),
            ])
        ),
    ])
