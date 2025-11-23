# ⚠️ Stripe Configuration Check

## Potential Issue Found

**File**: `src/config/stripe.ts`

### Issue
The `priceIds` in your Stripe configuration use `prod_` prefix:
```typescript
priceIds: {
  starter: {
    monthly: 'prod_TTZjnclkmePCyh',  // ⚠️ This is a Product ID
    annual: 'prod_TTZkdXj71Z1Y3g',  // ⚠️ This is a Product ID
  },
  // ...
}
```

### Problem
- **Product IDs** start with `prod_` - These identify the product itself
- **Price IDs** start with `price_` - These identify the pricing tier (monthly/annual)
- Stripe subscriptions require **Price IDs**, not Product IDs

### Impact
- ❌ Subscription creation will fail
- ❌ Error: "Invalid price ID" or similar
- ❌ Payment processing won't work

## ✅ Solution

### Step 1: Get Price IDs from Stripe Dashboard

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com/products
2. **Click on each product** (Starter, Growth, Scale)
3. **For each product**, you'll see:
   - **Product ID**: `prod_...` (what you currently have)
   - **Price IDs**: `price_...` (what you need)
     - One for monthly billing
     - One for annual billing

### Step 2: Update `src/config/stripe.ts`

Replace the `prod_` IDs with `price_` IDs:

```typescript
priceIds: {
  starter: {
    monthly: 'price_XXXXXXXXXXXXX',  // ← Price ID for monthly
    annual: 'price_YYYYYYYYYYYYY',   // ← Price ID for annual
  },
  growth: {
    monthly: 'price_ZZZZZZZZZZZZZ',
    annual: 'price_AAAAAAAAAAAAA',
  },
  scale: {
    monthly: 'price_BBBBBBBBBBBBB',
    annual: 'price_CCCCCCCCCCCCC',
  },
},
```

### Step 3: Verify

After updating:
1. Rebuild the website: `npm run build`
2. Test subscription creation
3. Check browser console for errors

## How to Find Price IDs

1. **Stripe Dashboard** → **Products**
2. Click on a product (e.g., "Starter Plan")
3. Scroll to **"Pricing"** section
4. You'll see:
   - **Monthly**: `price_...` ← Copy this
   - **Annual**: `price_...` ← Copy this

## Current Status

- ⚠️ **Configuration**: Uses Product IDs (incorrect)
- ✅ **Code**: Correctly structured
- ❌ **Will fail**: When creating subscriptions

## Priority

**HIGH** - This will prevent subscriptions from working.

---

**Action Required**: Update `src/config/stripe.ts` with correct Price IDs from Stripe Dashboard.

