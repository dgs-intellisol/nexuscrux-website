# GitHub Setup Guide

## Option 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Repository name: `nexuscrux-website` (or any name you prefer)
4. Description: "Nexus Crux SaaS Website"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **Create repository**

## Option 2: Use Existing Repository

If you already have a repository you want to use, note the repository URL.

## Next Steps

After creating/choosing your repository, run these commands:

```bash
# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Or if you prefer SSH:
```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## After Pushing

Once pushed, you can:
- View your code on GitHub
- Set up GitHub Actions for automated deployment
- Collaborate with others
- Use GitHub Pages (if you want to host there instead of Hostinger)

