# Supabase Setup - Complete Walkthrough

## ✅ Step 1: CLI Ready (Using npx)

We'll use `npx supabase@latest` instead of installing globally.

## 🔑 Step 2: Get Supabase Access Token

1. **Go to**: https://supabase.com/dashboard
2. **Sign up or Log in**
3. **Click your profile** (top right) → **Account Settings**
4. **Go to**: **Access Tokens** tab
5. **Click**: **Generate New Token**
6. **Name it**: `nexuscrux-cli` (or any name)
7. **Copy the token** (you'll only see it once!)

## 📝 Step 3: Login via CLI

Once you have your token, we'll run:
```bash
npx supabase@latest login
```

Then paste your token when prompted.

## 🔗 Step 4: Link Project

```bash
npx supabase@latest link --project-ref dvvycujiegrhphdtdqeb
```

## 🔐 Step 5: Get Credentials

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/api
2. **Copy**:
   - Project URL: `https://dvvycujiegrhphdtdqeb.supabase.co` (already known)
   - anon/public key: (already in your code)
   - service_role key: **Copy this** (keep secret!)

## 📄 Step 6: Create .env File

Create `.env` in project root with:
```env
VITE_SUPABASE_URL=https://dvvycujiegrhphdtdqeb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU
```

## 🔒 Step 7: Set Secrets in Dashboard

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
2. **Scroll to**: **Secrets** section
3. **Add secrets** (one by one):
   - `STRIPE_SECRET_KEY` = Your Stripe secret key
   - `STRIPE_PRICE_STARTER_MONTHLY` = Price ID
   - `STRIPE_PRICE_STARTER_ANNUAL` = Price ID
   - `STRIPE_PRICE_GROWTH_MONTHLY` = Price ID
   - `STRIPE_PRICE_GROWTH_ANNUAL` = Price ID
   - `STRIPE_PRICE_SCALE_MONTHLY` = Price ID
   - `STRIPE_PRICE_SCALE_ANNUAL` = Price ID

## 🚀 Step 8: Deploy Functions

```bash
npx supabase@latest functions deploy server
```

## ✅ Step 9: Test

```bash
curl https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
```

