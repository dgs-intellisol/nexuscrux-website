# Stripe Integration Setup Guide

**Last Updated:** 23 November 2025  
**Domain:** nexuscrux.io

---

## Overview

This guide walks you through setting up Stripe payment processing for Nexus Crux with:
- **14-day free trials** with automatic charging after trial ends
- **Immediate subscriptions** with instant payment
- Secure payment collection via Stripe Elements
- Backend subscription management via Supabase Edge Functions

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                        │
│                                                                 │
│  Pricing Page → Dialog (2 steps) → Stripe Elements → Success   │
│                                                                 │
│  Step 1: Customer Info (name, email, company, phone)           │
│  Step 2: Payment Method (Stripe CardElement)                   │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE EDGE FUNCTION                       │
│                                                                 │
│  /api/subscriptions/create                                      │
│  - Creates Stripe Customer                                      │
│  - Attaches Payment Method                                      │
│  - Creates Subscription (with or without trial)                 │
│  - Returns subscription ID                                      │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                           STRIPE API                            │
│                                                                 │
│  - stripe.customers.create()                                    │
│  - stripe.paymentMethods.attach()                               │
│  - stripe.subscriptions.create({ trial_period_days: 14 })      │
│  - Handles billing automatically after 14 days                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Create Stripe Account

1. Go to **https://dashboard.stripe.com/register**
2. Sign up for a Stripe account
3. Complete account verification
4. Enable **Test Mode** (toggle in top right)

---

## Step 2: Create Products & Prices in Stripe

### Navigate to Products

1. Go to **Products** in Stripe Dashboard
2. Click **+ Add Product**

### Create Products

Create 3 products:

#### 1. Starter Plan
- **Name:** Nexus Crux - Starter
- **Description:** Perfect for small service brands launching their first operation
- **Pricing:**
  - **Monthly:** £399/month (Recurring)
  - **Annual:** £3,830/year (Recurring)
- **Metadata:**
  - `plan_name`: `starter`
  - `jobs_limit`: `500`
  - `tenants_limit`: `1`

#### 2. Growth Plan
- **Name:** Nexus Crux - Growth
- **Description:** For growing brands scaling their operations
- **Pricing:**
  - **Monthly:** £1,099/month (Recurring)
  - **Annual:** £10,550/year (Recurring)
- **Metadata:**
  - `plan_name`: `growth`
  - `jobs_limit`: `2500`
  - `tenants_limit`: `3`

#### 3. Scale Plan
- **Name:** Nexus Crux - Scale
- **Description:** For established brands with multiple locations
- **Pricing:**
  - **Monthly:** £2,499/month (Recurring)
  - **Annual:** £23,990/year (Recurring)
- **Metadata:**
  - `plan_name`: `scale`
  - `jobs_limit`: `10000`
  - `tenants_limit`: `10`

### Copy Price IDs

After creating each price, copy the **Price ID** (starts with `price_`). You'll need these for configuration.

Example:
```
price_1AbCdEfGhIjKlMnO  → Starter Monthly
price_1XyZaBcDeFgHiJkL  → Starter Annual
price_1QwErTyUiOpAsDfG  → Growth Monthly
...
```

---

## Step 3: Get Stripe API Keys

1. Go to **Developers** → **API keys** in Stripe Dashboard
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Reveal and copy your **Secret key** (starts with `sk_test_`)

⚠️ **Important:**
- **Publishable key** = Safe to use in frontend
- **Secret key** = NEVER expose in frontend, only in backend

---

## Step 4: Configure Environment Variables

### Option 1: Using Configuration File (Recommended for Testing)

Update `/config/stripe.ts` with your Stripe keys:

```typescript
export const STRIPE_CONFIG = {
  // Replace with your actual Stripe publishable key
  publishableKey: 'pk_test_51xxxxxxxxxxxxx', // From Stripe Dashboard
  
  // Replace with your actual Stripe Price IDs
  priceIds: {
    starter: {
      monthly: 'price_1xxxSTARTERMONTHLY',
      annual: 'price_1xxxSTARTERANNUAL',
    },
    growth: {
      monthly: 'price_1xxxGROWTHMONTHLY',
      annual: 'price_1xxxGROWTHANNUAL',
    },
    scale: {
      monthly: 'price_1xxxSCALEMONTHLY',
      annual: 'price_1xxxSCALEANNUAL',
    },
  },
};
```

