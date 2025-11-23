# Supabase Setup Guide - Complete Walkthrough

## Overview

Supabase is used for:
- **Edge Functions** - Serverless functions for handling Stripe subscriptions
- **Backend API** - Secure server-side payment processing
- **Environment Variables** - Secure storage of Stripe secret keys

## Current Status

✅ **Edge Functions Created** - Code is ready in `src/supabase/functions/server/`
✅ **Project ID Found** - `dvvycujiegrhphdtdqeb`
✅ **Anon Key Found** - Already in `src/utils/supabase/info.tsx`

## Step 1: Install Supabase CLI

### Option A: Using npm (Recommended)
```bash
npm install -g supabase
```

### Option B: Using Homebrew (Mac)
```bash
brew install supabase/tap/supabase
```

### Option C: Using Scoop (Windows)
```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Verify Installation
```bash
supabase --version
```

## Step 2: Login to Supabase

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Sign up or Log in**
3. **Get your access token**:
   - Go to Account Settings → Access Tokens
   - Create a new token
   - Copy it (you'll need it)

4. **Login via CLI**:
   ```bash
   supabase login
   ```
   - Paste your access token when prompted

## Step 3: Link Your Project

Your project ID is: `dvvycujiegrhphdtdqeb`

### Link the project:
```bash
supabase link --project-ref dvvycujiegrhphdtdqeb
```

This will:
- Connect your local project to Supabase
- Create a `.supabase` folder with configuration
- Set up the connection

## Step 4: Get Your Project Credentials

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb
2. **Go to**: Settings → API
3. **Copy these values**:
   - **Project URL**: `https://dvvycujiegrhphdtdqeb.supabase.co`
   - **anon/public key**: (Already in your code)
   - **service_role key**: (Keep this secret!)

## Step 5: Configure Environment Variables

### 5.1 Update .env File

Add to your `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://dvvycujiegrhphdtdqeb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dnljdWppZWdyaHBoZHRkcWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTc4NzcsImV4cCI6MjA3OTQzMzg3N30.UJicODYscg2xj6M1mNhomBkCDAzKI7cgnjHQOzRHdWU

# Stripe Secret Key (for Edge Functions - NEVER expose in frontend)
STRIPE_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_STRIPE_SECRET_KEY

# Stripe Price IDs (for Edge Functions)
STRIPE_PRICE_STARTER_MONTHLY=price_REPLACE_WITH_YOUR_ID
STRIPE_PRICE_STARTER_ANNUAL=price_REPLACE_WITH_YOUR_ID
STRIPE_PRICE_GROWTH_MONTHLY=price_REPLACE_WITH_YOUR_ID
STRIPE_PRICE_GROWTH_ANNUAL=price_REPLACE_WITH_YOUR_ID
STRIPE_PRICE_SCALE_MONTHLY=price_REPLACE_WITH_YOUR_ID
STRIPE_PRICE_SCALE_ANNUAL=price_REPLACE_WITH_YOUR_ID
```

### 5.2 Set Secrets in Supabase

Secrets are set in Supabase Dashboard, not in .env (for Edge Functions):

1. **Go to**: Project Settings → Edge Functions → Secrets
2. **Add these secrets**:
   - `STRIPE_SECRET_KEY` = Your Stripe secret key (starts with `sk_test_` or `sk_live_`)
   - `STRIPE_PRICE_STARTER_MONTHLY` = Your Stripe price ID
   - `STRIPE_PRICE_STARTER_ANNUAL` = Your Stripe price ID
   - `STRIPE_PRICE_GROWTH_MONTHLY` = Your Stripe price ID
   - `STRIPE_PRICE_GROWTH_ANNUAL` = Your Stripe price ID
   - `STRIPE_PRICE_SCALE_MONTHLY` = Your Stripe price ID
   - `STRIPE_PRICE_SCALE_ANNUAL` = Your Stripe price ID

## Step 6: Deploy Edge Functions

### 6.1 Prepare Functions Directory

The Edge Functions are in `src/supabase/functions/server/` but Supabase expects them in `supabase/functions/`.

**Create the proper structure:**
```bash
# Create supabase directory if it doesn't exist
mkdir -p supabase/functions/server

# Copy functions (or move them)
cp -r src/supabase/functions/server/* supabase/functions/server/
```

### 6.2 Deploy the Function

```bash
supabase functions deploy server
```

This will:
- Deploy your Edge Function to Supabase
- Make it available at: `https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server`

## Step 7: Test the Deployment

### 7.1 Test Health Endpoint

```bash
curl https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
```

Should return: `{"status":"ok"}`

### 7.2 Test from Frontend

Update your frontend code to call:
```
https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/api/subscriptions/create
```

## Step 8: Update Frontend Configuration

### 8.1 Create Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@jsr/supabase__supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dvvycujiegrhphdtdqeb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 8.2 Update API Endpoint

In your payment components, update the API endpoint to:
```typescript
const SUPABASE_FUNCTION_URL = 'https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server';
```

## Project Structure

```
supabase/
└── functions/
    └── server/
        ├── index.tsx          # Main Edge Function
        ├── subscriptions.ts   # Subscription handlers
        └── kv_store.tsx       # Key-value store utilities
```

## Environment Variables Summary

### Frontend (.env)
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Public anon key (safe to expose)
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

### Supabase Secrets (Set in Dashboard)
- `STRIPE_SECRET_KEY` - Stripe secret key (NEVER expose)
- `STRIPE_PRICE_*` - Stripe price IDs for each plan

## Quick Checklist

- [ ] Supabase CLI installed
- [ ] Logged in to Supabase CLI
- [ ] Project linked (`supabase link`)
- [ ] Credentials copied from Dashboard
- [ ] `.env` file updated with Supabase URL and anon key
- [ ] Secrets set in Supabase Dashboard
- [ ] Functions directory structure created
- [ ] Edge Functions deployed
- [ ] Health endpoint tested
- [ ] Frontend updated to use Supabase functions

## Troubleshooting

### Function not deploying
- Check you're logged in: `supabase projects list`
- Verify project is linked: `supabase status`
- Check function directory structure

### Secrets not working
- Verify secrets are set in Dashboard (not just .env)
- Check secret names match exactly
- Redeploy function after adding secrets

### CORS errors
- Edge Function already has CORS enabled
- Check function URL is correct
- Verify anon key is correct

## Next Steps

After Supabase is set up:
1. ✅ Configure Stripe (get API keys)
2. ✅ Set Stripe secrets in Supabase
3. ✅ Deploy Edge Functions
4. ✅ Test subscription flow
5. ✅ Update frontend to use Supabase functions

---

**Project ID**: `dvvycujiegrhphdtdqeb`  
**Dashboard**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb

