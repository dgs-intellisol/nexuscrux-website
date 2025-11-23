# Deploy Edge Functions to Supabase

## Option A: Deploy via Dashboard (Recommended)

### Step 1: Access Functions Page

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. You'll see a list of functions (or empty if none deployed)

### Step 2: Create New Function

1. **Click**: **"Create a new function"** button
2. **Function name**: `server`
3. **Click**: **Create function**

### Step 3: Add Function Code

1. **Open** the function editor (code editor will appear)
2. **Read** the code from `supabase/functions/server/index.tsx` in your project
3. **Copy** all the code
4. **Paste** into the Supabase function editor
5. **Click**: **Deploy** (or **Save** then **Deploy**)

### Step 4: Verify Deployment

After deployment, you should see:
- Function status: **Active**
- Function URL: `https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server`

### Step 5: Test the Function

Test the health endpoint:
```bash
curl https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
```

Or visit in browser:
https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health

Should return: `{"status":"ok"}`

---

## Option B: Deploy via CLI

### Prerequisites
- Supabase CLI installed (or use `npx supabase@latest`)
- Logged in to Supabase CLI
- Project linked

### Deploy Command

```bash
npx supabase@latest functions deploy server
```

### Verify Deployment

After deployment, test the health endpoint (same as Option A).

---

## Function Structure

The function includes:
- **Main handler**: `index.tsx` - Routes requests
- **Subscriptions**: `subscriptions.ts` - Handles subscription creation
- **KV Store**: `kv_store.tsx` - Key-value storage utilities

All code is in: `supabase/functions/server/`

---

## Function Endpoints

Once deployed, your function will have these endpoints:

- **Health Check**: `/make-server-fa18f4aa/health`
- **Create Subscription**: `/make-server-fa18f4aa/api/subscriptions/create`
- **Subscription Status**: `/make-server-fa18f4aa/api/subscriptions/status/:id`
- **Cancel Subscription**: `/make-server-fa18f4aa/api/subscriptions/cancel/:id`

---

## Troubleshooting

### Function not deploying
- Check you have the correct project selected
- Verify the code is correct (no syntax errors)
- Check browser console for errors

### Function returns error
- Verify secrets are set correctly
- Check Stripe keys are valid
- Verify price IDs are correct

### Can't access function
- Check function is deployed (status: Active)
- Verify function URL is correct
- Check CORS settings (should be enabled in code)

---

**After deployment, test the health endpoint to verify everything works!**

