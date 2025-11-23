# How to Create Products in Stripe - Step by Step

## Overview

You need to create 3 products, each with 2 prices (monthly and annual).

## Products to Create

1. **Starter Plan** - £399/month, £3,830/year
2. **Growth Plan** - £1,099/month, £10,550/year
3. **Scale Plan** - £2,499/month, £23,990/year

---

## Step-by-Step Instructions

### Step 1: Access Stripe Dashboard

1. **Go to**: https://dashboard.stripe.com
2. **Make sure you're in Test Mode** (toggle in top right should say "Test mode")
3. **Click**: **Products** in the left sidebar

### Step 2: Create Starter Plan

#### 2.1 Add New Product

1. **Click**: **+ Add product** button (top right)
2. **Product information** section:
   - **Name**: `Nexus Crux - Starter`
   - **Description**: `Perfect for small service brands launching their first operation`
   - **Leave other fields as default**

#### 2.2 Add Monthly Price

1. **In the Pricing section**, click **Add another price**
2. **Price details**:
   - **Price**: `399.00`
   - **Currency**: `GBP` (British Pound)
   - **Billing period**: Select **Monthly**
   - **Recurring**: ✅ **Yes** (toggle ON)
   - **Leave other options as default**
3. **Click**: **Add price**

#### 2.3 Add Annual Price

1. **Click**: **Add another price** again
2. **Price details**:
   - **Price**: `3830.00`
   - **Currency**: `GBP` (British Pound)
   - **Billing period**: Select **Yearly**
   - **Recurring**: ✅ **Yes** (toggle ON)
   - **Leave other options as default**
3. **Click**: **Add price**

#### 2.4 Save Product

1. **Click**: **Save product** (bottom right)
2. **Copy the Price IDs**:
   - You'll see two prices listed
   - Each has a Price ID that looks like `price_1ABC123...`
   - **Copy both Price IDs** (one for monthly, one for annual)
   - **Note which is which!**

---

### Step 3: Create Growth Plan

#### 3.1 Add New Product

1. **Click**: **+ Add product** button again
2. **Product information**:
   - **Name**: `Nexus Crux - Growth`
   - **Description**: `For growing brands scaling their operations`

#### 3.2 Add Monthly Price

1. **Add price**:
   - **Price**: `1099.00`
   - **Currency**: `GBP`
   - **Billing period**: **Monthly**
   - **Recurring**: ✅ **Yes**

#### 3.3 Add Annual Price

1. **Add another price**:
   - **Price**: `10550.00`
   - **Currency**: `GBP`
   - **Billing period**: **Yearly**
   - **Recurring**: ✅ **Yes**

#### 3.4 Save and Copy Price IDs

1. **Click**: **Save product**
2. **Copy both Price IDs** (monthly and annual)

---

### Step 4: Create Scale Plan

#### 4.1 Add New Product

1. **Click**: **+ Add product** button
2. **Product information**:
   - **Name**: `Nexus Crux - Scale`
   - **Description**: `For established brands with multiple locations`

#### 4.2 Add Monthly Price

1. **Add price**:
   - **Price**: `2499.00`
   - **Currency**: `GBP`
   - **Billing period**: **Monthly**
   - **Recurring**: ✅ **Yes**

#### 4.3 Add Annual Price

1. **Add another price**:
   - **Price**: `23990.00`
   - **Currency**: `GBP`
   - **Billing period**: **Yearly**
   - **Recurring**: ✅ **Yes**

#### 4.4 Save and Copy Price IDs

1. **Click**: **Save product**
2. **Copy both Price IDs** (monthly and annual)

---

## How to Find Price IDs

After creating each product:

1. **The product page will show** all prices
2. **Each price has a Price ID** that looks like: `price_1ABC123def456GHI789`
3. **To copy**:
   - Click on the price
   - Or look for the Price ID in the price list
   - Click the copy icon next to the Price ID

**Important**: Make sure you note which Price ID is monthly and which is annual!

---

## Quick Reference Table

After creating all products, you should have:

| Plan | Monthly Price ID | Annual Price ID |
|------|------------------|-----------------|
| Starter | `price_xxxxx` | `price_xxxxx` |
| Growth | `price_xxxxx` | `price_xxxxx` |
| Scale | `price_xxxxx` | `price_xxxxx` |

---

## Common Issues

### Issue: Can't find "Add another price"
- **Solution**: Make sure you're on the product creation/edit page
- Look for the pricing section below the product details

### Issue: Price ID not showing
- **Solution**: After saving the product, refresh the page
- Price IDs appear after the product is saved

### Issue: Wrong currency
- **Solution**: Make sure you select **GBP** (British Pound)
- You can change it in the price details

### Issue: Recurring toggle not working
- **Solution**: Make sure you toggle **Recurring** to **Yes**
- This is important for subscriptions!

---

## Verification Checklist

After creating all products, verify:

- [ ] 3 products created (Starter, Growth, Scale)
- [ ] Each product has 2 prices (monthly + annual)
- [ ] All prices are recurring (subscription)
- [ ] All prices are in GBP
- [ ] All 6 Price IDs copied
- [ ] Price IDs noted as monthly or annual

---

## Next Steps

Once you have all 6 Price IDs:

1. **Update** `src/config/stripe.ts` with the Price IDs
2. **Set secrets** in Supabase Dashboard with the Price IDs
3. **Test** the payment flow

---

**Need help?** Let me know if you get stuck on any step!

