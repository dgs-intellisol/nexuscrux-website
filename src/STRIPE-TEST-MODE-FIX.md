# Stripe Test Mode Error - Fixed

**Error:** `StripeCardError: Your card was declined. Your request used a real card while testing.`  
**Decline Code:** `test_mode_live_card`

---

## ❌ The Problem

When using Stripe in **test mode**, real credit cards cannot be processed. The error occurred because someone tried to use an actual credit card number instead of a Stripe test card.

**Error Message:**
```
Your request used a real card while testing. For a list of valid test cards, 
visit: https://stripe.com/docs/testing
```

---

## ✅ The Fix

### 1. Enhanced Frontend Error Messages

**File:** `/components/StripePaymentForm.tsx`

**Changes Made:**
- ✅ Added test mode detection (localhost/127.0.0.1)
- ✅ Display helpful test card banner when in test mode
- ✅ Enhanced error handling to detect `test_mode_live_card` error
- ✅ Show friendly error message with correct test card number

**Visual Improvements:**
```
┌──────────────────────────────────────────────┐
│ 🧪 Test Mode:                                │
│ Use test card 4242 4242 4242 4242            │
│ Any future expiry (e.g., 12/34), any CVC     │
│ (e.g., 123), any postal code                 │
└──────────────────────────────────────────────┘
```

### 2. Enhanced Backend Error Messages

**File:** `/supabase/functions/server/subscriptions.ts`

**Changes Made:**
- ✅ Detect Stripe card errors specifically
- ✅ Detect `test_mode_live_card` decline code
- ✅ Return clear, actionable error message
- ✅ Proper HTTP status codes (402 for payment errors)

**Error Response:**
```json
{
  "success": false,
  "error": "🧪 Test Mode: Please use Stripe test card 4242 4242 4242 4242 (any future expiry, any CVC, any postal code). Real cards cannot be used in test mode."
}
```

---

## 🧪 How to Test

### Valid Test Cards

Use these test cards when testing in Stripe test mode:

| Card Number | Brand | Result |
|-------------|-------|--------|
| `4242 4242 4242 4242` | Visa | ✅ Success |
| `5555 5555 5555 4444` | Mastercard | ✅ Success |
| `3782 822463 10005` | American Express | ✅ Success |
| `4000 0025 0000 3155` | Visa (3D Secure) | ✅ Success (requires auth) |
| `4000 0000 0000 9995` | Visa | ❌ Declined |
| `4000 0000 0000 0069` | Visa | ❌ Expired card |

**Additional Info:**
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **Postal Code:** Any valid format (e.g., `12345`)

More test cards: https://stripe.com/docs/testing

---

## 🎯 What Users See Now

### Before Fix
```
❌ Error: Your card was declined. Your request used a real card while testing.
```
Users were confused and didn't know what to do.

### After Fix

**Test Mode Banner (Automatically Shown):**
```
🧪 Test Mode: Use test card 4242 4242 4242 4242
Any future expiry (e.g., 12/34), any CVC (e.g., 123), any postal code
```

**If They Still Use Real Card:**
```
❌ 🧪 Test Mode: Please use test card 4242 4242 4242 4242 
   (any future expiry, any CVC)
```

---

## 🔍 How Detection Works

### Frontend Detection
```typescript
const isTestMode = typeof window !== 'undefined' && 
  window.location.hostname.includes('localhost') || 
  window.location.hostname.includes('127.0.0.1');
```

Shows banner when running on localhost or 127.0.0.1.

### Error Detection
```typescript
if (stripeError.code === 'card_declined' && 
    stripeError.decline_code === 'test_mode_live_card') {
  errorMsg = '🧪 Test Mode: Please use test card 4242 4242 4242 4242...';
}
```

Detects the specific error and provides helpful guidance.

---

## 📊 Error Flow

### Real Card in Test Mode
```
User enters real card number
    ↓
Stripe detects test mode + real card
    ↓
Returns error: test_mode_live_card
    ↓
Frontend catches error
    ↓
Displays: "🧪 Test Mode: Use test card 4242 4242 4242 4242"
    ↓
User corrects and succeeds ✅
```

---

## 🚀 Production Mode

When you switch to production (live mode):

1. **Update Stripe Keys**
   - Use `pk_live_...` instead of `pk_test_...`
   - Use `sk_live_...` instead of `sk_test_...`

2. **Test Mode Banner Disappears**
   - Only shows on localhost
   - Production users won't see it

3. **Real Cards Work**
   - Customers can use actual credit cards
   - Payments are processed normally

---

## ✅ Status

**Fixed:** 23 November 2025

**Components Updated:**
- ✅ `/components/StripePaymentForm.tsx` - Frontend error handling + test banner
- ✅ `/supabase/functions/server/subscriptions.ts` - Backend error handling

**User Experience:**
- ✅ Clear test mode indication
- ✅ Helpful error messages
- ✅ Recommended test card shown
- ✅ Reduced confusion

---

## 📝 Notes

- This error is **expected behavior** when using real cards in test mode
- It's a **security feature** to prevent accidental real charges during testing
- Always use Stripe test cards during development
- Switch to live mode only when ready for production

---

**For more test cards and scenarios:**  
https://stripe.com/docs/testing

**Last Updated:** 23 November 2025  
**Status:** ✅ Resolved
