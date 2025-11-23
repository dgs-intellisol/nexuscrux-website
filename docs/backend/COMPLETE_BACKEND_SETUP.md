# Complete Backend Setup - Step by Step

## 🎯 Overview

You need to complete 3 main steps:
1. Set secrets in Supabase Dashboard
2. Deploy Edge Functions
3. Test everything

---

## 📋 STEP 1: Set Secrets in Supabase Dashboard

### 1.1 Access Secrets Page

1. **Open your browser**
2. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/settings/functions
3. **Login** if needed
4. **Scroll down** until you see **"Secrets"** section

### 1.2 Add Secret 1: Stripe Secret Key

1. **Click**: **"Add secret"** button
2. **Name field**: Type exactly: `STRIPE_SECRET_KEY`
3. **Value field**: Paste your Stripe secret key (starts with `sk_test_`)
4. **Click**: **Save** or **Add secret**
5. ✅ Secret 1 added!

### 1.3 Add Secret 2: Starter Monthly Price

1. **Click**: **"Add secret"** again
2. **Name**: `STRIPE_PRICE_STARTER_MONTHLY`
3. **Value**: Your Starter monthly price ID (starts with `price_`)
4. **Click**: **Save**
5. ✅ Secret 2 added!

### 1.4 Add Secret 3: Starter Annual Price

1. **Click**: **"Add secret"**
2. **Name**: `STRIPE_PRICE_STARTER_ANNUAL`
3. **Value**: Your Starter annual price ID
4. **Click**: **Save**
5. ✅ Secret 3 added!

### 1.5 Add Secret 4: Growth Monthly Price

1. **Click**: **"Add secret"**
2. **Name**: `STRIPE_PRICE_GROWTH_MONTHLY`
3. **Value**: Your Growth monthly price ID
4. **Click**: **Save**
5. ✅ Secret 4 added!

### 1.6 Add Secret 5: Growth Annual Price

1. **Click**: **"Add secret"**
2. **Name**: `STRIPE_PRICE_GROWTH_ANNUAL`
3. **Value**: Your Growth annual price ID
4. **Click**: **Save**
5. ✅ Secret 5 added!

### 1.7 Add Secret 6: Scale Monthly Price

1. **Click**: **"Add secret"**
2. **Name**: `STRIPE_PRICE_SCALE_MONTHLY`
3. **Value**: Your Scale monthly price ID
4. **Click**: **Save**
5. ✅ Secret 6 added!

### 1.8 Add Secret 7: Scale Annual Price

1. **Click**: **"Add secret"**
2. **Name**: `STRIPE_PRICE_SCALE_ANNUAL`
3. **Value**: Your Scale annual price ID
4. **Click**: **Save**
5. ✅ Secret 7 added!

### 1.9 Verify All Secrets

You should now see 7 secrets in the list:
- ✅ STRIPE_SECRET_KEY
- ✅ STRIPE_PRICE_STARTER_MONTHLY
- ✅ STRIPE_PRICE_STARTER_ANNUAL
- ✅ STRIPE_PRICE_GROWTH_MONTHLY
- ✅ STRIPE_PRICE_GROWTH_ANNUAL
- ✅ STRIPE_PRICE_SCALE_MONTHLY
- ✅ STRIPE_PRICE_SCALE_ANNUAL

**If all 7 are there, proceed to Step 2!**

---

## 🚀 STEP 2: Deploy Edge Functions

### 2.1 Access Functions Page

1. **Go to**: https://supabase.com/dashboard/project/dvvycujiegrhphdtdqeb/functions
2. You'll see the Functions page

### 2.2 Create New Function

1. **Click**: **"Create a new function"** button (or **"New function"**)
2. **Function name**: Type `server`
3. **Click**: **Create function** or **Continue**

### 2.3 Copy Function Code

1. **Open** your project in your code editor
2. **Navigate to**: `supabase/functions/server/index.tsx`
3. **Select all** the code (Ctrl+A)
4. **Copy** it (Ctrl+C)

### 2.4 Paste and Deploy

1. **Go back** to Supabase Dashboard (function editor should be open)
2. **Clear** any existing code in the editor
3. **Paste** the code you copied (Ctrl+V)
4. **Review** the code looks correct
5. **Click**: **Deploy** button (usually bottom right)
6. **Wait** for deployment to complete (you'll see a success message)

### 2.5 Verify Deployment

After deployment:
- Function status should show: **Active** or **Deployed**
- Function URL should be visible: `https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server`

**If deployed successfully, proceed to Step 3!**

---

## ✅ STEP 3: Test the Setup

### 3.1 Test Supabase Function Health

**Option A: Using Browser**
1. **Open**: https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health
2. **Should see**: `{"status":"ok"}`

**Option B: Using PowerShell**
```powershell
Invoke-WebRequest -Uri "https://dvvycujiegrhphdtdqeb.supabase.co/functions/v1/server/make-server-fa18f4aa/health"
```

**Expected**: Status 200, Response: `{"status":"ok"}`

### 3.2 Test Frontend Payment Flow

1. **Open terminal** in your project
2. **Run**: `npm run dev`
3. **Wait** for server to start
4. **Open browser**: http://localhost:3000
5. **Navigate to**: `/pricing` page
6. **Click**: "Start Free Trial" or "Subscribe Now" button
7. **Check**: Payment form should appear

### 3.3 Test Complete Payment Flow

1. **Fill in** customer information:
   - Name
   - Email
   - Company (optional)
   - Phone (optional)
2. **Click**: Continue or Next
3. **Fill in** payment details:
   - **Card number**: `4242 4242 4242 4242`
   - **Expiry**: Any future date (e.g., `12/25`)
   - **CVC**: Any 3 digits (e.g., `123`)
   - **ZIP**: Any 5 digits (e.g., `12345`)
4. **Click**: Submit or Complete Payment
5. **Check**: Success message should appear

### 3.4 Verify in Stripe Dashboard

1. **Go to**: https://dashboard.stripe.com
2. **Click**: **Payments** (left sidebar)
3. **Check**: Your test payment should appear
4. **Click**: **Subscriptions** (left sidebar)
5. **Check**: Your test subscription should appear

**If all tests pass, you're done! 🎉**

---

## 🆘 Troubleshooting

### Secrets not saving
- Check secret names match exactly (case-sensitive)
- Make sure no extra spaces
- Try refreshing the page

### Function not deploying
- Check code is correct (no syntax errors)
- Make sure you copied the entire file
- Check browser console for errors

### Health check fails
- Verify function is deployed (status: Active)
- Check function URL is correct
- Wait a few seconds and try again

### Payment form not loading
- Check browser console for errors (F12)
- Verify Stripe publishable key in .env
- Make sure `npm run dev` is running

### Payment fails
- Check Stripe Dashboard → Logs for errors
- Verify price IDs are correct
- Make sure you're using test cards in test mode

---

## 📋 Final Checklist

- [ ] All 7 secrets added to Supabase
- [ ] Edge Function deployed successfully
- [ ] Health endpoint returns `{"status":"ok"}`
- [ ] Frontend payment form loads
- [ ] Test payment successful
- [ ] Subscription appears in Stripe Dashboard

---

## 🎉 Success!

Once all steps are complete, your payment system is fully functional!

**Next**: You can now accept real payments (switch to live mode in Stripe when ready).