⚠️ **Security Note:** For production, use environment variables instead of hardcoding keys.

### Option 2: Using Environment Variables (Recommended for Production)

In Figma Make UI, you should already have these secrets set up (created automatically):

1. **STRIPE_PUBLISHABLE_KEY** - Your Stripe publishable key
2. **STRIPE_SECRET_KEY** - Your Stripe secret key

Additionally, set up Price IDs as environment variables:

3. **STRIPE_PRICE_STARTER_MONTHLY** - `price_xxx`
4. **STRIPE_PRICE_STARTER_ANNUAL** - `price_xxx`
5. **STRIPE_PRICE_GROWTH_MONTHLY** - `price_xxx`
6. **STRIPE_PRICE_GROWTH_ANNUAL** - `price_xxx`
7. **STRIPE_PRICE_SCALE_MONTHLY** - `price_xxx`
8. **STRIPE_PRICE_SCALE_ANNUAL** - `price_xxx`

### Create .env.local file (for local development)

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
```

---

## Step 5: Update Price IDs in Code

Update `/supabase/functions/server/subscriptions.ts`:

```typescript
function getStripePriceId(planName: string, billingCycle: string): string | null {
  const priceMap: Record<string, { monthly: string; annual: string }> = {
    starter: {
      monthly: Deno.env.get('STRIPE_PRICE_STARTER_MONTHLY') || 'price_xxxSTARTERMONTHLY',
      annual: Deno.env.get('STRIPE_PRICE_STARTER_ANNUAL') || 'price_xxxSTARTERANNUAL',
    },
    growth: {
      monthly: Deno.env.get('STRIPE_PRICE_GROWTH_MONTHLY') || 'price_xxxGROWTHMONTHLY',
      annual: Deno.env.get('STRIPE_PRICE_GROWTH_ANNUAL') || 'price_xxxGROWTHANNUAL',
    },
    scale: {
      monthly: Deno.env.get('STRIPE_PRICE_SCALE_MONTHLY') || 'price_xxxSCALEMONTHLY',
      annual: Deno.env.get('STRIPE_PRICE_SCALE_ANNUAL') || 'price_xxxSCALEANNUAL',
    },
  };

  // ... rest of function
}
```

Replace the fallback values with your actual Stripe Price IDs.

---

## Step 6: Test the Integration

### Test Mode

Stripe provides test card numbers:

**Success:**
- `4242 4242 4242 4242` - Visa (always succeeds)
- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC (e.g., 123)
- Any ZIP code (e.g., 12345)

**Failure:**
- `4000 0000 0000 0002` - Card declined
- `4000 0000 0000 9995` - Insufficient funds

### Testing Flow

#### Test Free Trial

1. Go to **https://nexuscrux.io/pricing**
2. Click **"Start 14-Day Free Trial"** on any plan
3. Fill out customer information:
   - Name: Test User
   - Email: test@example.com
   - Company: Test Company Ltd
   - Phone: +44 20 7946 0958
4. Click **"Continue to Payment"**
5. Enter test card: `4242 4242 4242 4242`
6. Verify alert says: **"Your card will not be charged today"**
7. Click **"Start 14-Day Free Trial"**
8. Should see success screen with subscription ID

#### Test Immediate Subscription

1. Click **"or Subscribe Now →"** link
2. Fill out same information
3. Enter test card
4. Verify alert says: **"Your card will be charged £399 today"** (or respective price)
5. Click **"Pay £399 & Subscribe"**
6. Should see success screen

#### Verify in Stripe Dashboard

1. Go to **Customers** in Stripe Dashboard
2. You should see new customer: "Test User" (test@example.com)
3. Click customer → View subscription
4. **For trial:** Status should be "Trialing" with trial end date 14 days from now
5. **For immediate:** Status should be "Active" with immediate charge

---

## Step 7: Set Up Webhooks (Important!)

Webhooks allow Stripe to notify your backend when events occur (payment succeeded, subscription cancelled, etc.).

### Create Webhook Endpoint

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **+ Add endpoint**
3. **Endpoint URL:**
   ```
   https://<your-project-id>.supabase.co/functions/v1/make-server-fa18f4aa/api/webhooks/stripe
   ```
4. **Events to listen for:**
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end` (sends 3 days before trial ends)
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

