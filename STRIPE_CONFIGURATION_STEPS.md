# Stripe Configuration - Step by Step

## Current Status

✅ **Dependencies Installed** - All Stripe packages are ready

## Next Steps to Complete Stripe Setup

### Step 1: Get Stripe API Key (5 minutes)

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com
2. **Sign up or Log in**
3. **Enable Test Mode** (toggle in top right)
4. **Go to**: Developers → API keys
5. **Copy** your Publishable key (starts with `pk_test_`)

### Step 2: Create Environment File (2 minutes)

1. **Create `.env` file** in project root (copy from `.env.example`)
2. **Add your Stripe key**:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
   ```

### Step 3: Create Products in Stripe (15 minutes)

You need to create 3 products with 2 prices each (monthly + annual):

#### Product 1: Starter Plan
- **Name**: Nexus Crux - Starter
- **Monthly Price**: £399
- **Annual Price**: £3,830
- **Copy the Price IDs** (look like `price_xxxxx`)

#### Product 2: Growth Plan
- **Name**: Nexus Crux - Growth
- **Monthly Price**: £1,099
- **Annual Price**: £10,550
- **Copy the Price IDs**

#### Product 3: Scale Plan
- **Name**: Nexus Crux - Scale
- **Monthly Price**: £2,499
- **Annual Price**: £23,990
- **Copy the Price IDs**

### Step 4: Update Configuration File (5 minutes)

Edit `src/config/stripe.ts` and replace the placeholder price IDs:

```typescript
priceIds: {
  starter: {
    monthly: 'price_YOUR_STARTER_MONTHLY_ID',  // ← Replace this
    annual: 'price_YOUR_STARTER_ANNUAL_ID',     // ← Replace this
  },
  growth: {
    monthly: 'price_YOUR_GROWTH_MONTHLY_ID',   // ← Replace this
    annual: 'price_YOUR_GROWTH_ANNUAL_ID',     // ← Replace this
  },
  scale: {
    monthly: 'price_YOUR_SCALE_MONTHLY_ID',    // ← Replace this
    annual: 'price_YOUR_SCALE_ANNUAL_ID',       // ← Replace this
  },
}
```

### Step 5: Test (5 minutes)

1. **Start dev server**: `npm run dev`
2. **Go to**: http://localhost:3000/pricing
3. **Click**: "Start Free Trial" or "Subscribe Now"
4. **Use test card**: `4242 4242 4242 4242`
5. **Verify** in Stripe Dashboard → Payments

## Quick Reference

### Test Card Numbers
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

### Where to Find Things
- **API Keys**: https://dashboard.stripe.com/apikeys
- **Products**: https://dashboard.stripe.com/products
- **Payments**: https://dashboard.stripe.com/payments
- **Test Mode Toggle**: Top right of Stripe Dashboard

## Files to Update

1. ✅ `.env` - Add your publishable key
2. ✅ `src/config/stripe.ts` - Add your price IDs

## Current Configuration Status

- ⚠️ **Stripe Key**: Not configured (using placeholder)
- ⚠️ **Price IDs**: Using placeholders
- ✅ **Dependencies**: Installed
- ✅ **Components**: Ready

## After Configuration

Once you've completed the steps above:
1. Restart dev server (`npm run dev`)
2. Test payment flow
3. Verify in Stripe Dashboard
4. Ready for production! 🚀

---

**Need help?** See `STRIPE_QUICK_SETUP.md` for detailed instructions.

