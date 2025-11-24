# Driver Database Schema & Setup Guide

**Version:** 1.0  
**Last Updated:** 24 November 2025  
**Company:** Nexus Crux Ltd

---

## Overview

This document provides SQL scripts and guidance for setting up dedicated database tables for driver recruitment data in your production Supabase environment. The driver system collects initial interest through the website and will be managed through a dedicated native mobile app.

**Note:** The Figma Make prototyping environment uses a KV store by default. These SQL scripts are provided for production deployment where proper relational database tables are required.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Database Tables](#database-tables)
3. [SQL Scripts](#sql-scripts)
4. [Row Level Security (RLS)](#row-level-security-rls)
5. [Indexes](#indexes)
6. [Migration Guide](#migration-guide)
7. [API Integration](#api-integration)
8. [Mobile App Integration](#mobile-app-integration)

---

## Architecture Overview

### Driver Journey

1. **Initial Interest** → Driver submits email via website `/drivers` page
2. **Full Application** → Driver fills complete application via mobile app
3. **Verification** → Admin team verifies documents and credentials
4. **Onboarding** → Driver receives access to job matching system
5. **Active Driver** → Driver receives and completes jobs via mobile app

### Data Flow

```
Website Form → API Endpoint → driver_interest table
                                      ↓
Mobile App ← Onboarding Email ← Admin Review
     ↓
Full Application → driver_applications table
     ↓
Approved → driver_profiles table (active drivers)
```

---

## Database Tables

### 1. Driver Interest (`driver_interest`)

Initial contact information from website hero signup.

**Purpose:** Capture leads quickly with minimal friction

**Fields:**
- `id` - UUID primary key
- `email` - Driver's email address
- `source` - Where they signed up (e.g., 'drivers_page_hero')
- `submitted_at` - Timestamp of submission
- `user_agent` - Browser/device information
- `referrer` - Previous page URL
- `ip_address` - Request IP address
- `status` - Lead status (new, contacted, converted, declined)
- `notes` - Admin notes
- `created_at` - Record creation timestamp
- `updated_at` - Last update timestamp

---

### 2. Driver Applications (`driver_applications`)

Full application with vehicle and documentation details.

**Purpose:** Comprehensive driver vetting and onboarding

**Fields:**

**Personal Information:**
- `id` - UUID primary key
- `email` - Driver's email (links to driver_interest)
- `first_name` - Driver's first name
- `last_name` - Driver's last name
- `phone` - UK phone number
- `postcode` - Home postcode
- `address_line_1` - Street address
- `address_line_2` - Additional address info
- `city` - City
- `county` - County

**Vehicle Information:**
- `vehicle_type` - Van type (SWB, LWB, etc.)
- `vehicle_make` - Manufacturer (e.g., Ford, Mercedes)
- `vehicle_model` - Model name (e.g., Transit, Sprinter)
- `vehicle_year` - Year of manufacture
- `vehicle_registration` - UK registration number
- `vehicle_colour` - Vehicle colour
- `vehicle_capacity` - Load capacity description

**Documentation:**
- `driving_licence_number` - UK driving licence number
- `driving_licence_expiry` - Licence expiry date
- `driving_licence_verified` - Boolean verification status
- `mot_expiry_date` - MOT certificate expiry
- `mot_verified` - Boolean verification status
- `insurance_provider` - Insurance company name
- `insurance_policy_number` - Policy number
- `insurance_expiry` - Insurance expiry date
- `insurance_verified` - Boolean verification status
- `goods_in_transit_insurance` - Boolean - has GIT insurance
- `git_insurance_verified` - Boolean verification status
- `dbs_check_status` - Enum: not_started, pending, cleared, failed
- `dbs_check_date` - Date of DBS check

**Availability:**
- `availability_notes` - Free text availability description
- `typical_routes` - Common routes/areas worked
- `preferred_days` - JSON array of days
- `preferred_times` - JSON object with time preferences

**Application Status:**
- `status` - Enum: pending, under_review, approved, rejected, withdrawn
- `submitted_at` - Application submission timestamp
- `reviewed_at` - Review completion timestamp
- `reviewed_by` - Admin user ID who reviewed
- `rejection_reason` - Text reason for rejection
- `admin_notes` - Internal admin notes

**Timestamps:**
- `created_at` - Record creation
- `updated_at` - Last update

---

### 3. Driver Profiles (`driver_profiles`)

Active, verified driver records for job matching system.

**Purpose:** Production data for active drivers in the network

**Fields:**

**Core Identity:**
- `id` - UUID primary key
- `application_id` - Foreign key to driver_applications
- `driver_code` - Unique driver identifier (e.g., 'DRV-001234')
- `email` - Driver email
- `first_name` - First name
- `last_name` - Last name
- `phone` - Phone number
- `profile_photo_url` - URL to profile photo in storage

**Status:**
- `status` - Enum: active, inactive, suspended, terminated
- `verification_level` - Enum: basic, enhanced, premium
- `onboarding_completed` - Boolean
- `onboarding_completed_at` - Timestamp

**Performance Metrics:**
- `total_jobs_completed` - Integer count
- `total_earnings` - Decimal total earnings (£)
- `average_rating` - Decimal (0-5)
- `reliability_score` - Decimal (0-100)
- `completion_rate` - Decimal percentage
- `cancellation_rate` - Decimal percentage

**Vehicle (current):**
- `current_vehicle_registration` - Active vehicle reg
- `current_vehicle_type` - Current van type

**Location:**
- `home_postcode` - Home postcode
- `primary_coverage_area` - Text description of coverage
- `coverage_radius_miles` - Integer radius

**App Access:**
- `mobile_app_user_id` - Foreign key to auth.users
- `device_tokens` - JSON array of push notification tokens
- `app_version` - Current app version string
- `last_login_at` - Last app login timestamp

**Financial:**
- `bank_account_verified` - Boolean
- `payment_schedule` - Enum: weekly, biweekly, monthly
- `tax_status` - Enum: self_employed, limited_company, paye
- `vat_registered` - Boolean
- `vat_number` - VAT registration number

**Timestamps:**
- `created_at` - Profile creation
- `updated_at` - Last update
- `activated_at` - Date driver became active
- `deactivated_at` - Date driver was deactivated (if applicable)

---

### 4. Driver Documents (`driver_documents`)

Document storage tracking for all uploaded files.

**Purpose:** Track verification documents uploaded by drivers

**Fields:**
- `id` - UUID primary key
- `driver_profile_id` - Foreign key to driver_profiles
- `document_type` - Enum: driving_licence, mot_certificate, insurance_certificate, git_insurance, dbs_certificate, vehicle_photo, profile_photo, other
- `file_name` - Original file name
- `file_url` - Supabase storage URL (signed URL)
- `file_size_bytes` - File size
- `mime_type` - File MIME type
- `uploaded_at` - Upload timestamp
- `uploaded_by` - User ID who uploaded (driver or admin)
- `expiry_date` - Document expiry (if applicable)
- `verified` - Boolean verification status
- `verified_at` - Verification timestamp
- `verified_by` - Admin user ID who verified
- `notes` - Verification notes
- `created_at` - Record creation
- `updated_at` - Last update

---

## SQL Scripts

### Create Tables

```sql
-- =====================================================
-- 1. DRIVER INTEREST TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS driver_interest (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  source VARCHAR(100) DEFAULT 'drivers_page_hero',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  ip_address VARCHAR(45),
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'declined')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on email for lookups
CREATE INDEX idx_driver_interest_email ON driver_interest(email);
CREATE INDEX idx_driver_interest_status ON driver_interest(status);
CREATE INDEX idx_driver_interest_submitted_at ON driver_interest(submitted_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER driver_interest_updated_at
  BEFORE UPDATE ON driver_interest
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. DRIVER APPLICATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS driver_applications (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Personal Information
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  postcode VARCHAR(10) NOT NULL,
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  city VARCHAR(100),
  county VARCHAR(100),
  
  -- Vehicle Information
  vehicle_type VARCHAR(50) NOT NULL CHECK (vehicle_type IN ('SWB', 'LWB', 'Luton', 'Other')),
  vehicle_make VARCHAR(100),
  vehicle_model VARCHAR(100),
  vehicle_year INTEGER,
  vehicle_registration VARCHAR(20),
  vehicle_colour VARCHAR(50),
  vehicle_capacity TEXT,
  
  -- Documentation
  driving_licence_number VARCHAR(50),
  driving_licence_expiry DATE,
  driving_licence_verified BOOLEAN DEFAULT FALSE,
  mot_expiry_date DATE,
  mot_verified BOOLEAN DEFAULT FALSE,
  insurance_provider VARCHAR(255),
  insurance_policy_number VARCHAR(100),
  insurance_expiry DATE,
  insurance_verified BOOLEAN DEFAULT FALSE,
  goods_in_transit_insurance BOOLEAN DEFAULT FALSE,
  git_insurance_verified BOOLEAN DEFAULT FALSE,
  dbs_check_status VARCHAR(50) DEFAULT 'not_started' CHECK (dbs_check_status IN ('not_started', 'pending', 'cleared', 'failed')),
  dbs_check_date DATE,
  
  -- Availability
  availability_notes TEXT,
  typical_routes TEXT,
  preferred_days JSONB,
  preferred_times JSONB,
  
  -- Application Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'withdrawn')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  rejection_reason TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_driver_applications_email ON driver_applications(email);
CREATE INDEX idx_driver_applications_status ON driver_applications(status);
CREATE INDEX idx_driver_applications_submitted_at ON driver_applications(submitted_at DESC);
CREATE INDEX idx_driver_applications_postcode ON driver_applications(postcode);

-- Updated trigger
CREATE TRIGGER driver_applications_updated_at
  BEFORE UPDATE ON driver_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 3. DRIVER PROFILES TABLE (Active Drivers)
-- =====================================================

CREATE TABLE IF NOT EXISTS driver_profiles (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES driver_applications(id),
  
  -- Core Identity
  driver_code VARCHAR(20) UNIQUE NOT NULL, -- e.g., 'DRV-001234'
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  profile_photo_url TEXT,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'terminated')),
  verification_level VARCHAR(50) DEFAULT 'basic' CHECK (verification_level IN ('basic', 'enhanced', 'premium')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_completed_at TIMESTAMPTZ,
  
  -- Performance Metrics
  total_jobs_completed INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  reliability_score DECIMAL(5,2) DEFAULT 0.00,
  completion_rate DECIMAL(5,2) DEFAULT 0.00,
  cancellation_rate DECIMAL(5,2) DEFAULT 0.00,
  
  -- Vehicle (Current)
  current_vehicle_registration VARCHAR(20),
  current_vehicle_type VARCHAR(50),
  
  -- Location
  home_postcode VARCHAR(10),
  primary_coverage_area TEXT,
  coverage_radius_miles INTEGER DEFAULT 30,
  
  -- App Access
  mobile_app_user_id UUID, -- Links to auth.users
  device_tokens JSONB, -- Push notification tokens
  app_version VARCHAR(20),
  last_login_at TIMESTAMPTZ,
  
  -- Financial
  bank_account_verified BOOLEAN DEFAULT FALSE,
  payment_schedule VARCHAR(20) DEFAULT 'weekly' CHECK (payment_schedule IN ('weekly', 'biweekly', 'monthly')),
  tax_status VARCHAR(50) CHECK (tax_status IN ('self_employed', 'limited_company', 'paye')),
  vat_registered BOOLEAN DEFAULT FALSE,
  vat_number VARCHAR(20),
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  activated_at TIMESTAMPTZ,
  deactivated_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_driver_profiles_driver_code ON driver_profiles(driver_code);
CREATE INDEX idx_driver_profiles_email ON driver_profiles(email);
CREATE INDEX idx_driver_profiles_status ON driver_profiles(status);
CREATE INDEX idx_driver_profiles_postcode ON driver_profiles(home_postcode);
CREATE INDEX idx_driver_profiles_mobile_user ON driver_profiles(mobile_app_user_id);

-- Updated trigger
CREATE TRIGGER driver_profiles_updated_at
  BEFORE UPDATE ON driver_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4. DRIVER DOCUMENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS driver_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_profile_id UUID NOT NULL REFERENCES driver_profiles(id) ON DELETE CASCADE,
  
  -- Document Details
  document_type VARCHAR(50) NOT NULL CHECK (document_type IN (
    'driving_licence',
    'mot_certificate', 
    'insurance_certificate',
    'git_insurance',
    'dbs_certificate',
    'vehicle_photo',
    'profile_photo',
    'other'
  )),
  
  -- File Information
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL, -- Supabase storage URL
  file_size_bytes INTEGER,
  mime_type VARCHAR(100),
  
  -- Upload Tracking
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  uploaded_by UUID, -- User ID (driver or admin)
  
  -- Verification
  expiry_date DATE, -- For documents that expire
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  verified_by UUID, -- Admin user ID
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_driver_documents_profile_id ON driver_documents(driver_profile_id);
CREATE INDEX idx_driver_documents_type ON driver_documents(document_type);
CREATE INDEX idx_driver_documents_expiry ON driver_documents(expiry_date) WHERE expiry_date IS NOT NULL;

-- Updated trigger
CREATE TRIGGER driver_documents_updated_at
  BEFORE UPDATE ON driver_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## Row Level Security (RLS)

Enable RLS for secure data access:

```sql
-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE driver_interest ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_documents ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES - DRIVER INTEREST
-- =====================================================

-- Allow service role to do everything (server-side)
CREATE POLICY "Service role full access on driver_interest"
  ON driver_interest
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow public inserts (for form submissions)
CREATE POLICY "Public can insert driver interest"
  ON driver_interest
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- =====================================================
-- RLS POLICIES - DRIVER APPLICATIONS
-- =====================================================

-- Service role full access
CREATE POLICY "Service role full access on driver_applications"
  ON driver_applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Authenticated users can insert their own applications
CREATE POLICY "Users can insert their own application"
  ON driver_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = email);

-- Users can view their own applications
CREATE POLICY "Users can view their own application"
  ON driver_applications
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- =====================================================
-- RLS POLICIES - DRIVER PROFILES
-- =====================================================

-- Service role full access
CREATE POLICY "Service role full access on driver_profiles"
  ON driver_profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Drivers can view their own profile
CREATE POLICY "Drivers can view own profile"
  ON driver_profiles
  FOR SELECT
  TO authenticated
  USING (mobile_app_user_id = auth.uid());

-- Drivers can update their own profile (limited fields)
CREATE POLICY "Drivers can update own profile"
  ON driver_profiles
  FOR UPDATE
  TO authenticated
  USING (mobile_app_user_id = auth.uid())
  WITH CHECK (mobile_app_user_id = auth.uid());

-- =====================================================
-- RLS POLICIES - DRIVER DOCUMENTS
-- =====================================================

-- Service role full access
CREATE POLICY "Service role full access on driver_documents"
  ON driver_documents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Drivers can view their own documents
CREATE POLICY "Drivers can view own documents"
  ON driver_documents
  FOR SELECT
  TO authenticated
  USING (
    driver_profile_id IN (
      SELECT id FROM driver_profiles WHERE mobile_app_user_id = auth.uid()
    )
  );

-- Drivers can upload their own documents
CREATE POLICY "Drivers can upload own documents"
  ON driver_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    driver_profile_id IN (
      SELECT id FROM driver_profiles WHERE mobile_app_user_id = auth.uid()
    )
  );
```

---

## Indexes

Additional performance indexes:

```sql
-- =====================================================
-- ADDITIONAL PERFORMANCE INDEXES
-- =====================================================

-- Composite indexes for common queries
CREATE INDEX idx_driver_profiles_status_rating 
  ON driver_profiles(status, average_rating DESC) 
  WHERE status = 'active';

CREATE INDEX idx_driver_profiles_location_active 
  ON driver_profiles(home_postcode, status) 
  WHERE status = 'active';

CREATE INDEX idx_driver_documents_verification 
  ON driver_documents(driver_profile_id, document_type, verified);

-- Full text search on notes
CREATE INDEX idx_driver_applications_notes_fts 
  ON driver_applications USING gin(to_tsvector('english', admin_notes));
```

---

## Migration Guide

### Step 1: Backup Existing KV Data

If you have existing driver interest data in the KV store:

```typescript
// Export from KV store (run in Supabase Edge Function)
import * as kv from './kv_store.tsx';

const exportDriverInterest = async () => {
  const allInterest = await kv.getByPrefix('driver_interest:');
  
  // Save to file or database
  console.log(JSON.stringify(allInterest, null, 2));
  
  return allInterest;
};
```

### Step 2: Run SQL Scripts

Execute the SQL scripts in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the **Create Tables** scripts
5. Execute
6. Copy and paste the **RLS Policies** scripts
7. Execute

### Step 3: Update Backend Code

Modify `/supabase/functions/server/contact.ts`:

```typescript
// OLD: KV Store implementation
await kv.set(key, driverInterestData);

// NEW: Database table implementation
const { data, error } = await supabase
  .from('driver_interest')
  .insert([{
    email,
    source: source || 'drivers_page_hero',
    submitted_at: submittedAt,
    user_agent: userAgent,
    referrer,
    ip_address: ipAddress,
    status: 'new',
  }])
  .select()
  .single();

if (error) throw error;
```

### Step 4: Import Existing Data

```sql
-- Manual import script (adjust as needed)
-- Example: Importing from JSON export

INSERT INTO driver_interest (
  email,
  source,
  submitted_at,
  user_agent,
  referrer,
  ip_address,
  status
)
SELECT 
  (data->>'email')::VARCHAR,
  (data->>'source')::VARCHAR,
  (data->>'submitted_at')::TIMESTAMPTZ,
  (data->>'user_agent')::TEXT,
  (data->>'referrer')::TEXT,
  (data->>'ip_address')::VARCHAR,
  (data->>'status')::VARCHAR
FROM json_table; -- Replace with your import method
```

---

## API Integration

### Create Driver Interest (Website)

**Endpoint:** `POST /api/contact/driver-interest`

```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/driver-interest`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({
      email: 'driver@example.com',
      source: 'drivers_page_hero',
    }),
  }
);
```

### Server Implementation

```typescript
// /supabase/functions/server/contact.ts

contact.post("/driver-interest", async (c) => {
  const supabase = getSupabaseClient();
  const body = await c.req.json();
  
  const { data, error } = await supabase
    .from('driver_interest')
    .insert([{
      email: body.email,
      source: body.source || 'drivers_page_hero',
      user_agent: c.req.header("user-agent"),
      referrer: c.req.header("referer"),
      ip_address: c.req.header("x-forwarded-for"),
    }])
    .select()
    .single();
  
  if (error) {
    console.error("Error saving driver interest:", error);
    return c.json({ error: error.message }, 500);
  }
  
  return c.json({ success: true, id: data.id });
});
```

---

## Mobile App Integration

### Driver Registration Flow

The mobile app will handle full driver onboarding:

1. **Email Verification**
   - Check if email exists in `driver_interest`
   - Create auth.users account
   - Send verification email

2. **Application Form**
   - Collect all personal/vehicle information
   - Upload documents to Supabase Storage
   - Insert into `driver_applications`

3. **Admin Review**
   - Admin dashboard shows pending applications
   - Verify documents
   - Approve/reject application

4. **Profile Creation**
   - On approval, create `driver_profiles` record
   - Generate unique `driver_code`
   - Link to auth.users via `mobile_app_user_id`
   - Send welcome email with app credentials

### Mobile App Authentication

```typescript
// Mobile app sign-in
const { data: { session }, error } = await supabase.auth.signInWithPassword({
  email: 'driver@example.com',
  password: 'secure-password',
});

// Fetch driver profile
const { data: profile } = await supabase
  .from('driver_profiles')
  .select('*')
  .eq('mobile_app_user_id', session.user.id)
  .single();
```

### Push Notifications Setup

```typescript
// Save device token for push notifications
await supabase
  .from('driver_profiles')
  .update({
    device_tokens: [deviceToken],
    app_version: '1.0.0',
    last_login_at: new Date().toISOString(),
  })
  .eq('mobile_app_user_id', userId);
```

---

## Document Storage

### Supabase Storage Bucket Setup

```sql
-- Create storage bucket for driver documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('driver-documents', 'driver-documents', false);

-- Storage policies
CREATE POLICY "Drivers can upload own documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'driver-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Drivers can view own documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'driver-documents' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Service role full access"
  ON storage.objects FOR ALL
  TO service_role
  USING (bucket_id = 'driver-documents');
```

### Upload Document Example

```typescript
// Mobile app document upload
const { data, error } = await supabase.storage
  .from('driver-documents')
  .upload(`${userId}/driving-licence.pdf`, file);

// Save metadata to driver_documents table
await supabase.from('driver_documents').insert({
  driver_profile_id: profileId,
  document_type: 'driving_licence',
  file_name: 'driving-licence.pdf',
  file_url: data.path,
  file_size_bytes: file.size,
  mime_type: file.type,
  uploaded_by: userId,
});
```

---

## Useful Queries

### Get All New Driver Interest

```sql
SELECT * FROM driver_interest 
WHERE status = 'new' 
ORDER BY submitted_at DESC;
```

### Get Pending Applications

```sql
SELECT 
  id,
  first_name,
  last_name,
  email,
  vehicle_type,
  postcode,
  submitted_at,
  status
FROM driver_applications 
WHERE status = 'pending'
ORDER BY submitted_at DESC;
```

### Get Active Drivers by Postcode Area

```sql
SELECT 
  driver_code,
  first_name,
  last_name,
  home_postcode,
  average_rating,
  total_jobs_completed
FROM driver_profiles 
WHERE status = 'active'
  AND home_postcode LIKE 'SW1%'
ORDER BY average_rating DESC, total_jobs_completed DESC;
```

### Get Expiring Documents

```sql
SELECT 
  dp.driver_code,
  dp.first_name,
  dp.last_name,
  dd.document_type,
  dd.expiry_date
FROM driver_documents dd
JOIN driver_profiles dp ON dd.driver_profile_id = dp.id
WHERE dd.expiry_date <= (CURRENT_DATE + INTERVAL '30 days')
  AND dp.status = 'active'
ORDER BY dd.expiry_date ASC;
```

### Driver Performance Report

```sql
SELECT 
  driver_code,
  first_name || ' ' || last_name AS full_name,
  total_jobs_completed,
  total_earnings,
  average_rating,
  completion_rate,
  cancellation_rate,
  reliability_score
FROM driver_profiles 
WHERE status = 'active'
ORDER BY reliability_score DESC
LIMIT 50;
```

---

## Next Steps

### 1. Production Deployment

- [ ] Execute SQL scripts in production Supabase
- [ ] Migrate existing KV data to tables
- [ ] Update backend API endpoints
- [ ] Test all API endpoints
- [ ] Deploy changes

### 2. Mobile App Development

- [ ] Design driver onboarding flow
- [ ] Implement document upload
- [ ] Build job matching interface
- [ ] Set up push notifications
- [ ] Test with beta drivers

### 3. Admin Dashboard

- [ ] Create application review interface
- [ ] Document verification workflow
- [ ] Driver management panel
- [ ] Performance analytics
- [ ] Automated expiry reminders

### 4. CRM Integration

- [ ] Connect to CRM system
- [ ] Sync driver interest leads
- [ ] Automate follow-up emails
- [ ] Track conversion funnel
- [ ] Generate reports

---

## Support

**Database Questions:**  
📧 dev@nexuscrux.io

**Driver Support:**  
📧 drivers@nexuscrux.io

**Technical Documentation:**  
🌐 https://nexuscrux.io/documentation

---

*This schema is designed for scalability and follows PostgreSQL best practices. Adjust as needed for your specific requirements.*
