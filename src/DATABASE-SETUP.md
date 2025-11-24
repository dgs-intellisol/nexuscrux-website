# Database Setup for Nexus Crux Driver System

This document contains SQL scripts to create the necessary database tables for the driver recruitment and demo request systems.

## Quick Setup

Run these SQL scripts in your Supabase SQL Editor (in order):

1. Driver Demo Requests Table
2. Row Level Security Policies (optional but recommended)

---

## 1. Driver Demo Requests Table

This table stores demo requests from the "Try Demo First" button on the drivers page.

**Note:** This is separate from the `demo_requests` table which is used for tenant brand demo requests.

```sql
-- Create driver_demo_requests table
CREATE TABLE IF NOT EXISTS driver_demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  
  -- Request Details
  message TEXT,
  demo_type TEXT DEFAULT 'driver_app',
  source TEXT DEFAULT 'drivers_page',
  
  -- Status Tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Admin Notes
  admin_notes TEXT,
  assigned_to TEXT,
  
  -- Metadata
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_driver_demo_requests_email ON driver_demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_driver_demo_requests_status ON driver_demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_driver_demo_requests_submitted_at ON driver_demo_requests(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_driver_demo_requests_demo_type ON driver_demo_requests(demo_type);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_driver_demo_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER driver_demo_requests_updated_at
  BEFORE UPDATE ON driver_demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_driver_demo_requests_updated_at();

-- Add comments for documentation
COMMENT ON TABLE driver_demo_requests IS 'Stores demo requests from the driver recruitment page';
COMMENT ON COLUMN driver_demo_requests.demo_type IS 'Type of demo requested (e.g., driver_app, platform_overview)';
COMMENT ON COLUMN driver_demo_requests.source IS 'Where the demo request came from (e.g., drivers_page, landing_page)';
COMMENT ON COLUMN driver_demo_requests.status IS 'Current status of the demo request';
```

---

## 2. Row Level Security (RLS) Policies

**Optional but recommended for production**

```sql
-- Enable RLS on driver_demo_requests
ALTER TABLE driver_demo_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do everything
CREATE POLICY "Service role has full access to driver_demo_requests"
  ON driver_demo_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert driver_demo_requests"
  ON driver_demo_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow public (anon) to insert (for frontend forms)
CREATE POLICY "Public can insert driver_demo_requests"
  ON driver_demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

---

## 3. Verify Existing Tables

Run this query to verify that the `driver_applications` table exists:

```sql
-- Check if driver_applications table exists
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'driver_applications'
ORDER BY ordinal_position;
```

If the `driver_applications` table doesn't exist or is missing columns, here's the complete schema:

```sql
-- Create driver_applications table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS driver_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Personal Information
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  postcode TEXT NOT NULL,
  address_line_1 TEXT,
  address_line_2 TEXT,
  city TEXT,
  county TEXT,
  
  -- Vehicle Information
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('SWB', 'LWB', 'Luton', 'Other')),
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  vehicle_registration TEXT,
  vehicle_colour TEXT,
  vehicle_capacity TEXT,
  
  -- Documentation
  driving_licence_number TEXT,
  driving_licence_expiry DATE,
  mot_expiry_date DATE,
  insurance_provider TEXT,
  insurance_policy_number TEXT,
  insurance_expiry DATE,
  goods_in_transit_insurance BOOLEAN DEFAULT false,
  
  -- Document Verification (admin use)
  driving_licence_verified BOOLEAN DEFAULT false,
  mot_verified BOOLEAN DEFAULT false,
  insurance_verified BOOLEAN DEFAULT false,
  git_insurance_verified BOOLEAN DEFAULT false,
  dbs_check_status TEXT CHECK (dbs_check_status IN ('not_started', 'pending', 'passed', 'failed')),
  dbs_check_date DATE,
  
  -- Availability
  availability_notes TEXT,
  typical_routes TEXT,
  preferred_days TEXT[],
  preferred_times TEXT,
  
  -- Status Tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'withdrawn')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_driver_applications_email ON driver_applications(email);
