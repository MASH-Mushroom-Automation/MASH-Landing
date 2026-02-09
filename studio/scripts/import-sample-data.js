/**
 * Sanity Data Import Script
 * Imports categories, products, and reviews from JSON files
 * Run: node scripts/import-sample-data.js
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
  token: process.env.SANITY_API_WRITE_TOKEN, // You'll need to add this token
  apiVersion: '2024-11-19',
  useCdn: false,
});

// Progress tracking
let progress = {
  categoriesCreated: 0,
  productsCreated: 0,
  reviewsCreated: 0,
  errors: [],
};

/**
 * Step 1: Create Categories
 */
async function createCategories() {
  console.log('\n📂 Step 1: Creating Categories...\n');

  const categories = [
    {
      _type: 'category',
      name: 'Fresh Mushrooms',
      slug: { _type: 'slug', current: 'fresh-mushrooms' },
      description: 'Hand-picked fresh gourmet mushrooms, harvested daily from our local farms. All fresh mushrooms are grown in controlled environments using sustainable practices.',
      isActive: true,
      isFeaturedOnHomepage: true,
      sortOrder: 1,
      seoTitle: 'Fresh Gourmet Mushrooms - Locally Grown & Delivered | MASH',
      seoDescription: 'Buy fresh gourmet mushrooms online. Oyster, shiitake, enoki, and more. Harvested daily, delivered fresh.',
      seoKeywords: 'fresh mushrooms, gourmet mushrooms, local mushrooms, buy fresh mushrooms online',
    },
    {
      _type: 'category',
      name: 'Dried Mushrooms',
      slug: { _type: 'slug', current: 'dried-mushrooms' },
      description: 'Premium sun-dried mushrooms with long shelf life. Perfect for pantry stocking and authentic Asian cuisine.',
      isActive: true,
      isFeaturedOnHomepage: true,
      sortOrder: 2,
      seoTitle: 'Premium Dried Mushrooms - Long Shelf Life | MASH',
      seoDescription: 'Buy premium dried mushrooms. Sun-dried for intense flavor. Perfect for Asian cooking.',
      seoKeywords: 'dried mushrooms, sun-dried mushrooms, shiitake, asian cooking',
    },
    {
      _type: 'category',
      name: 'Growing Kits',
      slug: { _type: 'slug', current: 'growing-kits' },
      description: 'Complete mushroom growing kits for home cultivation. Perfect for beginners, families, and urban gardeners.',
      isActive: true,
      isFeaturedOnHomepage: true,
      sortOrder: 3,
      seoTitle: 'Mushroom Growing Kits - Grow at Home | MASH',
      seoDescription: 'Beginner-friendly mushroom growing kits. Harvest fresh mushrooms at home in 10-14 days.',
      seoKeywords: 'mushroom growing kit, grow mushrooms, home cultivation, urban gardening',
    },
  ];

  for (const category of categories) {
    try {
      const result = await client.create(category);
      console.log(`✅ Created category: ${category.name} (${result._id})`);
      progress.categoriesCreated++;
    } catch (error) {
      console.error(`❌ Failed to create category: ${category.name}`);
      console.error(error.message);
      progress.errors.push({ type: 'category', name: category.name, error: error.message });
    }
  }

  console.log(`\n✅ Categories created: ${progress.categoriesCreated}/3\n`);
}

/**
 * Step 2: Import Products
 */
async function importProducts() {
  console.log('\n🍄 Step 2: Importing Products...\n');

  // Load products from JSON
  const productsPath = path.join(__dirname, '../sample-data/phase-13-products.json');
  
  if (!fs.existsSync(productsPath)) {
    console.error('❌ Products JSON file not found:', productsPath);
    return;
  }

  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  const products = productsData.products;

  // Get category references
  const freshMushroomsCategory = await client.fetch(
    `*[_type == "category" && slug.current == "fresh-mushrooms"][0]._id`
  );
  const driedMushroomsCategory = await client.fetch(
    `*[_type == "category" && slug.current == "dried-mushrooms"][0]._id`
  );
  const growingKitsCategory = await client.fetch(
    `*[_type == "category" && slug.current == "growing-kits"][0]._id`
  );

  const categoryMap = {
    'Fresh Mushrooms': freshMushroomsCategory,
    'Dried Mushrooms': driedMushroomsCategory,
    'Growing Kits': growingKitsCategory,
  };

  for (const product of products) {
    try {
      // Map category string to reference
      const categoryId = categoryMap[product.category];
      
      if (!categoryId) {
        throw new Error(`Category not found: ${product.category}`);
      }

      // Prepare product document
      const productDoc = {
        ...product,
        category: {
          _type: 'reference',
          _ref: categoryId,
        },
        // Note: image field is omitted - you'll add images via Studio UI
      };

      const result = await client.create(productDoc);
      console.log(`✅ Created product: ${product.name} (${result._id})`);
      progress.productsCreated++;
    } catch (error) {
      console.error(`❌ Failed to create product: ${product.name}`);
      console.error(error.message);
      progress.errors.push({ type: 'product', name: product.name, error: error.message });
    }
  }

  console.log(`\n✅ Products created: ${progress.productsCreated}/${products.length}\n`);
}

