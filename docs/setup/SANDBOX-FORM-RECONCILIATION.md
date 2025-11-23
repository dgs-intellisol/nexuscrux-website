# Sandbox Form Reconciliation

## Overview

Previously, there were **two different sandbox request forms** on the website that worked differently:

1. **Documentation Page** (`/documentation`) - Used `mailto:` links
2. **Contact Page** (`/contact`) - Used proper API endpoint

These have now been **fully reconciled** to use the same backend API and database table.

---

## ✅ What Was Changed

### Before Reconciliation

**Documentation Page Form:**
- ❌ Used `mailto:` links to send emails
- ❌ No database storage
- ❌ No tracking or CRM integration
- ❌ Manual email handling required

**Contact Page Form:**
- ✅ Used API endpoint `/api/contact/sandbox`
- ✅ Stored in `sandbox_requests` database table
- ✅ Full tracking and status management
- ✅ CRM integration ready

### After Reconciliation

**Both Forms Now:**
- ✅ Use the same API endpoint: `POST /api/contact/sandbox`
- ✅ Store in the same table: `sandbox_requests`
- ✅ Have identical backend validation and error handling
- ✅ Support the same fields and workflows
- ✅ Provide consistent success/error messaging
- ✅ Ready for CRM integration

---

## 🔄 Implementation Details

### Updated Files

1. **`/pages/DocumentationPage.tsx`**
   - Added state management (sandboxSubmitting, sandboxSuccess, sandboxError)
   - Added handleSandboxSubmit function with API call
   - Removed old mailto: functionality
   - Added proper error handling and logging
   - Added SEO metadata

2. **No changes needed to:**
   - `/pages/ContactPage.tsx` - Already implemented correctly
   - `/supabase/functions/server/contact.ts` - Already has the endpoint
   - Database schema - Already has `sandbox_requests` table

---

## 📋 Form Comparison

### Documentation Page Form

**Location:** `/documentation` page (bottom section)

**Fields:**
- Name (required)
- Email (required)
- Company (required)
- Use Case (required)

**Submission Flow:**
```
User fills form → POST /api/contact/sandbox → sandbox_requests table → Success message
```

**Success Message:**
- Inline checkmark with "Request submitted successfully!"

**Error Handling:**
- Displays error message below button
- Console logs for debugging
- Table missing warning

---

### Contact Page Form

**Location:** `/contact` page (middle column)

**Fields:**
- Name (required)
- Email (required)
- Company (required)
- Phone (optional)
- Job Title (optional)
- Expected Timeline (optional select)
- Use Case (required)

**Submission Flow:**
```
User fills form → POST /api/contact/sandbox → sandbox_requests table → Success card
```

**Success Message:**
- Green card with checkmark: "Sandbox request submitted! We'll provision your environment soon."

**Error Handling:**
- Red error card with message
- Console logs for debugging
- Table missing warning

---

## 🔑 Key Differences Between Forms

While both forms now use the same backend, they have different UI/UX:

| Feature | Documentation Page | Contact Page |
|---------|-------------------|--------------|
| **Purpose** | Developer-focused sandbox request | General sandbox request with more details |
| **Fields** | Basic (4 fields) | Extended (7 fields with optionals) |
| **Layout** | Full-width centered form | Card in 3-column grid |
| **Success UI** | Inline message | Card with gradient |
| **Button Style** | Teal-lime gradient | Navy solid |
| **Context** | After API documentation | Among demo & partner forms |

---

## 🎯 Benefits of Reconciliation

### 1. Consistent Data Storage
All sandbox requests go to the same table, making it easy to:
- View all requests in one place
- Track and manage approvals
- Integrate with CRM systems
- Generate reports

### 2. Better Error Handling
Both forms now provide:
- Clear error messages
- Console debugging info
- Table missing warnings
- Helpful setup instructions

### 3. Unified Workflow
Same status progression for all sandbox requests:
```
new → reviewing → approved → provisioned → active → expired / converted
```

### 4. CRM Ready
Both forms capture:
- CRM ID field
- CRM sync timestamp
- Full contact information
- UTM tracking parameters

### 5. Easier Maintenance
Only one API endpoint to maintain:
- Single source of truth
- Consistent validation rules
- Unified error handling
- One set of tests needed

---

## 📊 Database Schema

Both forms store data in the `sandbox_requests` table:

