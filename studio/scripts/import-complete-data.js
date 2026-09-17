/**
 * MASH CMS Complete Data Import Script
 * 
 * This script imports ALL data needed for a complete e-commerce flow:
 * - 3 Categories
 * - 15 Products (complete catalog)
 * - Product Variants (sizes for each product)
 * - Product Bundles (package deals)
 * - 45+ Customer Reviews
 * - Related Products (suggestions)
 * 
 * Run: node scripts/import-complete-data.js
 */

const fs = require('fs');
const path = require('path');
const {createClient} = require('@sanity/client');

// Load environment variables
require('dotenv').config();

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '2grm6gj7',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-11-19',
});

// Progress tracking
const progress = {
  categoriesCreated: 0,
  productsCreated: 0,
  variantsCreated: 0,
  bundlesCreated: 0,
  reviewsCreated: 0,
  errors: [],
};

// Store created document IDs for references
const documentIds = {
  categories: {},
  products: {},
};

console.log('🚀 MASH CMS Complete Data Import Script\n');
console.log('================================================\n');

/**
 * Step 1: Create Categories
 */
async function createCategories() {
  console.log('📂 Step 1: Creating Categories...');

  const categories = [
    {
      _type: 'category',
      name: 'Fresh Mushrooms',
      slug: {_type: 'slug', current: 'fresh-mushrooms'},
      description: 'Hand-picked fresh gourmet mushrooms, harvested daily from our local farms. Premium quality, organic certified, and delivered within 24 hours of harvest.',
      isActive: true,
      featured: true,
      sortOrder: 1,
      seoTitle: 'Fresh Mushrooms - Organic Local Grown | MASH',
      seoDescription: 'Premium fresh mushrooms grown locally in the Philippines. Organic certified, harvested daily. Shop oyster, shiitake, enoki and more.',
      seoKeywords: 'fresh mushrooms, organic mushrooms, local mushrooms, Philippines',
    },
    {
      _type: 'category',
      name: 'Dried Mushrooms',
      slug: {_type: 'slug', current: 'dried-mushrooms'},
      description: 'Premium sun-dried mushrooms with concentrated flavors and long shelf life. Perfect for soups, broths, and Asian cuisine. Rehydrates beautifully.',
      isActive: true,
      featured: true,
      sortOrder: 2,
      seoTitle: 'Dried Mushrooms - Long Shelf Life & Rich Flavor | MASH',
      seoDescription: 'Premium dried mushrooms with intense umami flavor. Perfect for pantry staples. Shiitake, wood ear, porcini and more.',
      seoKeywords: 'dried mushrooms, dried shiitake, pantry staples, asian cooking',
    },
    {
      _type: 'category',
      name: 'Growing Kits',
      slug: {_type: 'slug', current: 'growing-kits'},
      description: 'Complete mushroom growing kits for home cultivation. Beginner-friendly to advanced options. Grow fresh mushrooms at home with minimal effort.',
      isActive: true,
      featured: true,
      sortOrder: 3,
      seoTitle: 'Mushroom Growing Kits - Grow Fresh at Home | MASH',
      seoDescription: 'Complete mushroom growing kits for home use. Easy to grow, educational, and fun. Oyster, shiitake, lions mane kits available.',
      seoKeywords: 'mushroom growing kit, grow mushrooms, home cultivation, urban farming',
    },
  ];

  for (const category of categories) {
    try {
      const result = await client.create(category);
      console.log(`✅ Created category: ${category.name} (${result._id})`);
      documentIds.categories[category.slug.current] = result._id;
      progress.categoriesCreated++;
    } catch (error) {
      console.error(`❌ Failed to create category: ${category.name}`);
      console.error(error.message);
      progress.errors.push({type: 'category', name: category.name, error: error.message});
    }
  }

  console.log(`\n✅ Categories created: ${progress.categoriesCreated}/3\n`);
}

/**
 * Step 2: Import Products from JSON
 */
