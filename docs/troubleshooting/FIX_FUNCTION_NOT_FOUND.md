# Fix: Function Not Found Error

## Error Message
```json
{"code": "NOT_FOUND", "message": "Requested function was not found"}
```

## What This Means

The Edge Function hasn't been deployed yet, or it was deployed with a different name.

## Solution: Deploy the Function

### Step 1: Check if Function Exists

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. **Check**: Do you see a function named `server`?
   - ✅ **If YES**: Function exists, check if it's deployed (status should be "Active")
   - ❌ **If NO**: Function doesn't exist, proceed to Step 2

### Step 2: Deploy the Function

#### Option A: Create New Function (if it doesn't exist)

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. **Click**: **"Create a new function"** or **"New function"**
3. **Function name**: Type `server` (lowercase, exactly)
4. **Click**: **Create function**

#### Option B: Edit Existing Function (if it exists but not working)

1. **Click** on the `server` function
2. **Click**: **Edit** or open the code editor

### Step 3: Add the Code

1. **Open** `SUPABASE_FUNCTION_COMPLETE.txt` in your project
2. **Select all** the code (Ctrl+A)
3. **Copy** it (Ctrl+C)
4. **Go back** to Supabase Dashboard
5. **Clear** any existing code in the editor
6. **Paste** the code (Ctrl+V)
7. **Click**: **Deploy** or **Save and Deploy**

### Step 4: Wait for Deployment

- Deployment usually takes 10-30 seconds
- You'll see a success message when done
- Function status should change to **"Active"**

### Step 5: Test Again

After deployment, test the health endpoint:
- **URL**: https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
- **Expected**: `{"status":"ok"}`

## Common Issues

### Issue 1: Function Name Wrong
- **Problem**: Function deployed with different name
- **Solution**: Make sure function name is exactly `server` (lowercase)

### Issue 2: Function Not Deployed
- **Problem**: Code saved but not deployed
- **Solution**: Click **Deploy** button after pasting code

### Issue 3: Wrong Endpoint Path
- **Problem**: Trying wrong URL
- **Solution**: Use correct path: `/functions/v1/server/make-server-fa18f4aa/health`

### Issue 4: Deployment Failed
- **Problem**: Code has errors
- **Solution**: Check browser console (F12) for error messages

## Quick Fix Steps

1. ✅ Go to Functions page
2. ✅ Create function named `server` (if doesn't exist)
3. ✅ Copy code from `SUPABASE_FUNCTION_COMPLETE.txt`
4. ✅ Paste into function editor
5. ✅ Click Deploy
6. ✅ Wait for "Deployed successfully" message
7. ✅ Test health endpoint again

---

**After deploying, the function should work!**

