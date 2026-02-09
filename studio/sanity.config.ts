/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'

// Environment variables for project configuration
// ✅ MASH CMS Project (Growth Trial, 10M API calls/month)
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'gerattrr'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'post':
      return slug ? `/blog/${slug}` : '/blog'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'product':
      return slug ? `/product/${slug}` : '/shop'
    case 'category':
      return slug ? `/shop?category=${slug}` : '/shop'
    case 'heroCarousel':
      return '/'
    case 'siteSettings':
      return '/'
    case 'featuredProducts':
      return '/'
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'MASH E-Commerce CMS',

  projectId,
  dataset,

  // Deployment configuration - will be set during first deploy
  // Run: npx sanity deploy

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "heroCarousel" || _type == "siteSettings" || _type == "featuredProducts"`,
          },
          {
            route: '/shop',
            filter: `_type == "product" || _type == "category"`,
          },
          {
            route: '/product/:slug',
            filter: `_type == "product" && slug.current == $slug`,
          },
          {
            route: '/blog',
            filter: `_type == "post"`,
          },
          {
            route: '/blog/:slug',
            filter: `_type == "post" && slug.current == $slug`,
          },
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/posts/:slug',
            filter: `_type == "post" && slug.current == $slug || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: resolveHref('post', doc?.slug)!,
                },
                {
                  title: 'Blog',
                  href: '/blog',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          // Product locations
          product: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled Product',
                  href: resolveHref('product', doc?.slug)!,
                },
                {
                  title: 'Shop',
                  href: '/shop',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          // Hero Carousel location
          heroCarousel: defineLocations({
            locations: [homeLocation],
            message: 'This document controls the homepage hero section',
            tone: 'positive',
          }),
          // Featured Products location
          featuredProducts: defineLocations({
            locations: [homeLocation],
            message: 'This document controls featured products on the homepage',
            tone: 'positive',
          }),
          // Category locations
          category: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Category',
                  href: `/shop?category=${doc?.slug}`,
                },
                {
                  title: 'Shop',
                  href: '/shop',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },
})