async function importProducts() {
  console.log('🍄 Step 2: Importing Products...\n');

  const productsPath = path.join(__dirname, '../sample-data/complete-products.json');

  if (!fs.existsSync(productsPath)) {
    console.error('❌ Products JSON file not found:', productsPath);
    return;
  }

  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  const products = productsData.products;

  for (const product of products) {
    try {
      // Get category reference using categorySlug
      const categoryId = documentIds.categories[product.categorySlug];

      if (!categoryId) {
        throw new Error(`Category not found for slug: ${product.categorySlug}`);
      }

      // Prepare product document with category reference
      const {categorySlug, ...productData} = product; // Remove categorySlug
      const productDoc = {
        ...productData,
        category: {
          _type: 'reference',
          _ref: categoryId,
        },
      };

      const result = await client.create(productDoc);
      console.log(`✅ Created product: ${product.name} (${result._id})`);

      // Store product ID for later reference (for reviews, variants)
      documentIds.products[product.slug.current] = result._id;
      progress.productsCreated++;
    } catch (error) {
      console.error(`❌ Failed to create product: ${product.name}`);
      console.error(error.message);
      progress.errors.push({type: 'product', name: product.name, error: error.message});
    }
  }

  console.log(`\n✅ Products created: ${progress.productsCreated}/${products.length}\n`);
}

/**
 * Step 3: Create Product Variants
 */
async function createProductVariants() {
  console.log('📦 Step 3: Creating Product Variants...\n');

  const variantsPath = path.join(__dirname, '../sample-data/product-variants.json');

  if (!fs.existsSync(variantsPath)) {
    console.log('⚠️  Variants file not found, skipping...\n');
    return;
  }

  const variantsData = JSON.parse(fs.readFileSync(variantsPath, 'utf-8'));
  const variants = variantsData.variants;

  for (const variant of variants) {
    try {
      // Get product reference
      const productId = documentIds.products[variant.productSlug];

      if (!productId) {
        throw new Error(`Product not found for slug: ${variant.productSlug}`);
      }

      const {productSlug, ...variantData} = variant;
      const variantDoc = {
        ...variantData,
        product: {
          _type: 'reference',
          _ref: productId,
        },
      };

      const result = await client.create(variantDoc);
      console.log(`✅ Created variant: ${variant.name} (${result._id})`);
      progress.variantsCreated++;
    } catch (error) {
      console.error(`❌ Failed to create variant: ${variant.name}`);
      console.error(error.message);
      progress.errors.push({type: 'variant', name: variant.name, error: error.message});
    }
  }

  console.log(`\n✅ Variants created: ${progress.variantsCreated}/${variants.length}\n`);
}

/**
 * Step 4: Create Product Bundles
 */
async function createProductBundles() {
  console.log('🎁 Step 4: Creating Product Bundles...\n');

  const bundlesPath = path.join(__dirname, '../sample-data/product-bundles.json');

  if (!fs.existsSync(bundlesPath)) {
    console.log('⚠️  Bundles file not found, skipping...\n');
    return;
  }

  const bundlesData = JSON.parse(fs.readFileSync(bundlesPath, 'utf-8'));
  const bundles = bundlesData.bundles;

  for (const bundle of bundles) {
    try {
      // Convert product slugs to references
      const products = bundle.products.map((item) => {
        const productId = documentIds.products[item.productSlug];
        if (!productId) {
          throw new Error(`Product not found for slug: ${item.productSlug}`);
        }
        return {
          _type: 'bundleItem',
          _key: Math.random().toString(36).substr(2, 9),
          product: {
            _type: 'reference',
            _ref: productId,
          },
          quantity: item.quantity,
        };
      });

      const bundleDoc = {
        _type: bundle._type,
        name: bundle.name,
        slug: bundle.slug,
        description: bundle.description,
        shortDescription: bundle.shortDescription,
        products: products,
        regularPrice: bundle.regularPrice,
        bundlePrice: bundle.bundlePrice,
        savings: bundle.savings,
        savingsPercentage: bundle.savingsPercentage,
        sku: bundle.sku,
        stockQuantity: bundle.stockQuantity,
        lowStockThreshold: bundle.lowStockThreshold,
        trackInventory: bundle.trackInventory,
        stockStatus: bundle.stockStatus,
        isFeatured: bundle.isFeatured,
        tags: bundle.tags,
        seoTitle: bundle.seoTitle,
        seoDescription: bundle.seoDescription,
        seoKeywords: bundle.seoKeywords,
      };

      const result = await client.create(bundleDoc);
      console.log(`✅ Created bundle: ${bundle.name} (${result._id})`);
      progress.bundlesCreated++;
    } catch (error) {
      console.error(`❌ Failed to create bundle: ${bundle.name}`);
      console.error(error.message);
      progress.errors.push({type: 'bundle', name: bundle.name, error: error.message});
    }
  }

  console.log(`\n✅ Bundles created: ${progress.bundlesCreated}/${bundles.length}\n`);
}

/**
 * Step 5: Import Customer Reviews
 */
