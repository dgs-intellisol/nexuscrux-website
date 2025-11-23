# Contact & Lead Management Database Tables

## Overview

This document contains SQL scripts for creating three separate tables to manage different types of leads:

1. **`demo_requests`** - Book a Demo submissions
2. **`sandbox_requests`** - Sandbox/Trial access requests  
3. **`partner_inquiries`** - Partnership opportunity inquiries

Each table has its own schema optimized for its specific workflow and CRM integration needs.

---

## 🚀 Quick Setup

**Run all three SQL blocks below in your Supabase SQL Editor:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste ALL THREE SQL blocks below
5. Click **Run**

---

## Table 1: Demo Requests

### Purpose
Stores demo booking requests from the "Book a Demo" form. Tracks the sales process from initial request through demo completion.

### Status Workflow
`new` → `contacted` → `scheduled` → `completed` → `converted` / `closed`

### SQL

```sql
-- =====================================================
-- TABLE 1: DEMO REQUESTS
-- =====================================================

CREATE TABLE demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Status and workflow
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'converted', 'closed')),
  
  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  
  -- Demo details
  company_size TEXT,
  interest TEXT,
  preferred_date DATE,
  scheduled_date TIMESTAMPTZ,
  additional_info TEXT,
  
  -- Sales tracking
  demo_completed_at TIMESTAMPTZ,
  demo_notes TEXT,
  sales_rep TEXT,
  
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
  utm_campaign TEXT
);

-- Indexes for demo_requests
CREATE INDEX idx_demo_requests_status ON demo_requests(status);
CREATE INDEX idx_demo_requests_email ON demo_requests(email);
CREATE INDEX idx_demo_requests_created ON demo_requests(created_at DESC);
CREATE INDEX idx_demo_requests_scheduled ON demo_requests(scheduled_date) WHERE scheduled_date IS NOT NULL;
CREATE INDEX idx_demo_requests_crm ON demo_requests(crm_id) WHERE crm_id IS NOT NULL;

-- RLS for demo_requests
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage demo requests" 
  ON demo_requests 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

COMMENT ON TABLE demo_requests IS 'Demo booking requests from "Book a Demo" form, tracking sales process from initial contact to conversion';
```

---

## Table 2: Sandbox Requests

### Purpose
Stores sandbox/trial access requests. Tracks approval process and sandbox provisioning.

### Status Workflow
`new` → `reviewing` → `approved` → `provisioned` → `active` / `expired` / `converted`

### SQL

```sql
-- =====================================================
-- TABLE 2: SANDBOX REQUESTS
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
  sandbox_credentials TEXT, -- Encrypted or reference to secure storage
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

-- Indexes for sandbox_requests
CREATE INDEX idx_sandbox_requests_status ON sandbox_requests(status);
CREATE INDEX idx_sandbox_requests_email ON sandbox_requests(email);
CREATE INDEX idx_sandbox_requests_created ON sandbox_requests(created_at DESC);
CREATE INDEX idx_sandbox_requests_expires ON sandbox_requests(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX idx_sandbox_requests_crm ON sandbox_requests(crm_id) WHERE crm_id IS NOT NULL;

-- RLS for sandbox_requests
ALTER TABLE sandbox_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage sandbox requests" 
  ON sandbox_requests 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

COMMENT ON TABLE sandbox_requests IS 'Sandbox/trial access requests, tracking approval, provisioning, and usage';
```

---

## Table 3: Partner Inquiries

### Purpose
Stores partnership opportunity inquiries. Tracks partnership development from initial inquiry to agreement.

### Status Workflow
`new` → `reviewing` → `qualified` → `negotiating` → `agreement` / `closed`

### SQL

