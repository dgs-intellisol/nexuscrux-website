# Quick Deployment Checklist

## Before You Start
- [ ] You have Hostinger FTP/cPanel credentials
- [ ] Domain nexuscrux.io is configured in Hostinger
- [ ] Node.js is installed on your computer

## Deployment Steps

### 1. Build Your Site
```bash
npm run build
```
Or use the deployment script:
- **Windows (PowerShell)**: `.\deploy.ps1`
- **Mac/Linux**: `bash deploy.sh`

### 2. Upload Files
Upload **ALL contents** of the `build` folder to:
- **Hostinger path**: `public_html/` (or your domain's root folder)

**Critical**: Make sure `.htaccess` is included in the upload!

### 3. Verify
- Visit `https://nexuscrux.io`
- Test routes: `/platform`, `/features`, `/pricing`
- Check browser console (F12) for errors

## Common Issues

| Problem | Solution |
|---------|----------|
| Routes return 404 | Ensure `.htaccess` is uploaded to root |
| Blank page | Check browser console, verify `index.html` exists |
| Assets not loading | Verify `assets/` folder was uploaded |
| Still seeing old site | Clear browser cache (Ctrl+F5) |

## File Structure After Upload
```
public_html/
├── .htaccess          ← CRITICAL for routing!
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── (other files)
```

## Need Help?
See `DEPLOYMENT.md` for detailed instructions.

