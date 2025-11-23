# Deployment Troubleshooting Guide

## Current Issue: All Endpoints Return 404

Even though you've deployed, all endpoints are returning 404. This means the function code is not actually running.

## Common Causes

### 1. Code Saved But Not Deployed ⚠️ MOST COMMON
**Problem**: You clicked "Save" but not "Deploy"
**Solution**: 
- Go to Supabase Dashboard → Functions → `server`
- Look for a **"Deploy"** button (separate from Save)
- Click **"Deploy"** and wait for success message

### 2. Syntax Error in Code
**Problem**: Code has errors preventing deployment
**Solution**:
- Check Supabase Dashboard for error messages (red underlines)
- Look in function logs for deployment errors
- Verify all imports are correct

### 3. Function Name Mismatch
**Problem**: Function deployed with different name
**Solution**:
- Verify function is named exactly `server` (lowercase)
- Check function list in Supabase Dashboard

### 4. Deployment Failed Silently
**Problem**: Deployment appeared to work but didn't
**Solution**:
- Check function logs in Supabase Dashboard
- Look for error messages
- Try redeploying

## Step-by-Step Verification

### Step 1: Check Function Status
1. Go to: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. Find the `server` function
3. Check status:
   - ✅ **Active** = Deployed and running
   - ⚠️ **Inactive** = Not deployed
   - ❌ **Error** = Deployment failed

### Step 2: Check Function Code
1. Click on `server` function
2. Verify code matches `SUPABASE_FUNCTION_COMPLETE.txt`
3. Look for:
   - Red error underlines
   - Missing imports
   - Syntax errors

### Step 3: Check Function Logs
1. In function page, look for **"Logs"** or **"Invocations"** tab
2. Check for:
   - Deployment errors
   - Runtime errors
   - Request logs

### Step 4: Verify Deployment
1. Look for **"Deploy"** or **"Redeploy"** button
2. If you see it, the function might not be deployed
3. Click **"Deploy"** and wait for confirmation

## Quick Fix: Redeploy Complete Code

1. **Open** `SUPABASE_FUNCTION_COMPLETE.txt`
2. **Select ALL** (Ctrl+A)
3. **Copy** (Ctrl+C)
4. **Go to** Supabase Dashboard → Functions → `server`
5. **Select ALL** existing code in editor
6. **Delete** it
7. **Paste** the complete code
8. **Click "Deploy"** (not Save!)
9. **Wait** for "Deployed successfully" message
10. **Test** again

## Verify Code Structure

The complete function should have:
- ✅ `import { Hono } from "npm:hono";`
- ✅ `const app = new Hono();`
- ✅ `app.get("/", ...)` - Root route
- ✅ `app.get("/make-server-fa18f4aa/health", ...)` - Health endpoint
- ✅ `app.post('/make-server-fa18f4aa/api/subscriptions/create', ...)` - Create subscription
- ✅ `Deno.serve(app.fetch);` - Server startup (MUST BE LAST LINE)

## Test After Redeployment

```powershell
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU"
$headers = @{ "Authorization" = "Bearer $anonKey" }
Invoke-WebRequest -Uri "https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health" -Headers $headers
```

**Expected**: `{"status":"ok"}`

## Still Not Working?

If after redeploying you still get 404:

1. **Check Supabase Status**: https://status.supabase.com
2. **Check Function Logs**: Look for runtime errors
3. **Verify Secrets**: Make sure Stripe secret key is set (won't cause 404 but good to check)
4. **Contact Support**: Supabase support or check their Discord

---

**Most likely issue**: Code was saved but not deployed. Make sure to click "Deploy" button!

