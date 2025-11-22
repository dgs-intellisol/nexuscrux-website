# Deployment Guide for nexuscrux.io on Hostinger

This guide will walk you through deploying your React/Vite application to Hostinger hosting.

## Prerequisites

- Hostinger account with nexuscrux.io domain configured
- FTP/SFTP credentials or cPanel access
- Node.js installed on your local machine (for building)

## Step 1: Build the Production Version

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build the production bundle**:
   ```bash
   npm run build
   ```

   This will create a `build` folder with all the optimized production files.

## Step 2: Prepare Files for Upload

After building, you should have a `build` folder containing:
- `index.html`
- `assets/` folder with CSS and JS files
- Any files from `src/public/` folder

**Important**: Make sure the `.htaccess` file is included in your build folder. You may need to copy it manually:
```bash
# Copy .htaccess to build folder
cp .htaccess build/
```

## Step 3: Access Hostinger

You have several options to upload files:

### Option A: Using cPanel File Manager

1. Log in to your Hostinger account
2. Go to **hPanel** (or cPanel)
3. Navigate to **File Manager**
4. Open the `public_html` folder (or the folder where your domain points)
5. Delete any existing files (or backup them first)
6. Upload all files from the `build` folder

### Option B: Using FTP/SFTP Client

1. Get your FTP credentials from Hostinger:
   - Host: Usually `ftp.nexuscrux.io` or your server IP
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (FTP) or 22 (SFTP)

2. Use an FTP client like:
   - **FileZilla** (Windows/Mac/Linux)
   - **WinSCP** (Windows)
   - **Cyberduck** (Mac/Windows)

3. Connect to your server
4. Navigate to `public_html` (or your domain's root folder)
5. Upload all files from the `build` folder

### Option C: Using Command Line (SFTP)

```bash
# Using SFTP
sftp username@ftp.nexuscrux.io
# Enter password when prompted
cd public_html
put -r build/* .
```

## Step 4: Verify File Structure

After uploading, your `public_html` folder should contain:
```
public_html/
├── .htaccess          (Important for routing!)
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── (other public files)
```

## Step 5: Configure Domain (if needed)

1. In Hostinger hPanel, go to **Domains**
2. Ensure `nexuscrux.io` is pointing to the correct directory
3. If using a subdirectory, update the domain path

## Step 6: Test Your Site

1. Visit `https://nexuscrux.io` (or `http://` if SSL not configured yet)
2. Test all routes:
   - `/` (Home)
   - `/platform`
   - `/solutions/brands`
   - `/features`
   - `/pricing`
   - etc.

3. If you get 404 errors on direct route access, the `.htaccess` file may not be working. Check:
   - File is named exactly `.htaccess` (with the dot at the beginning)
   - File is in the root directory (`public_html`)
   - Apache mod_rewrite is enabled (contact Hostinger support if needed)

## Step 7: Enable HTTPS/SSL

1. In Hostinger hPanel, go to **SSL**
2. Install a free SSL certificate (Let's Encrypt)
3. Force HTTPS by uncommenting the HTTPS redirect in `.htaccess`:
   ```apache
   # Uncomment these lines in .htaccess:
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   </IfModule>
   ```

## Troubleshooting

### Routes return 404 errors
- **Solution**: Ensure `.htaccess` file is uploaded and in the root directory
- Check that Apache mod_rewrite is enabled (contact Hostinger support)

### Assets not loading (CSS/JS broken)
- **Solution**: Check that the `assets` folder was uploaded correctly
- Verify file paths in browser console (F12)

### Site shows blank page
- **Solution**: 
  - Check browser console for errors
  - Verify `index.html` is in the root directory
  - Ensure all JavaScript files are uploaded

### Slow loading times
- **Solution**: 
  - The `.htaccess` includes compression and caching
  - Consider using a CDN for static assets
  - Enable Gzip compression in Hostinger settings

## Updating Your Site

When you make changes:

1. Make your code changes locally
2. Run `npm run build` again
3. Upload the new `build` folder contents to replace old files
4. Clear browser cache or do a hard refresh (Ctrl+F5)

## Automated Deployment (Optional)

For future deployments, you can create a deployment script:

```bash
# deploy.sh
#!/bin/bash
npm run build
cp .htaccess build/
# Add your FTP upload command here
```

## Need Help?

- **Hostinger Support**: Contact them if you need help with server configuration
- **Check Hostinger Docs**: https://www.hostinger.com/tutorials

---

**Note**: If Hostinger uses Nginx instead of Apache, you'll need a different configuration file. Contact Hostinger support to confirm which web server they use.

