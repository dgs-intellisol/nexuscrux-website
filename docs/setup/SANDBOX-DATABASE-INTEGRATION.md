# Sandbox Form & Database Integration Guide

**Status:** ✅ **FULLY INTEGRATED**  
**Last Updated:** 23 November 2025

---

## Overview

The Sandbox Request page at `/sandbox` is now fully integrated with the database backend. Form submissions are stored in a properly structured database table designed for CRM integration and lead management.

---

## ✅ Integration Checklist

### Frontend
- ✅ **Route:** `/sandbox` - Dedicated sandbox request page
- ✅ **Component:** `SandboxRequestPage.tsx` - Full-featured form with state management
- ✅ **Form Fields:** All fields properly controlled with React state
- ✅ **Navigation:** React Router Link components (no full page reloads)
- ✅ **Success/Error States:** Proper UI feedback for submissions
- ✅ **Form Reset:** Clears after successful submission

### Backend
- ✅ **Endpoint:** `POST /api/contact/sandbox`
- ✅ **Handler:** `/supabase/functions/server/contact.ts`
- ✅ **Validation:** Required fields validated
- ✅ **Error Handling:** Comprehensive error messages with logging
- ✅ **Metadata Capture:** User agent, IP, referrer, UTM parameters

### Database
- ✅ **Table:** `sandbox_requests`
- ✅ **Schema:** Optimized for sandbox provisioning workflow
- ✅ **Indexes:** Performance indexes on key fields
- ✅ **RLS:** Row-level security enabled
- ✅ **Triggers:** Auto-update `updated_at` timestamp

---

## 📋 Form Field Mapping

### Frontend → Backend → Database

| Frontend Field | Backend Parameter | Database Column | Type | Required |
|----------------|-------------------|-----------------|------|----------|
| Name | `name` | `name` | TEXT | ✅ Yes |
| Email | `email` | `email` | TEXT | ✅ Yes |
| Company | `company` | `company` | TEXT | ✅ Yes |
| Phone | `phone` | `phone` | TEXT | No |
| Job Title | `jobTitle` | `job_title` | TEXT | No |
| Use Case | `useCase` | `use_case` | TEXT | ✅ Yes |
| Expected Timeline | `expectedTimeline` | `expected_timeline` | TEXT | No |
| Number of Users | `numberOfUsers` | `number_of_users` | TEXT | No |
| Technical Contact Name | `technicalContactName` | `technical_contact_name` | TEXT | No |
| Technical Contact Email | `technicalContactEmail` | `technical_contact_email` | TEXT | No |

### Automatic Fields (Server-Side)

| Backend Field | Database Column | Source |
|---------------|-----------------|--------|
| `status` | `status` | Default: `'new'` |
| `userAgent` | `user_agent` | Request header |
| `ipAddress` | `ip_address` | Request header (`x-forwarded-for`) |
| `referrer` | `referrer` | Request header |
| `utmSource` | `utm_source` | Request body (optional) |
| `utmMedium` | `utm_medium` | Request body (optional) |
| `utmCampaign` | `utm_campaign` | Request body (optional) |

---

## 🔄 Workflow Status Transitions

The `sandbox_requests` table uses a status field to track the provisioning lifecycle:

```
new → reviewing → approved → provisioned → active
                      ↓            ↓
                  rejected    expired → converted
                                    ↓
                                  closed
```

### Status Definitions

| Status | Description | Next Actions |
|--------|-------------|--------------|
| **new** | Just submitted | Review request, contact requester |
| **reviewing** | Under evaluation | Approve or reject |
| **approved** | Approved for sandbox | Provision environment |
| **rejected** | Request denied | Record reason, notify requester |
| **provisioned** | Sandbox created | Send credentials, set to active |
| **active** | Sandbox in use | Monitor usage, track expiry |
| **expired** | Sandbox expired | Offer extension or conversion |
| **converted** | Converted to paid | Success! Update CRM |
| **closed** | No longer pursuing | Archive |

---

## 🛠️ Database Setup

### Quick Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- =====================================================
-- SANDBOX REQUESTS TABLE
-- =====================================================

