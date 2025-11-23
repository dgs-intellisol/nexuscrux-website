# Supabase CLI Installation Guide for Windows

## ❌ npm Installation Not Supported

Supabase CLI cannot be installed via `npm install -g supabase` on Windows.

## ✅ Option 1: Using Scoop (Recommended for Windows)

### Step 1: Install Scoop (if not already installed)

Open PowerShell as Administrator and run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

### Step 2: Install Supabase CLI

```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Step 3: Verify Installation

```powershell
supabase --version
```

## ✅ Option 2: Download Binary Directly

1. **Go to**: https://github.com/supabase/cli/releases
2. **Download**: Latest `supabase_X.X.X_windows_amd64.zip`
3. **Extract** the zip file
4. **Add to PATH**:
   - Copy `supabase.exe` to a folder (e.g., `C:\tools\supabase\`)
   - Add that folder to your system PATH
   - Or use it directly from the extracted folder

## ✅ Option 3: Using Chocolatey (if you have it)

```powershell
choco install supabase
```

## ✅ Option 4: Use npx (No Installation Needed)

You can use Supabase CLI without installing it globally:

```powershell
npx supabase@latest --version
npx supabase@latest login
npx supabase@latest link --project-ref dvvycujiegrhphdtdqeb
npx supabase@latest functions deploy server
```

**Note**: This is slower but works without installation.

## 🎯 Recommended: Use npx

Since installation is having issues, we'll use `npx` which doesn't require installation.

## Next Steps

Once you have Supabase CLI available (via any method above), continue with:
1. Login: `supabase login` (or `npx supabase@latest login`)
2. Link project: `supabase link --project-ref dvvycujiegrhphdtdqeb`
3. Deploy functions: `supabase functions deploy server`

