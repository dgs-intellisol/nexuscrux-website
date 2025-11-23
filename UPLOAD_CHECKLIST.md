# Complete Upload Checklist for nexuscrux.io

## ⚠️ CRITICAL: All Files Must Be Uploaded

The 404 errors indicate files are missing on the server. Follow this checklist to ensure everything is uploaded.

## 📁 Required Files and Folders

### 1. Root Files (in `public_html` root)

Upload these files directly to `public_html`:

- [ ] `.htaccess` ⚠️ **CRITICAL** - Enable "Show Hidden Files" to see it
- [ ] `index.html`
- [ ] `favicon.svg`
- [ ] `manifest.json`
- [ ] `robots.txt`
- [ ] `sitemap.xml`

### 2. Assets Folder ⚠️ **CRITICAL**

**Path**: `public_html/assets/`

**Contents** (from `build/assets/`):
- [ ] `index-BX3ZLcON.css` (or similar hash name)
- [ ] `index-DM4swSO2.js` (or similar hash name)

**How to Upload**:
1. In File Manager, go to `public_html`
2. Create folder named `assets` (if it doesn't exist)
3. Upload BOTH files into `assets` folder
4. Verify both files are inside `assets/` folder

**Verify**: 
- `https://nexuscrux.io/assets/index-BX3ZLcON.css` should show CSS
- `https://nexuscrux.io/assets/index-DM4swSO2.js` should download JS

### 3. Logos Folder

**Path**: `public_html/logos/`

**Contents** (from `build/logos/`):
- [ ] `nexus-crux-compact.svg`
- [ ] `nexus-crux-horizontal.svg`
- [ ] `nexus-crux-icon-only.svg`
- [ ] `nexus-crux-inverse.svg`
- [ ] `nexus-crux-monochrome.svg`
- [ ] `nexus-crux-primary.svg`

**How to Upload**:
1. In File Manager, go to `public_html`
2. Create folder named `logos` (if it doesn't exist)
3. Upload all 6 SVG files into `logos` folder

**Verify**:
- `https://nexuscrux.io/logos/nexus-crux-icon-only.svg` should show SVG

## 📤 Step-by-Step Upload Instructions

### Method 1: Using hPanel File Manager

1. **Log into Hostinger hPanel**
2. **Go to Files → File Manager**
3. **Navigate to `public_html`** (or your domain folder)
4. **Enable "Show Hidden Files"** (important for .htaccess)

5. **Upload Root Files**:
   - Select all files from `build/` folder EXCEPT folders
   - Upload: `.htaccess`, `index.html`, `favicon.svg`, `manifest.json`, `robots.txt`, `sitemap.xml`
   - Make sure `.htaccess` is included!

6. **Create and Upload Assets Folder**:
   - In File Manager, click "New Folder" → Name it `assets`
   - Open `assets` folder
   - Upload both files from `build/assets/`:
     - `index-BX3ZLcON.css`
     - `index-DM4swSO2.js`

7. **Create and Upload Logos Folder**:
   - In File Manager, click "New Folder" → Name it `logos`
   - Open `logos` folder
   - Upload all 6 SVG files from `build/logos/`

### Method 2: Using FTP Client

1. **Connect via FTP** to your Hostinger server
2. **Navigate to `public_html`**
3. **Upload files maintaining structure**:
   ```
   public_html/
   ├── .htaccess
   ├── index.html
   ├── favicon.svg
   ├── manifest.json
   ├── robots.txt
   ├── sitemap.xml
   ├── assets/
   │   ├── index-BX3ZLcON.css
   │   └── index-DM4swSO2.js
   └── logos/
       ├── nexus-crux-compact.svg
       ├── nexus-crux-horizontal.svg
       ├── nexus-crux-icon-only.svg
       ├── nexus-crux-inverse.svg
       ├── nexus-crux-monochrome.svg
       └── nexus-crux-primary.svg
   ```

## ✅ Verification Steps

After uploading, test these URLs:

### 1. Test Root Files
- `https://nexuscrux.io/index.html` → Should show page
- `https://nexuscrux.io/.htaccess` → Should return 403 (not 404)

### 2. Test Assets (CRITICAL)
- `https://nexuscrux.io/assets/index-BX3ZLcON.css` → Should show CSS content
- `https://nexuscrux.io/assets/index-DM4swSO2.js` → Should download JS file

**If these return 404, the assets folder wasn't uploaded correctly!**

### 3. Test Logos
- `https://nexuscrux.io/logos/nexus-crux-icon-only.svg` → Should show SVG

### 4. Test Site
- `https://nexuscrux.io` → Should load with styling and JavaScript working

## 🚨 Common Mistakes

### Mistake 1: Assets Folder Not Created
**Symptom**: 404 for CSS/JS files

**Fix**: 
- Create `assets` folder in `public_html`
- Upload files INTO the folder (not next to it)

### Mistake 2: Files in Wrong Location
**Symptom**: 404 errors

**Fix**:
- Ensure files are in `public_html` root (not subfolder)
- Ensure `assets/` is in root (not `public_html/build/assets/`)

### Mistake 3: Missing .htaccess
**Symptom**: Routes don't work

**Fix**:
- Enable "Show Hidden Files" in File Manager
- Upload `.htaccess` to `public_html` root

### Mistake 4: Wrong File Names
**Symptom**: Files exist but 404

**Fix**:
- Check actual filenames in `build/assets/` folder
- Filenames have hashes that change with each build
- Upload files with exact names from current build

## 📋 Quick Upload Checklist

Before uploading, verify locally:
- [ ] `build/assets/` folder has 2 files (CSS + JS)
- [ ] `build/logos/` folder has 6 SVG files
- [ ] `build/.htaccess` exists
- [ ] `build/index.html` exists

After uploading, verify on server:
- [ ] `public_html/assets/` folder exists with 2 files
- [ ] `public_html/logos/` folder exists with 6 SVG files
- [ ] `public_html/.htaccess` exists (enable hidden files)
- [ ] All root files are in `public_html` (not subfolder)

## 🎯 Current Missing Files

Based on your errors, these files are missing on the server:

1. **`/assets/index-BX3ZLcON.css`** - CSS file
2. **`/assets/index-DM4swSO2.js`** - JavaScript file
3. **`/logos/nexus-crux-icon-only.svg`** - Logo file
4. **`/logos/nexus-crux-compact.svg`** - Logo file
5. **`/favicon.ico`** - Optional (favicon.svg should work)
6. **`/favicon-32x32.png`** - Optional
7. **`/favicon-16x16.png`** - Optional

**Priority**: Upload `assets/` folder first (CSS and JS are critical for the site to work)

## Next Steps

1. **Upload `assets/` folder** with both CSS and JS files
2. **Upload `logos/` folder** with all SVG files
3. **Test the URLs** above to verify files are accessible
4. **Clear browser cache** and test the site

