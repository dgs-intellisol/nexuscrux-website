# Backend Setup - Complete Guide

## ✅ What's Already Done

- ✅ Frontend configuration updated (stripe.ts)
- ✅ .env file ready
- ✅ Edge Functions code ready

## 📋 What You Need to Do Now

### Step 1: Set Secrets in Supabase (5-10 minutes)

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
2. **Scroll to**: Secrets section
3. **Add 7 secrets** (see list below)

**Secrets to Add:**

| Secret Name | Value |
|------------|-------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key (`sk_test_...`) |
| `STRIPE_PRICE_STARTER_MONTHLY` | Starter monthly price ID (`price_...`) |
| `STRIPE_PRICE_STARTER_ANNUAL` | Starter annual price ID (`price_...`) |
| `STRIPE_PRICE_GROWTH_MONTHLY` | Growth monthly price ID (`price_...`) |
| `STRIPE_PRICE_GROWTH_ANNUAL` | Growth annual price ID (`price_...`) |
| `STRIPE_PRICE_SCALE_MONTHLY` | Scale monthly price ID (`price_...`) |
| `STRIPE_PRICE_SCALE_ANNUAL` | Scale annual price ID (`price_...`) |

**Important**: Copy secret names exactly as shown (case-sensitive, no spaces)

### Step 2: Deploy Edge Functions (5 minutes)

#### Option A: Via Dashboard (Easier)

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. **Click**: "Create a new function"
3. **Name**: `server`
4. **Open** `supabase/functions/server/index.tsx` in your project
5. **Copy** all the code
6. **Paste** into Supabase function editor
7. **Click**: Deploy

#### Option B: Via CLI

```bash
npx supabase@latest functions deploy server
```

### Step 3: Test Everything (5 minutes)

#### Test 1: Supabase Function Health

```bash
curl https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
```

**Expected**: `{"status":"ok"}`

#### Test 2: Frontend Payment Flow

1. **Run**: `npm run dev`
2. **Go to**: http://localhost:3000/pricing
3. **Click**: "Start Free Trial" or "Subscribe Now"
4. **Fill in**: Customer information
5. **Use test card**: `4242 4242 4242 4242`
6. **Complete**: Payment flow

#### Test 3: Verify in Stripe Dashboard

1. **Go to**: https://dashboard.stripe.com/payments
2. **Check**: Test payment appears
3. **Go to**: https://dashboard.stripe.com/subscriptions
4. **Check**: Subscription created

## 📚 Detailed Guides

- **Setting Secrets**: See `SUPABASE_SECRETS_GUIDE.md`
- **Deploying Functions**: See `DEPLOY_EDGE_FUNCTIONS.md`
- **Complete Setup**: See `COMPLETE_SETUP_GUIDE.md`

## 🔗 Quick Links

### Supabase
- **Dashboard**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb
- **Functions**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
- **Secrets**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions

### Stripe
- **Dashboard**: https://dashboard.stripe.com
- **Payments**: https://dashboard.stripe.com/payments
- **Subscriptions**: https://dashboard.stripe.com/subscriptions

## ✅ Final Checklist

- [ ] All 7 secrets added to Supabase
- [ ] Edge Function deployed
- [ ] Health endpoint returns `{"status":"ok"}`
- [ ] Frontend loads payment form
- [ ] Test payment successful
- [ ] Subscription appears in Stripe Dashboard

## 🎉 Once Complete

Your payment system will be fully functional:
- ✅ Customers can sign up for trials
- ✅ Customers can subscribe immediately
- ✅ Payments processed via Stripe
- ✅ Subscriptions managed via Supabase
- ✅ 14-day free trials supported

---

**Need help with any step? Let me know!**

