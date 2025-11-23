# How to Update Your Live Site on Hostinger

This guide shows you how to update your live nexuscrux.io website whenever you make changes.

## Quick Update Process

1. **Make your changes** locally
2. **Build the new version**: `npm run build`
3. **Upload to Hostinger** via hPanel File Manager
4. **Clear cache** and test

---

## Step-by-Step Update Guide

### Step 1: Make Your Changes Locally

1. **Edit your code** in your local project
2. **Test locally**:
   ```bash
   npm run dev
   ```
3. **Verify everything works** before deploying

### Step 2: Build the Updated Version

1. **Stop the dev server** (if running) - Press `Ctrl+C`

2. **Build for production**:
   ```bash
   npm run build
   ```
   
   Or use the deployment script:
   - **Windows**: `.\deploy.ps1`
   - **Mac/Linux**: `bash deploy.sh`

3. **Verify the build**:
   - Check that `build` folder was updated
   - Check the timestamp of files to confirm they're new

### Step 3: Upload to Hostinger via hPanel

#### Option A: Replace All Files (Recommended for Most Updates)

1. **Log in to Hostinger** → **hPanel**
2. **Go to Files** → **File Manager**
3. **Navigate to your domain folder** (`public_html` or your domain's folder)
4. **Select all existing files**:
   - Click the checkbox at the top to select all
   - Or manually select: `index.html`, `assets/` folder, `.htaccess`, etc.
5. **Delete the old files**:
   - Click "Delete" button
   - Confirm deletion
   - ⚠️ **Note**: `.htaccess` will be deleted too, but we'll upload it again
6. **Upload new files**:
   - Click "Upload" button
   - Select all files from your local `build` folder:
     - `index.html`
     - `.htaccess` (⚠️ **CRITICAL** - don't forget this!)
     - `assets/` folder (entire folder)
   - Wait for upload to complete
7. **Verify upload**:
   - Check that all files are present
   - Verify `.htaccess` is there (enable "Show Hidden Files" if needed)

#### Option B: Selective Update (For Small Changes)

If you only changed specific files:

1. **In hPanel File Manager**, navigate to your domain folder
2. **Delete only the changed files**:
   - If you changed CSS/JS: Delete the old files in `assets/` folder
   - If you changed HTML: Delete `index.html`
3. **Upload the new files** from your `build` folder
4. **Note**: This method is faster but requires knowing exactly what changed

#### Option C: Upload as ZIP (Easier for Multiple Files)

1. **On your local computer**:
   - Go to your `build` folder
   - Select all files (Ctrl+A)
   - Right-click → "Send to" → "Compressed (zipped) folder"
   - Name it `update.zip`

2. **In hPanel File Manager**:
   - Delete old files (or backup first)
   - Click "Upload"
   - Upload `update.zip`
   - Right-click the ZIP → "Extract Here"
   - Delete the ZIP file after extraction

### Step 4: Clear Cache and Test

1. **Hard refresh your browser**:
   - **Windows/Linux**: `Ctrl + F5` or `Ctrl + Shift + R`
   - **Mac**: `Cmd + Shift + R`

2. **Or clear browser cache**:
   - Chrome: Settings → Privacy → Clear browsing data → Cached images and files
   - Firefox: Settings → Privacy → Clear Data → Cached Web Content
   - Edge: Settings → Privacy → Clear browsing data → Cached images and files

3. **Test your site**:
   - Visit `https://nexuscrux.io`
   - Check that changes are visible
   - Test all routes still work
   - Check browser console (F12) for errors

---

## Update Workflow Summary

```
┌─────────────────┐
│ Make Changes    │
│ Locally         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Test Locally    │
│ npm run dev     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Build           │
│ npm run build   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Upload to       │
│ Hostinger       │
│ (hPanel)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Clear Cache &   │
│ Test Live Site  │
└─────────────────┘
```

---

## Best Practices

### ✅ Do's

- **Test locally first** before deploying
- **Backup before major updates** (download current files as ZIP)
- **Update during low-traffic hours** (if possible)
- **Clear browser cache** after updates
- **Test all routes** after deployment
- **Keep `.htaccess` file** - always include it in uploads

### ❌ Don'ts

- **Don't delete `.htaccess`** - your routes will break
- **Don't skip the build step** - always run `npm run build`
- **Don't upload `node_modules`** - only upload `build` folder contents
- **Don't forget to test** - verify changes work on live site

---

## Quick Update Script

You can create a simple update checklist:

```bash
# update-checklist.txt
[ ] Made changes locally
[ ] Tested with npm run dev
[ ] Built with npm run build
[ ] Verified build folder updated
[ ] Logged into hPanel
[ ] Deleted old files
[ ] Uploaded new files (including .htaccess)
[ ] Cleared browser cache
[ ] Tested live site
[ ] Verified all routes work
```

---

## Troubleshooting Updates

### ❌ Changes Not Showing

**Problem**: Updated files but site still shows old version

**Solutions**:
1. **Clear browser cache**: Ctrl+F5 or clear cache completely
2. **Check file timestamps**: Verify new files were uploaded
3. **Check you uploaded to correct folder**: Verify domain points to uploaded folder
4. **Wait a few minutes**: Sometimes CDN/caching takes time
5. **Try incognito/private window**: Bypasses cache

### ❌ Site Broken After Update

**Problem**: Site shows errors or blank page after update

**Solutions**:
1. **Check browser console** (F12): Look for JavaScript errors
2. **Verify `.htaccess` is present**: Routes won't work without it
3. **Check `index.html` location**: Must be in root folder
4. **Verify `assets` folder**: CSS/JS files must be present
5. **Restore from backup**: If you backed up, restore old files
6. **Re-upload files**: Try uploading again

### ❌ Routes Return 404 After Update

**Problem**: Direct route access shows 404

**Solutions**:
1. **Verify `.htaccess` file**:
   - Check it exists in root folder
   - Check it has the React Router rewrite rules
   - Re-upload if missing or corrupted

2. **Check file permissions**:
   - `.htaccess` should have `644` permissions
   - Right-click → Change Permissions → Set to `644`

---

## Automated Update (Future Enhancement)

For future, you could set up automated deployment using:

- **GitHub Actions** - Auto-deploy on push
- **FTP/SFTP script** - Automated file upload
- **CI/CD Pipeline** - Full automation

But for now, the manual hPanel method is the simplest and most reliable.

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Test locally

# Build
npm run build            # Build for production
.\deploy.ps1             # Build (Windows)
bash deploy.sh           # Build (Mac/Linux)

# After building, upload build/ folder contents to Hostinger
```

---

## Update Frequency Recommendations

- **Small fixes**: Update immediately
- **New features**: Test thoroughly before deploying
- **Major updates**: Consider maintenance window
- **Content updates**: Can update anytime

---

## Need Help?

- **Hostinger Support**: https://www.hostinger.com/contact
- **See HPANEL_DEPLOYMENT.md**: For detailed upload instructions
- **Check browser console**: F12 for errors

---

## Summary

**To update your live site:**

1. ✅ Make changes locally
2. ✅ `npm run build`
3. ✅ Upload `build` folder contents to Hostinger (hPanel)
4. ✅ Clear cache (Ctrl+F5)
5. ✅ Test at https://nexuscrux.io

**That's it!** Your site is now updated. 🎉

