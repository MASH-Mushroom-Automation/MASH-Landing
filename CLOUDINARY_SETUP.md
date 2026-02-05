# Cloudinary Asset Upload Guide

This guide will help you upload your local assets to Cloudinary so they can be served from the cloud instead of GitHub.

## Prerequisites

- Cloudinary account credentials (already configured in `.env.local`)
- Local assets ready in `/public/assets/` directory

## Upload Methods

### Option 1: Using Cloudinary Web Dashboard (Recommended for first-time setup)

1. **Log in to Cloudinary**
   - Go to [https://cloudinary.com/console](https://cloudinary.com/console)
   - Log in with your credentials

2. **Upload Images**
   - Navigate to Media Library
   - Click "Upload" button
   - Create a folder structure: `mash/`
   - Upload your logo as `mash/logo` (without extension)
   - Upload your poster image as `mash/poster`

3. **Upload Videos**
   - In the same Media Library
   - Upload videos to the `mash/` folder:
     - `mash/demo` - Background video for hero section
     - `mash/overview` - System overview video
     - `mash/setup` - Installation guide video
     - `mash/mobile` - Mobile app demo video

### Option 2: Using Cloudinary CLI (For developers)

1. **Install Cloudinary CLI**
   ```bash
   npm install -g cloudinary-cli
   ```

2. **Configure CLI**
   ```bash
   cld config set cloud_name dba1qe4pw
   cld config set api_key 672925426221884
   cld config set api_secret Ht4jYstMWcxdnt98tuTvemBpHlo
   ```

3. **Upload Images**
   ```bash
   # From project root
   cld uploader upload ./public/assets/images/logo.png --public-id mash/logo --use-filename
   cld uploader upload ./public/assets/images/poster.png --public-id mash/poster --use-filename
   ```

4. **Upload Videos**
   ```bash
   cld uploader upload ./public/assets/videos/demo.mp4 --public-id mash/demo --resource-type video
   cld uploader upload ./public/assets/videos/overview.mp4 --public-id mash/overview --resource-type video
   cld uploader upload ./public/assets/videos/setup.mp4 --public-id mash/setup --resource-type video
   cld uploader upload ./public/assets/videos/mobile.mp4 --public-id mash/mobile --resource-type video
   ```

### Option 3: Using Node.js Upload Script

Create a script to upload all assets programmatically:

```javascript
// scripts/upload-to-cloudinary.js
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: 'dba1qe4pw',
  api_key: '672925426221884',
  api_secret: 'Ht4jYstMWcxdnt98tuTvemBpHlo'
});

async function uploadAssets() {
  const assetsDir = path.join(__dirname, '../public/assets');
  
  // Upload images
  const images = ['logo.png', 'poster.png'];
  for (const image of images) {
    const imagePath = path.join(assetsDir, 'images', image);
    if (fs.existsSync(imagePath)) {
      const publicId = `mash/${path.parse(image).name}`;
      console.log(`Uploading ${image} as ${publicId}...`);
      await cloudinary.uploader.upload(imagePath, {
        public_id: publicId,
        overwrite: true
      });
    }
  }

  // Upload videos
  const videos = ['demo.mp4', 'overview.mp4', 'setup.mp4', 'mobile.mp4'];
  for (const video of videos) {
    const videoPath = path.join(assetsDir, 'videos', video);
    if (fs.existsSync(videoPath)) {
      const publicId = `mash/${path.parse(video).name}`;
      console.log(`Uploading ${video} as ${publicId}...`);
      await cloudinary.uploader.upload(videoPath, {
        public_id: publicId,
        resource_type: 'video',
        overwrite: true
      });
    }
  }

  console.log('All assets uploaded successfully!');
}

uploadAssets().catch(console.error);
```

Run the script:
```bash
node scripts/upload-to-cloudinary.js
```

## Asset Naming Convention

All assets are organized under the `mash/` folder in Cloudinary:

- **Images**: `mash/logo`, `mash/poster`
- **Videos**: `mash/demo`, `mash/overview`, `mash/setup`, `mash/mobile`

## Verification

After uploading, verify your assets:

1. Check Cloudinary Media Library to ensure all files are present
2. Test URLs in browser:
   - Images: `https://res.cloudinary.com/dba1qe4pw/image/upload/mash/logo`
   - Videos: `https://res.cloudinary.com/dba1qe4pw/video/upload/mash/demo.mp4`

3. Run your Next.js development server:
   ```bash
   npm run dev
   ```

4. Visit your site and verify all images and videos load correctly

## Update Asset Paths

If you use different public IDs in Cloudinary, update them in `/lib/cloudinary.ts`:

```typescript
export const CLOUDINARY_ASSETS = {
  images: {
    logo: 'your-folder/your-logo-id',
    poster: 'your-folder/your-poster-id',
  },
  videos: {
    demo: 'your-folder/your-demo-id',
    overview: 'your-folder/your-overview-id',
    setup: 'your-folder/your-setup-id',
    mobile: 'your-folder/your-mobile-id',
  },
};
```

## Benefits

✅ **Reduced GitHub Traffic**: Assets are served from Cloudinary's CDN
✅ **Better Performance**: Global CDN with automatic optimization
✅ **Automatic Format Conversion**: Serves WebP, AVIF, etc. automatically
✅ **Image Transformations**: Resize, crop, and optimize on-the-fly
✅ **Video Optimization**: Adaptive bitrate streaming and format conversion

## Security Note

The `.env.local` file containing your API secret is already in `.gitignore` and will not be committed to GitHub. Never commit your API secret to version control!
