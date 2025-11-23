# Website Not Loading - Diagnostic Checklist

## ✅ Build Files Verified (Local)

Your local build folder has all required files:
- ✓ `.htaccess` (1.75 KB)
- ✓ `index.html` (0.96 KB)
- ✓ `favicon.svg` (1.13 KB)
- ✓ `assets/` folder (1 JS, 1 CSS)
- ✓ `logos/` folder (6 SVG files)
- ✓ `manifest.json`, `robots.txt`, `sitemap.xml`

## 🔍 Step-by-Step Diagnosis

### Step 1: Check Browser Console (CRITICAL)

1. Visit `https://nexuscrux.io`
2. Press **F12** (or Right-click → Inspect)
3. Go to **Console** tab
4. **What errors do you see?**
   - Red error messages?
   - 404 errors?
   - JavaScript errors?

**Common errors:**
- `Failed to load resource: 404` → File missing on server
- `Uncaught SyntaxError` → JavaScript error
- `CORS error` → Server configuration issue

### Step 2: Check Network Tab

1. Press **F12** → **Network** tab
2. Refresh page (F5)
3. Look for **red/failed requests**
4. **Which files return 404?**
   - `index.html`?
   - `assets/index-DM4swSO2.js`?
   - `assets/index-BX3ZLcON.css`?

### Step 3: Verify Files on Hostinger

**In hPanel File Manager:**

1. Navigate to `public_html` (or your domain folder)
2. **Enable "Show Hidden Files"** (important for .htaccess)
3. Check these files exist:

```
public_html/
├── .htaccess          ← MUST exist (enable hidden files to see)
├── index.html
├── favicon.svg
├── assets/
│   ├── index-DM4swSO2.js    ← Check exact filename
│   └── index-BX3ZLcON.css   ← Check exact filename
├── logos/
│   └── (6 SVG files)
├── manifest.json
├── robots.txt
└── sitemap.xml
```

### Step 4: Test Direct File Access

Try accessing these URLs directly:

1. **`https://nexuscrux.io/index.html`**
   - ✅ Should show: HTML content or redirect to homepage
   - ❌ 404 = File not uploaded

2. **`https://nexuscrux.io/assets/index-DM4swSO2.js`**
   - ✅ Should: Download or show JavaScript
   - ❌ 404 = Assets folder not uploaded correctly

3. **`https://nexuscrux.io/assets/index-BX3ZLcON.css`**
   - ✅ Should: Show CSS content
   - ❌ 404 = CSS file missing

4. **`https://nexuscrux.io/.htaccess`**
   - ✅ Should: Return 403 Forbidden (means file exists)
   - ❌ 404 = .htaccess not uploaded

## 🚨 Most Common Issues

### Issue 1: Missing .htaccess (90% of cases)

**Symptoms:**
- Homepage might load
- Routes like `/platform`, `/features` return 404
- Direct URL access fails

**Fix:**
1. In hPanel File Manager → Enable "Show Hidden Files"
2. Check if `.htaccess` exists in `public_html` root
3. If missing:
   - Upload `.htaccess` from local `build` folder
   - File name must be exactly `.htaccess` (with leading dot)
   - Set permissions to 644

### Issue 2: Assets Not Uploaded

**Symptoms:**
- Blank white page
- Console shows 404 for CSS/JS files
- No styling, no JavaScript

**Fix:**
1. Verify `assets/` folder exists in `public_html`
2. Check both files are inside:
   - `index-DM4swSO2.js` (or similar hash)
   - `index-BX3ZLcON.css` (or similar hash)
3. Re-upload `assets/` folder if missing

### Issue 3: Wrong File Names

**Symptoms:**
- Files exist but return 404
- Hash in filename doesn't match

**Fix:**
1. Check actual filenames in `build/assets/` folder
2. Update `index.html` if filenames changed
3. Or re-upload matching files

### Issue 4: Files in Wrong Location

**Symptoms:**
- Files exist but paths are wrong
- 404 errors for all assets

**Fix:**
1. Verify files are in `public_html` root (not subfolder)
2. Check `index.html` is in root
3. Check `assets/` folder is in root (not inside another folder)

### Issue 5: Browser Cache

**Symptoms:**
- Old version showing
- Changes not visible
- Works in incognito but not normal browser

**Fix:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear cache: Settings → Clear browsing data → Cached images
3. Try incognito/private window

## 🔧 Quick Fixes

### Fix 1: Re-upload Everything

1. **In hPanel File Manager**:
   - Go to `public_html`
   - Select all files → Delete (backup first if needed)

2. **Upload fresh files**:
   - Upload ALL contents from local `build` folder
   - Make sure to include:
     - `.htaccess` (enable hidden files to verify)
     - `index.html`
     - `assets/` folder (entire folder)
     - `logos/` folder
     - All other files

3. **Verify upload**:
   - Check all files are present
   - Verify `.htaccess` is there (enable hidden files)

### Fix 2: Check File Permissions

1. In File Manager, right-click each file → Properties
2. Set permissions:
   - Files: `644`
   - Folders: `755`
3. Especially check `.htaccess` permissions

### Fix 3: Contact Hostinger Support

If `.htaccess` is uploaded but not working:
- Ask them to enable `mod_rewrite` for Apache
- Verify Apache is the web server (not Nginx)
- Check if there are any server restrictions

## 📊 What Information to Gather

If you need help, gather:

1. **Browser Console Errors**:
   - Screenshot or copy error messages
   - Note which files return 404

2. **Network Tab**:
   - Which requests fail?
   - What status codes? (404, 500, etc.)

3. **File Verification**:
   - Which files are missing on server?
   - Are file names correct?

4. **Server Info**:
   - Is Apache or Nginx?
   - Is mod_rewrite enabled?

## 🎯 Most Likely Causes (In Order)

1. **Missing .htaccess** (most common)
2. **Assets folder not uploaded**
3. **Files in wrong location**
4. **Browser cache showing old version**
5. **File permissions incorrect**
6. **Server configuration issue**

## Next Steps

1. **Check browser console** (F12) - This will tell you exactly what's wrong
2. **Verify files on Hostinger** - Use the checklist above
3. **Test direct file access** - See which files return 404
4. **Re-upload if needed** - Fresh upload often fixes issues

---

**The build files are correct locally. The issue is likely on the server side (missing files, wrong location, or configuration).**

