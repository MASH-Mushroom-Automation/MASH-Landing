/**
 * Analytics Schema
 * Sales reports and product analytics
 */

import {defineField, defineType} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons'

export const analytics = defineType({
  name: 'analytics',
  title: 'Analytics',
  type: 'document',
  icon: ChartUpwardIcon,
  fields: [
    // Report Identification
    defineField({
      name: 'reportName',
      title: 'Report Name',
      type: 'string',
      description: 'Name of this analytics report',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),

    defineField({
      name: 'reportType',
      title: 'Report Type',
      type: 'string',
      options: {
        list: [
          {title: '📊 Sales Overview', value: 'sales-overview'},
          {title: '📦 Product Performance', value: 'product-performance'},
          {title: '👥 Customer Insights', value: 'customer-insights'},
          {title: '🎯 Marketing Performance', value: 'marketing-performance'},
          {title: '📈 Growth Trends', value: 'growth-trends'},
          {title: '💰 Revenue Report', value: 'revenue-report'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // Date Range
    defineField({
      name: 'dateRange',
      title: 'Date Range',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // Sales Metrics
    defineField({
      name: 'salesMetrics',
      title: 'Sales Metrics',
      type: 'object',
      fields: [
        {name: 'totalRevenue', title: 'Total Revenue (₱)', type: 'number'},
        {name: 'totalOrders', title: 'Total Orders', type: 'number'},
        {name: 'averageOrderValue', title: 'Average Order Value (₱)', type: 'number'},
        {name: 'totalProducts', title: 'Total Products Sold', type: 'number'},
        {name: 'conversionRate', title: 'Conversion Rate (%)', type: 'number'},
      ],
    }),

    // Product Performance
    defineField({
      name: 'topProducts',
      title: 'Top Performing Products',
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
            },
            {name: 'unitsSold', title: 'Units Sold', type: 'number'},
            {name: 'revenue', title: 'Revenue (₱)', type: 'number'},
          ],
        },
      ],
    }),

    // Customer Metrics
    defineField({
      name: 'customerMetrics',
      title: 'Customer Metrics',
      type: 'object',
      fields: [
        {name: 'newCustomers', title: 'New Customers', type: 'number'},
        {name: 'returningCustomers', title: 'Returning Customers', type: 'number'},
        {name: 'customerRetentionRate', title: 'Retention Rate (%)', type: 'number'},
        {name: 'averageLifetimeValue', title: 'Avg Customer Lifetime Value (₱)', type: 'number'},
      ],
    }),

    // Marketing Metrics
    defineField({
      name: 'marketingMetrics',
      title: 'Marketing Metrics',
      type: 'object',
      fields: [
        {name: 'totalCampaigns', title: 'Total Campaigns', type: 'number'},
        {name: 'emailOpenRate', title: 'Email Open Rate (%)', type: 'number'},
        {name: 'emailClickRate', title: 'Email Click Rate (%)', type: 'number'},
        {name: 'couponUsage', title: 'Coupon Usage Count', type: 'number'},
        {name: 'promotionConversions', title: 'Promotion Conversions', type: 'number'},
      ],
    }),

    // Generated Date
    defineField({
      name: 'generatedAt',
      title: 'Generated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),

    // Notes
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 4,
    }),
  ],

  preview: {
    select: {
      reportName: 'reportName',
      reportType: 'reportType',
      dateRange: 'dateRange',
      totalRevenue: 'salesMetrics.totalRevenue',
      totalOrders: 'salesMetrics.totalOrders',
      generatedAt: 'generatedAt',
    },
    prepare({reportName, reportType, dateRange, totalRevenue, totalOrders, generatedAt}) {
      const typeEmojis: Record<string, string> = {
        'sales-overview': '📊',
        'product-performance': '📦',
        'customer-insights': '👥',
        'marketing-performance': '🎯',
        'growth-trends': '📈',
        'revenue-report': '💰',
      }
      const emoji = typeEmojis[reportType] || '📋'

      const dateStr = dateRange
        ? `${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}`
        : ''

      const metrics = totalRevenue ? `₱${totalRevenue.toLocaleString()} • ${totalOrders} orders` : ''

      return {
        title: `${emoji} ${reportName}`,
        subtitle: `${dateStr} • ${metrics}`,
      }
    },
  },

  orderings: [
    {
      title: 'Generated Date (Newest)',
      name: 'generatedDateDesc',
      by: [{field: 'generatedAt', direction: 'desc'}],
    },
    {
      title: 'Revenue (High to Low)',
      name: 'revenueDesc',
      by: [{field: 'salesMetrics.totalRevenue', direction: 'desc'}],
    },
  ],
})
