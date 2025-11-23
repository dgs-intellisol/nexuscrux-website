# Deno.env Explanation - Where Environment Variables Are Set

## What is `Deno.env`?

`Deno.env` is **not a file** - it's a **Deno runtime API** that provides access to environment variables.

When you see code like:
```typescript
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2024-11-20.acacia',
});
```

This is reading an environment variable called `STRIPE_SECRET_KEY` from the runtime environment.

---

## Where Are These Variables Set?

### For Supabase Edge Functions

Environment variables for Supabase Edge Functions are **NOT stored in files** - they're set in the **Supabase Dashboard**.

### Location: Supabase Dashboard → Project Settings → Edge Functions → Secrets

**Direct Link:**
```
https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/settings/functions
```

**Your Project ID:** `dvvycujiegrhphdtdqeb`

**Full URL:**
```
https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
```

---

## How to Set Environment Variables

### Step 1: Go to Supabase Dashboard

1. Visit: https://supabase.com/dashboard
2. Select your project: **dvvycujiegrhphdtdqeb**
3. Navigate to: **Settings** → **Edge Functions** → **Secrets**

### Step 2: Add Secrets

Click **"Add new secret"** and add each variable:

#### Required Secrets for Stripe:

1. **STRIPE_SECRET_KEY**
   - Value: Your Stripe secret key (starts with `sk_test_` or `sk_live_`)
   - Get from: https://dashboard.stripe.com/apikeys

2. **STRIPE_PRICE_STARTER_MONTHLY**
   - Value: Stripe Price ID for Starter monthly plan
   - Format: `price_xxxxxxxxxxxxx`
   - Get from: Stripe Dashboard → Products → Starter → Monthly Price

3. **STRIPE_PRICE_STARTER_ANNUAL**
   - Value: Stripe Price ID for Starter annual plan
   - Format: `price_xxxxxxxxxxxxx`

4. **STRIPE_PRICE_GROWTH_MONTHLY**
   - Value: Stripe Price ID for Growth monthly plan

5. **STRIPE_PRICE_GROWTH_ANNUAL**
   - Value: Stripe Price ID for Growth annual plan

6. **STRIPE_PRICE_SCALE_MONTHLY**
   - Value: Stripe Price ID for Scale monthly plan

7. **STRIPE_PRICE_SCALE_ANNUAL**
   - Value: Stripe Price ID for Scale annual plan

#### Optional (if using Supabase client):

8. **SUPABASE_URL**
   - Value: `https://dvvycujiegrhphdtdqeb.supabase.co`
   - Usually auto-provided by Supabase

9. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: Your service role key (starts with `eyJ...`)
   - Get from: Supabase Dashboard → Settings → API → Service Role Key
   - ⚠️ **Keep this secret!** Never expose in frontend code

---

## Visual Guide

```
Supabase Dashboard
├── Project: dvvycujiegrhphdtdqeb
│   ├── Settings
│   │   ├── Edge Functions
│   │   │   ├── Secrets  ← CLICK HERE
│   │   │   │   ├── Add new secret
│   │   │   │   │   ├── Name: STRIPE_SECRET_KEY
│   │   │   │   │   └── Value: sk_test_...
│   │   │   │   ├── Add new secret
│   │   │   │   │   ├── Name: STRIPE_PRICE_STARTER_MONTHLY
│   │   │   │   │   └── Value: price_...
│   │   │   │   └── (repeat for all secrets)
```

---

## How It Works

### 1. You Set Secrets in Dashboard
```
Supabase Dashboard → Settings → Edge Functions → Secrets
```

### 2. Supabase Injects Them at Runtime
When your Edge Function runs, Supabase automatically makes these available via `Deno.env.get()`

### 3. Your Code Accesses Them
```typescript
// This reads from the secrets you set in the dashboard
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2024-11-20.acacia',
});
```

---

## Important Notes

### ✅ Do:
- Set secrets in Supabase Dashboard
- Use descriptive secret names (UPPERCASE_WITH_UNDERSCORES)
- Keep secrets secure (never commit to Git)
- Use test keys during development
- Switch to live keys for production

### ❌ Don't:
- Store secrets in code files
- Commit secrets to Git
- Share secrets publicly
- Use production keys in development

---

## Local Development (Optional)

If you're testing Edge Functions locally with Supabase CLI, you can create a `.env` file:

**File:** `supabase/.env.local` (or `.env`)

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_STARTER_MONTHLY=price_...
STRIPE_PRICE_STARTER_ANNUAL=price_...
# ... etc
```

**Note:** This is only for local testing. For deployed functions, always use Supabase Dashboard secrets.

---

## Quick Reference

| Variable | Where to Get | Example Value |
|----------|-------------|---------------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → API Keys | `sk_test_51...` |
| `STRIPE_PRICE_STARTER_MONTHLY` | Stripe Dashboard → Products → Starter | `price_1...` |
| `STRIPE_PRICE_STARTER_ANNUAL` | Stripe Dashboard → Products → Starter | `price_1...` |
| `STRIPE_PRICE_GROWTH_MONTHLY` | Stripe Dashboard → Products → Growth | `price_1...` |
| `STRIPE_PRICE_GROWTH_ANNUAL` | Stripe Dashboard → Products → Growth | `price_1...` |
| `STRIPE_PRICE_SCALE_MONTHLY` | Stripe Dashboard → Products → Scale | `price_1...` |
| `STRIPE_PRICE_SCALE_ANNUAL` | Stripe Dashboard → Products → Scale | `price_1...` |

---

## Summary

**`Deno.env` is NOT a file** - it's a runtime API.

**To set environment variables for Supabase Edge Functions:**
1. Go to: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
2. Click: **Secrets** tab
3. Add each secret: Name + Value
4. Deploy your function
5. Variables are automatically available via `Deno.env.get()`

---

**Need Help?**
- Supabase Secrets Docs: https://supabase.com/docs/guides/functions/secrets
- Stripe API Keys: https://dashboard.stripe.com/apikeys