async function importReviews() {
  console.log('⭐ Step 5: Importing Customer Reviews...\n');

  const reviewsPath = path.join(__dirname, '../sample-data/complete-reviews.json');

  if (!fs.existsSync(reviewsPath)) {
    console.log('⚠️  Reviews file not found, skipping...\n');
    return;
  }

  const reviewsData = JSON.parse(fs.readFileSync(reviewsPath, 'utf-8'));
  const reviews = reviewsData.reviews;

  for (const review of reviews) {
    try {
      // Get product reference
      const productId = documentIds.products[review.productSlug];

      if (!productId) {
        throw new Error(`Product not found for slug: ${review.productSlug}`);
      }

      const {productSlug, ...reviewData} = review;
      const reviewDoc = {
        ...reviewData,
        product: {
          _type: 'reference',
          _ref: productId,
        },
      };

      const result = await client.create(reviewDoc);
      console.log(`✅ Created review: ${review.reviewerName} for ${review.productSlug}`);
      progress.reviewsCreated++;
    } catch (error) {
      console.error(`❌ Failed to create review from: ${review.reviewerName}`);
      console.error(error.message);
      progress.errors.push({type: 'review', name: review.reviewerName, error: error.message});
    }
  }

  console.log(`\n✅ Reviews created: ${progress.reviewsCreated}/${reviews.length}\n`);
}

/**
 * Step 6: Update Progress Documentation
 */
async function updateProgressDocument() {
  console.log('📊 Updating Progress Documentation...\n');

  const guidePath = path.join(__dirname, '../../.github/CMS_DATA_POPULATION_GUIDE.md');

  try {
    let content = fs.readFileSync(guidePath, 'utf-8');

    // Update statistics
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    // Add session log
    const sessionLog = `\n### Import Session - ${timestamp}\n\n` +
      `**Script:** Complete Data Import\n\n` +
      `**Results:**\n` +
      `- ✅ Categories: ${progress.categoriesCreated}/3\n` +
      `- ✅ Products: ${progress.productsCreated}/15\n` +
      `- ✅ Variants: ${progress.variantsCreated}\n` +
      `- ✅ Bundles: ${progress.bundlesCreated}\n` +
      `- ✅ Reviews: ${progress.reviewsCreated}\n\n` +
      `**Errors:** ${progress.errors.length}\n\n`;

    // Find insertion point (after "## 📝 Session Logs" or create it)
    if (content.includes('## 📝 Session Logs')) {
      content = content.replace('## 📝 Session Logs', '## 📝 Session Logs' + sessionLog);
    } else {
      content += '\n\n## 📝 Session Logs\n' + sessionLog;
    }

    fs.writeFileSync(guidePath, content, 'utf-8');
    console.log('✅ Progress documentation updated\n');
  } catch (error) {
    console.error('⚠️  Could not update progress document:', error.message);
  }
}

/**
 * Main execution function
 */
async function main() {
  // Validate environment
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_API_WRITE_TOKEN not found in environment variables');
    console.error('Please add your API token to studio/.env.local');
    console.error('See studio/scripts/README.md for instructions\n');
    process.exit(1);
  }

  try {
    await createCategories();
    await importProducts();
    await createProductVariants();
    await createProductBundles();
    await importReviews();
    await updateProgressDocument();

    console.log('================================================\n');
    console.log('📊 Import Summary:\n');
    console.log(`✅ Categories: ${progress.categoriesCreated}/3`);
    console.log(`✅ Products: ${progress.productsCreated}/15`);
    console.log(`✅ Variants: ${progress.variantsCreated}`);
    console.log(`✅ Bundles: ${progress.bundlesCreated}`);
    console.log(`✅ Reviews: ${progress.reviewsCreated}`);
    console.log(`\n${ progress.errors.length > 0 ? '⚠️' : '✅'} Errors encountered: ${progress.errors.length}`);

    if (progress.errors.length > 0) {
      console.log('\n❌ Error Details:');
      progress.errors.forEach((err) => {
        console.log(`   - ${err.type}: ${err.name} - ${err.error}`);
      });
    }

    console.log('\n📋 Next Steps:');
    console.log('1. Open Sanity Studio: http://localhost:3333');
    console.log('2. Navigate to Products');
    console.log('3. Add images to each product');
    console.log('4. Publish all products');
    console.log('5. Verify products display on frontend');
    console.log('6. Check reviews are linked correctly\n');
  } catch (error) {
    console.error('\n❌ Fatal error during import:');
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main();