```sql
-- =====================================================
-- TABLE 3: PARTNER INQUIRIES
-- =====================================================

CREATE TABLE partner_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Status and workflow
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'qualified', 'not_qualified', 'negotiating', 'agreement', 'closed')),
  
  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  job_title TEXT,
  company_website TEXT,
  
  -- Partnership details
  partnership_type TEXT NOT NULL,
  message TEXT NOT NULL,
  revenue_potential TEXT,
  geographic_focus TEXT,
  existing_customers TEXT,
  
  -- Partnership tracking
  assigned_to TEXT,
  qualification_notes TEXT,
  partnership_tier TEXT, -- e.g., 'bronze', 'silver', 'gold', 'platinum'
  agreement_date DATE,
  agreement_value DECIMAL(10, 2),
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,
  qualified_at TIMESTAMPTZ,
  
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

-- Indexes for partner_inquiries
CREATE INDEX idx_partner_inquiries_status ON partner_inquiries(status);
CREATE INDEX idx_partner_inquiries_email ON partner_inquiries(email);
CREATE INDEX idx_partner_inquiries_type ON partner_inquiries(partnership_type);
CREATE INDEX idx_partner_inquiries_created ON partner_inquiries(created_at DESC);
CREATE INDEX idx_partner_inquiries_crm ON partner_inquiries(crm_id) WHERE crm_id IS NOT NULL;

-- RLS for partner_inquiries
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage partner inquiries" 
  ON partner_inquiries 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

COMMENT ON TABLE partner_inquiries IS 'Partnership opportunity inquiries, tracking qualification and negotiation process';
```

---

## Shared: Updated_at Trigger

### Purpose
Automatically updates the `updated_at` timestamp when any record is modified.

### SQL

```sql
-- =====================================================
-- SHARED: UPDATED_AT TRIGGER FUNCTION
-- =====================================================

-- Create or replace the trigger function (only needed once)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to demo_requests
CREATE TRIGGER update_demo_requests_updated_at 
  BEFORE UPDATE ON demo_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to sandbox_requests
CREATE TRIGGER update_sandbox_requests_updated_at 
  BEFORE UPDATE ON sandbox_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to partner_inquiries
CREATE TRIGGER update_partner_inquiries_updated_at 
  BEFORE UPDATE ON partner_inquiries 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 📊 Table Comparison

| Feature | demo_requests | sandbox_requests | partner_inquiries |
|---------|---------------|------------------|-------------------|
| **Purpose** | Book demos | Trial access | Partnerships |
| **Key Fields** | preferred_date, company_size | use_case, expires_at | partnership_type, revenue |
| **Workflow** | Sales process | Provisioning | Qualification |
| **Typical Duration** | Days to weeks | Weeks to months | Months |
| **CRM Priority** | High | Medium | High |
| **Auto-expiry** | No | Yes | No |

---

## 🔍 Field Descriptions

### Demo Requests

| Field | Type | Description |
|-------|------|-------------|
| `status` | TEXT | Workflow status |
| `name` | TEXT | Full name (required) |
| `email` | TEXT | Email address (required) |
| `company` | TEXT | Company name (required) |
| `phone` | TEXT | Phone number |
| `company_size` | TEXT | Number of employees |
| `interest` | TEXT | Area of interest |
| `preferred_date` | DATE | Preferred demo date |
| `scheduled_date` | TIMESTAMPTZ | Actual scheduled demo date/time |
| `additional_info` | TEXT | Additional notes from prospect |
| `demo_completed_at` | TIMESTAMPTZ | When demo was completed |
| `demo_notes` | TEXT | Notes from demo session |
| `sales_rep` | TEXT | Assigned sales representative |

### Sandbox Requests

| Field | Type | Description |
|-------|------|-------------|
| `status` | TEXT | Workflow status |
| `name` | TEXT | Full name (required) |
| `email` | TEXT | Email address (required) |
| `company` | TEXT | Company name (required) |
| `phone` | TEXT | Phone number |
| `job_title` | TEXT | Job title/role |
| `use_case` | TEXT | Intended use case (required) |
| `expected_timeline` | TEXT | Expected timeline for evaluation |
| `number_of_users` | TEXT | Number of users who will test |
| `technical_contact_email` | TEXT | Technical contact email |
| `technical_contact_name` | TEXT | Technical contact name |
| `approved_by` | TEXT | Who approved the request |
| `sandbox_url` | TEXT | URL to sandbox environment |
| `expires_at` | TIMESTAMPTZ | Sandbox expiration date |
| `last_accessed_at` | TIMESTAMPTZ | Last sandbox login |
| `api_calls_count` | INTEGER | Number of API calls made |

### Partner Inquiries

| Field | Type | Description |
|-------|------|-------------|
| `status` | TEXT | Workflow status |
| `name` | TEXT | Full name (required) |
| `email` | TEXT | Email address (required) |
| `company` | TEXT | Company name (required) |
| `phone` | TEXT | Phone number |
| `job_title` | TEXT | Job title/role |
| `company_website` | TEXT | Company website URL |
| `partnership_type` | TEXT | Type of partnership (required) |
| `message` | TEXT | Inquiry message (required) |
| `revenue_potential` | TEXT | Estimated revenue potential |
| `geographic_focus` | TEXT | Geographic markets |
| `existing_customers` | TEXT | Number of existing customers |
| `assigned_to` | TEXT | Partnership manager assigned |
| `qualification_notes` | TEXT | Notes from qualification process |
| `partnership_tier` | TEXT | Partnership tier level |
| `agreement_date` | DATE | Date agreement was signed |
| `agreement_value` | DECIMAL | Value of partnership agreement |

---

## 📋 Post-Setup Verification

After running the SQL, verify tables were created:

1. Go to **Table Editor** in Supabase Dashboard
2. You should see three new tables:
   - ✅ `demo_requests`
   - ✅ `sandbox_requests`
   - ✅ `partner_inquiries`
3. Click on each table to verify column structure
4. Check that indexes were created (visible in table info)

---

## 🧪 Testing Queries

### Count records by status (demo_requests)
```sql
SELECT status, COUNT(*) as count 
FROM demo_requests 
GROUP BY status 
ORDER BY count DESC;
```

### Find expiring sandboxes (next 7 days)
```sql
SELECT * FROM sandbox_requests
WHERE status = 'active'
  AND expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'
