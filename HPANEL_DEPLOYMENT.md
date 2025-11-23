# Deploy to Hostinger Using hPanel - Step by Step Guide

This guide provides detailed instructions for deploying your Nexus Crux website to Hostinger using hPanel (Hostinger's control panel).

## Prerequisites

- ✅ Hostinger account with nexuscrux.io domain configured
- ✅ Node.js installed on your local machine
- ✅ Your website code built and ready

---

## Step 1: Build Your Website

### On Your Local Computer

1. **Open your project folder** in terminal/command prompt
2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Build the production version**:
   ```bash
   npm run build
   ```
   
   Or use the deployment script:
   - **Windows**: `.\deploy.ps1`
   - **Mac/Linux**: `bash deploy.sh`

4. **Verify the build folder**:
   - You should see a `build` folder created
   - It should contain:
     - `index.html`
     - `assets/` folder (with CSS and JS files)
     - `.htaccess` file (automatically copied)

---

## Step 2: Access Hostinger hPanel

1. **Go to Hostinger website**: https://www.hostinger.com
2. **Click "Log In"** (top right corner)
3. **Enter your credentials** and sign in
4. **Click "Manage"** next to your hosting plan
5. You'll be redirected to **hPanel**

---

## Step 3: Open File Manager in hPanel

1. **In hPanel dashboard**, look for **"Files"** section
2. **Click on "File Manager"**
   - Alternatively, you can find it under **"Advanced"** → **"File Manager"**
3. **Navigate to your domain's root folder**:
   - Look for `public_html` folder
   - Or if your domain is in a subfolder, navigate to that folder
   - For `nexuscrux.io`, it should be in `public_html/` or `public_html/nexuscrux.io/`

---

## Step 4: Prepare the Upload Location

### Option A: Fresh Deployment (No Existing Files)

1. **Select the `public_html` folder** (or your domain folder)
2. **If there are existing files**, you can:
   - **Backup first**: Select all files → Right-click → "Compress" → Download the zip
   - **Or delete them**: Select all → Click "Delete" (be careful!)

### Option B: Update Existing Site

1. **Navigate to your domain folder**
2. **Select all existing files** (Ctrl+A or Cmd+A)
3. **Delete them** (or move to a backup folder)

---

## Step 5: Upload Your Build Files

### Method 1: Upload Individual Files/Folders

1. **In File Manager**, make sure you're in the correct folder (`public_html` or your domain folder)
2. **Click "Upload"** button (usually at the top)
3. **Click "Select Files"** or drag and drop
4. **Navigate to your local `build` folder** on your computer
5. **Select ALL files and folders**:
   - `index.html`
   - `.htaccess` (⚠️ **CRITICAL** - make sure this is included!)
   - `assets/` folder (select the entire folder)
   - Any other files from the build folder
6. **Click "Upload"** or "Open"
7. **Wait for upload to complete** (you'll see progress)

### Method 2: Upload as ZIP (Easier for Multiple Files)

1. **On your local computer**:
   - Navigate to your `build` folder
   - Select all files (Ctrl+A)
   - Right-click → "Send to" → "Compressed (zipped) folder"
   - Name it `nexuscrux-build.zip`

2. **In hPanel File Manager**:
   - Click "Upload"
   - Select the `nexuscrux-build.zip` file
   - Wait for upload to complete

3. **Extract the ZIP file**:
   - Right-click on `nexuscrux-build.zip`
   - Select "Extract" or "Extract Here"
   - Choose extraction location (usually current folder)
   - Click "Extract Files"
   - **Delete the ZIP file** after extraction

---

## Step 6: Verify File Structure

After uploading, your folder should look like this:

```
public_html/ (or your domain folder)
├── .htaccess          ← CRITICAL for React Router!
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── (other asset files)
└── (any other public files)
```

### Important Checks:

1. **`.htaccess` file exists**:
   - In File Manager, make sure you can see `.htaccess`
   - If you don't see it, enable "Show Hidden Files" in File Manager settings
   - The file name must be exactly `.htaccess` (with the dot at the beginning)

2. **`index.html` is in the root**:
   - Should be directly in `public_html` (or your domain folder)
   - Not inside a subfolder

3. **`assets` folder exists**:
   - Should contain your CSS and JS files

---

## Step 7: Set File Permissions (If Needed)

1. **Select `.htaccess` file**
2. **Right-click** → **"Change Permissions"** or **"File Permissions"**
3. **Set permissions to `644`** (or `0644`)
   - Owner: Read, Write
   - Group: Read
   - Public: Read
4. **Click "Change"** or "Save"

---

## Step 8: Configure Domain (If Needed)

1. **In hPanel**, go to **"Domains"** section
2. **Click on your domain** (`nexuscrux.io`)
3. **Verify the document root**:
   - Should point to `public_html` or `public_html/nexuscrux.io`
   - If incorrect, update it to the correct folder

---

## Step 9: Enable SSL/HTTPS

1. **In hPanel**, go to **"SSL"** section
2. **Find your domain** (`nexuscrux.io`)
3. **Click "Install SSL"** or **"Activate SSL"**
4. **Select "Let's Encrypt"** (free SSL certificate)
5. **Click "Install"** or "Activate"
6. **Wait for installation** (usually takes a few minutes)

### Force HTTPS Redirect

After SSL is installed, you can force HTTPS by editing `.htaccess`:

1. **In File Manager**, right-click `.htaccess` → **"Edit"**
2. **Find the HTTPS redirect section** (near the bottom)
3. **Uncomment these lines** (remove the `#` at the beginning):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   </IfModule>
   ```
4. **Click "Save Changes"**

---

## Step 10: Test Your Website

1. **Open a new browser tab**
2. **Visit**: `https://nexuscrux.io` (or `http://` if SSL not yet active)
3. **Test the homepage**: Should load correctly
4. **Test routes**:
   - `https://nexuscrux.io/platform`
   - `https://nexuscrux.io/features`
   - `https://nexuscrux.io/pricing`
   - `https://nexuscrux.io/solutions/brands`
   - etc.

5. **Check browser console** (F12 → Console tab):
   - Should have no errors
   - Assets should load correctly

---

## Troubleshooting

### ❌ Routes Return 404 Error

**Problem**: Direct URL access to routes like `/platform` shows 404

**Solutions**:
1. **Verify `.htaccess` exists**:
   - In File Manager, enable "Show Hidden Files"
   - Check that `.htaccess` is in the root folder

2. **Check `.htaccess` content**:
   - Right-click → "Edit"
   - Should contain the rewrite rules for React Router
   - If missing, re-upload the `.htaccess` file from your build folder

3. **Contact Hostinger Support**:
   - Ask them to enable `mod_rewrite` for Apache
   - This is usually enabled by default, but verify

### ❌ Blank Page / Site Not Loading

**Solutions**:
1. **Check browser console** (F12):
   - Look for JavaScript errors
   - Check Network tab for failed file loads

2. **Verify `index.html` location**:
   - Must be in root folder (`public_html`)
   - Not in a subfolder

3. **Check file permissions**:
   - Files should have `644` permissions
   - Folders should have `755` permissions

### ❌ CSS/JS Files Not Loading

**Solutions**:
1. **Verify `assets` folder was uploaded**:
   - Check that `assets/` folder exists
   - Contains CSS and JS files

2. **Check file paths in browser console**:
   - Open F12 → Network tab
   - See which files are failing to load
   - Verify those files exist in File Manager

3. **Clear browser cache**:
   - Press Ctrl+F5 (hard refresh)
   - Or clear browser cache

### ❌ Still Seeing Old Site

**Solutions**:
1. **Clear browser cache**: Ctrl+F5 or clear cache
2. **Check you uploaded to correct folder**:
   - Verify domain points to the folder you uploaded to
3. **Wait a few minutes**: DNS changes can take time

---

## Updating Your Site

**📖 For detailed update instructions, see [UPDATE_SITE.md](./UPDATE_SITE.md)**

Quick update:
1. Make changes locally
2. Build: `npm run build`
3. In hPanel: Delete old files → Upload new files from `build` folder
4. Clear cache (Ctrl+F5) and test

See [UPDATE_SITE.md](./UPDATE_SITE.md) for the complete update guide with troubleshooting.

---

## Quick Reference: hPanel Navigation

- **File Manager**: Files → File Manager
- **Domains**: Domains → Manage
- **SSL**: SSL → Manage
- **FTP Accounts**: Files → FTP Accounts (if you prefer FTP)

---

## Need Help?

- **Hostinger Support**: https://www.hostinger.com/contact
- **Hostinger Knowledge Base**: https://support.hostinger.com
- **Live Chat**: Available in hPanel

---

## Summary Checklist

- [ ] Built the website (`npm run build`)
- [ ] Logged into hPanel
- [ ] Opened File Manager
- [ ] Navigated to `public_html` (or domain folder)
- [ ] Uploaded all files from `build` folder
- [ ] Verified `.htaccess` is present
- [ ] Verified `index.html` is in root
- [ ] Installed SSL certificate
- [ ] Tested website at `https://nexuscrux.io`
- [ ] Tested routes (no 404 errors)
- [ ] Everything works! ✅

---

**Congratulations!** Your Nexus Crux website should now be live on nexuscrux.io! 🎉

