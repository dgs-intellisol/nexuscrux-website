# Stripe Subscriptions & Transactions Database Setup

**Last Updated:** 23 November 2025  
**Purpose:** Complete database schema for recording Stripe subscriptions and transactions

---

## Overview

This document contains SQL scripts for creating database tables to record:

1. **`subscriptions`** - Customer subscriptions and billing details
2. **`transactions`** - Payment transactions and invoices
3. **`customers`** - Customer information synced from Stripe

All tables are designed to integrate with Stripe webhooks for real-time updates.

---

## 🚀 Quick Setup

**Run all SQL blocks below in your Supabase SQL Editor:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste ALL SQL blocks below
5. Click **Run**

---

## Table 1: Customers

### Purpose
Stores customer information synced from Stripe. Links all subscriptions and transactions to a customer record.

### SQL

```sql
-- =====================================================
-- TABLE 1: CUSTOMERS
-- =====================================================

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Stripe reference
  stripe_customer_id TEXT UNIQUE NOT NULL,
  
  -- Customer information
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  
  -- Address (optional)
  address_line1 TEXT,
  address_line2 TEXT,
  address_city TEXT,
  address_state TEXT,
  address_postal_code TEXT,
  address_country TEXT DEFAULT 'GB',
  
  -- Billing details
  currency TEXT DEFAULT 'gbp',
  default_payment_method TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled', 'blocked')),
  
  -- Metadata
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  signup_ip TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  stripe_created_at TIMESTAMPTZ,
  
  -- Notes
  internal_notes TEXT
);

-- Indexes for customers
CREATE INDEX idx_customers_stripe_id ON customers(stripe_customer_id);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_created ON customers(created_at DESC);

-- RLS for customers
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage customers" 
  ON customers 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

COMMENT ON TABLE customers IS 'Customer records synced from Stripe, linking all subscriptions and transactions';
```

---

## Table 2: Subscriptions

### Purpose
Stores all subscription details including plan, billing cycle, trial status, and lifecycle events.

### Status Workflow
`trialing` → `active` → `past_due` → `cancelled` / `unpaid`

### SQL

```sql
-- =====================================================
-- TABLE 2: SUBSCRIPTIONS
-- =====================================================

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Stripe references
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL,
  
  -- Customer reference
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Subscription details
  plan_name TEXT NOT NULL CHECK (plan_name IN ('starter', 'growth', 'scale', 'enterprise')),
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
  
  -- Pricing
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'gbp',
  
  -- Status
  status TEXT NOT NULL CHECK (status IN (
    'incomplete', 
    'incomplete_expired', 
    'trialing', 
    'active', 
    'past_due', 
    'cancelled', 
    'unpaid'
  )),
  
  -- Trial information
  has_trial BOOLEAN DEFAULT false,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  
  -- Billing periods
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  
  -- Cancellation
  cancel_at_period_end BOOLEAN DEFAULT false,
  cancel_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  
  -- Metadata from signup
  signup_source TEXT, -- 'trial', 'direct', 'upgrade'
  additional_info TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  stripe_created_at TIMESTAMPTZ,
  
  -- Notes
  internal_notes TEXT
);

-- Indexes for subscriptions
CREATE INDEX idx_subscriptions_stripe_sub_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_stripe_cust_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_customer_id ON subscriptions(customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_plan ON subscriptions(plan_name);
CREATE INDEX idx_subscriptions_created ON subscriptions(created_at DESC);
CREATE INDEX idx_subscriptions_period_end ON subscriptions(current_period_end);
CREATE INDEX idx_subscriptions_trial_end ON subscriptions(trial_end) WHERE trial_end IS NOT NULL;

-- RLS for subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage subscriptions" 
  ON subscriptions 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

COMMENT ON TABLE subscriptions IS 'Subscription records tracking plan, billing cycle, trial status, and lifecycle events';
```

---

## Table 3: Transactions

### Purpose
Records all payment transactions, including successful payments, failed attempts, and refunds.

### SQL

```sql
-- =====================================================
-- TABLE 3: TRANSACTIONS
-- =====================================================

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Stripe references
  stripe_invoice_id TEXT,
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  
  -- Customer and subscription references
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  
  -- Transaction type
  transaction_type TEXT NOT NULL CHECK (transaction_type IN (
    'subscription_payment',
    'subscription_refund',
    'one_time_payment',
    'refund',
    'failed_payment'
  )),
  
  -- Amount details
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'gbp',
  amount_refunded DECIMAL(10, 2) DEFAULT 0,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN (
    'pending',
    'succeeded',
    'failed',
    'refunded',
    'partially_refunded',
    'cancelled'
  )),
  
  -- Payment method
  payment_method_type TEXT, -- 'card', 'bank_transfer', etc.
  payment_method_last4 TEXT,
  payment_method_brand TEXT, -- 'visa', 'mastercard', etc.
  
  -- Billing period (for subscription payments)
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  
  -- Failure information
  failure_code TEXT,
  failure_message TEXT,
  
  -- Description
  description TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  stripe_created_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB,
  
  -- Notes
  internal_notes TEXT
);

-- Indexes for transactions
CREATE INDEX idx_transactions_stripe_invoice_id ON transactions(stripe_invoice_id) WHERE stripe_invoice_id IS NOT NULL;
CREATE INDEX idx_transactions_stripe_payment_intent_id ON transactions(stripe_payment_intent_id) WHERE stripe_payment_intent_id IS NOT NULL;
CREATE INDEX idx_transactions_stripe_customer_id ON transactions(stripe_customer_id);
CREATE INDEX idx_transactions_customer_id ON transactions(customer_id);
CREATE INDEX idx_transactions_subscription_id ON transactions(subscription_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);
CREATE INDEX idx_transactions_created ON transactions(created_at DESC);
CREATE INDEX idx_transactions_paid_at ON transactions(paid_at) WHERE paid_at IS NOT NULL;

-- RLS for transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage transactions" 
  ON transactions 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

COMMENT ON TABLE transactions IS 'Payment transaction records including successful payments, failures, and refunds';
```

