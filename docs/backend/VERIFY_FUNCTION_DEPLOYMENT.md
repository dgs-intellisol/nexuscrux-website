# Verify Function Deployment

## Current Issue: 404 Not Found

The function is returning 404, which means either:
1. Function not deployed
2. Function name is different
3. Function code has errors

## Step 1: Verify Function Exists

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. **Check**: Do you see a function named `server`?
   - ✅ **If YES**: Click on it, check if status is "Active"
   - ❌ **If NO**: Function doesn't exist, need to create it

## Step 2: Check Function Code

If function exists:
1. **Click** on the `server` function
2. **Check** the code editor
3. **Verify** the code matches `SUPABASE_FUNCTION_COMPLETE.txt`
4. **Look for errors** in the code (red underlines)

## Step 3: Check Function Logs

1. In the function page, look for **"Logs"** or **"Invocations"** tab
2. Check if there are any error messages
3. Look for deployment errors

## Step 4: Re-deploy Function

If function exists but not working:

1. **Open** `SUPABASE_FUNCTION_COMPLETE.txt` in your project
2. **Select all** (Ctrl+A) and **Copy** (Ctrl+C)
3. **Go to** Supabase Dashboard → Functions → `server`
4. **Clear** all existing code
5. **Paste** the complete code
6. **Click** "Deploy" or "Save and Deploy"
7. **Wait** for "Deployed successfully" message

## Step 5: Test Again

After re-deploying, test with:

**PowerShell:**
```powershell
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU"
$headers = @{ "Authorization" = "Bearer $anonKey" }
Invoke-WebRequest -Uri "https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health" -Headers $headers
```

**Expected**: `{"status":"ok"}`

## Common Issues

### Issue 1: Function Name Wrong
- **Check**: Function must be named exactly `server` (lowercase)
- **Fix**: Rename or create new function with correct name

### Issue 2: Code Not Deployed
- **Check**: Did you click "Deploy" after pasting code?
- **Fix**: Click "Deploy" button (not just "Save")

### Issue 3: Code Has Errors
- **Check**: Look for red error messages in code editor
- **Fix**: Fix syntax errors, then redeploy

### Issue 4: Function Not Active
- **Check**: Status should be "Active" (not "Inactive" or "Error")
- **Fix**: Redeploy the function

## Quick Checklist

- [ ] Function `server` exists in Supabase Dashboard
- [ ] Function status is "Active"
- [ ] Code matches `SUPABASE_FUNCTION_COMPLETE.txt`
- [ ] Function has been deployed (not just saved)
- [ ] No errors in function logs
- [ ] Test with authorization header returns 200 OK

---

**Next Step**: Go to Supabase Dashboard and verify the function exists and is deployed.

