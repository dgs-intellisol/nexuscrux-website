# Setting Secrets in Supabase Dashboard

## Step-by-Step Guide

### Step 1: Access Secrets Page

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
2. **Scroll down** to find the **Secrets** section
3. You'll see a list of existing secrets (if any) and an **"Add secret"** button

### Step 2: Add Each Secret

Click **"Add secret"** for each of the 7 secrets below:

#### Secret 1: Stripe Secret Key
- **Name**: `STRIPE_SECRET_KEY`
- **Value**: Your Stripe secret key (starts with `sk_test_` or `sk_live_`)
- **Click**: Save

#### Secret 2: Starter Monthly Price
- **Name**: `STRIPE_PRICE_STARTER_MONTHLY`
- **Value**: Your Starter plan monthly price ID (starts with `price_`)
- **Click**: Save

#### Secret 3: Starter Annual Price
- **Name**: `STRIPE_PRICE_STARTER_ANNUAL`
- **Value**: Your Starter plan annual price ID (starts with `price_`)
- **Click**: Save

#### Secret 4: Growth Monthly Price
- **Name**: `STRIPE_PRICE_GROWTH_MONTHLY`
- **Value**: Your Growth plan monthly price ID (starts with `price_`)
- **Click**: Save

#### Secret 5: Growth Annual Price
- **Name**: `STRIPE_PRICE_GROWTH_ANNUAL`
- **Value**: Your Growth plan annual price ID (starts with `price_`)
- **Click**: Save

#### Secret 6: Scale Monthly Price
- **Name**: `STRIPE_PRICE_SCALE_MONTHLY`
- **Value**: Your Scale plan monthly price ID (starts with `price_`)
- **Click**: Save

#### Secret 7: Scale Annual Price
- **Name**: `STRIPE_PRICE_SCALE_ANNUAL`
- **Value**: Your Scale plan annual price ID (starts with `price_`)
- **Click**: Save

### Step 3: Verify Secrets

After adding all secrets, you should see 7 secrets in the list:
- ✅ STRIPE_SECRET_KEY
- ✅ STRIPE_PRICE_STARTER_MONTHLY
- ✅ STRIPE_PRICE_STARTER_ANNUAL
- ✅ STRIPE_PRICE_GROWTH_MONTHLY
- ✅ STRIPE_PRICE_GROWTH_ANNUAL
- ✅ STRIPE_PRICE_SCALE_MONTHLY
- ✅ STRIPE_PRICE_SCALE_ANNUAL

## Important Notes

1. **Secret Names**: Must match exactly (case-sensitive)
2. **No Spaces**: Don't add spaces before or after the secret name
3. **Price IDs**: Should start with `price_`
4. **Stripe Key**: Should start with `sk_test_` (test mode) or `sk_live_` (live mode)

## Troubleshooting

### Secret not saving
- Check the name matches exactly (case-sensitive)
- Make sure there are no extra spaces
- Try refreshing the page

### Can't find Secrets section
- Make sure you're on the Functions settings page
- Scroll down - it's below the function list
- Check you have the correct project selected

### Secret value not working
- Verify the Stripe key is correct
- Check price IDs are from the correct Stripe account
- Make sure you're using test keys in test mode

---

**Once all secrets are set, proceed to deploy the Edge Functions!**