```sql
CREATE TABLE sandbox_requests (
  id UUID PRIMARY KEY,
  status TEXT DEFAULT 'new',
  
  -- Contact info (captured by both forms)
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,                          -- Contact page only
  job_title TEXT,                      -- Contact page only
  
  -- Sandbox details
  use_case TEXT NOT NULL,              -- Required by both
  expected_timeline TEXT,              -- Contact page only
  number_of_users TEXT,                -- Contact page only
  technical_contact_email TEXT,        -- Contact page only
  technical_contact_name TEXT,         -- Contact page only
  
  -- Provisioning fields (filled by admin)
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  sandbox_url TEXT,
  expires_at TIMESTAMPTZ,
  provisioned_at TIMESTAMPTZ,
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,
  
  -- CRM integration
  crm_id TEXT,
  crm_synced_at TIMESTAMPTZ,
  
  -- Metadata
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  internal_notes TEXT
);
```

**Note:** Fields unique to Contact page form are optional, so Documentation page submissions work fine with just the required fields.

---

## 🧪 Testing Both Forms

### Test Documentation Page Form

1. Visit `/documentation`
2. Scroll to bottom "Request Sandbox Access" section
3. Fill out:
   - Name: Test User
   - Email: test@example.com
   - Company: Test Co
   - Use Case: Testing the form
4. Click "Request Sandbox Access"
5. Verify success message appears
6. Check Supabase → Table Editor → `sandbox_requests`
7. Confirm record exists with basic fields filled

### Test Contact Page Form

1. Visit `/contact`
2. Find middle column "Request Sandbox"
3. Fill out all fields including optionals
4. Click "Request Sandbox"
5. Verify green success card appears
6. Check Supabase → Table Editor → `sandbox_requests`
7. Confirm record exists with extended fields filled

### Both Should:
- ✅ Create records in same table
- ✅ Have status = "new"
- ✅ Show in same admin view
- ✅ Follow same approval workflow

---

## 🔧 API Endpoint Details

**Endpoint:** `POST /api/contact/sandbox`

**Full URL:**
```
https://{projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/sandbox
```

**Required Headers:**
```
Content-Type: application/json
Authorization: Bearer {publicAnonKey}
```

**Required Fields:**
```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "useCase": "string"
}
```

**Optional Fields:**
```json
{
  "phone": "string",
  "jobTitle": "string",
  "expectedTimeline": "string",
  "numberOfUsers": "string",
  "technicalContactEmail": "string",
  "technicalContactName": "string"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Sandbox request submitted successfully",
  "submissionId": "uuid",
  "submittedAt": "timestamp"
}
```

**Response (Error):**
```json
{
  "error": "Error message",
  "details": "Detailed error information",
  "code": "Error code if available"
}
```

---

## 📈 Usage Recommendations

### When to Use Documentation Page Form
- Developer audience
- Quick sandbox requests
- Minimal friction needed
- Technical context (right after API docs)

### When to Use Contact Page Form
- Business/sales context
- More detailed information needed
- Want to collect phone/job title
- Timeline and team size important

### Both Forms Are Valid
- Neither is "better" - they serve different contexts
- Same backend processing and storage
- Choose based on user journey
- Both fully supported and maintained

---

## 🔮 Future Enhancements

### Planned Improvements
1. **Auto-provisioning** - Automatically create sandbox environments
2. **Email notifications** - Notify admins of new requests
3. **Self-service portal** - Let users track their sandbox status
4. **Usage analytics** - Track sandbox utilization and engagement

### Possible Form Features
1. **Preferred regions** - Let users choose data center location
2. **Integration requirements** - Checkbox for specific integrations needed
3. **Team invites** - Add team members during request
4. **Project description** - More detailed project information

---

## ✅ Reconciliation Checklist

- [x] Documentation page uses correct API endpoint
- [x] Both forms store in same database table
- [x] Consistent error handling on both forms
- [x] Success messages implemented on both
- [x] Console logging for debugging on both
- [x] SEO metadata added to both pages
- [x] Same validation rules enforced
- [x] CRM fields available for both
- [x] Documentation updated
- [x] Testing completed

---

## 📚 Related Documentation

- **Database Setup:** `/DATABASE-TABLES-SETUP.md`
- **API Reference:** `/API-DOCUMENTATION.md`
- **Troubleshooting:** `/TROUBLESHOOTING-CONTACT-FORMS.md`
- **System Overview:** `/CONTACT-SYSTEM-OVERVIEW.md`

---

**Version:** 1.0  
**Date:** 23 November 2025  
**Status:** ✅ Reconciliation Complete
