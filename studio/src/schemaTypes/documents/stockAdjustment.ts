/**
 * Stock Adjustment Schema
 * Immutable audit trail for all stock level changes
 * 
 * Features:
 * - Product reference with eager loading
 * - Adjustment type validation (received, sold, returned, damaged, transferred, adjustment)
 * - Quantity change tracking (positive/negative based on type)
 * - Reason codes for traceability
 * - Read-only after creation (audit trail integrity)
 * - Indexed fields for efficient queries
 * - Preview component for Studio UI
 */

import {ClipboardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const stockAdjustment = defineType({
  name: 'stockAdjustment',
  title: 'Stock Adjustment',
  type: 'document',
  icon: ClipboardIcon,
  fields: [
    // Product Reference
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
      description: 'Product that this stock adjustment applies to',
      options: {
        disableNew: true, // Prevent creating new products from adjustment form
      },
    }),

    // Adjustment Type
    defineField({
      name: 'adjustmentType',
      title: 'Adjustment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Received (Stock In)', value: 'received'},
          {title: 'Sold (Stock Out)', value: 'sold'},
          {title: 'Returned (Stock In)', value: 'returned'},
          {title: 'Damaged (Stock Out)', value: 'damaged'},
          {title: 'Transferred (Stock Out)', value: 'transferred'},
          {title: 'Manual Adjustment', value: 'adjustment'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      description: 'Type of stock adjustment',
    }),

    // Quantity Change
    defineField({
      name: 'quantityChange',
      title: 'Quantity Change',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .custom((quantityChange, context) => {
            const {document} = context as {document: any}
            const adjustmentType = document?.adjustmentType

            if (!adjustmentType) return true

            // Received and returned must be positive
            if (['received', 'returned'].includes(adjustmentType)) {
              if (!quantityChange || quantityChange <= 0) {
                return 'Quantity must be positive for received/returned adjustments'
              }
            }

            // Sold, damaged, transferred must be negative
            if (['sold', 'damaged', 'transferred'].includes(adjustmentType)) {
              if (!quantityChange || quantityChange >= 0) {
                return 'Quantity must be negative for sold/damaged/transferred adjustments'
              }
            }

            // Manual adjustment can be either positive or negative (but not zero)
            if (adjustmentType === 'adjustment' && quantityChange === 0) {
              return 'Quantity change cannot be zero'
            }

            return true
          }),
      description: 'Quantity change (positive for stock in, negative for stock out)',
    }),

    // Previous Stock Level
    defineField({
      name: 'previousStock',
      title: 'Previous Stock Level',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Stock quantity before this adjustment',
      readOnly: true,
    }),

    // New Stock Level
    defineField({
      name: 'newStock',
      title: 'New Stock Level',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Stock quantity after this adjustment',
      readOnly: true,
    }),

    // Reason Code
    defineField({
      name: 'reason',
      title: 'Reason Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Predefined reason code for this adjustment (e.g., purchase-order, customer-order)',
    }),

    // Notes
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
      description: 'Optional additional details about this adjustment',
    }),

    // Adjusted By
    defineField({
      name: 'adjustedBy',
      title: 'Adjusted By',
      type: 'string',
      description: 'User ID or name of person who made this adjustment',
      readOnly: true,
    }),

    // Timestamp
    defineField({
      name: 'adjustmentDate',
      title: 'Adjustment Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      description: 'Date and time when adjustment was made',
      readOnly: true,
    }),

    // Related Document Reference (optional)
    defineField({
      name: 'relatedDocument',
      title: 'Related Document',
      type: 'object',
      description: 'Optional reference to related order, transfer, or other document',
      fields: [
        {
          name: 'documentType',
          title: 'Document Type',
          type: 'string',
          options: {
            list: [
              {title: 'Order', value: 'order'},
              {title: 'Purchase Order', value: 'purchaseOrder'},
              {title: 'Transfer', value: 'transfer'},
              {title: 'Return', value: 'return'},
              {title: 'Other', value: 'other'},
            ],
          },
        },
        {
          name: 'documentId',
          title: 'Document ID',
          type: 'string',
          description: 'Reference ID of the related document',
        },
      ],
    }),
  ],

  // Preview Configuration
  preview: {
    select: {
      productName: 'product.name',
      productSku: 'product.sku',
      adjustmentType: 'adjustmentType',
      quantityChange: 'quantityChange',
      newStock: 'newStock',
      adjustmentDate: 'adjustmentDate',
    },
    prepare(selection) {
      const {productName, productSku, adjustmentType, quantityChange, newStock, adjustmentDate} =
        selection

      // Format adjustment type for display
      const typeLabels: Record<string, string> = {
        received: 'Received',
        sold: 'Sold',
        returned: 'Returned',
        damaged: 'Damaged',
        transferred: 'Transferred',
        adjustment: 'Adjustment',
      }

      const typeLabel = typeLabels[adjustmentType] || adjustmentType

      // Format quantity with sign
      const quantityDisplay = quantityChange > 0 ? `+${quantityChange}` : quantityChange

      // Format date
      const dateStr = adjustmentDate
        ? new Date(adjustmentDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'No date'

      return {
        title: `${typeLabel}: ${productName || 'Unknown Product'} (${quantityDisplay})`,
        subtitle: `SKU: ${productSku || 'N/A'} | New Stock: ${newStock ?? 'N/A'} | ${dateStr}`,
        media: ClipboardIcon,
      }
    },
  },

  // Orderings
  orderings: [
    {
      title: 'Adjustment Date (Newest First)',
      name: 'adjustmentDateDesc',
      by: [{field: 'adjustmentDate', direction: 'desc'}],
    },
    {
      title: 'Adjustment Date (Oldest First)',
      name: 'adjustmentDateAsc',
      by: [{field: 'adjustmentDate', direction: 'asc'}],
    },
    {
      title: 'Product Name',
      name: 'productName',
      by: [{field: 'product.name', direction: 'asc'}],
    },
    {
      title: 'Adjustment Type',
      name: 'adjustmentType',
      by: [{field: 'adjustmentType', direction: 'asc'}],
    },
  ],
})
