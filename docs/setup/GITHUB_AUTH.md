# GitHub Authentication Setup

## Problem
You're getting a 403 error because GitHub requires authentication. You need to use a **Personal Access Token** (PAT) instead of a password.

## Solution: Create and Use a Personal Access Token

### Step 1: Create a Personal Access Token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - Direct link: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a name: `nexuscrux-deployment`
4. Select scopes:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **workflow** (if you plan to use GitHub Actions)
5. Click **Generate token**
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

### Step 2: Use the Token

When you push, use the token as your password:

```bash
git push -u origin main
# Username: dgs-intellisol (or your GitHub username)
# Password: [paste your Personal Access Token here]
```

### Alternative: Store Credentials (Windows)

Windows Credential Manager can store your token:

```bash
# This will prompt for username and password (use token as password)
git push -u origin main
```

The credentials will be saved in Windows Credential Manager.

### Alternative: Use SSH (More Secure)

1. Generate SSH key (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "info.dgsintellisol@gmail.com"
   ```

2. Add SSH key to GitHub:
   - Copy the public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste and save

3. Change remote to SSH:
   ```bash
   git remote set-url origin git@github.com:dgs-intellisol/nexuscrux-website.git
   git push -u origin main
   ```

## Quick Fix: Try Pushing Again

After creating your token, just run:
```bash
git push -u origin main
```

When prompted:
- **Username**: Your GitHub username (or `dgs-intellisol` if that's the org account)
- **Password**: Paste your Personal Access Token (NOT your GitHub password)

