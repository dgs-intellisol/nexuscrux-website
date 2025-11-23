# Test Supabase Function

## Quick Test (PowerShell)

```powershell
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU"
$headers = @{
    "Authorization" = "Bearer $anonKey"
}
Invoke-WebRequest -Uri "https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health" -Headers $headers
```

## Browser Test

1. Install browser extension: **ModHeader** (Chrome/Edge)
2. Add header:
   - Name: `Authorization`
   - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU`
3. Visit: https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
4. Should see: `{"status":"ok"}`

## What Was Fixed

1. ✅ **URL Path**: Changed from `/functions/v1/make-server-fa18f4aa/...` to `/functions/v1/server/make-server-fa18f4aa/...`
2. ✅ **Authorization**: Frontend already includes Authorization header (good!)
3. ✅ **Function Deployed**: Function is deployed and working

## Next Steps

1. Test health endpoint (should work now)
2. Test subscription creation from frontend
3. Verify payment flow works end-to-end

