# Step-by-Step Backend Setup Guide

## 🎯 What We're Doing

Setting up the backend so your payment system works. This involves:
1. Adding secrets (API keys and price IDs) to Supabase
2. Deploying the Edge Function (server code)
3. Testing everything works

---

## 📋 STEP 1: Set Secrets in Supabase (10 minutes)

### Before You Start

Make sure you have:
- ✅ Stripe secret key (`sk_test_...`)
- ✅ 6 Price IDs from Stripe (2 for each plan: monthly + annual)

### Step 1.1: Open Supabase Secrets Page

1. **Click this link**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
2. **Login** if needed
3. **Scroll down** to find **"Secrets"** section

### Step 1.2: Add Each Secret

For each secret below, click **"Add secret"** and fill in:

#### Secret 1: Stripe Secret Key
- **Name**: `STRIPE_SECRET_KEY`
- **Value**: Your Stripe secret key (from Stripe Dashboard → API keys)
- **Click**: Save

#### Secret 2: Starter Monthly
- **Name**: `STRIPE_PRICE_STARTER_MONTHLY`
- **Value**: Your Starter monthly price ID (from Stripe → Products)
- **Click**: Save

#### Secret 3: Starter Annual
- **Name**: `STRIPE_PRICE_STARTER_ANNUAL`
- **Value**: Your Starter annual price ID
- **Click**: Save

#### Secret 4: Growth Monthly
- **Name**: `STRIPE_PRICE_GROWTH_MONTHLY`
- **Value**: Your Growth monthly price ID
- **Click**: Save

#### Secret 5: Growth Annual
- **Name**: `STRIPE_PRICE_GROWTH_ANNUAL`
- **Value**: Your Growth annual price ID
- **Click**: Save

#### Secret 6: Scale Monthly
- **Name**: `STRIPE_PRICE_SCALE_MONTHLY`
- **Value**: Your Scale monthly price ID
- **Click**: Save

#### Secret 7: Scale Annual
- **Name**: `STRIPE_PRICE_SCALE_ANNUAL`
- **Value**: Your Scale annual price ID
- **Click**: Save

### Step 1.3: Verify

You should see 7 secrets in the list. If all 7 are there, ✅ **Step 1 Complete!**

---

## 🚀 STEP 2: Deploy Edge Function (5 minutes)

### Step 2.1: Open Functions Page

1. **Click this link**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. You'll see the Functions page

### Step 2.2: Create New Function

1. **Click**: **"Create a new function"** or **"New function"** button
2. **Function name**: Type `server` (lowercase, exactly as shown)
3. **Click**: **Create function** or **Continue**

### Step 2.3: Get the Code

**Option A: Copy from File**
1. In your project, open: `supabase/functions/server/index.tsx`
2. **Select all** (Ctrl+A)
3. **Copy** (Ctrl+C)

**Option B: Use the Prepared File**
1. Open: `FUNCTION_CODE_FOR_SUPABASE.txt` in your project
2. **Select all** the code (skip the comments at top)
3. **Copy** it

### Step 2.4: Paste and Deploy

1. **Go back** to Supabase Dashboard (function editor should be open)
2. **Clear** any default code in the editor
3. **Paste** your copied code (Ctrl+V)
4. **Check** the code looks correct (should start with `import { Hono }`)
5. **Click**: **Deploy** button (usually bottom right, green button)
6. **Wait** for "Deployed successfully" message

### Step 2.5: Verify Deployment

After deployment:
- ✅ Function should show status: **Active** or **Deployed**
- ✅ Function URL should be visible
- ✅ No error messages

**If deployed successfully, ✅ Step 2 Complete!**

---

## ✅ STEP 3: Test Everything (5 minutes)

### Test 1: Function Health Check

**Easy Way (Browser):**
1. **Open**: https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
2. **Should see**: `{"status":"ok"}`

**PowerShell Way:**
```powershell
Invoke-WebRequest -Uri "https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health"
```

**Expected**: Status 200, shows `{"status":"ok"}`

### Test 2: Frontend Payment Form

1. **Open terminal** in your project folder
2. **Run**: `npm run dev`
3. **Wait** for: "Local: http://localhost:3000"
4. **Open browser**: http://localhost:3000/pricing
5. **Click**: "Start Free Trial" or "Subscribe Now"
6. **Check**: Payment form should appear (not blank, not error)

### Test 3: Complete Payment Test

1. **Fill in** customer info:
   - Name: `Test User`
   - Email: `test@example.com`
   - Company: `Test Company` (optional)
2. **Click**: Continue/Next
3. **Fill payment**:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/25`
   - CVC: `123`
   - ZIP: `12345`
4. **Click**: Submit Payment
5. **Check**: Should see success message

### Test 4: Verify in Stripe

1. **Go to**: https://dashboard.stripe.com/payments
2. **Check**: Your test payment should appear
3. **Go to**: https://dashboard.stripe.com/subscriptions
4. **Check**: Your test subscription should appear

**If all tests pass, 🎉 You're Done!**

---

## 🆘 Need Help?

### Secrets not saving?
- Check names match exactly (case-sensitive, no spaces)
- Try refreshing the page
- Make sure you're on the right project

### Function not deploying?
- Check code is correct (no syntax errors)
- Make sure you copied the entire file
- Check browser console (F12) for errors

### Health check fails?
- Wait 30 seconds and try again (deployment might still be processing)
- Check function is deployed (status: Active)
- Verify function URL is correct

### Payment form not loading?
- Check browser console (F12) for errors
- Verify Stripe publishable key in `.env` file
- Make sure `npm run dev` is running

---

## 📋 Quick Checklist

- [ ] All 7 secrets added to Supabase
- [ ] Edge Function deployed (status: Active)
- [ ] Health endpoint returns `{"status":"ok"}`
- [ ] Payment form loads on frontend
- [ ] Test payment successful
- [ ] Subscription appears in Stripe Dashboard

---

**Ready to start? Begin with Step 1.1 above!**