---

## Table 4: Subscription Events (Audit Log)

### Purpose
Tracks all subscription lifecycle events for auditing and analytics.

### SQL

```sql
-- =====================================================
-- TABLE 4: SUBSCRIPTION EVENTS
-- =====================================================

CREATE TABLE subscription_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- References
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT NOT NULL,
  
  -- Event details
  event_type TEXT NOT NULL CHECK (event_type IN (
    'subscription_created',
    'subscription_activated',
    'subscription_trial_started',
    'subscription_trial_ended',
    'subscription_renewed',
    'subscription_updated',
    'subscription_cancelled',
    'subscription_reactivated',
    'payment_succeeded',
    'payment_failed',
    'plan_changed',
    'billing_cycle_changed'
  )),
  
  -- Event data
  previous_value TEXT,
  new_value TEXT,
  description TEXT,
  
  -- Metadata
  metadata JSONB,
  
  -- Timestamp
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for subscription_events
CREATE INDEX idx_subscription_events_subscription_id ON subscription_events(subscription_id);
CREATE INDEX idx_subscription_events_customer_id ON subscription_events(customer_id);
CREATE INDEX idx_subscription_events_type ON subscription_events(event_type);
CREATE INDEX idx_subscription_events_created ON subscription_events(created_at DESC);

-- RLS for subscription_events
ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage subscription events" 
  ON subscription_events 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

COMMENT ON TABLE subscription_events IS 'Audit log of all subscription lifecycle events for analytics and debugging';
```

---

## Shared: Updated_at Triggers

### SQL

```sql
-- =====================================================
-- UPDATED_AT TRIGGERS
-- =====================================================

-- Create or replace the trigger function (if not already created)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to customers
CREATE TRIGGER update_customers_updated_at 
  BEFORE UPDATE ON customers 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to subscriptions
CREATE TRIGGER update_subscriptions_updated_at 
  BEFORE UPDATE ON subscriptions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to transactions
CREATE TRIGGER update_transactions_updated_at 
  BEFORE UPDATE ON transactions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 📊 Table Relationships

```
customers
    ↓ (1:N)
    ├─→ subscriptions
    │       ↓ (1:N)
    │       └─→ subscription_events
    │
    └─→ transactions
            ↑
            │
    subscriptions (1:N)
```

---

## 🔍 Usage Examples

### Create Customer Record

```sql
INSERT INTO customers (
  stripe_customer_id,
  email,
  name,
  phone,
  company
)
VALUES (
  'cus_ABC123XYZ',
  'customer@example.com',
  'Jane Smith',
  '+44 20 7946 0958',
  'Example Corp'
)
RETURNING id, stripe_customer_id;
```

### Create Subscription Record

```sql
INSERT INTO subscriptions (
  stripe_subscription_id,
  stripe_customer_id,
  stripe_price_id,
  customer_id,
  plan_name,
  billing_cycle,
  amount,
  status,
  has_trial,
  trial_start,
  trial_end,
  current_period_start,
  current_period_end,
  signup_source
)
VALUES (
  'sub_ABC123XYZ',
  'cus_ABC123XYZ',
  'price_starter_monthly',
  'uuid-from-customers-table',
  'starter',
  'monthly',
  399.00,
  'trialing',
  true,
  NOW(),
  NOW() + INTERVAL '14 days',
  NOW(),
  NOW() + INTERVAL '1 month',
  'trial'
)
RETURNING id, stripe_subscription_id;
```

### Record Successful Payment

```sql
INSERT INTO transactions (
  stripe_invoice_id,
  stripe_payment_intent_id,
  stripe_charge_id,
  stripe_customer_id,
  stripe_subscription_id,
  customer_id,
  subscription_id,
  transaction_type,
  amount,
  status,
  payment_method_type,
  payment_method_last4,
  payment_method_brand,
  period_start,
  period_end,
  description,
  paid_at
)
VALUES (
  'in_ABC123',
  'pi_ABC123',
  'ch_ABC123',
  'cus_ABC123XYZ',
  'sub_ABC123XYZ',
  'uuid-from-customers-table',
  'uuid-from-subscriptions-table',
  'subscription_payment',
  399.00,
  'succeeded',
  'card',
  '4242',
  'visa',
  NOW(),
  NOW() + INTERVAL '1 month',
  'Starter Plan - Monthly',
  NOW()
)
RETURNING id;
```

### Log Subscription Event

```sql
INSERT INTO subscription_events (
  subscription_id,
  customer_id,
  stripe_subscription_id,
  event_type,
  description
)
VALUES (
  'uuid-from-subscriptions-table',
  'uuid-from-customers-table',
  'sub_ABC123XYZ',
  'subscription_created',
  'Customer signed up for Starter plan with 14-day trial'
)
RETURNING id;
```

---

## 📋 Analytics Queries

### Monthly Recurring Revenue (MRR)

```sql
SELECT 
  SUM(
    CASE 
      WHEN billing_cycle = 'monthly' THEN amount
      WHEN billing_cycle = 'annual' THEN amount / 12
    END
  ) as mrr
FROM subscriptions
WHERE status IN ('trialing', 'active');
```

### Active Subscriptions by Plan

```sql
SELECT 
  plan_name,
  billing_cycle,
  COUNT(*) as count,
  SUM(amount) as total_value
FROM subscriptions
WHERE status IN ('trialing', 'active')
GROUP BY plan_name, billing_cycle
ORDER BY plan_name, billing_cycle;
```

### Trial Conversion Rate

```sql
SELECT 
  COUNT(CASE WHEN has_trial = true THEN 1 END) as total_trials,
  COUNT(CASE WHEN has_trial = true AND status = 'active' AND trial_end < NOW() THEN 1 END) as converted_trials,
  ROUND(
    COUNT(CASE WHEN has_trial = true AND status = 'active' AND trial_end < NOW() THEN 1 END) * 100.0 / 
    NULLIF(COUNT(CASE WHEN has_trial = true THEN 1 END), 0),
    2
  ) as conversion_rate
FROM subscriptions;
```

### Revenue Last 30 Days

```sql
SELECT 
  DATE(paid_at) as date,
  COUNT(*) as transaction_count,
  SUM(amount) as daily_revenue
FROM transactions
WHERE status = 'succeeded'
  AND paid_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(paid_at)
ORDER BY date DESC;
```

### Churn Analysis

```sql
SELECT 
  DATE_TRUNC('month', cancelled_at) as month,
  COUNT(*) as cancelled_count,
  AVG(
    EXTRACT(EPOCH FROM (cancelled_at - created_at)) / 86400
  ) as avg_days_subscribed
FROM subscriptions
WHERE status = 'cancelled'
  AND cancelled_at IS NOT NULL
GROUP BY DATE_TRUNC('month', cancelled_at)
ORDER BY month DESC;
```

### Failed Payments

```sql
SELECT 
  c.email,
  c.name,
  s.plan_name,
  t.amount,
  t.failure_message,
  t.created_at
FROM transactions t
JOIN customers c ON t.customer_id = c.id
LEFT JOIN subscriptions s ON t.subscription_id = s.id
WHERE t.status = 'failed'
  AND t.created_at >= NOW() - INTERVAL '7 days'
ORDER BY t.created_at DESC;
```

---

## 🔄 Stripe Webhook Integration

These tables should be updated via Stripe webhooks. Key events to handle:

### Customer Events
- `customer.created` → Insert into `customers`
- `customer.updated` → Update `customers`
- `customer.deleted` → Update status to 'cancelled'

### Subscription Events
- `customer.subscription.created` → Insert into `subscriptions` + `subscription_events`
- `customer.subscription.updated` → Update `subscriptions` + insert `subscription_events`
- `customer.subscription.deleted` → Update `subscriptions` status + insert `subscription_events`
- `customer.subscription.trial_will_end` → Insert `subscription_events`

### Payment Events
- `invoice.paid` → Insert into `transactions` with status 'succeeded'
- `invoice.payment_failed` → Insert into `transactions` with status 'failed'
- `charge.refunded` → Update `transactions` or insert refund record
- `payment_intent.succeeded` → Update `transactions`
- `payment_intent.payment_failed` → Insert into `transactions` with failure details

See `/STRIPE-WEBHOOK-HANDLER.md` for webhook implementation.

---

## 📚 Related Files

- **Subscription API**: `/supabase/functions/server/subscriptions.ts`
- **Stripe Utilities**: `/utils/stripe.ts`
- **Frontend Components**: `/components/SubscribeDialog.tsx`, `/components/TrialSignupDialog.tsx`
- **Pricing Page**: `/pages/PricingPage.tsx`
- **Stripe Setup Guide**: `/STRIPE-SETUP-GUIDE.md`

---

## ✅ Post-Setup Verification

After running the SQL:

1. Go to **Table Editor** in Supabase Dashboard
2. Verify four new tables exist:
   - ✅ `customers`
   - ✅ `subscriptions`
   - ✅ `transactions`
   - ✅ `subscription_events`
3. Check table structures match the schemas above
4. Verify indexes were created
5. Test by inserting sample data

---

**Version:** 1.0  
**Last Updated:** 23 November 2025  
**Status:** Production Ready