### Create Webhook Handler

Create `/supabase/functions/server/webhooks.ts`:

```typescript
import { Hono } from 'npm:hono';
import Stripe from 'npm:stripe@14.10.0';

const app = new Hono();
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2024-11-20.acacia',
});

app.post('/stripe', async (c) => {
  const sig = c.req.header('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  
  if (!sig || !webhookSecret) {
    return c.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  try {
    const rawBody = await c.req.text();
    const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

    console.log(`📥 Webhook received: ${event.type}`);

    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        // Send reminder email 3 days before trial ends
        const subscription = event.data.object;
        console.log(`⏰ Trial ending soon for ${subscription.id}`);
        // TODO: Send email notification
        break;

      case 'invoice.payment_succeeded':
        // Payment succeeded - activate/continue subscription
        const invoice = event.data.object;
        console.log(`✅ Payment succeeded: ${invoice.id}`);
        // TODO: Update user's subscription status in your database
        break;

      case 'invoice.payment_failed':
        // Payment failed - notify user
        const failedInvoice = event.data.object;
        console.log(`❌ Payment failed: ${failedInvoice.id}`);
        // TODO: Send payment failure email
        break;

      case 'customer.subscription.deleted':
        // Subscription cancelled
        const deletedSub = event.data.object;
        console.log(`🚫 Subscription cancelled: ${deletedSub.id}`);
        // TODO: Revoke user access
        break;
    }

    return c.json({ received: true });
  } catch (err) {
    console.error(`⚠️ Webhook Error: ${err.message}`);
    return c.json({ error: err.message }, { status: 400 });
  }
});

export default app;
```

### Mount Webhook Router

Update `/supabase/functions/server/index.tsx`:

```typescript
import webhooks from "./webhooks.ts";

app.route("/make-server-fa18f4aa/api/webhooks", webhooks);
```

### Add STRIPE_WEBHOOK_SECRET Environment Variable

Add the webhook signing secret to your environment variables.

---

## Step 8: Handle Post-Subscription Flow

### Create User Accounts

When a subscription is created successfully, you should:

1. **Create user account** in your database
2. **Send welcome email** with login credentials
3. **Set subscription status** in database

Example after successful subscription:

```typescript
// In your subscription creation response handler
if (response.success && response.subscriptionId) {
  // 1. Create user in database
  const user = await createUser({
    email: customerInfo.email,
    name: customerInfo.name,
    company: customerInfo.company,
    phone: customerInfo.phone,
  });

  // 2. Store subscription info
  await saveSubscription({
    userId: user.id,
    stripeSubscriptionId: response.subscriptionId,
    stripeCustomerId: response.customerId,
    plan: selectedPlan,
    billingCycle: billingCycle,
    status: response.status, // 'trialing' or 'active'
    trialEnd: response.trialEnd,
  });

  // 3. Send welcome email
  await sendWelcomeEmail({
    to: customerInfo.email,
    name: customerInfo.name,
    loginUrl: 'https://app.nexuscrux.io',
    tempPassword: generatedPassword,
  });

  // 4. Show success state
  setStep('success');
}
```

---

## Step 9: Go Live

### When Ready for Production

1. **Switch to Live Mode** in Stripe Dashboard (toggle in top right)
2. Create **Products & Prices** again in Live Mode
3. Update **environment variables** with live keys:
   - `STRIPE_PUBLISHABLE_KEY` → `pk_live_xxxxx`
   - `STRIPE_SECRET_KEY` → `sk_live_xxxxx`
   - Update all Price IDs to live versions
