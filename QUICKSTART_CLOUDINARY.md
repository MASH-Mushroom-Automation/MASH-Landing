# 🚀 Cloudinary Quick Start

## Upload Your Assets

Run this command to upload all assets from `/public/assets/` to Cloudinary:

```bash
npm run upload:cloudinary
```

## What Gets Uploaded

### Images (to `mash/` folder)
- ✅ logo.png → `mash/logo`
- ✅ poster.png/jpg → `mash/poster`

### Videos (to `mash/` folder)
- ✅ demo.mp4 → `mash/demo`
- ✅ overview.mp4 → `mash/overview`
- ✅ setup.mp4 → `mash/setup`
- ✅ mobile.mp4 → `mash/mobile`

## Test Your Site

```bash
npm run dev
```

Visit http://localhost:3000 and check:
- ✅ Logo in navigation
- ✅ Logo in footer
- ✅ Hero background video
- ✅ Demo section videos

## Verify in Cloudinary

1. Log in: https://cloudinary.com/console
2. Go to Media Library
3. Check `mash/` folder for all assets

## Your Cloudinary Info

- **Cloud Name**: `dba1qe4pw`
- **Dashboard**: https://cloudinary.com/console

## Need Help?

- Full setup guide: `CLOUDINARY_SETUP.md`
- Integration details: `CLOUDINARY_INTEGRATION.md`
- Updated README: `README.md`

## Files Changed

✅ Components updated:
- [Navigation.tsx](components/Navigation.tsx) - Logo
- [Footer.tsx](components/Footer.tsx) - Logo
- [HeroSection.tsx](components/HeroSection.tsx) - Background video
- [DemoSection.tsx](components/DemoSection.tsx) - Demo videos

✅ New utilities:
- [lib/cloudinary.ts](lib/cloudinary.ts) - Helper functions

✅ Configuration:
- `.env.local` - Cloudinary credentials (secure, not in git)

## Benefits

🚀 **Performance**: Global CDN with edge caching
📦 **Bandwidth**: Reduced GitHub traffic
🎨 **Optimization**: Automatic format conversion
🔧 **Flexibility**: Easy image/video transformations
