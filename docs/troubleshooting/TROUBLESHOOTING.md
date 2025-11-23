# Website Not Loading - Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Blank Page / Site Not Loading

#### Check 1: Browser Console Errors
1. **Open browser console**: Press `F12` → Go to "Console" tab
2. **Look for errors**:
   - Red error messages
   - Failed network requests (404, 500, etc.)
   - JavaScript errors

#### Check 2: Missing .htaccess File
**Symptom**: Routes work but direct URLs return 404

**Solution**:
1. Verify `.htaccess` is in `public_html` root on Hostinger
2. Check file name is exactly `.htaccess` (with leading dot)
3. Enable "Show Hidden Files" in hPanel File Manager
4. Verify file permissions (should be 644)

#### Check 3: Assets Not Loading
**Symptom**: Blank page, console shows 404 for CSS/JS files

**Solution**:
1. Check `assets/` folder was uploaded completely
2. Verify file paths in `index.html` match actual files:
   - Should be: `/assets/index-[hash].js`
   - Should be: `/assets/index-[hash].css`
3. Check browser Network tab (F12) to see which files fail

#### Check 4: Wrong Base Path
**Symptom**: Assets load from wrong location

**Solution**:
- If site is in subdirectory, update `vite.config.ts`:
  ```typescript
  build: {
    base: '/your-subdirectory/',
    outDir: 'build',
  }
  ```

#### Check 5: JavaScript Errors
**Symptom**: Console shows JavaScript errors

**Common causes**:
- Missing dependencies
- Browser compatibility issues
- Build errors

**Solution**:
1. Check browser console for specific error
2. Verify all dependencies are installed: `npm install`
3. Rebuild: `npm run build`

### Issue 2: 404 Errors on Routes

**Symptom**: Homepage works but `/platform`, `/features` return 404

**Solution**:
1. **Verify .htaccess is uploaded**:
   - Must be in root of `public_html`
   - File name must be exactly `.htaccess`
   - Enable "Show Hidden Files" in File Manager

2. **Check .htaccess content**:
   - Should have React Router rewrite rules
   - Verify Apache mod_rewrite is enabled (contact Hostinger support)

3. **Test .htaccess**:
   - Try accessing: `https://nexuscrux.io/.htaccess`
   - Should return 403 Forbidden (not 404)
   - If 404, file wasn't uploaded correctly

### Issue 3: Assets Return 404

**Symptom**: CSS/JS files not loading (404 errors)

**Solution**:
1. **Verify assets folder structure**:
   ```
   public_html/
   ├── assets/
   │   ├── index-[hash].js
   │   └── index-[hash].css
   ```

2. **Check file paths in index.html**:
   - Open `build/index.html`
   - Verify paths start with `/assets/` (absolute paths)
   - Should NOT be relative paths like `./assets/`

3. **Verify files uploaded**:
   - Check `assets/` folder exists in hPanel
   - Verify both CSS and JS files are present
   - Check file sizes match build output

### Issue 4: CORS or MIME Type Errors

**Symptom**: Console shows CORS errors or MIME type warnings

**Solution**:
1. **Check .htaccess MIME types**:
   - Ensure JavaScript files have correct MIME type
   - Add to .htaccess if needed:
     ```apache
     AddType application/javascript .js
     AddType text/css .css
     ```

2. **Check server configuration**:
   - Contact Hostinger support if MIME types are wrong

### Issue 5: Build Issues

**Symptom**: Build completes but files are missing

**Solution**:
1. **Clear and rebuild**:
   ```bash
   # Remove build folder
   Remove-Item -Path "build" -Recurse -Force
   
   # Rebuild
   npm run build
   ```

2. **Verify build output**:
   - Check `build/` folder has all files
   - Verify `.htaccess` was copied
   - Check `assets/` folder exists

## Diagnostic Steps

### Step 1: Check Browser Console
1. Open `https://nexuscrux.io`
2. Press `F12` → Console tab
3. Look for errors (red messages)
4. Note any 404 or 500 errors

### Step 2: Check Network Tab
1. Press `F12` → Network tab
2. Refresh page
3. Look for failed requests (red)
4. Check which files return 404

### Step 3: Verify File Upload
1. Log into Hostinger hPanel
2. Go to File Manager
3. Navigate to `public_html`
4. Verify these files exist:
   - `.htaccess` (enable "Show Hidden Files")
   - `index.html`
   - `assets/` folder with CSS and JS
   - `favicon.svg`
   - `logos/` folder

### Step 4: Test Direct File Access
Try accessing these URLs directly:
- `https://nexuscrux.io/index.html` - Should show page
- `https://nexuscrux.io/assets/index-[hash].js` - Should download JS
- `https://nexuscrux.io/assets/index-[hash].css` - Should show CSS
- `https://nexuscrux.io/.htaccess` - Should return 403 (not 404)

### Step 5: Check File Permissions
In hPanel File Manager:
1. Right-click `index.html` → Properties
2. Check permissions (should be 644)
3. Right-click `.htaccess` → Properties
4. Check permissions (should be 644)

## Quick Fixes

### Fix 1: Re-upload .htaccess
1. Download `.htaccess` from your local `build` folder
2. Upload to Hostinger `public_html` root
3. Ensure file name is exactly `.htaccess`
4. Set permissions to 644

### Fix 2: Re-upload All Files
1. Delete all files in `public_html` (backup first!)
2. Upload fresh files from `build` folder
3. Ensure `.htaccess` is included
4. Test site

### Fix 3: Clear Browser Cache
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Or clear cache: Settings → Clear browsing data
3. Try incognito/private window

### Fix 4: Check Server Configuration
Contact Hostinger support if:
- `.htaccess` is uploaded but not working
- mod_rewrite needs to be enabled
- MIME types are incorrect

## Most Common Issues

1. **Missing .htaccess** - 90% of routing issues
2. **Assets not uploaded** - Blank page
3. **Wrong file paths** - 404 errors
4. **Browser cache** - Old version showing
5. **File permissions** - Files not accessible

## Need More Help?

- **Hostinger Support**: https://www.hostinger.com/contact
- **Check browser console**: F12 for specific errors
- **Verify file upload**: Ensure all files from `build/` are uploaded

