# Troubleshooting Contact Forms

## 🚨 Common Errors and Solutions

### Error: "Failed to submit demo/sandbox/partner request"

This error occurs when a contact form submission fails. Here are the most common causes and solutions:

---

## ❌ Error #1: Tables Don't Exist

### Symptom
```
Error: Database table 'demo_requests' does not exist
Error: Database table 'sandbox_requests' does not exist
Error: Database table 'partner_inquiries' does not exist
```

### Cause
The database tables haven't been created in your Supabase database yet.

### Solution
**You must create ALL THREE tables manually in Supabase:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the **COMPLETE SQL** from `/DATABASE-TABLES-SETUP.md`
6. Click **Run** or press Ctrl/Cmd + Enter

This will create:
- ✅ `demo_requests` table (for Book a Demo form)
- ✅ `sandbox_requests` table (for Request Sandbox form)
- ✅ `partner_inquiries` table (for Partner Inquiry form)

**⚠️ IMPORTANT:** You must run the complete SQL script which includes table creation, indexes, triggers, and RLS policies.

---

## ❌ Error #2: Missing Required Fields

### Symptom
```
Error: Missing required fields: name, email, and company are required
Error: Missing required fields: useCase is required
Error: Missing required fields: partnershipType and message are required
```

### Cause
The form is being submitted without all required fields filled in.

### Solution

**Demo Request Required Fields:**
- Name *
- Email *
- Company *

**Sandbox Request Required Fields:**
- Name *
- Email *
- Company *
- Use Case *

**Partner Inquiry Required Fields:**
- Name *
- Email *
- Company *
- Partnership Type *
- Message *

---

## ❌ Error #3: Service Role Key Not Set

### Symptom
```
Error: Failed to submit request
Details: Invalid API key
```

### Cause
The `SUPABASE_SERVICE_ROLE_KEY` environment variable is not set in your edge function.

### Solution
1. Go to Supabase Dashboard → Settings → API
2. Copy your **service_role** key (not anon key)
3. Verify it's set in your environment variables

**Note:** The service_role key should already be set if you've been using other features.

---

## ❌ Error #4: CORS Issues

### Symptom
```
Error: Failed to fetch
CORS policy error
```

### Cause
Cross-Origin Resource Sharing (CORS) is blocking the request.

### Solution
The server already has CORS enabled. Check:
1. Edge function is running
2. No browser extensions blocking requests
3. Using correct URL format

---

## 🔍 Debugging Steps

### Step 1: Check Browser Console

Open browser DevTools (F12) and look for:
- ⚠️ Red errors in Console tab
- 🌐 Failed network requests in Network tab
- 📝 Detailed error messages logged

Special console warnings to look for:
```
⚠️ DATABASE TABLE MISSING: Please create the demo_requests table.
📖 See /DATABASE-TABLES-SETUP.md for instructions
```

### Step 2: Check Edge Function Logs

1. Go to Supabase Dashboard
2. Click **Edge Functions** in the left sidebar
3. Click **Logs**
4. Look for errors related to contact submissions

Example good log:
```
Attempting to insert demo request for: john@example.com
Demo request submitted successfully: 550e8400... by john@example.com
```

Example error log:
```
Database error inserting demo request: { code: '42P01', message: 'relation "demo_requests" does not exist' }
```

### Step 3: Verify Tables Exist

1. Go to Supabase Dashboard → **Table Editor**
2. Look for these three tables:
   - ✅ `demo_requests`
   - ✅ `sandbox_requests`
   - ✅ `partner_inquiries`
3. If any are missing, create them using `/DATABASE-TABLES-SETUP.md`

### Step 4: Test API Directly

Test the endpoints manually using curl:

**Demo Request:**
```bash
curl -X POST \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/demo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company"
  }'
```

**Sandbox Request:**
```bash
curl -X POST \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/sandbox \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "useCase": "Testing the API"
  }'
```

**Partner Inquiry:**
```bash
curl -X POST \
  https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/partner \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "partnershipType": "integration",
    "message": "Testing the API"
  }'
```

Expected response (all):
```json
{
  "success": true,
  "message": "Request submitted successfully",
  "submissionId": "550e8400-e29b-41d4-a716-446655440000",
  "submittedAt": "2025-11-23T12:00:00Z"
}
```

---

## 🧪 Testing Checklist

After creating the tables, test ALL THREE forms:

**Demo Request Form:**
- [ ] Navigate to `/contact` page
- [ ] Fill out "Book a Demo" form
- [ ] Submit form
- [ ] Check for success message
- [ ] Verify in Supabase Table Editor → `demo_requests`

**Sandbox Request Form:**
- [ ] Fill out "Request Sandbox" form
- [ ] Submit form
- [ ] Check for success message
- [ ] Verify in Supabase Table Editor → `sandbox_requests`

