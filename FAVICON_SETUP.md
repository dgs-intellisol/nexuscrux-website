# Favicon Setup Guide

## Current Setup

Your website is configured to use the Nexus Crux icon-only logo as the favicon. The build scripts will automatically handle favicon files if you add them.

## Favicon Files Location

Favicon files should be placed in the `public` folder (which will be copied to the build root):

```
public/
├── favicon.ico          (optional - fallback for older browsers)
├── favicon.svg          (optional - modern SVG favicon)
├── favicon-16x16.png    (optional - 16x16 PNG)
├── favicon-32x32.png    (optional - 32x32 PNG)
├── apple-touch-icon.png (optional - 180x180 for iOS)
├── icon-192.png         (for PWA manifest)
└── icon-512.png         (for PWA manifest)
```

## Current Configuration

The `index.html` is configured to use:
- **Primary favicon**: `/logos/nexus-crux-icon-only.svg` (your existing logo)
- **Fallback**: `/favicon.ico` (if you create one)
- **Apple Touch Icon**: `/apple-touch-icon.png` (if you create one)
- **PWA Icons**: `/icon-192.png` and `/icon-512.png` (referenced in manifest.json)

## Adding Favicon Files

### Option 1: Use Existing Logo (Current Setup)

Your site currently uses the existing `nexus-crux-icon-only.svg` as the favicon. This works automatically.

### Option 2: Create Custom Favicon Files

1. **Create favicon files** using an online tool:
   - https://realfavicongenerator.net/
   - https://favicon.io/
   - Upload your logo and generate all sizes

2. **Place files in `public` folder**:
   ```bash
   public/
   ├── favicon.ico
   ├── favicon.svg
   ├── favicon-16x16.png
   ├── favicon-32x32.png
   ├── apple-touch-icon.png
   ├── icon-192.png
   └── icon-512.png
   ```

3. **Build and deploy**:
   ```bash
   npm run build
   # Files will be automatically copied to build folder
   ```

### Option 3: Generate from Logo SVG

You can convert your existing `nexus-crux-icon-only.svg` to various formats:

1. **Use online converter**: https://cloudconvert.com/svg-to-ico
2. **Or use ImageMagick** (if installed):
   ```bash
   # Convert SVG to ICO
   magick convert src/public/logos/nexus-crux-icon-only.svg -resize 32x32 public/favicon.ico
   
   # Convert to PNG sizes
   magick convert src/public/logos/nexus-crux-icon-only.svg -resize 16x16 public/favicon-16x16.png
   magick convert src/public/logos/nexus-crux-icon-only.svg -resize 32x32 public/favicon-32x32.png
   magick convert src/public/logos/nexus-crux-icon-only.svg -resize 180x180 public/apple-touch-icon.png
   magick convert src/public/logos/nexus-crux-icon-only.svg -resize 192x192 public/icon-192.png
   magick convert src/public/logos/nexus-crux-icon-only.svg -resize 512x512 public/icon-512.png
   ```

## Build Script Support

The build scripts (`deploy.ps1` and `deploy.sh`) automatically:
- ✅ Copy `.htaccess` to build folder
- ✅ Copy any favicon files from `public/` to `build/`
- ✅ Vite automatically copies `src/public/` contents to build root

## Testing Favicon

1. **Build your site**: `npm run build`
2. **Check build folder**: Verify favicon files are present
3. **Test locally**: Open `build/index.html` in browser
4. **Check browser tab**: Favicon should appear in the tab
5. **Deploy**: Upload to Hostinger as usual

## Favicon Best Practices

- **SVG favicon** (favicon.svg) - Best quality, scalable
- **ICO file** (favicon.ico) - Fallback for older browsers
- **PNG files** - For specific sizes (16x16, 32x32)
- **Apple Touch Icon** - 180x180 for iOS home screen
- **PWA Icons** - 192x192 and 512x512 for manifest

## Current Status

✅ **Favicon is configured** in `index.html`
✅ **Build scripts support favicon** files
✅ **Using existing logo** as primary favicon
⚠️ **Optional**: Add specific favicon files for better browser support

## Quick Check

After building, verify favicon files in `build/` folder:
```bash
ls build/ | grep -E "(favicon|icon|apple)"
```

If you see the files, they'll be included when you upload to Hostinger!