CREATE TABLE sandbox_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Status and workflow
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'approved', 'rejected', 'provisioned', 'active', 'expired', 'converted', 'closed')),
  
  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  job_title TEXT,
  
  -- Sandbox details
  use_case TEXT NOT NULL,
  expected_timeline TEXT,
  number_of_users TEXT,
  technical_contact_email TEXT,
  technical_contact_name TEXT,
  
  -- Approval and provisioning
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  sandbox_url TEXT,
  sandbox_credentials TEXT,
  provisioned_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  
  -- Usage tracking
  last_accessed_at TIMESTAMPTZ,
  api_calls_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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
  
  -- Notes
  internal_notes TEXT
);

-- Indexes for performance
CREATE INDEX idx_sandbox_requests_status ON sandbox_requests(status);
CREATE INDEX idx_sandbox_requests_email ON sandbox_requests(email);
CREATE INDEX idx_sandbox_requests_created ON sandbox_requests(created_at DESC);
CREATE INDEX idx_sandbox_requests_expires ON sandbox_requests(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX idx_sandbox_requests_crm ON sandbox_requests(crm_id) WHERE crm_id IS NOT NULL;

-- Row-level security
ALTER TABLE sandbox_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage sandbox requests" 
  ON sandbox_requests 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sandbox_requests_updated_at 
  BEFORE UPDATE ON sandbox_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE sandbox_requests IS 'Sandbox/trial access requests, tracking approval, provisioning, and usage';
```

### Verify Setup

After running the SQL:

1. Go to **Table Editor** in Supabase Dashboard
2. Find `sandbox_requests` table
3. Verify all columns are present
4. Check indexes in table info

---

## 🧪 Testing the Integration

### 1. Submit a Test Request

1. Navigate to `https://yourdomain.com/sandbox`
2. Fill out the form with test data
3. Click "Request Sandbox Access"
4. Verify success message appears

### 2. Check Database

```sql
-- View recent submissions
SELECT 
  id,
  name,
  email,
  company,
  use_case,
  status,
  created_at
FROM sandbox_requests
ORDER BY created_at DESC
LIMIT 10;
```

### 3. Verify Metadata Capture

```sql
-- Check metadata is being captured
SELECT 
  email,
  user_agent,
  ip_address,
  referrer,
  utm_source,
  utm_medium,
  utm_campaign
FROM sandbox_requests
WHERE created_at > NOW() - INTERVAL '1 day';
```

---

## 📊 Analytics Queries

### Recent Submissions by Status

```sql
SELECT 
  status,
  COUNT(*) as count,
  MAX(created_at) as latest_submission
FROM sandbox_requests
GROUP BY status
ORDER BY count DESC;
```

### Conversion Funnel

```sql
SELECT 
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM sandbox_requests
GROUP BY status
ORDER BY 
  CASE status
    WHEN 'new' THEN 1
    WHEN 'reviewing' THEN 2
    WHEN 'approved' THEN 3
    WHEN 'provisioned' THEN 4
    WHEN 'active' THEN 5
    WHEN 'converted' THEN 6
    ELSE 7
  END;
```

### Expiring Sandboxes (Next 7 Days)

```sql
SELECT 
  name,
  email,
  company,
  sandbox_url,
  expires_at,
  expires_at - NOW() as time_remaining
FROM sandbox_requests
WHERE status = 'active'
  AND expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'
ORDER BY expires_at ASC;
```

### UTM Campaign Performance

```sql
SELECT 
  utm_source,
  utm_medium,
  utm_campaign,
  COUNT(*) as submissions,
  COUNT(CASE WHEN status = 'converted' THEN 1 END) as conversions,
  ROUND(
    COUNT(CASE WHEN status = 'converted' THEN 1 END) * 100.0 / COUNT(*),
    2
  ) as conversion_rate
FROM sandbox_requests
WHERE utm_source IS NOT NULL
GROUP BY utm_source, utm_medium, utm_campaign
ORDER BY submissions DESC;
```

---

## 🔗 API Endpoints

### Submit Sandbox Request

**POST** `/api/contact/sandbox`

**Request Body:**
```json
{
  "name": "Jane Developer",
  "email": "jane@company.com",
  "company": "Tech Corp",
  "phone": "+44 20 7946 0958",
  "jobTitle": "CTO",
  "useCase": "Testing job routing between 3 home service brands",
  "expectedTimeline": "1-2months",
  "numberOfUsers": "2-5",
  "technicalContactName": "John Engineer",
  "technicalContactEmail": "john@company.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Sandbox request submitted successfully",
  "submissionId": "a0b1c2d3-e4f5-6789-0123-456789abcdef",
  "submittedAt": "2025-11-23T14:30:00.000Z"
}
```

**Response (Error):**
```json
{
  "error": "Missing required fields: name, email, company, and useCase are required",
  "details": "..."
}
```

### Get All Sandbox Requests (Admin)

**GET** `/api/contact/sandbox?status=new&limit=50&offset=0`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "status": "new",
      "name": "Jane Developer",
      "email": "jane@company.com",
      "company": "Tech Corp",
      "use_case": "Testing integrations",
      "created_at": "2025-11-23T14:30:00.000Z",
      ...
    }
  ],
  "count": 50,
  "limit": 50,
  "offset": 0
}
```

### Update Sandbox Request (Admin)

**PATCH** `/api/contact/sandbox/:id`

**Request Body:**
```json
{
  "status": "approved",
  "approvedBy": "sales@nexuscrux.io",
  "sandboxUrl": "https://sandbox-abc123.nexuscrux.io",
  "expiresAt": "2025-12-23T23:59:59.000Z",
  "internalNotes": "High-priority prospect"
}
```

---

## 🚀 Next Steps After Integration

### 1. Sandbox Provisioning Automation
Create an automated workflow to:
- Detect `approved` status changes
- Provision sandbox environment
- Generate credentials
- Update record with sandbox URL and expiry
- Send welcome email with credentials

### 2. Email Notifications
Set up email notifications for:
- New submission confirmation to requester
- Internal notification to sales team
- Sandbox credentials email
- Expiry warnings (7 days, 1 day before)
- Conversion follow-up

### 3. CRM Integration
Integrate with your CRM:
- Sync new submissions to CRM
- Update `crm_id` and `crm_synced_at`
- Bi-directional status updates
- Attach usage analytics

### 4. Usage Tracking
Monitor sandbox usage:
- API call counting
- Last accessed timestamp
- Feature usage analytics
- Conversion indicators

### 5. Admin Dashboard
Build an admin interface to:
- View all sandbox requests
- Filter by status
- Approve/reject requests
- Provision sandboxes
- Extend expiry dates
- View usage analytics

---

## 📁 Related Files

| File | Purpose |
|------|---------|
| `/pages/SandboxRequestPage.tsx` | Frontend form component |
| `/supabase/functions/server/contact.ts` | Backend API handlers |
| `/DATABASE-TABLES-SETUP.md` | Complete database schema reference |
| `/TROUBLESHOOTING-CONTACT-FORMS.md` | Troubleshooting guide |

---

## 🐛 Troubleshooting

### "Table does not exist" Error

**Solution:** Run the SQL script in `/DATABASE-TABLES-SETUP.md` section for `sandbox_requests`

### Form Not Submitting

**Check:**
1. Browser console for errors
2. Network tab for API call failures
3. Supabase Function logs for backend errors
4. All required fields are filled

### Select Dropdowns Not Working

**Fixed:** Updated to use React state with `value` and `onValueChange` props instead of HTML `name` attribute

---

## ✅ Integration Complete

The Sandbox Request page is now:
- ✅ Fully functional with proper state management
- ✅ Connected to dedicated database table
- ✅ Optimized for CRM integration
- ✅ Tracking all relevant metadata
- ✅ Ready for production use

**No further action required for basic functionality.**

---

**Questions or Issues?**  
See `/TROUBLESHOOTING-CONTACT-FORMS.md` or check server logs in Supabase Dashboard.
