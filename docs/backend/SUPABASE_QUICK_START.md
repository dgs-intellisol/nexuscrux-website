# Supabase Quick Start Guide

## ✅ Current Status

- **Project ID**: `dvvycujiegrhphdtdqeb`
- **Project URL**: `https://dvvycujiegrhphdtdqeb.supabase.co`
- **Anon Key**: Already in code (`src/utils/supabase/info.tsx`)
- **Edge Functions**: Ready in `supabase/functions/server/`

## 🚀 Quick Setup Steps

### Step 1: Install Supabase CLI (5 minutes)

```bash
npm install -g supabase
```

Verify:
```bash
supabase --version
```

### Step 2: Login to Supabase (2 minutes)

1. Go to: https://supabase.com/dashboard
2. Sign up or log in
3. Go to: Account Settings → Access Tokens
4. Create new token and copy it
5. Run:
   ```bash
   supabase login
   ```
6. Paste your token

### Step 3: Link Your Project (1 minute)

```bash
supabase link --project-ref dvvycujiegrhphdtdqeb
```

### Step 4: Get Your Credentials (2 minutes)

1. Go to: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/api
2. Copy:
   - **Project URL**: `https://dvvycujiegrhphdtdqeb.supabase.co` (already known)
   - **anon/public key**: (already in your code)
   - **service_role key**: Copy this (keep secret!)

### Step 5: Create .env File (2 minutes)

Copy `.env.example` to `.env` and update:

```env
VITE_SUPABASE_URL=https://dvvycujiegrhphdtdqeb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU
```

### Step 6: Set Secrets in Supabase Dashboard (5 minutes)

1. Go to: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
2. Scroll to **Secrets**
3. Add these secrets:
   - `STRIPE_SECRET_KEY` = Your Stripe secret key
   - `STRIPE_PRICE_STARTER_MONTHLY` = Your Stripe price ID
   - `STRIPE_PRICE_STARTER_ANNUAL` = Your Stripe price ID
   - `STRIPE_PRICE_GROWTH_MONTHLY` = Your Stripe price ID
   - `STRIPE_PRICE_GROWTH_ANNUAL` = Your Stripe price ID
   - `STRIPE_PRICE_SCALE_MONTHLY` = Your Stripe price ID
   - `STRIPE_PRICE_SCALE_ANNUAL` = Your Stripe price ID

### Step 7: Deploy Edge Functions (2 minutes)

```bash
supabase functions deploy server
```

### Step 8: Test (1 minute)

```bash
curl https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
```

Should return: `{"status":"ok"}`

## 📋 Checklist

- [ ] Supabase CLI installed
- [ ] Logged in via CLI
- [ ] Project linked
- [ ] `.env` file created with Supabase URL and anon key
- [ ] Secrets set in Supabase Dashboard
- [ ] Edge Functions deployed
- [ ] Health endpoint tested

## 🔗 Important Links

- **Dashboard**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb
- **API Settings**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/api
- **Functions**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
- **Secrets**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions

## ⚠️ Important Notes

1. **Secrets vs Environment Variables**:
   - Frontend uses `.env` file (VITE_* variables)
   - Edge Functions use Supabase Secrets (set in Dashboard)

2. **Service Role Key**:
   - Never expose in frontend code
   - Only used in Edge Functions
   - Has full database access

3. **Function URL**:
   - Base: `https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server`
   - Health: `/make-server-fa18f4aa/health`
   - Subscriptions: `/make-server-fa18f4aa/api/subscriptions/create`

## 🆘 Troubleshooting

**CLI not found**: Install globally with `npm install -g supabase`

**Link fails**: Make sure you're logged in first

**Deploy fails**: Check function directory structure is correct

**Secrets not working**: Verify secrets are set in Dashboard, not just .env

---

**Total Time**: ~20 minutes  
**See**: `SUPABASE_SETUP_GUIDE.md` for detailed instructions