ORDER BY expires_at ASC;
```

### Partnership revenue potential
```sql
SELECT 
  partnership_type,
  status,
  COUNT(*) as count,
  SUM(agreement_value) as total_value
FROM partner_inquiries
WHERE status IN ('agreement', 'negotiating')
GROUP BY partnership_type, status;
```

---

## 🔄 Migration from old contact_submissions table

If you have existing data in `contact_submissions`, you can migrate it:

```sql
-- Migrate demo requests
INSERT INTO demo_requests (
  name, email, company, phone, company_size, 
  interest, preferred_date, additional_info,
  created_at, status, user_agent, ip_address, referrer
)
SELECT 
  name, email, company, phone, company_size,
  interest, preferred_date, additional_info,
  created_at, status, user_agent, ip_address, referrer
FROM contact_submissions
WHERE submission_type = 'demo';

-- Migrate partner inquiries
INSERT INTO partner_inquiries (
  name, email, company, partnership_type, message,
  created_at, status, user_agent, ip_address, referrer
)
SELECT 
  name, email, company, partnership_type, message,
  created_at, status, user_agent, ip_address, referrer
FROM contact_submissions
WHERE submission_type = 'inquiry';

-- After verifying migration, you can optionally drop old table:
-- DROP TABLE contact_submissions;
```

---

## 📚 Related Files

- **API Implementation**: `/supabase/functions/server/contact.ts`
- **Frontend Forms**: `/pages/ContactPage.tsx`
- **Troubleshooting**: `/TROUBLESHOOTING-CONTACT-FORMS.md`

---

**Version:** 2.0  
**Last Updated:** 23 November 2025  
**Breaking Change:** Replaces single `contact_submissions` table with three specialized tables
