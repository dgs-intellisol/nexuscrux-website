# Supabase Setup via Dashboard (No CLI Required!)

## ✅ Easier Alternative - Use Dashboard Instead

You can set up everything via the Supabase Dashboard without needing CLI login!

## Step 1: Access Your Project

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb
2. **Make sure you're logged in**

## Step 2: Create .env File

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://dvvycujiegrhphdtdqeb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU

# Stripe (add your keys later)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_REPLACE_WITH_YOUR_KEY
```

## Step 3: Set Secrets in Dashboard

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
2. **Scroll to**: **Secrets** section
3. **Click**: **Add Secret** for each:

   - **Name**: `STRIPE_SECRET_KEY`
     **Value**: Your Stripe secret key (starts with `sk_test_` or `sk_live_`)

   - **Name**: `STRIPE_PRICE_STARTER_MONTHLY`
     **Value**: Your Stripe price ID (starts with `price_`)

   - **Name**: `STRIPE_PRICE_STARTER_ANNUAL`
     **Value**: Your Stripe price ID

   - **Name**: `STRIPE_PRICE_GROWTH_MONTHLY`
     **Value**: Your Stripe price ID

   - **Name**: `STRIPE_PRICE_GROWTH_ANNUAL`
     **Value**: Your Stripe price ID

   - **Name**: `STRIPE_PRICE_SCALE_MONTHLY`
     **Value**: Your Stripe price ID

   - **Name**: `STRIPE_PRICE_SCALE_ANNUAL`
     **Value**: Your Stripe price ID

## Step 4: Deploy Edge Functions via Dashboard

### Option A: Upload via Dashboard (Easier)

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. **Click**: **Create a new function**
3. **Name**: `server`
4. **Copy the code** from `supabase/functions/server/index.tsx`
5. **Paste** into the editor
6. **Click**: **Deploy**

### Option B: Use Supabase CLI (if login works later)

```bash
npx supabase@latest functions deploy server
```

## Step 5: Test the Function

Once deployed, test the health endpoint:

```bash
curl https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
```

Or visit in browser:
https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health

Should return: `{"status":"ok"}`

## Step 6: Get Your API Keys (if needed)

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/api
2. **Copy**:
   - **Project URL**: `https://dvvycujiegrhphdtdqeb.supabase.co` (already known)
   - **anon/public key**: (already in your code)
   - **service_role key**: Copy this if you need it (keep secret!)

## Function URLs

Once deployed, your functions will be available at:

- **Base URL**: `https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server`
- **Health**: `/make-server-fa18f4aa/health`
- **Create Subscription**: `/make-server-fa18f4aa/api/subscriptions/create`
- **Subscription Status**: `/make-server-fa18f4aa/api/subscriptions/status/:id`
- **Cancel Subscription**: `/make-server-fa18f4aa/api/subscriptions/cancel/:id`

## Checklist

- [ ] `.env` file created with Supabase URL and anon key
- [ ] Secrets set in Dashboard (7 secrets total)
- [ ] Edge Function deployed (via Dashboard or CLI)
- [ ] Health endpoint tested
- [ ] Function URL noted for frontend

## Next Steps

After Supabase is set up:
1. ✅ Configure Stripe (get API keys)
2. ✅ Update Stripe price IDs in secrets
3. ✅ Test subscription flow
4. ✅ Update frontend to use function URLs

---

**No CLI login needed!** Everything can be done via Dashboard. 🎉

