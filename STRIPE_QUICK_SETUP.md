# Stripe Quick Setup Guide

## ✅ Step 1: Dependencies Installed

All required packages are now installed:
- ✅ `@stripe/react-stripe-js`
- ✅ `@stripe/stripe-js`
- ✅ `stripe`
- ✅ `@jsr/supabase__supabase-js`

## 🔑 Step 2: Get Your Stripe API Keys

### 2.1 Create/Login to Stripe Account
1. Go to **https://dashboard.stripe.com**
2. Sign up or log in
3. Make sure you're in **Test Mode** (toggle in top right)

### 2.2 Get Your Publishable Key
1. Go to **Developers** → **API keys**
2. Copy your **Publishable key** (starts with `pk_test_` for test mode)
3. Save it - you'll need it in Step 3

## 📦 Step 3: Create Products in Stripe Dashboard

### 3.1 Navigate to Products
1. In Stripe Dashboard, go to **Products**
2. Click **+ Add Product**

### 3.2 Create Starter Plan

**Product Details:**
- **Name:** `Nexus Crux - Starter`
- **Description:** `Perfect for small service brands launching their first operation`

**Pricing:**
- Click **Add another price**
- **Price:** `£399.00`
- **Billing period:** `Monthly`
- **Recurring:** ✅ Yes
- Click **Add price**
- **Price:** `£3,830.00`
- **Billing period:** `Yearly`
- **Recurring:** ✅ Yes

**After creating, copy the Price IDs** (they look like `price_xxxxx`)

### 3.3 Create Growth Plan

**Product Details:**
- **Name:** `Nexus Crux - Growth`
- **Description:** `For growing brands scaling their operations`

**Pricing:**
- **Monthly:** `£1,099.00` (Recurring)
- **Annual:** `£10,550.00` (Recurring)

**Copy the Price IDs**

### 3.4 Create Scale Plan

**Product Details:**
- **Name:** `Nexus Crux - Scale`
- **Description:** `For established brands with multiple locations`

**Pricing:**
- **Monthly:** `£2,499.00` (Recurring)
- **Annual:** `£23,990.00` (Recurring)

**Copy the Price IDs**

## ⚙️ Step 4: Configure Your Project

### 4.1 Create .env File

Create a file named `.env` in the project root with:

```env
# Stripe Publishable Key (Get from: https://dashboard.stripe.com/apikeys)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE

# Supabase (if using)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4.2 Update Stripe Configuration

Edit `src/config/stripe.ts` and replace the price IDs:

```typescript
export const STRIPE_CONFIG = {
  publishableKey: import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_REPLACE_WITH_YOUR_KEY',
  
  priceIds: {
    starter: {
      monthly: 'price_YOUR_STARTER_MONTHLY_ID',  // Replace with actual ID
      annual: 'price_YOUR_STARTER_ANNUAL_ID',    // Replace with actual ID
    },
    growth: {
      monthly: 'price_YOUR_GROWTH_MONTHLY_ID',   // Replace with actual ID
      annual: 'price_YOUR_GROWTH_ANNUAL_ID',      // Replace with actual ID
    },
    scale: {
      monthly: 'price_YOUR_SCALE_MONTHLY_ID',    // Replace with actual ID
      annual: 'price_YOUR_SCALE_ANNUAL_ID',       // Replace with actual ID
    },
  },
};
```

## 🧪 Step 5: Test the Integration

### 5.1 Start Development Server
```bash
npm run dev
```

### 5.2 Test Payment Flow
1. Navigate to `/pricing` page
2. Click "Start Free Trial" or "Subscribe Now"
3. Fill in customer information
4. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)

### 5.3 Verify in Stripe Dashboard
1. Go to **Payments** → Should see test payment
2. Go to **Customers** → Should see test customer
3. Go to **Subscriptions** → Should see test subscription

## 🚀 Step 6: Production Setup

### 6.1 Switch to Live Mode
1. In Stripe Dashboard, toggle **Test Mode** OFF
2. Get your **Live** publishable key (starts with `pk_live_`)

### 6.2 Update Environment Variables
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
```

### 6.3 Create Live Products
- Repeat Step 3 in **Live Mode**
- Update price IDs in `src/config/stripe.ts`

## 📋 Checklist

- [ ] Stripe account created
- [ ] Publishable key obtained
- [ ] Products created in Stripe (Starter, Growth, Scale)
- [ ] Price IDs copied
- [ ] `.env` file created with publishable key
- [ ] `src/config/stripe.ts` updated with price IDs
- [ ] Test payment successful
- [ ] Verified in Stripe Dashboard

## 🔗 Useful Links

- **Stripe Dashboard:** https://dashboard.stripe.com
- **API Keys:** https://dashboard.stripe.com/apikeys
- **Products:** https://dashboard.stripe.com/products
- **Test Cards:** https://stripe.com/docs/testing
- **Documentation:** https://stripe.com/docs

## ⚠️ Important Notes

1. **Test Mode vs Live Mode**
   - Always test in Test Mode first
   - Never use live keys in development

2. **Security**
   - Publishable keys are safe to expose in frontend
   - Secret keys should NEVER be in frontend code
   - Secret keys only go in Supabase Edge Functions

3. **Price IDs**
   - Price IDs are different for Test and Live modes
   - Make sure to use correct IDs for each environment

## 🆘 Troubleshooting

### Payment form not showing
- Check browser console for errors
- Verify `VITE_STRIPE_PUBLISHABLE_KEY` is set correctly
- Make sure key starts with `pk_test_` or `pk_live_`

### Payment fails
- Check Stripe Dashboard → Logs for errors
- Verify price IDs are correct
- Make sure you're using test cards in test mode

### Subscription not created
- Check Supabase Edge Functions are deployed
- Verify backend configuration
- Check network tab for API errors

