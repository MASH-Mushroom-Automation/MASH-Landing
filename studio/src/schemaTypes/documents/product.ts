import {PackageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image (Main)',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*', // Accept ALL image types: jpg, jpeg, png, gif, webp, avif, svg, bmp, tiff, ico, etc.
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility and SEO (e.g., "Fresh oyster mushrooms in basket")',
        },
      ],
      validation: (rule) => rule.required(),
      description: 'Main product image - Supports JPG, PNG, GIF, WebP, AVIF, SVG, and more',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
      description: 'Select the most specific category (subcategory if available)',
    }),
    defineField({
      name: 'grower',
      title: 'Grower / Farm',
      type: 'reference',
      to: [{type: 'grower'}],
      description: 'The grower or farm that produces this product. This enables bidirectional linking between products and growers.',
    }),
    defineField({
      name: 'price',
      title: 'Regular Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'isOnPromo',
      title: 'On Promotion',
      type: 'boolean',
      initialValue: false,
      description: 'Enable this to put the product on promotion',
    }),
    defineField({
      name: 'promoType',
      title: 'Promotion Type',
      type: 'string',
      options: {
        list: [
          {title: 'Percentage Discount', value: 'percentage'},
          {title: 'Fixed Price', value: 'fixed'},
        ],
        layout: 'radio',
      },
      hidden: ({document}) => !document?.isOnPromo,
      validation: (rule) =>
        rule.custom((promoType, context) => {
          const {document} = context as {document: any}
          if (document?.isOnPromo && !promoType) {
            return 'Please select a promotion type'
          }
          return true
        }),
    }),
    defineField({
      name: 'promoPercentage',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Enter discount percentage (e.g., 20 for 20% off)',
      hidden: ({document}) => document?.promoType !== 'percentage',
      validation: (rule) =>
        rule.custom((promoPercentage, context) => {
          const {document} = context as {document: any}
          if (document?.isOnPromo && document?.promoType === 'percentage') {
            if (!promoPercentage) return 'Discount percentage is required'
            if (promoPercentage <= 0 || promoPercentage >= 100) {
              return 'Percentage must be between 1 and 99'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'promoPrice',
      title: 'Promotional Price',
      type: 'number',
      description: 'Enter the promotional price',
      hidden: ({document}) => document?.promoType !== 'fixed',
      validation: (rule) =>
        rule.custom((promoPrice, context) => {
          const {document} = context as {document: any}
          if (document?.isOnPromo && document?.promoType === 'fixed') {
            if (!promoPrice) return 'Promotional price is required'
            if (promoPrice <= 0) return 'Price must be greater than 0'
            if (promoPrice >= document?.price) {
              return 'Promotional price must be less than regular price'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity in Stock',
      type: 'number',
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      name: 'inventory',
      title: 'Inventory Management',
      type: 'object',
      fields: [
        {
          name: 'quantityInStock',
          title: 'Quantity in Stock',
          type: 'number',
          validation: (rule) => rule.min(0).integer(),
          description: 'Current stock quantity',
        },
        {
          name: 'lowStockThreshold',
          title: 'Low Stock Threshold',
          type: 'number',
          validation: (rule) => rule.min(0).integer(),
          initialValue: 10,
          description: 'Alert when stock falls below this number',
        },
        {
          name: 'outOfStockThreshold',
          title: 'Out of Stock Threshold',
          type: 'number',
          validation: (rule) =>
            rule
              .min(0)
              .integer()
              .custom((outOfStockThreshold, context) => {
                const {parent} = context as {parent: any}
                const lowStockThreshold = parent?.lowStockThreshold

                // outOfStockThreshold must be less than lowStockThreshold
                if (
                  lowStockThreshold !== undefined &&
                  outOfStockThreshold !== undefined &&
                  outOfStockThreshold >= lowStockThreshold
                ) {
                  return 'Out of stock threshold must be less than low stock threshold'
                }

                return true
              }),
          initialValue: 0,
          description: 'Mark product as out of stock when quantity falls to or below this number',
        },
        {
          name: 'restockLevel',
          title: 'Restock Level',
          type: 'number',
          validation: (rule) => rule.min(0).integer(),
          description: 'Recommended quantity to reorder when restocking (optional)',
        },
        {
          name: 'trackInventory',
          title: 'Track Inventory',
          type: 'boolean',
          initialValue: true,
          description: 'Enable/disable inventory tracking for this product',
        },
        {
          name: 'allowBackorders',
          title: 'Allow Backorders',
          type: 'boolean',
          initialValue: false,
          description: 'Allow orders when out of stock',
        },
        {
          name: 'stockHistory',
          title: 'Stock History',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'date',
                  type: 'datetime',
                  title: 'Date',
                },
                {
                  name: 'quantity',
                  type: 'number',
                  title: 'Quantity Changed',
                },
                {
                  name: 'newTotal',
                  type: 'number',
                  title: 'New Total Stock',
                },
                {
                  name: 'reason',
                  type: 'string',
                  title: 'Reason',
                  options: {
                    list: [
                      {title: 'Restock', value: 'restock'},
                      {title: 'Sale', value: 'sale'},
                      {title: 'Adjustment', value: 'adjustment'},
                      {title: 'Return', value: 'return'},
                      {title: 'Damaged', value: 'damaged'},
                    ],
                  },
                },
                {
                  name: 'notes',
                  type: 'text',
                  title: 'Notes',
                },
              ],
              preview: {
                select: {
                  date: 'date',
                  quantity: 'quantity',
                  reason: 'reason',
                },
                prepare({date, quantity, reason}) {
                  return {
                    title: `${quantity > 0 ? '+' : ''}${quantity} - ${reason}`,
                    subtitle: new Date(date).toLocaleDateString(),
                  }
                },
              },
            },
          ],
          readOnly: true,
          description: 'Automatically tracked stock changes',
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Stock Keeping Unit - unique product identifier',
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for Purchase',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/*', // Accept all image file types (jpg, png, gif, webp, avif, svg, etc.)
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility and SEO',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption to display with the image',
            },
          ],
        },
      ],
      description: 'Upload multiple product images (gallery) - Supports JPG, PNG, GIF, WebP, AVIF, SVG, and more',
    }),
    defineField({
      name: 'media',
      title: 'Product Media Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mediaItem',
          title: 'Media Item',
          fields: [
            {
              name: 'mediaType',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  {title: '🖼️ Image', value: 'image'},
                  {title: '🎬 Video', value: 'video'},
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (rule) => rule.required(),
            },
            {
              name: 'image',
              title: 'Image File',
              type: 'image',
              options: {
                hotspot: true,
                accept: 'image/*', // Accept ALL image types: jpg, jpeg, png, gif, webp, avif, svg, bmp, tiff, ico, etc.
              },
              hidden: ({parent}) => parent?.mediaType !== 'image',
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Describe the image for accessibility and SEO',
                },
              ],
            },
            {
              name: 'video',
              title: 'Video File',
              type: 'file',
              options: {
                accept: 'video/*', // Accept ALL video types: mp4, webm, mov, avi, mkv, etc.
              },
              hidden: ({parent}) => parent?.mediaType !== 'video',
            },
            {
              name: 'videoUrl',
              title: 'External Video URL (YouTube/Vimeo)',
              type: 'url',
              description: 'Paste YouTube or Vimeo URL for embedded videos',
              hidden: ({parent}) => parent?.mediaType !== 'video',
            },
            {
              name: 'title',
              title: 'Media Title',
              type: 'string',
              description: 'Title for this media item (optional)',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 2,
              description: 'Description or caption for this media',
            },
            {
              name: 'isPrimary',
              title: 'Primary Media',
              type: 'boolean',
              initialValue: false,
              description: 'Set as primary gallery item (shown first)',
            },
            {
              name: 'sortOrder',
              title: 'Sort Order',
              type: 'number',
              initialValue: 0,
              description: 'Order in gallery (lower numbers appear first)',
            },
          ],
          preview: {
            select: {
              mediaType: 'mediaType',
              title: 'title',
              image: 'image',
              isPrimary: 'isPrimary',
            },
            prepare({mediaType, title, image, isPrimary}) {
              const icon = mediaType === 'video' ? '🎬' : '🖼️'
              const primaryBadge = isPrimary ? ' ⭐' : ''
              return {
                title: `${icon} ${title || (mediaType === 'video' ? 'Video' : 'Image')}${primaryBadge}`,
                subtitle: mediaType === 'video' ? 'Video file' : 'Image file',
                media: image,
              }
            },
          },
        },
      ],
      description: 'Complete media gallery - add images AND videos. Supports: JPG, PNG, GIF, WebP, AVIF, SVG, MP4, WebM, MOV, YouTube, Vimeo',
    }),
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'number',
      description: 'Product weight in grams',
    }),
    defineField({
      name: 'unit',
      title: 'Unit of Measurement',
      type: 'string',
      options: {
        list: [
          {title: 'Grams (g)', value: 'g'},
          {title: 'Kilograms (kg)', value: 'kg'},
          {title: 'Pieces (pcs)', value: 'pcs'},
          {title: 'Pack', value: 'pack'},
          {title: 'Box', value: 'box'},
        ],
      },
      initialValue: 'g',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      description: 'Display in featured products section',
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      description: 'Original price before discount (for display purposes)',
    }),
    defineField({
      name: 'promoEndDate',
      title: 'Promotion End Date',
      type: 'datetime',
      description: 'When should the promotion end?',
      hidden: ({document}) => !document?.isOnPromo,
    }),
    
    // Product Variants (Phase 9)
    // Deprecated for storefront: hide from editors to avoid accidental usage
    defineField({
      name: 'hasVariants',
      title: 'Has Variants (Seller-managed, deprecated on storefront)',
      type: 'boolean',
      initialValue: false,
      hidden: true,
      description: 'Does this product have size/color/weight variants? ⚠️ Deprecated for storefront display - variants are hidden from buyers. Manage variants only in Seller Studio.',
    }),
    defineField({
      name: 'variants',
      title: 'Product Variants (Seller-managed, deprecated on storefront)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'productVariant'}]}],
      description: 'Add product variants (size, color, weight options). ⚠️ Note: variants are deprecated for buyer storefront; keep for backward compatibility and seller-managed use.',
      hidden: true,
    }),
    
    // Related Products & Bundles (Phase 9)
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Products that customers might also be interested in',
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'relatedBundles',
      title: 'Related Bundles (Deprecated on storefront)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'productBundle'}]}],
      description: 'Bundles that include this product or similar products. ⚠️ Deprecated on storefront - bundles are no longer displayed to buyers. Keep for data compatibility in Seller Studio.',
      validation: (Rule) => Rule.max(4),
      hidden: true,
    }),

    // ========================================
    // 🆕 PHASE 2.5: ENHANCED E-COMMERCE FEATURES
    // ========================================

    // Suggested Products & Smart Recommendations
    // ⚠️ DEPRECATED: This field is no longer used - suggested products are now auto-generated
    // from products in the same grower/store. Kept for backward compatibility only.
    defineField({
      name: 'suggestedProducts',
      title: '⚠️ DEPRECATED - Suggested Products (Auto-generated)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: '⚠️ DEPRECATED: This field is no longer needed. Suggested products are now automatically shown from the same grower/store. You can leave this empty.',
      validation: (Rule) => Rule.max(8),
      hidden: true,  // Hide this field in Sanity Studio
      options: {
        layout: 'grid',
      },
    }),

    // New flag to allow editors to opt-out of auto-suggestions on a per-product basis
    defineField({
      name: 'suggestedProductsEnabled',
      title: 'Suggested Products Enabled',
      type: 'boolean',
      initialValue: true,
      description: 'When true (default), the storefront will auto-generate suggested products. Editors can set this to false to disable automatic suggestions for this product.',
    }),
    defineField({
      name: 'productTags',
      title: 'Product Tags (Smart Search)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags help customers find related products (e.g., "organic", "high-protein", "easy-to-cook", "vegan")',
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'complementaryProducts',
      title: 'Complementary Products (Frequently Bought Together)',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'product'}],
        options: {
          filter: '_type == "product" && _id != ^._id', // Don't suggest itself
        },
      }],
      description: 'Products often purchased with this item (shows in cart and product page). ⚠️ Deprecated on storefront; use auto-generated suggestions instead.',
      validation: (Rule) => Rule.max(4),
      hidden: true,
    }),

    // Mushroom-Specific Freshness & Quality (Hidden from Studio - deprecated on storefront)
    defineField({
      name: 'freshnessInfo',
      title: 'Freshness Information',
      type: 'object',
      hidden: true,
      description: 'Critical for fresh mushrooms - harvest to delivery tracking (Hidden: deprecated for storefront display)',
      fields: [
        {
          name: 'harvestWindow',
          title: 'Typical Harvest to Delivery Time',
          type: 'string',
          options: {
            list: [
              {title: 'Within 24 hours', value: '24h'},
              {title: 'Within 48 hours', value: '48h'},
              {title: '3-5 days', value: '3-5d'},
              {title: 'Not applicable (dried/kit)', value: 'n/a'},
            ],
          },
          initialValue: '24h',
        },
        {
          name: 'shelfLife',
          title: 'Shelf Life (after delivery)',
          type: 'string',
          options: {
            list: [
              {title: '3-5 days (refrigerated)', value: '3-5d'},
              {title: '5-7 days (refrigerated)', value: '5-7d'},
              {title: '1-2 weeks (refrigerated)', value: '1-2w'},
              {title: '6-12 months (dried)', value: '6-12m'},
              {title: '1+ year (dried)', value: '1y+'},
            ],
          },
          initialValue: '5-7d',
        },
        {
          name: 'storageInstructions',
          title: 'Storage Instructions',
          type: 'text',
          rows: 3,
          placeholder: 'E.g., "Store in paper bag in refrigerator. Do not wash until ready to use. Keep dry to prevent slimy texture."',
        },
        {
          name: 'qualityIndicators',
          title: 'Quality Indicators (What to Look For)',
          type: 'text',
          rows: 3,
          placeholder: 'E.g., "Firm caps, no slimy texture, fresh earthy smell, no dark spots or discoloration"',
        },
      ],
    }),

    // Preparation & Cooking Information (Hidden from Studio - deprecated on storefront)
    defineField({
      name: 'preparationInfo',
      title: 'Preparation & Cooking',
      type: 'object',
      hidden: true,
      description: 'Help customers prepare and cook mushrooms correctly (Hidden: deprecated for storefront display)',
      fields: [
        {
          name: 'difficultyLevel',
          title: 'Preparation Difficulty',
          type: 'string',
          options: {
            list: [
              {title: '⭐ Beginner-Friendly', value: 'beginner'},
              {title: '⭐⭐ Intermediate', value: 'intermediate'},
              {title: '⭐⭐⭐ Advanced', value: 'advanced'},
            ],
          },
          initialValue: 'beginner',
        },
        {
          name: 'cookingTime',
          title: 'Typical Cooking Time',
          type: 'string',
          placeholder: 'E.g., "10-15 minutes" or "5-8 minutes"',
        },
        {
          name: 'preparationTips',
          title: 'Preparation Tips',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Step-by-step tips for preparing this mushroom',
        },
        {
          name: 'recipeIdeas',
          title: 'Recipe Ideas',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Quick recipe suggestions (e.g., "Sautéed with garlic butter", "Stir-fry with vegetables")',
        },
      ],
    }),

    // Same-Day Delivery Options (Lalamove Integration) (Hidden from Studio - deprecated on storefront)
    defineField({
      name: 'deliveryOptions',
      title: 'Delivery Options',
      type: 'object',
      hidden: true,
      description: 'Configure same-day delivery via Lalamove for fresh mushrooms (Hidden: deprecated for storefront display)',
      fields: [
        {
          name: 'sameDayDeliveryEligible',
          title: 'Same-Day Delivery Available (Lalamove)',
          type: 'boolean',
          description: 'Can this product be delivered same-day via Lalamove?',
          initialValue: true,
        },
        {
          name: 'deliveryZones',
          title: 'Delivery Zones',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Areas where same-day delivery is available',
          options: {
            list: [
              {title: 'Metro Manila (All areas)', value: 'metro-manila'},
              {title: 'Quezon City', value: 'quezon-city'},
              {title: 'Makati', value: 'makati'},
              {title: 'BGC Taguig', value: 'bgc'},
              {title: 'Mandaluyong', value: 'mandaluyong'},
              {title: 'Pasig', value: 'pasig'},
              {title: 'Manila (City proper)', value: 'manila'},
              {title: 'Muntinlupa', value: 'muntinlupa'},
              {title: 'Parañaque', value: 'paranaque'},
              {title: 'Las Piñas', value: 'las-pinas'},
              {title: 'Nationwide (Standard Delivery)', value: 'nationwide'},
            ],
          },
        },
        {
          name: 'deliveryNotes',
          title: 'Special Delivery Notes',
          type: 'text',
          rows: 2,
          placeholder: 'E.g., "Requires refrigerated transport", "Handle with care - delicate caps", "Keep upright during delivery"',
        },
        {
          name: 'perishable',
          title: 'Perishable Item',
          type: 'boolean',
          initialValue: true,
          description: 'Mark as perishable for special handling instructions to Lalamove driver',
        },
      ],
    }),

    // Delivery Weight & Dimensions (for Lalamove Pricing)
    defineField({
      name: 'deliveryWeight',
      title: 'Delivery Weight & Dimensions',
      type: 'object',
      description: 'Used to calculate Lalamove delivery pricing automatically',
      fields: [
        {
          name: 'packageWeight',
          title: 'Package Weight (kg)',
          type: 'number',
          description: 'Total weight including packaging materials',
          validation: (Rule) => Rule.min(0).max(50),
        },
        {
          name: 'packageDimensions',
          title: 'Package Dimensions (cm)',
          type: 'object',
          fields: [
            {
              name: 'length',
              title: 'Length (cm)',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(200),
            },
            {
              name: 'width',
              title: 'Width (cm)',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(200),
            },
            {
              name: 'height',
              title: 'Height (cm)',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(200),
            },
          ],
        },
      ],
    }),

    // Enhanced Product Search & Discovery
    defineField({
      name: 'searchKeywords',
      title: 'Search Keywords (SEO)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Additional search terms customers might use (e.g., "oyster mushroom", "pleurotus", "mushroom powder")',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'nutritionalHighlights',
      title: 'Nutritional Highlights',
      type: 'array',
      hidden: true,
      of: [{type: 'string'}],
      description: 'Key health benefits to display on product cards (Hidden: deprecated for storefront display)',
      options: {
        list: [
          {title: '🌟 High in Vitamin D', value: 'vitamin-d'},
          {title: '💪 Rich in Antioxidants', value: 'antioxidants'},
          {title: '🥩 High Protein', value: 'high-protein'},
          {title: '🪶 Low Calorie', value: 'low-calorie'},
          {title: '🛡️ Immune Support', value: 'immune-support'},
          {title: '❤️ Heart Healthy', value: 'heart-healthy'},
          {title: '🌱 Vegan', value: 'vegan'},
          {title: '🌾 Organic', value: 'organic'},
          {title: '🧠 Brain Health', value: 'brain-health'},
          {title: '🦴 Bone Health', value: 'bone-health'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'image',
      price: 'price',
      quantity: 'quantity',
      isOnPromo: 'isOnPromo',
      promoType: 'promoType',
      promoPercentage: 'promoPercentage',
      promoPrice: 'promoPrice',
    },
    prepare({title, subtitle, media, price, quantity, isOnPromo, promoType, promoPercentage, promoPrice}) {
      let priceDisplay = `₱${price}`
      
      if (isOnPromo) {
        const finalPrice = promoType === 'percentage' 
          ? price - (price * (promoPercentage / 100))
          : promoPrice
        priceDisplay = `₱${finalPrice.toFixed(2)} (was ₱${price}) 🏷️`
      }
      
      return {
        title,
        subtitle: `${subtitle || 'No category'} - ${priceDisplay} (Stock: ${quantity})`,
        media,
      }
    },
  },
})
