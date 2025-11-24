# Driver API Documentation

**Version:** 1.0  
**Last Updated:** 24 November 2025  
**Base URL:** `https://{projectId}.supabase.co/functions/v1/make-server-fa18f4aa`

---

## Overview

Complete API reference for the Nexus Crux driver recruitment and management system. All endpoints use the database tables instead of the KV store for production-ready data persistence.

**Database Tables:**
- `driver_interest` - Initial email signups
- `driver_applications` - Full driver applications
- `driver_profiles` - Active driver records
- `driver_documents` - Document storage tracking

---

## Authentication

All endpoints require the Supabase public anonymous key in the Authorization header:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`
}
```

Admin endpoints (GET, PATCH) should ideally use service role authentication in production.

---

## Table of Contents

1. [Driver Interest Endpoints](#driver-interest-endpoints)
2. [Driver Application Endpoints](#driver-application-endpoints)
3. [Driver Profile Endpoints](#driver-profile-endpoints)
4. [Error Responses](#error-responses)
5. [Usage Examples](#usage-examples)

---

## Driver Interest Endpoints

### 1. Submit Driver Interest

**POST** `/api/contact/driver-interest`

Submit initial driver interest from the website hero form.

#### Request Body

```json
{
  "email": "driver@example.com",
  "source": "drivers_page_hero",
  "timestamp": "2025-11-24T10:30:00Z"
}
```

**Required Fields:**
- `email` (string) - Valid email address

**Optional Fields:**
- `source` (string) - Source of signup (default: "drivers_page_hero")
- `timestamp` (string) - ISO 8601 timestamp (default: current time)

**Metadata Captured Automatically:**
- `user_agent` - Browser/device information
- `referrer` - Previous page URL
- `ip_address` - Request IP address

#### Response

```json
{
  "success": true,
  "message": "Driver interest submitted successfully",
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Frontend Usage

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
      email: email,
      source: 'drivers_page_hero',
    }),
  }
);

const data = await response.json();
```

---

### 2. Get All Driver Interest

**GET** `/api/contact/driver-interest`

Retrieve all driver interest submissions (admin use).

#### Query Parameters

- `status` (optional) - Filter by status: `new`, `contacted`, `converted`, `declined`
- `limit` (optional) - Number of results (default: 50)
- `offset` (optional) - Pagination offset (default: 0)

#### Example Request

```
GET /api/contact/driver-interest?status=new&limit=25&offset=0
```

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "driver@example.com",
      "source": "drivers_page_hero",
      "submitted_at": "2025-11-24T10:30:00Z",
      "user_agent": "Mozilla/5.0...",
      "referrer": "https://nexuscrux.io/",
      "ip_address": "192.168.1.1",
      "status": "new",
      "notes": null,
      "created_at": "2025-11-24T10:30:00Z",
      "updated_at": "2025-11-24T10:30:00Z"
    }
  ],
  "total": 150,
  "limit": 25,
  "offset": 0
}
```

---

### 3. Update Driver Interest Status

**PATCH** `/api/contact/driver-interest/:id`

Update the status of a driver interest submission (admin use).

#### URL Parameters

- `id` (required) - UUID of the driver interest record

#### Request Body

```json
{
  "status": "contacted",
  "notes": "Called driver, scheduled for full application"
}
```

**Valid Status Values:**
- `new` - Just submitted
- `contacted` - Admin has reached out
- `converted` - Progressed to full application
- `declined` - Driver not interested or not suitable

#### Response

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "driver@example.com",
    "status": "contacted",
    "notes": "Called driver, scheduled for full application",
    "updated_at": "2025-11-24T11:00:00Z"
  }
}
```

---

## Driver Application Endpoints

### 4. Submit Driver Application

**POST** `/api/contact/driver-application`

Submit a complete driver application with all details.

#### Request Body

```json
{
  "email": "driver@example.com",
  "first_name": "John",
  "last_name": "Smith",
  "phone": "+44 7700 900000",
  "postcode": "SW1A 1AA",
  "address_line_1": "123 Main Street",
  "address_line_2": "Flat 4",
  "city": "London",
  "county": "Greater London",
  
  "vehicle_type": "LWB",
  "vehicle_make": "Ford",
  "vehicle_model": "Transit",
  "vehicle_year": 2021,
  "vehicle_registration": "AB21 XYZ",
  "vehicle_colour": "White",
  "vehicle_capacity": "1000kg payload",
  
  "driving_licence_number": "SMITH901234AB5CD",
  "driving_licence_expiry": "2030-12-31",
  "mot_expiry_date": "2025-06-15",
  "insurance_provider": "Direct Line",
  "insurance_policy_number": "POL123456",
  "insurance_expiry": "2025-12-31",
  "goods_in_transit_insurance": true,
  
  "availability_notes": "Available Monday to Friday, 8am-6pm",
  "typical_routes": "London to Birmingham, M1 corridor",
  "preferred_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "preferred_times": {
    "start": "08:00",
    "end": "18:00"
  }
}
```

**Required Fields:**
- `email` (string) - Valid email address
- `first_name` (string) - Driver's first name
- `last_name` (string) - Driver's last name
- `phone` (string) - UK phone number
- `postcode` (string) - UK postcode
- `vehicle_type` (string) - One of: `SWB`, `LWB`, `Luton`, `Other`

**Optional Fields:** All other fields are optional but recommended for complete application.

#### Response

```json
{
  "success": true,
  "message": "Driver application submitted successfully",
  "id": "456e7890-e89b-12d3-a456-426614174111"
}
```

---

### 5. Get All Driver Applications

**GET** `/api/contact/driver-applications`

Retrieve all driver applications (admin use).

#### Query Parameters

- `status` (optional) - Filter by status: `pending`, `under_review`, `approved`, `rejected`, `withdrawn`
- `limit` (optional) - Number of results (default: 50)
- `offset` (optional) - Pagination offset (default: 0)

#### Example Request

```
GET /api/contact/driver-applications?status=pending&limit=10
```

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "456e7890-e89b-12d3-a456-426614174111",
      "email": "driver@example.com",
      "first_name": "John",
      "last_name": "Smith",
      "phone": "+44 7700 900000",
      "postcode": "SW1A 1AA",
      "vehicle_type": "LWB",
      "vehicle_make": "Ford",
      "vehicle_model": "Transit",
      "status": "pending",
      "submitted_at": "2025-11-24T12:00:00Z",
      "reviewed_at": null,
      "driving_licence_verified": false,
      "mot_verified": false,
      "insurance_verified": false,
      "created_at": "2025-11-24T12:00:00Z"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
```

---

### 6. Get Single Driver Application

**GET** `/api/contact/driver-application/:id`

Retrieve a specific driver application by ID.

#### URL Parameters

- `id` (required) - UUID of the driver application

#### Response

```json
{
  "success": true,
  "data": {
    "id": "456e7890-e89b-12d3-a456-426614174111",
    "email": "driver@example.com",
    "first_name": "John",
    "last_name": "Smith",
    "phone": "+44 7700 900000",
    "postcode": "SW1A 1AA",
    "address_line_1": "123 Main Street",
    "vehicle_type": "LWB",
    "vehicle_make": "Ford",
    "vehicle_model": "Transit",
    "vehicle_year": 2021,
    "vehicle_registration": "AB21 XYZ",
    "driving_licence_number": "SMITH901234AB5CD",
    "driving_licence_expiry": "2030-12-31",
    "status": "pending",
    "submitted_at": "2025-11-24T12:00:00Z"
  }
}
```

---

### 7. Update Driver Application

**PATCH** `/api/contact/driver-application/:id`

Update a driver application (admin use for verification and status changes).

#### URL Parameters

- `id` (required) - UUID of the driver application

#### Request Body

```json
{
  "status": "approved",
  "driving_licence_verified": true,
  "mot_verified": true,
  "insurance_verified": true,
  "git_insurance_verified": true,
  "dbs_check_status": "cleared",
  "dbs_check_date": "2025-11-20",
  "admin_notes": "All documents verified. Approved for onboarding."
}
```

**Status Values:**
- `pending` - Awaiting review
- `under_review` - Currently being reviewed
- `approved` - Approved for driver profile creation
- `rejected` - Application rejected
- `withdrawn` - Driver withdrew application

**DBS Status Values:**
- `not_started` - DBS check not initiated
- `pending` - DBS check in progress
- `cleared` - DBS check passed
- `failed` - DBS check failed

**Verification Flags:**
- `driving_licence_verified` (boolean)
- `mot_verified` (boolean)
- `insurance_verified` (boolean)
- `git_insurance_verified` (boolean)

#### Response

```json
{
  "success": true,
  "data": {
    "id": "456e7890-e89b-12d3-a456-426614174111",
    "status": "approved",
    "driving_licence_verified": true,
    "mot_verified": true,
    "insurance_verified": true,
    "git_insurance_verified": true,
    "dbs_check_status": "cleared",
    "reviewed_at": "2025-11-24T14:30:00Z",
    "admin_notes": "All documents verified. Approved for onboarding.",
    "updated_at": "2025-11-24T14:30:00Z"
  }
}
```

---

## Driver Profile Endpoints

### 8. Get All Driver Profiles

**GET** `/api/contact/driver-profiles`

Retrieve all active driver profiles.

#### Query Parameters

- `status` (optional) - Filter by status: `active`, `inactive`, `suspended`, `terminated` (default: `active`)
- `postcode` (optional) - Filter by postcode prefix (e.g., "SW1")
- `limit` (optional) - Number of results (default: 50)
- `offset` (optional) - Pagination offset (default: 0)

#### Example Request

```
GET /api/contact/driver-profiles?status=active&postcode=SW1&limit=20
```

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174222",
      "driver_code": "DRV-001234",
      "email": "driver@example.com",
      "first_name": "John",
      "last_name": "Smith",
      "phone": "+44 7700 900000",
      "status": "active",
      "verification_level": "enhanced",
      "total_jobs_completed": 125,
      "total_earnings": 4500.50,
      "average_rating": 4.8,
      "reliability_score": 95.5,
      "home_postcode": "SW1A 1AA",
      "current_vehicle_registration": "AB21 XYZ",
      "current_vehicle_type": "LWB",
      "onboarding_completed": true,
      "created_at": "2025-10-01T10:00:00Z"
    }
  ],
  "total": 500,
  "limit": 20,
  "offset": 0
}
```

---

### 9. Get Single Driver Profile

**GET** `/api/contact/driver-profile/:id`

Retrieve a specific driver profile by ID.

#### URL Parameters

- `id` (required) - UUID of the driver profile

#### Response

```json
{
  "success": true,
  "data": {
    "id": "789e0123-e89b-12d3-a456-426614174222",
    "application_id": "456e7890-e89b-12d3-a456-426614174111",
    "driver_code": "DRV-001234",
    "email": "driver@example.com",
    "first_name": "John",
    "last_name": "Smith",
    "phone": "+44 7700 900000",
    "profile_photo_url": "https://storage.supabase.co/...",
    "status": "active",
    "verification_level": "enhanced",
    "onboarding_completed": true,
    "onboarding_completed_at": "2025-10-05T14:00:00Z",
    "total_jobs_completed": 125,
    "total_earnings": 4500.50,
    "average_rating": 4.8,
    "reliability_score": 95.5,
    "completion_rate": 98.4,
    "cancellation_rate": 1.6,
    "current_vehicle_registration": "AB21 XYZ",
    "current_vehicle_type": "LWB",
    "home_postcode": "SW1A 1AA",
    "primary_coverage_area": "Greater London",
    "coverage_radius_miles": 30,
    "mobile_app_user_id": "abc123-def456-ghi789",
    "device_tokens": ["token1", "token2"],
    "app_version": "1.2.3",
    "last_login_at": "2025-11-24T09:15:00Z",
    "bank_account_verified": true,
    "payment_schedule": "weekly",
    "tax_status": "self_employed",
    "vat_registered": false,
    "created_at": "2025-10-01T10:00:00Z",
    "activated_at": "2025-10-05T14:00:00Z"
  }
}
```

---

### 10. Update Driver Profile

**PATCH** `/api/contact/driver-profile/:id`

Update a driver profile (limited fields allowed).

#### URL Parameters

- `id` (required) - UUID of the driver profile

#### Request Body

```json
{
  "phone": "+44 7700 900001",
  "home_postcode": "SW1A 2AA",
  "coverage_radius_miles": 40,
  "device_tokens": ["new_token_123"],
  "app_version": "1.2.4",
  "last_login_at": "2025-11-24T15:30:00Z",
  "bank_account_verified": true,
  "payment_schedule": "weekly"
}
```

**Allowed Update Fields:**
- `phone` - Contact phone number
- `profile_photo_url` - Profile photo URL
- `status` - Driver status
- `onboarding_completed` - Onboarding completion flag
- `onboarding_completed_at` - Completion timestamp
- `current_vehicle_registration` - Active vehicle
- `current_vehicle_type` - Vehicle type
- `home_postcode` - Home postcode
- `primary_coverage_area` - Coverage area description
- `coverage_radius_miles` - Coverage radius
- `device_tokens` - Push notification tokens (array)
- `app_version` - Current app version
- `last_login_at` - Last login timestamp
- `bank_account_verified` - Bank verification status
- `payment_schedule` - Payment frequency

#### Response

```json
{
  "success": true,
  "data": {
    "id": "789e0123-e89b-12d3-a456-426614174222",
    "phone": "+44 7700 900001",
    "home_postcode": "SW1A 2AA",
    "coverage_radius_miles": 40,
    "device_tokens": ["new_token_123"],
    "app_version": "1.2.4",
    "last_login_at": "2025-11-24T15:30:00Z",
    "updated_at": "2025-11-24T15:30:00Z"
  }
}
```

---

## Error Responses

### Standard Error Format

All errors return the following format:

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

### Common Errors

#### Missing Email

```json
{
  "error": "Email is required"
}
```

#### Invalid Email Format

```json
{
  "error": "Invalid email format"
}
```

#### Missing Required Fields

```json
{
  "error": "Required fields missing",
  "required": ["email", "first_name", "last_name", "phone", "postcode", "vehicle_type"]
}
```

#### Invalid Vehicle Type

```json
{
  "error": "Invalid vehicle type",
  "validTypes": ["SWB", "LWB", "Luton", "Other"]
}
```

#### Invalid Status

```json
{
  "error": "Invalid status",
  "validStatuses": ["pending", "under_review", "approved", "rejected", "withdrawn"]
}
```

#### Database Error

```json
{
  "error": "Failed to save driver interest",
  "details": "duplicate key value violates unique constraint"
}
```

---

## Usage Examples

### Example 1: Website Driver Signup

```typescript
// Frontend form submission
async function submitDriverInterest(email: string) {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/driver-interest`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          email,
          source: 'drivers_page_hero',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    const data = await response.json();
    console.log('Driver interest submitted:', data.id);
    return data;
  } catch (error) {
    console.error('Error submitting driver interest:', error);
    throw error;
  }
}
```

---

### Example 2: Admin Dashboard - Fetch Pending Applications

```typescript
// Admin dashboard component
async function fetchPendingApplications() {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/driver-applications?status=pending&limit=25`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }

    const result = await response.json();
    console.log(`Found ${result.total} pending applications`);
    return result.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
}
```

---

### Example 3: Approve Driver Application

```typescript
// Admin action - approve application
async function approveApplication(applicationId: string) {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/driver-application/${applicationId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          status: 'approved',
          driving_licence_verified: true,
          mot_verified: true,
          insurance_verified: true,
          git_insurance_verified: true,
          dbs_check_status: 'cleared',
          admin_notes: 'All documents verified. Approved for onboarding.',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to approve application');
    }

    const result = await response.json();
    console.log('Application approved:', result.data.id);
    
    // Next step: Create driver profile
    await createDriverProfile(result.data);
    
    return result.data;
  } catch (error) {
    console.error('Error approving application:', error);
    throw error;
  }
}
```

---

### Example 4: Mobile App - Update Device Token

```typescript
// Mobile app - register device for push notifications
async function updateDeviceToken(profileId: string, token: string) {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/driver-profile/${profileId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          device_tokens: [token],
          app_version: '1.2.4',
          last_login_at: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update device token');
    }

    const result = await response.json();
    console.log('Device token updated successfully');
    return result.data;
  } catch (error) {
    console.error('Error updating device token:', error);
    throw error;
  }
}
```

---

### Example 5: Search Active Drivers by Location

```typescript
// Search for active drivers in a specific area
async function findDriversByPostcode(postcodePrefix: string) {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/driver-profiles?status=active&postcode=${postcodePrefix}&limit=50`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch drivers');
    }

    const result = await response.json();
    console.log(`Found ${result.data.length} active drivers in ${postcodePrefix}`);
    
    // Sort by rating and reliability
    const sortedDrivers = result.data.sort((a, b) => {
      const scoreA = (a.average_rating * 0.5) + (a.reliability_score * 0.5);
      const scoreB = (b.average_rating * 0.5) + (b.reliability_score * 0.5);
      return scoreB - scoreA;
    });
    
    return sortedDrivers;
  } catch (error) {
    console.error('Error finding drivers:', error);
    throw error;
  }
}
```

---

## Database Schema Reference

For detailed database schema, table structures, and SQL migration scripts, see:

📄 `/DRIVER-DATABASE-SCHEMA.md`

---

## Support & Contact

**API Questions:**  
📧 dev@nexuscrux.io

**Driver Support:**  
📧 drivers@nexuscrux.io

**Documentation:**  
🌐 https://nexuscrux.io/documentation

---

## Changelog

### Version 1.0 - 24 November 2025
- ✅ Initial API implementation
- ✅ Driver interest endpoints
- ✅ Driver application endpoints
- ✅ Driver profile endpoints
- ✅ Complete CRUD operations
- ✅ Pagination support
- ✅ Status filtering
- ✅ Location-based queries
- ✅ Comprehensive error handling
- ✅ Database table integration

---

*This API is production-ready and uses proper database tables with RLS policies for security.*
