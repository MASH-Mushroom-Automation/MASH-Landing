/**
 * Product Variant Schema
 * Defines product variations (size, color, weight) with variant-specific pricing and inventory
 */

import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productVariant = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
      description: 'The product this variant belongs to',
    }),
    
    // Basic Info
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
      description: 'Full name for this variant (e.g., "King Oyster Mushrooms - Large")',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly version of the name',
    }),
    defineField({
      name: 'variantName',
      title: 'Variant Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
      description: 'Display name for this variant (e.g., "Large Red", "500g Pack")',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique SKU for this variant',
    }),
    
    // Variant Type & Value
    defineField({
      name: 'variantType',
      title: 'Variant Type',
      type: 'string',
      options: {
        list: [
          {title: 'Size', value: 'Size'},
          {title: 'Weight', value: 'Weight'},
          {title: 'Color', value: 'Color'},
          {title: 'Type', value: 'Type'},
          {title: 'Package', value: 'Package'},
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Type of variant (e.g., Size, Weight, Color)',
    }),
    defineField({
      name: 'variantValue',
      title: 'Variant Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Value of the variant (e.g., "Large (600g)", "250g Pack")',
    }),

    // Variant Options
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Extra Small (XS)', value: 'xs'},
          {title: 'Small (S)', value: 's'},
          {title: 'Medium (M)', value: 'm'},
          {title: 'Large (L)', value: 'l'},
          {title: 'Extra Large (XL)', value: 'xl'},
          {title: '100g', value: '100g'},
          {title: '250g', value: '250g'},
          {title: '500g', value: '500g'},
          {title: '1kg', value: '1kg'},
          {title: '2kg', value: '2kg'},
          {title: '5kg', value: '5kg'},
        ],
      },
      description: 'Size option for this variant',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Brown', value: 'brown'},
          {title: 'Beige', value: 'beige'},
          {title: 'Black', value: 'black'},
          {title: 'Golden', value: 'golden'},
          {title: 'Gray', value: 'gray'},
          {title: 'Mixed', value: 'mixed'},
        ],
      },
      description: 'Color option for this variant (for mushroom varieties)',
    }),
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'string',
      description: 'Weight specification (e.g., "250g", "1kg")',
    }),
    defineField({
      name: 'weightUnit',
      title: 'Weight Unit',
      type: 'string',
      options: {
        list: [
          {title: 'Grams (g)', value: 'g'},
          {title: 'Kilograms (kg)', value: 'kg'},
          {title: 'Ounces (oz)', value: 'oz'},
          {title: 'Pounds (lb)', value: 'lb'},
        ],
      },
      initialValue: 'g',
      description: 'Unit of measurement for weight',
    }),
    defineField({
      name: 'customAttribute',
      title: 'Custom Attribute',
      type: 'string',
      description: 'Additional custom attribute (e.g., "Fresh", "Dried", "Organic")',
    }),

    // Pricing & Inventory
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Price for this variant (overrides base product price)',
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      description: 'Original price (for showing discounts)',
    }),
    defineField({
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).integer(),
      initialValue: 0,
      description: 'Current stock quantity for this variant',
    }),
    defineField({
      name: 'lowStockThreshold',
      title: 'Low Stock Threshold',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
      initialValue: 10,
      description: 'Show low stock warning when quantity is below this',
    }),

    // Images
    defineField({
      name: 'images',
      title: 'Variant Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Images specific to this variant (optional - will use product images if not provided)',
    }),

    // Status
    defineField({
      name: 'isAvailable',
      title: 'Available for Purchase',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to make this variant available/unavailable',
    }),
    defineField({
      name: 'isDefault',
      title: 'Default Variant',
      type: 'boolean',
      initialValue: false,
      description: 'Set as the default selected variant for this product',
    }),

    // Metadata
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (Rule) => Rule.integer(),
      initialValue: 0,
      description: 'Order in which variants are displayed (lower numbers first)',
    }),
  ],

  preview: {
    select: {
      name: 'name',
      productName: 'product.name',
      variantType: 'variantType',
      variantValue: 'variantValue',
      price: 'price',
      stock: 'stockQuantity',
      weight: 'weight',
      weightUnit: 'weightUnit',
      isAvailable: 'isAvailable',
    },
    prepare({name, productName, variantType, variantValue, price, stock, weight, weightUnit, isAvailable}) {
      const variantInfo = variantType && variantValue ? `${variantType}: ${variantValue}` : ''
      const weightInfo = weight && weightUnit ? `${weight}${weightUnit}` : ''
      const attributes = [variantInfo, weightInfo].filter(Boolean).join(' • ')
      const stockStatus = stock === 0 ? '🔴 Out of Stock' : stock < 10 ? '🟡 Low Stock' : '🟢 In Stock'
      const availabilityEmoji = isAvailable ? '✅' : '❌'

      return {
        title: `${name || productName} ${availabilityEmoji}`,
        subtitle: `${attributes} • ₱${price?.toFixed(2)} • ${stockStatus} (${stock})`,
        media: TagIcon,
      }
    },
  },

  orderings: [
    {
      title: 'Product Name',
      name: 'productName',
      by: [{field: 'product.name', direction: 'asc'}],
    },
    {
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [{field: 'price', direction: 'asc'}],
    },
    {
      title: 'Price (High to Low)',
      name: 'priceDesc',
      by: [{field: 'price', direction: 'desc'}],
    },
    {
      title: 'Stock Quantity',
      name: 'stock',
      by: [{field: 'stockQuantity', direction: 'desc'}],
    },
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
})