CREATE INDEX IF NOT EXISTS idx_driver_applications_status ON driver_applications(status);
CREATE INDEX IF NOT EXISTS idx_driver_applications_submitted_at ON driver_applications(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_driver_applications_postcode ON driver_applications(postcode);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_driver_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER driver_applications_updated_at
  BEFORE UPDATE ON driver_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_driver_applications_updated_at();

-- Add RLS policies
ALTER TABLE driver_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access to driver_applications"
  ON driver_applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can insert driver_applications"
  ON driver_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

---

## 4. Verification Queries

After running the scripts, verify everything is set up correctly:

```sql
-- 1. Check driver_demo_requests table
SELECT COUNT(*) as total_driver_demo_requests FROM driver_demo_requests;

-- 2. Check driver_applications table
SELECT COUNT(*) as total_applications FROM driver_applications;

-- 3. View recent driver demo requests
SELECT 
  id,
  name,
  email,
  demo_type,
  status,
  submitted_at
FROM driver_demo_requests
ORDER BY submitted_at DESC
LIMIT 10;

-- 4. View recent driver applications
SELECT 
  id,
  first_name,
  last_name,
  email,
  vehicle_type,
  status,
  submitted_at
FROM driver_applications
ORDER BY submitted_at DESC
LIMIT 10;
```

---

## 5. Sample Data (Optional - for testing)

```sql
-- Insert a test driver demo request
INSERT INTO driver_demo_requests (name, email, phone, company_name, message, demo_type, source)
VALUES (
  'John Smith',
  'john.smith@example.com',
  '+44 7700 900000',
  'Smith Transport',
  'Interested in seeing the driver app features',
  'driver_app',
  'drivers_page'
);

-- Insert a test driver application
INSERT INTO driver_applications (
  email, first_name, last_name, phone, postcode,
  vehicle_type, vehicle_make, vehicle_model, vehicle_year
)
VALUES (
  'driver@example.com',
  'Jane',
  'Doe',
  '+44 7700 900001',
  'SW1A 1AA',
  'LWB',
  'Ford',
  'Transit',
  2021
);
```

---

## Setup Instructions

### Step 1: Access Supabase SQL Editor
1. Go to your Supabase Dashboard
2. Navigate to "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Run SQL Scripts
1. Copy the **Driver Demo Requests Table** SQL (Section 1)
2. Paste into the SQL Editor
3. Click "Run" or press `Cmd/Ctrl + Enter`
4. Verify success message

### Step 3: Set Up RLS (Recommended)
1. Copy the **RLS Policies** SQL (Section 2)
2. Paste into the SQL Editor
3. Run the query

### Step 4: Verify Setup
1. Copy the **Verification Queries** (Section 4)
2. Run each query to confirm tables exist
3. Check that counts return 0 (empty tables)

### Step 5: Test (Optional)
1. Use the **Sample Data** queries (Section 5)
2. Run the verification queries again
3. Confirm data appears

---

## Table Relationships

```
driver_demo_requests
  - Standalone table for driver demo inquiries
  - Separate from the tenant brand demo_requests table
  - No foreign key relationships

driver_applications
  - Standalone table for driver onboarding
  - Can be linked to driver_profiles after approval
  - No foreign key relationships
```

---

## API Endpoints Using These Tables

### Demo Requests
- `POST /api/contact/demo` - Submit demo request
- `GET /api/contact/demo-requests` - List all demo requests (admin)
- `GET /api/contact/demo-request/:id` - Get single demo request
- `PATCH /api/contact/demo-request/:id` - Update demo request status

### Driver Applications
- `POST /api/contact/driver-application` - Submit application
- `GET /api/contact/driver-applications` - List applications (admin)
- `GET /api/contact/driver-application/:id` - Get single application
- `PATCH /api/contact/driver-application/:id` - Update application status

---

## Maintenance

### Archive Old Records
```sql
-- Archive completed driver demo requests older than 6 months
UPDATE driver_demo_requests
SET status = 'cancelled'
WHERE status = 'completed'
  AND completed_at < NOW() - INTERVAL '6 months';

-- Archive rejected applications older than 1 year
UPDATE driver_applications
SET status = 'withdrawn'
WHERE status = 'rejected'
  AND reviewed_at < NOW() - INTERVAL '1 year';
```

### Clean Up Test Data
```sql
-- Delete test driver demo requests
DELETE FROM driver_demo_requests
WHERE email LIKE '%@example.com';

-- Delete test applications
DELETE FROM driver_applications
WHERE email LIKE '%@example.com';
```

---

## Troubleshooting

### Error: "relation driver_demo_requests does not exist"
**Solution:** Run the driver_demo_requests table creation SQL (Section 1)

### Error: "relation driver_applications does not exist"
**Solution:** Run the driver_applications table creation SQL (Section 3)

### Error: "permission denied"
**Solution:** Ensure you're running queries as the service role or database owner

### Error: "duplicate key value violates unique constraint"
**Solution:** Check if tables already exist, use `IF NOT EXISTS` clause

### RLS Blocking Inserts
**Solution:** Check RLS policies are set up correctly (Section 2)

---

## Next Steps

After setting up these tables:

1. ✅ Test the "Apply Now" form on `/drivers`
2. ✅ Test the "Try Demo First" form on `/drivers`
3. ✅ Check Supabase dashboard to see submitted data
4. ✅ Set up email notifications (optional)
5. ✅ Create admin dashboard to manage applications (optional)

---

**Need Help?**
- Check Supabase logs for detailed error messages
- Verify API endpoints are calling correct table names
- Ensure SUPABASE_SERVICE_ROLE_KEY is set correctly

---

*Last Updated: November 24, 2025*