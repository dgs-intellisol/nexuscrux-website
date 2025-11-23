# Complete Setup Guide - Stripe + Supabase (Parallel)

## 🎯 Setup Strategy

We'll set up both Stripe and Supabase in parallel, completing each step for both before moving to the next.

## 📋 Setup Checklist

### Phase 1: Get API Keys
- [ ] Stripe: Get publishable key
- [ ] Stripe: Get secret key
- [ ] Supabase: Already have URL and anon key ✅

### Phase 2: Create Products
- [ ] Stripe: Create Starter product (monthly + annual)
- [ ] Stripe: Create Growth product (monthly + annual)
- [ ] Stripe: Create Scale product (monthly + annual)
- [ ] Stripe: Copy all 6 price IDs

### Phase 3: Configure Frontend
- [ ] Update `.env` with Stripe publishable key
- [ ] Update `src/config/stripe.ts` with price IDs

### Phase 4: Configure Backend
- [ ] Set secrets in Supabase Dashboard
- [ ] Deploy Edge Functions

### Phase 5: Test
- [ ] Test Stripe connection
- [ ] Test Supabase function
- [ ] Test end-to-end payment flow

---

## Step-by-Step Instructions

### STEP 1: Get Stripe Keys (5 minutes)

1. **Go to**: https://dashboard.stripe.com
2. **Sign up or Log in**
3. **Enable Test Mode** (toggle top right)
4. **Go to**: Developers → API keys
5. **Copy**:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) - Click "Reveal test key"

### STEP 2: Create Stripe Products (15 minutes)

#### Product 1: Starter Plan

1. **Go to**: Products → Add Product
2. **Name**: `Nexus Crux - Starter`
3. **Description**: `Perfect for small service brands launching their first operation`
4. **Pricing**:
   - **Price 1**: £399.00, Monthly, Recurring
   - **Price 2**: £3,830.00, Yearly, Recurring
5. **Save** and **Copy Price IDs** (look like `price_xxxxx`)

#### Product 2: Growth Plan

1. **Add Product**
2. **Name**: `Nexus Crux - Growth`
3. **Description**: `For growing brands scaling their operations`
4. **Pricing**:
   - **Price 1**: £1,099.00, Monthly, Recurring
   - **Price 2**: £10,550.00, Yearly, Recurring
5. **Save** and **Copy Price IDs**

#### Product 3: Scale Plan

1. **Add Product**
2. **Name**: `Nexus Crux - Scale`
3. **Description**: `For established brands with multiple locations`
4. **Pricing**:
   - **Price 1**: £2,499.00, Monthly, Recurring
   - **Price 2**: £23,990.00, Yearly, Recurring
5. **Save** and **Copy Price IDs**

### STEP 3: Update Frontend Configuration (5 minutes)

#### 3.1 Update .env File

Add your Stripe publishable key:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
```

#### 3.2 Update src/config/stripe.ts

Replace placeholder price IDs with your actual ones:
```typescript
priceIds: {
  starter: {
    monthly: 'price_YOUR_STARTER_MONTHLY_ID',
    annual: 'price_YOUR_STARTER_ANNUAL_ID',
  },
  growth: {
    monthly: 'price_YOUR_GROWTH_MONTHLY_ID',
    annual: 'price_YOUR_GROWTH_ANNUAL_ID',
  },
  scale: {
    monthly: 'price_YOUR_SCALE_MONTHLY_ID',
    annual: 'price_YOUR_SCALE_ANNUAL_ID',
  },
}
```

### STEP 4: Set Supabase Secrets (5 minutes)

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
2. **Scroll to**: Secrets section
3. **Add each secret**:

   | Secret Name | Value |
   |------------|-------|
   | `STRIPE_SECRET_KEY` | Your Stripe secret key (`sk_test_...`) |
   | `STRIPE_PRICE_STARTER_MONTHLY` | Your Starter monthly price ID |
   | `STRIPE_PRICE_STARTER_ANNUAL` | Your Starter annual price ID |
   | `STRIPE_PRICE_GROWTH_MONTHLY` | Your Growth monthly price ID |
   | `STRIPE_PRICE_GROWTH_ANNUAL` | Your Growth annual price ID |
   | `STRIPE_PRICE_SCALE_MONTHLY` | Your Scale monthly price ID |
   | `STRIPE_PRICE_SCALE_ANNUAL` | Your Scale annual price ID |

### STEP 5: Deploy Supabase Functions (5 minutes)

#### Option A: Via Dashboard (Easier)

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. **Click**: Create a new function
3. **Name**: `server`
4. **Copy code** from `supabase/functions/server/index.tsx`
5. **Paste** and **Deploy**

#### Option B: Via CLI (if login works)

```bash
npx supabase@latest functions deploy server
```

### STEP 6: Test Everything (5 minutes)

#### Test 1: Supabase Function
```bash
curl https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
```
Should return: `{"status":"ok"}`

#### Test 2: Stripe Connection
1. Run: `npm run dev`
2. Go to: http://localhost:3000/pricing
3. Click: "Start Free Trial"
4. Check if Stripe Elements loads

#### Test 3: End-to-End
1. Fill customer info
2. Use test card: `4242 4242 4242 4242`
3. Complete payment
4. Check Stripe Dashboard → Payments

---

## Quick Reference

### Stripe
- **Dashboard**: https://dashboard.stripe.com
- **API Keys**: https://dashboard.stripe.com/apikeys
- **Products**: https://dashboard.stripe.com/products
- **Test Cards**: https://stripe.com/docs/testing

### Supabase
- **Dashboard**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb
- **Functions**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
- **Secrets**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions

### Function URLs
- **Base**: `https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server`
- **Health**: `/make-server-fa18f4aa/health`
- **Create Subscription**: `/make-server-fa18f4aa/api/subscriptions/create`

---

## Estimated Time

- **Total**: ~40 minutes
- **Stripe Setup**: ~20 minutes
- **Supabase Setup**: ~10 minutes
- **Testing**: ~10 minutes

---

Let's start with Step 1: Get your Stripe keys!

