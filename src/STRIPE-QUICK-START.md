# Stripe Payment Setup - Quick Start Card

**⏱️ Total Time: ~20 minutes**

---

## ✅ Checklist

### 1️⃣ Database (5 min)

```bash
1. Open Supabase Dashboard → SQL Editor
2. Copy SQL from /STRIPE-DATABASE-SETUP.md
3. Run it
4. Verify 4 tables created: customers, subscriptions, transactions, subscription_events
```

---

### 2️⃣ Stripe Products (10 min)

**Create in [Stripe Dashboard](https://dashboard.stripe.com/products):**

| Plan | Monthly Price | Annual Price | Notes |
|------|---------------|--------------|-------|
| **Starter** | £399.00 | £319.20 | Get 2 Price IDs |
| **Growth** | £1,199.00 | £959.20 | Get 2 Price IDs |
| **Scale** | £2,899.00 | £2,319.20 | Get 2 Price IDs |

**Total: 6 Price IDs needed** (all start with `price_`)

---

### 3️⃣ Environment Variables (5 min)

**Add to Supabase → Project Settings → Edge Functions:**

```bash
# Get from Stripe Dashboard → API Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Get from Stripe Dashboard → Products (Step 2)
STRIPE_PRICE_STARTER_MONTHLY=price_...
STRIPE_PRICE_STARTER_ANNUAL=price_...
STRIPE_PRICE_GROWTH_MONTHLY=price_...
STRIPE_PRICE_GROWTH_ANNUAL=price_...
STRIPE_PRICE_SCALE_MONTHLY=price_...
STRIPE_PRICE_SCALE_ANNUAL=price_...
```

---

## 🧪 Test

1. Go to `/pricing`
2. Click "Start Free Trial"
3. Use test card: `4242 4242 4242 4242`
4. Expiry: `12/34`, CVC: `123`, Postal: `12345`
5. Submit

**Expected:**
- ✅ Success message
- ✅ Record in Stripe Dashboard
- ✅ Record in Supabase `customers` table
- ✅ Record in Supabase `subscriptions` table

---

## 📊 View Records

**Supabase SQL Editor:**

```sql
-- View customers
SELECT * FROM customers ORDER BY created_at DESC;

-- View subscriptions
SELECT * FROM subscriptions ORDER BY created_at DESC;

-- View events
SELECT * FROM subscription_events ORDER BY created_at DESC;
```

---

## ✅ Done!

Payment buttons on Pricing page are now fully connected and recording to database.

**See `/STRIPE-INTEGRATION-SUMMARY.md` for full details.**
