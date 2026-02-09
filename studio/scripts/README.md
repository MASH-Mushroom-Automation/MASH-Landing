# 🔧 Sanity CMS Import Scripts

This folder contains automation scripts for importing sample data into your Sanity CMS.

## 📁 Available Scripts

### `import-sample-data.js` - Main Import Script

Automatically imports categories, products, and prepares reviews from JSON templates.

**What it does:**
- ✅ Creates 3 categories (Fresh Mushrooms, Dried Mushrooms, Growing Kits)
- ✅ Imports 5 products from `../sample-data/phase-13-products.json`
- ✅ Links products to correct categories
- ⏸️ Prepares review data (manual linking required)
- 📊 Updates progress documentation

**Requirements:**
- Sanity API write token (Editor permissions)
- Node.js installed
- `@sanity/client` package (already in package.json)

## 🚀 How to Use

### Step 1: Get API Token

1. Go to https://sanity.io/manage
2. Select your project: **mash-ecommerce (2grm6gj7)**
3. Click **"API"** tab → **"Tokens"**
4. Click **"Add API token"**
5. Settings:
   - **Name:** "Data Import Script"
   - **Permissions:** "Editor"
6. Copy the generated token

### Step 2: Add Token to Environment

Open `studio/.env.local` and add:

```env
SANITY_API_WRITE_TOKEN=your_token_here
```

Save the file.

### Step 3: Run the Script

```cmd
cd studio
node scripts/import-sample-data.js
```

### Step 4: Expected Output

```
🚀 MASH CMS Data Import Script

================================================

📂 Step 1: Creating Categories...

✅ Created category: Fresh Mushrooms (category-001)
✅ Created category: Dried Mushrooms (category-002)
✅ Created category: Growing Kits (category-003)

✅ Categories created: 3/3

🍄 Step 2: Importing Products...

✅ Created product: Fresh Oyster Mushrooms (product-001)
✅ Created product: Fresh Shiitake Mushrooms (product-002)
✅ Created product: Fresh Enoki Mushrooms (product-003)
✅ Created product: Premium Dried Shiitake Mushrooms (product-004)
✅ Created product: Oyster Mushroom Growing Kit (product-005)

✅ Products created: 5/5

⭐ Step 3: Importing Reviews...

⚠️  Note: Reviews need to be manually linked to products in Sanity Studio
Available products:
  1. Fresh Oyster Mushrooms (product-001)
  2. Fresh Shiitake Mushrooms (product-002)
  ...

📊 Updating Progress Documentation...

✅ Progress documentation updated

================================================

📊 Import Summary:

✅ Categories: 3/3
✅ Products: 5/5
⏸️  Reviews: Manual import required (0/10)

📋 Next Steps:
1. Open Sanity Studio: http://localhost:3333
2. Navigate to Products
3. Add images to each product
4. Publish all products
5. Import reviews manually (link to products)
6. Verify products display on frontend
```

## 🆘 Troubleshooting

### "SANITY_API_WRITE_TOKEN not found"

**Problem:** Environment variable not set

**Solution:**
1. Make sure you added the token to `studio/.env.local`
2. Restart any running processes
3. Check token has "Editor" permissions

### "Port 3333 is already in use"

**Problem:** Sanity Studio is already running

**Solution:**
- This is fine! The Studio should be running
- The import script doesn't need to start the Studio

### "Category not found"

**Problem:** Products can't find category references

**Solution:**
1. Make sure categories are created first
2. Check category slugs match: `fresh-mushrooms`, `dried-mushrooms`, `growing-kits`
3. Re-run the script

### "Failed to create product"

**Problem:** Product data doesn't match schema

**Solution:**
1. Check product schema in `src/schemaTypes/documents/product.ts`
2. Verify all required fields are in JSON
3. Check for typos in field names

## 📊 Progress Tracking

The script automatically updates:
- `.github/CMS_DATA_POPULATION_GUIDE.md` - Overall progress
- Adds session logs with timestamps
- Updates import statistics

## 🔄 Re-running the Script

**Warning:** Running the script multiple times will create duplicate documents.

To avoid duplicates:
1. Delete test data in Sanity Studio first
2. Or modify script to check for existing documents
3. Or use different names/slugs for test imports

## 📝 Manual Review Import

Reviews require product references, so import them manually:

1. Open Sanity Studio: http://localhost:3333
2. Click "Reviews" → "Create New Review"
3. Copy review data from `sample-data/phase-16-reviews.json`
4. Select the product this review is for
5. Fill in review fields
6. Click "Publish"

Repeat for all 10 reviews.

## 🎯 Next Steps After Import

1. **Add Images:**
   - Open each product in Studio
   - Upload product image
   - Adjust crop/hotspot
   - Click "Publish"

2. **Verify Frontend:**
   - Go to http://localhost:3000/shop
   - Check all 5 products appear
   - Click each product to test detail page

3. **Import Reviews:**
   - Follow manual review import steps above

4. **Create More Products:**
   - Create 10 more products (manual or JSON)
   - Reach 100% Phase 13 completion

5. **Move to Phase 14:**
   - Create product variants
   - Import bundles
   - Continue with guide

## 📚 Related Files

- **Sample Data:** `../sample-data/phase-13-products.json`
- **Progress Guide:** `../../.github/CMS_DATA_POPULATION_GUIDE.md`
- **Quick Reference:** `../../.github/QUICK_REFERENCE_CMS.md`
- **Import Checklist:** `../../.github/CMS_IMPORT_CHECKLIST.md`

## ⚙️ Script Configuration

Edit `import-sample-data.js` to customize:
- Category names and descriptions
- Which products to import
- Progress tracking format
- Error handling behavior

---

**Created:** November 20, 2025  
**Last Updated:** November 20, 2025  
**Status:** Ready to use ✅
