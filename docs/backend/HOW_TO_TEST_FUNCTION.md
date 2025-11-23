# How to Test Your Supabase Function

## Where to Use These Commands

These are **PowerShell commands** that you run in your **Windows PowerShell** or **Terminal**.

## Step-by-Step Instructions

### Option 1: Use PowerShell (Recommended)

1. **Open PowerShell:**
   - Press `Windows Key + X`
   - Select **"Windows PowerShell"** or **"Terminal"**
   - Or search for "PowerShell" in Start menu

2. **Navigate to your project** (optional, but good practice):
   ```powershell
   cd "C:\Users\Nze Ogenna Durugo\OneDrive\NexusCruxLtd"
   ```

3. **Copy and paste the test commands:**
   ```powershell
   $anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU"
   $headers = @{ "Authorization" = "Bearer $anonKey" }
   Invoke-WebRequest -Uri "https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health" -Headers $headers
   ```

4. **Press Enter** to run the command

5. **Check the result:**
   - ✅ **Success**: You'll see `{"status":"ok"}` - Function is working!
   - ❌ **404 Error**: Function not deployed yet - need to deploy code
   - ❌ **401 Error**: Missing authorization (shouldn't happen with these commands)

### Option 2: Use Browser (Easier for Quick Tests)

1. **Install ModHeader Extension:**
   - Chrome: https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj
   - Edge: https://microsoftedge.microsoft.com/addons/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj

2. **Add Authorization Header:**
   - Click the ModHeader icon
   - Click **"+"** to add a header
   - **Name**: `Authorization`
   - **Value**: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU`
   - Click **"Save"**

3. **Visit the URL:**
   ```
   https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
   ```

4. **Check the result:**
   - ✅ **Success**: You'll see `{"status":"ok"}` in the browser
   - ❌ **404**: Function not deployed yet

## What These Commands Do

1. **`$anonKey = "..."`** - Sets your Supabase anonymous key (for authentication)
2. **`$headers = @{ "Authorization" = "Bearer $anonKey" }`** - Creates the authorization header
3. **`Invoke-WebRequest -Uri "..." -Headers $headers`** - Makes a request to your function

## Expected Results

### ✅ Success Response
```json
{"status":"ok"}
```
**Meaning**: Function is deployed and working correctly!

### ❌ 404 Not Found
```
404 Not Found
```
**Meaning**: 
- Function code not deployed yet, OR
- Function code is incomplete, OR
- Route path is wrong

**Solution**: 
1. Go to Supabase Dashboard → Functions → `server`
2. Copy ALL code from `SUPABASE_FUNCTION_COMPLETE.txt`
3. Paste and click **"Deploy"**

### ❌ 401 Unauthorized
```
{"code":401,"message":"Missing authorization header"}
```
**Meaning**: Authorization header missing (shouldn't happen with these commands)

## Quick Test Script

Save this as `test-function.ps1` and run it:

```powershell
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU"
$headers = @{ "Authorization" = "Bearer $anonKey" }

Write-Host "Testing function..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health" -Headers $headers -UseBasicParsing
    Write-Host "✅ SUCCESS! Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
```

Run it with:
```powershell
.\test-function.ps1
```

---

**Remember**: These commands are for **testing** your function. The frontend code already includes the authorization header automatically!

