# Quick Update Reference Card

## 🚀 Update Your Live Site in 4 Steps

### 1. Build
```bash
npm run build
```

### 2. Upload
- Log in to Hostinger → hPanel
- Files → File Manager
- Delete old files
- Upload new files from `build` folder
- ⚠️ **Don't forget `.htaccess`!**

### 3. Clear Cache
- Press `Ctrl + F5` (hard refresh)
- Or clear browser cache

### 4. Test
- Visit `https://nexuscrux.io`
- Verify changes are visible
- Test routes work

---

## ⚡ Quick Commands

```bash
# Test locally
npm run dev

# Build for production
npm run build

# Build (Windows)
.\deploy.ps1

# Build (Mac/Linux)
bash deploy.sh
```

---

## 📋 Update Checklist

- [ ] Made changes locally
- [ ] Tested with `npm run dev`
- [ ] Built with `npm run build`
- [ ] Uploaded to Hostinger (hPanel)
- [ ] Included `.htaccess` file
- [ ] Cleared browser cache
- [ ] Tested live site
- [ ] All routes work

---

## 🆘 Quick Troubleshooting

| Problem | Quick Fix |
|---------|-----------|
| Changes not showing | Clear cache (Ctrl+F5) |
| Routes return 404 | Check `.htaccess` is uploaded |
| Blank page | Check browser console (F12) |
| Old site still showing | Clear cache + wait 2 minutes |

---

**Full guide**: See [UPDATE_SITE.md](./UPDATE_SITE.md)

