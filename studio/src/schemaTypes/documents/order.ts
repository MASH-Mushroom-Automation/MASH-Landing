/**
 * Order Schema
 * Defines customer orders with items, status workflow, and tracking
 */

import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // Order Identification
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique order identifier (e.g., MASH-2025-0001)',
      readOnly: true,
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      description: 'Date and time when order was placed',
    }),

    // Customer Information
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
      description: 'Full name of the customer',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      description: 'Customer email address',
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Customer phone number',
    }),
    defineField({
      name: 'customerId',
      title: 'Customer ID',
      type: 'string',
      description: 'Reference to customer ID in authentication system',
      readOnly: true,
    }),

    // Order Items
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{type: 'product'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'variant',
              title: 'Variant',
              type: 'reference',
              to: [{type: 'productVariant'}],
              description: 'Optional: Select if customer ordered a specific variant',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).integer(),
              initialValue: 1,
            },
            {
              name: 'price',
              title: 'Unit Price',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
              description: 'Price per unit at time of order',
            },
            {
              name: 'discount',
              title: 'Discount',
              type: 'number',
              validation: (Rule) => Rule.min(0),
              initialValue: 0,
              description: 'Discount amount applied to this item',
            },
            {
              name: 'subtotal',
              title: 'Subtotal',
              type: 'number',
              description: 'Calculated: (price * quantity) - discount',
              readOnly: true,
            },
          ],
          preview: {
            select: {
              productName: 'product.name',
              variantName: 'variant.variantName',
              quantity: 'quantity',
              price: 'price',
            },
            prepare({productName, variantName, quantity, price}) {
              return {
                title: productName || 'Unknown Product',
                subtitle: `${quantity}x @ ₱${price?.toFixed(2)}${variantName ? ` (${variantName})` : ''}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Products in this order',
    }),

    // Order Totals
    defineField({
      name: 'subtotal',
      title: 'Subtotal',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Sum of all item subtotals',
    }),
    defineField({
      name: 'shippingFee',
      title: 'Shipping Fee',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
      description: 'Shipping/delivery fee',
    }),
    defineField({
      name: 'tax',
      title: 'Tax',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
      description: 'Tax amount (if applicable)',
    }),
    defineField({
      name: 'discount',
      title: 'Order Discount',
      type: 'number',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
      description: 'Order-level discount (coupon, promo code)',
    }),
    defineField({
      name: 'total',
      title: 'Total Amount',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Final total: subtotal + shipping + tax - discount',
    }),

    // Shipping Address
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        {
          name: 'fullAddress',
          title: 'Full Address',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'province',
          title: 'Province',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'Philippines',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Payment Information
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          {title: 'Cash on Delivery (COD)', value: 'cod'},
          {title: 'GCash', value: 'gcash'},
          {title: 'PayMaya', value: 'paymaya'},
          {title: 'Bank Transfer', value: 'bank-transfer'},
          {title: 'Credit/Debit Card', value: 'card'},
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'cod',
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          {title: '⏳ Pending', value: 'pending'},
          {title: '✅ Paid', value: 'paid'},
          {title: '❌ Failed', value: 'failed'},
          {title: '💰 Refunded', value: 'refunded'},
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'pending',
    }),
    defineField({
      name: 'paymentReference',
      title: 'Payment Reference',
      type: 'string',
      description: 'Payment transaction ID or reference number',
    }),

    // Order Status
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: '⏳ Pending', value: 'pending'},
          {title: '✅ Confirmed', value: 'confirmed'},
          {title: '📦 Processing', value: 'processing'},
          {title: '🚚 Shipped', value: 'shipped'},
          {title: '✅ Delivered', value: 'delivered'},
          {title: '❌ Cancelled', value: 'cancelled'},
          {title: '↩️ Returned', value: 'returned'},
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'pending',
    }),
    defineField({
      name: 'statusHistory',
      title: 'Status History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'status',
              title: 'Status',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'timestamp',
              title: 'Timestamp',
              type: 'datetime',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'notes',
              title: 'Notes',
              type: 'text',
              rows: 2,
              description: 'Additional notes for this status change',
            },
            {
              name: 'updatedBy',
              title: 'Updated By',
              type: 'string',
              description: 'Who made this status change',
            },
          ],
          preview: {
            select: {
              status: 'status',
              timestamp: 'timestamp',
              notes: 'notes',
            },
            prepare({status, timestamp, notes}) {
              return {
                title: status?.toUpperCase(),
                subtitle: `${new Date(timestamp).toLocaleString()}${notes ? ` - ${notes}` : ''}`,
              }
            },
          },
        },
      ],
      description: 'Track all status changes with timestamps',
    }),

    // Tracking Information
    defineField({
      name: 'trackingNumber',
      title: 'Tracking Number',
      type: 'string',
      description: 'Shipping carrier tracking number',
    }),
    defineField({
      name: 'carrier',
      title: 'Shipping Carrier',
      type: 'string',
      options: {
        list: [
          {title: 'LBC', value: 'lbc'},
          {title: 'J&T Express', value: 'jnt'},
          {title: 'Ninja Van', value: 'ninjavan'},
          {title: 'Flash Express', value: 'flash'},
          {title: 'Lalamove', value: 'lalamove'},
          {title: 'Grab Express', value: 'grab'},
          {title: 'Other', value: 'other'},
        ],
      },
      description: 'Delivery service provider',
    }),
    defineField({
      name: 'estimatedDelivery',
      title: 'Estimated Delivery Date',
      type: 'date',
      description: 'Expected delivery date',
    }),

    // Notes & Special Instructions
    defineField({
      name: 'customerNotes',
      title: 'Customer Notes',
      type: 'text',
      rows: 3,
      description: 'Special instructions from customer',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Admin/seller notes (not visible to customer)',
    }),

    // Additional Fields
    defineField({
      name: 'couponCode',
      title: 'Coupon Code',
      type: 'string',
      description: 'Coupon code used for discount',
    }),
    defineField({
      name: 'source',
      title: 'Order Source',
      type: 'string',
      options: {
        list: [
          {title: 'Website', value: 'website'},
          {title: 'Mobile App', value: 'mobile'},
          {title: 'Phone', value: 'phone'},
          {title: 'Walk-in', value: 'walk-in'},
        ],
      },
      initialValue: 'website',
    }),
    defineField({
      name: 'isPriority',
      title: 'Priority Order',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as priority for faster processing',
    }),
  ],

  preview: {
    select: {
      orderNumber: 'orderNumber',
      customerName: 'customerName',
      total: 'total',
      status: 'status',
      paymentStatus: 'paymentStatus',
      orderDate: 'orderDate',
      isPriority: 'isPriority',
    },
    prepare({orderNumber, customerName, total, status, paymentStatus, orderDate, isPriority}) {
      const statusEmoji =
        status === 'delivered'
          ? '✅'
          : status === 'shipped'
            ? '🚚'
            : status === 'processing'
              ? '📦'
              : status === 'cancelled'
                ? '❌'
                : '⏳'

      const paymentEmoji = paymentStatus === 'paid' ? '💰' : '⏳'
      const priorityFlag = isPriority ? '⭐ ' : ''

      return {
        title: `${priorityFlag}${orderNumber} - ${customerName}`,
        subtitle: `${statusEmoji} ${status.toUpperCase()} • ${paymentEmoji} ${paymentStatus} • ₱${total?.toFixed(2)} • ${new Date(orderDate).toLocaleDateString()}`,
        media: DocumentIcon,
      }
    },
  },

  orderings: [
    {
      title: 'Order Date (Newest First)',
      name: 'orderDateDesc',
      by: [{field: 'orderDate', direction: 'desc'}],
    },
    {
      title: 'Order Date (Oldest First)',
      name: 'orderDateAsc',
      by: [{field: 'orderDate', direction: 'asc'}],
    },
    {
      title: 'Total (High to Low)',
      name: 'totalDesc',
      by: [{field: 'total', direction: 'desc'}],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{field: 'status', direction: 'asc'}],
    },
    {
      title: 'Priority Orders First',
      name: 'priority',
      by: [
        {field: 'isPriority', direction: 'desc'},
        {field: 'orderDate', direction: 'desc'},
      ],
    },
  ],
})