/**
 * Step 3: Import Reviews (requires products to exist)
 */
async function importReviews() {
  console.log('\n⭐ Step 3: Importing Reviews...\n');

  // Load reviews from JSON
  const reviewsPath = path.join(__dirname, '../sample-data/phase-16-reviews.json');
  
  if (!fs.existsSync(reviewsPath)) {
    console.error('❌ Reviews JSON file not found:', reviewsPath);
    return;
  }

  const reviewsData = JSON.parse(fs.readFileSync(reviewsPath, 'utf-8'));
  const reviews = reviewsData.reviews;

  // Get product references (we'll manually assign these)
  const products = await client.fetch(`*[_type == "product"]{ _id, name }`);

  console.log('\n⚠️  Note: Reviews need to be manually linked to products in Sanity Studio');
  console.log('Available products:');
  products.forEach((p, i) => console.log(`  ${i + 1}. ${p.name} (${p._id})`));

  console.log('\n⏸️  Skipping automatic review import - please import via Studio UI');
  console.log('   Use the review templates in phase-16-reviews.json\n');
}

/**
 * Update progress tracking document
 */
async function updateProgressDocument() {
  console.log('\n📊 Updating Progress Documentation...\n');

  const guidePath = path.join(__dirname, '../../.github/CMS_DATA_POPULATION_GUIDE.md');
  let guideContent = fs.readFileSync(guidePath, 'utf-8');

  // Update overall progress
  const totalImported = progress.categoriesCreated + progress.productsCreated;
  const totalItems = 112;
  const percentage = Math.round((totalImported / totalItems) * 100);

  // Update import statistics
  guideContent = guideContent.replace(
    /Imported to Sanity:\s*\d+/,
    `Imported to Sanity: ${totalImported}`
  );

  guideContent = guideContent.replace(
    /\d+% imported/,
    `${percentage}% imported`
  );

  // Add session log
  const timestamp = new Date().toISOString().split('T')[0];
  const sessionLog = `\n## 📝 Session Log - ${timestamp}\n\n` +
    `**Time:** ${new Date().toLocaleTimeString()}\n` +
    `**Categories Created:** ${progress.categoriesCreated}/3\n` +
    `**Products Created:** ${progress.productsCreated}/5\n` +
    `**Reviews Created:** ${progress.reviewsCreated}/10\n` +
    `**Status:** ${progress.errors.length === 0 ? '✅ Success' : '⚠️ Partial Success'}\n\n`;

  // Append to daily log section
  guideContent = guideContent.replace(
    /## 📝 Daily Progress Log/,
    sessionLog + '## 📝 Daily Progress Log'
  );

  fs.writeFileSync(guidePath, guideContent);
  console.log('✅ Progress documentation updated\n');
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 MASH CMS Data Import Script\n');
  console.log('================================================\n');

  try {
    // Check if write token exists
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error('❌ ERROR: SANITY_API_WRITE_TOKEN not found in environment variables');
      console.error('\nTo fix this:');
      console.error('1. Go to https://sanity.io/manage');
      console.error('2. Select your project (2grm6gj7)');
      console.error('3. Go to API tab → Tokens');
      console.error('4. Create a new token with "Editor" permissions');
      console.error('5. Add to studio/.env.local: SANITY_API_WRITE_TOKEN=your_token_here\n');
      process.exit(1);
    }

    // Step 1: Create categories
    await createCategories();

    // Step 2: Import products
    await importProducts();

    // Step 3: Import reviews (skipped for manual linking)
    await importReviews();

    // Update documentation
    await updateProgressDocument();

    // Print summary
    console.log('\n================================================\n');
    console.log('📊 Import Summary:\n');
    console.log(`✅ Categories: ${progress.categoriesCreated}/3`);
    console.log(`✅ Products: ${progress.productsCreated}/5`);
    console.log(`⏸️  Reviews: Manual import required (0/10)`);
    
    if (progress.errors.length > 0) {
      console.log(`\n⚠️  Errors encountered: ${progress.errors.length}`);
      progress.errors.forEach(err => {
        console.log(`   - ${err.type}: ${err.name} - ${err.error}`);
      });
    }

    console.log('\n📋 Next Steps:');
    console.log('1. Open Sanity Studio: http://localhost:3333');
    console.log('2. Navigate to Products');
    console.log('3. Add images to each product');
    console.log('4. Publish all products');
    console.log('5. Import reviews manually (link to products)');
    console.log('6. Verify products display on frontend\n');

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { createCategories, importProducts, importReviews };