4. Update **webhook endpoint** to point to production URL
5. Complete **Stripe account activation**:
   - Business details
   - Bank account for payouts
   - Identity verification

### Stripe Account Activation Requirements

- Business information
- Bank account details (for receiving payouts)
- Identity verification (photo ID)
- Terms of service acceptance

---

## Testing Checklist

### ✅ Free Trial Flow

- [ ] Customer info form validates correctly
- [ ] Payment form loads Stripe Elements
- [ ] Test card `4242 4242 4242 4242` succeeds
- [ ] Alert correctly states "not charged today"
- [ ] Success screen shows after submission
- [ ] Customer appears in Stripe Dashboard
- [ ] Subscription status is "Trialing"
- [ ] Trial end date is 14 days from now
- [ ] Customer receives welcome email
- [ ] Customer can log in to dashboard

### ✅ Immediate Subscription Flow

- [ ] "Subscribe Now" link works
- [ ] Alert states "charged today" with correct price
- [ ] Test card succeeds
- [ ] Success screen shows
- [ ] Customer appears in Stripe
- [ ] Subscription status is "Active"
- [ ] Payment is immediately processed
- [ ] Invoice is created
- [ ] Welcome email sent

### ✅ Error Handling

- [ ] Declined card (`4000 0000 0000 0002`) shows error
- [ ] Error message is user-friendly
- [ ] User can retry with different card
- [ ] Form validation works (required fields)
- [ ] Network errors are handled gracefully

### ✅ Webhooks

- [ ] Webhook endpoint is accessible
- [ ] `customer.subscription.trial_will_end` triggers 3 days before
- [ ] `invoice.payment_succeeded` triggers on successful payment
- [ ] `invoice.payment_failed` triggers on failed payment
- [ ] Webhook events are logged correctly

---

## Common Issues & Solutions

### Issue: "Stripe has not loaded yet"

**Solution:** Ensure `VITE_STRIPE_PUBLISHABLE_KEY` is set correctly in environment variables.

### Issue: "Invalid price ID"

**Solution:** Check that Price IDs in `getStripePriceId()` function match your Stripe Dashboard.

### Issue: "Webhook signature verification failed"

**Solution:** Verify `STRIPE_WEBHOOK_SECRET` matches the signing secret from Stripe Dashboard.

### Issue: "Payment succeeds but user not created"

**Solution:** Check backend logs in Supabase Functions for errors. Ensure database is accessible.

### Issue: "Card declined in test mode"

**Solution:** Use test card `4242 4242 4242 4242`. Ensure you're in Test Mode in Stripe Dashboard.

---

## Security Best Practices

1. **Never expose `STRIPE_SECRET_KEY` in frontend**
2. **Always use HTTPS** in production
3. **Validate webhook signatures** to ensure requests are from Stripe
4. **Use environment variables** for all sensitive data
5. **Enable Stripe Radar** for fraud detection
6. **Require 3D Secure** for high-value transactions
7. **Log all payment events** for audit trail

---

## Support & Documentation

- **Stripe Documentation:** https://stripe.com/docs
- **Stripe API Reference:** https://stripe.com/docs/api
- **Test Cards:** https://stripe.com/docs/testing
- **Webhooks Guide:** https://stripe.com/docs/webhooks

**For Questions:**
- Email: support@nexuscrux.io
- Internal team: Check `/PRICING-FLOW-DOCUMENTATION.md`

---

## Summary

You've successfully integrated Stripe payments with:

✅ **14-day free trials** - Card collected but not charged until trial ends  
✅ **Immediate subscriptions** - Card charged immediately  
✅ **Secure payment collection** - via Stripe Elements  
✅ **Backend subscription management** - via Supabase Edge Functions  
✅ **Webhook handling** - for automated subscription lifecycle events  

**Next Steps:**
1. Test both flows thoroughly in Test Mode
2. Set up email notifications for trial reminders
3. Implement user dashboard for subscription management
4. Complete Stripe account activation
5. Switch to Live Mode when ready

---

*Last updated: 23 November 2025*