**Partner Inquiry Form:**
- [ ] Fill out "Partner Inquiry" form
- [ ] Submit form
- [ ] Check for success message
- [ ] Verify in Supabase Table Editor → `partner_inquiries`

---

## 📊 Verifying Successful Submission

### In Browser
After successful submission, you should see a green success box:

**Demo Request:**
```
✓ Demo request submitted! We'll contact you shortly.
```

**Sandbox Request:**
```
✓ Sandbox request submitted! We'll provision your environment soon.
```

**Partner Inquiry:**
```
✓ Partner inquiry submitted! Our team will review and contact you soon.
```

### In Console (F12)
```
Demo request submitted: 550e8400-e29b-41d4-a716-446655440000
Sandbox request submitted: 660e9511-f39c-52e5-b827-557766551111
Partner inquiry submitted: 770fa622-g40d-63f6-c938-668877662222
```

### In Supabase Table Editor

**Demo Requests:**
1. Go to **Table Editor** → `demo_requests`
2. Verify new row with:
   - `status`: new
   - `name`, `email`, `company`: your data
   - `created_at`: current timestamp

**Sandbox Requests:**
1. Go to **Table Editor** → `sandbox_requests`
2. Verify new row with:
   - `status`: new
   - `use_case`: your use case
   - `created_at`: current timestamp

**Partner Inquiries:**
1. Go to **Table Editor** → `partner_inquiries`
2. Verify new row with:
   - `status`: new
   - `partnership_type`: selected type
   - `message`: your message
   - `created_at`: current timestamp

---

## 🔧 Advanced Debugging

### Check Environment Variables

The following env vars must be set:
- `SUPABASE_URL` ✅ (should be set)
- `SUPABASE_SERVICE_ROLE_KEY` ✅ (should be set)
- `SUPABASE_ANON_KEY` ✅ (used by frontend)

### Check RLS Policies

For each table, verify RLS policy exists:

1. Go to Supabase → **Authentication** → **Policies**
2. Find each table: `demo_requests`, `sandbox_requests`, `partner_inquiries`
3. Verify policy exists with name "Service role can manage..."
4. Policy should allow ALL operations with `USING (true)`

### Check API Routes

Verify routes are registered in `/supabase/functions/server/index.tsx`:

```typescript
app.route("/make-server-fa18f4aa/api/contact", contact);
```

This should mount all contact routes:
- `/api/contact/demo` (POST, GET, PATCH)
- `/api/contact/sandbox` (POST, GET, PATCH)
- `/api/contact/partner` (POST, GET, PATCH)

---

## 📞 Still Having Issues?

If you've tried everything and still getting errors:

1. **Copy full error message** from browser console
2. **Copy edge function logs** from Supabase dashboard
3. **Verify ALL THREE tables exist** in Table Editor
4. **Verify SQL script ran completely** (check for triggers and indexes)
5. **Try the curl tests** above to isolate the issue

### Where to Find Logs

**Browser Console:**
- Chrome/Edge: F12 → Console tab
- Firefox: F12 → Console tab
- Safari: Cmd+Option+C

**Edge Function Logs:**
- Supabase Dashboard → Edge Functions → Logs
- Filter by time range
- Look for requests to `/api/contact/*`

**Database Logs:**
- Supabase Dashboard → Logs → Database
- Look for query errors

---

## ✅ Success Indicators

You'll know everything is working when:

**For ALL THREE Forms:**
1. ✅ Form submits without errors
2. ✅ Success message appears (green box with checkmark)
3. ✅ Form fields are disabled after submission
4. ✅ Console shows success log with submission ID
5. ✅ Submission appears in correct table in Table Editor
6. ✅ `created_at` timestamp is recent
7. ✅ `status` is "new"

---

## 📚 Related Documentation

- **Setup Guide**: `/DATABASE-TABLES-SETUP.md` (complete SQL for all 3 tables)
- **API Endpoints**: All endpoints documented in setup guide

---

## 🔄 API Endpoints Summary

### Demo Requests
- `POST /api/contact/demo` - Submit demo request
- `GET /api/contact/demo` - Get all demo requests (admin)
- `PATCH /api/contact/demo/:id` - Update demo request status

### Sandbox Requests
- `POST /api/contact/sandbox` - Submit sandbox request
- `GET /api/contact/sandbox` - Get all sandbox requests (admin)
- `PATCH /api/contact/sandbox/:id` - Update sandbox request status

### Partner Inquiries
- `POST /api/contact/partner` - Submit partner inquiry
- `GET /api/contact/partner` - Get all partner inquiries (admin)
- `PATCH /api/contact/partner/:id` - Update partner inquiry status

---

**Last Updated:** 23 November 2025  
**Version:** 2.0 (Updated for separate tables)
