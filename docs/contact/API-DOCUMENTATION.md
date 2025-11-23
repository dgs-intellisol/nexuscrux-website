# Contact API Documentation

Complete API documentation for demo requests, sandbox requests, and partner inquiries.

---

## Base URL

```
https://{projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact
```

Replace `{projectId}` with your actual Supabase project ID.

---

## Authentication

All requests require the Supabase anon key in the Authorization header:

```
Authorization: Bearer {publicAnonKey}
```

---

## 1. Demo Requests API

### POST /demo
Submit a new demo request.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "ACME Corp",
  "phone": "+44 20 7946 0958",
  "companySize": "51-200",
  "interest": "enterprise",
  "preferredDate": "2025-12-01",
  "additionalInfo": "Need multi-brand solution",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "brand-demo"
}
```

**Required Fields:**
- `name` (string)
- `email` (string)
- `company` (string)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Demo request submitted successfully",
  "submissionId": "550e8400-e29b-41d4-a716-446655440000",
  "submittedAt": "2025-11-23T12:00:00Z"
}
```

### GET /demo
Get all demo requests (admin endpoint).

**Query Parameters:**
- `status` (optional) - Filter by status: new, contacted, scheduled, completed, converted, closed
- `limit` (optional) - Number of results (default: 100)
- `offset` (optional) - Pagination offset (default: 0)

**Example:**
```
GET /demo?status=new&limit=50
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "new",
      "name": "John Doe",
      "email": "john@company.com",
      "company": "ACME Corp",
      "phone": "+44 20 7946 0958",
      "company_size": "51-200",
      "interest": "enterprise",
      "preferred_date": "2025-12-01",
      "additional_info": "Need multi-brand solution",
      "scheduled_date": null,
      "demo_completed_at": null,
      "sales_rep": null,
      "created_at": "2025-11-23T12:00:00Z",
      "updated_at": "2025-11-23T12:00:00Z",
      "contacted_at": null,
      "crm_id": null,
      "crm_synced_at": null,
      "user_agent": "Mozilla/5.0...",
      "ip_address": "203.0.113.42",
      "referrer": "https://google.com",
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "brand-demo"
    }
  ],
  "count": 42,
  "limit": 50,
  "offset": 0
}
```

### PATCH /demo/:id
Update a demo request (admin endpoint).

**Request Body:**
```json
{
  "status": "scheduled",
  "scheduledDate": "2025-11-30T14:00:00Z",
  "salesRep": "Sarah Johnson",
  "contactedAt": "2025-11-23T15:30:00Z",
  "demoNotes": "Very interested in multi-brand features",
  "crmId": "SF-12345"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Demo request updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "scheduled",
    "scheduled_date": "2025-11-30T14:00:00Z",
    "sales_rep": "Sarah Johnson",
    "contacted_at": "2025-11-23T15:30:00Z",
    "demo_notes": "Very interested in multi-brand features",
    "crm_id": "SF-12345",
    "crm_synced_at": "2025-11-23T15:35:00Z",
    "updated_at": "2025-11-23T15:35:00Z",
    ...
  }
}
```

---

## 2. Sandbox Requests API

### POST /sandbox
Submit a new sandbox access request.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "company": "TechCo",
  "phone": "+44 20 7946 0959",
  "jobTitle": "CTO",
  "useCase": "Testing federation capabilities for 5 brands",
  "expectedTimeline": "3-4weeks",
  "numberOfUsers": "5-10",
  "technicalContactEmail": "tech@company.com",
  "technicalContactName": "Tom Developer",
  "utmSource": "linkedin",
  "utmMedium": "social",
  "utmCampaign": "sandbox-promo"
}
```

**Required Fields:**
- `name` (string)
- `email` (string)
- `company` (string)
- `useCase` (string)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Sandbox request submitted successfully",
  "submissionId": "660e9511-f39c-52e5-b827-557766551111",
  "submittedAt": "2025-11-23T12:10:00Z"
}
```

### GET /sandbox
Get all sandbox requests (admin endpoint).

**Query Parameters:**
- `status` (optional) - Filter by status: new, reviewing, approved, rejected, provisioned, active, expired, converted, closed
- `limit` (optional) - Number of results (default: 100)
- `offset` (optional) - Pagination offset (default: 0)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "660e9511-f39c-52e5-b827-557766551111",
      "status": "new",
      "name": "Jane Smith",
      "email": "jane@company.com",
      "company": "TechCo",
      "phone": "+44 20 7946 0959",
      "job_title": "CTO",
      "use_case": "Testing federation capabilities for 5 brands",
      "expected_timeline": "3-4weeks",
      "number_of_users": "5-10",
      "technical_contact_email": "tech@company.com",
      "technical_contact_name": "Tom Developer",
      "approved_by": null,
      "approved_at": null,
      "sandbox_url": null,
      "provisioned_at": null,
      "expires_at": null,
      "last_accessed_at": null,
      "api_calls_count": 0,
      "created_at": "2025-11-23T12:10:00Z",
      "updated_at": "2025-11-23T12:10:00Z",
      "contacted_at": null,
      "crm_id": null,
      "internal_notes": null,
      ...
    }
  ],
  "count": 28,
  "limit": 100,
  "offset": 0
}
```

### PATCH /sandbox/:id
Update a sandbox request (admin endpoint).

**Request Body:**
```json
{
  "status": "approved",
  "approvedBy": "Admin User",
  "sandboxUrl": "https://sandbox-techco.nexuscrux.io",
  "expiresAt": "2025-12-23T23:59:59Z",
  "internalNotes": "Approved for 30 days trial",
  "crmId": "HUB-67890"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Sandbox request updated successfully",
  "data": {
    "id": "660e9511-f39c-52e5-b827-557766551111",
    "status": "approved",
    "approved_by": "Admin User",
    "approved_at": "2025-11-23T14:00:00Z",
    "sandbox_url": "https://sandbox-techco.nexuscrux.io",
    "expires_at": "2025-12-23T23:59:59Z",
    "internal_notes": "Approved for 30 days trial",
    "crm_id": "HUB-67890",
    "crm_synced_at": "2025-11-23T14:00:00Z",
    ...
  }
}
```

---

## 3. Partner Inquiries API

### POST /partner
Submit a new partnership inquiry.

**Request Body:**
```json
{
  "name": "Alex Johnson",
  "email": "alex@partner.com",
  "company": "Partner Inc",
  "phone": "+44 20 7946 0960",
  "jobTitle": "VP of Partnerships",
  "companyWebsite": "https://partner.com",
  "partnershipType": "integration",
  "message": "We offer complementary scheduling software and would like to explore an integration partnership.",
  "revenuePotential": "£500k-1M annually",
  "geographicFocus": "UK, EU",
  "existingCustomers": "200+ home service companies",
  "utmSource": "referral",
  "utmMedium": "partner",
  "utmCampaign": "integration-program"
}
```

**Required Fields:**
- `name` (string)
- `email` (string)
- `company` (string)
- `partnershipType` (string)
- `message` (string)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Partner inquiry submitted successfully",
  "submissionId": "770fa622-g40d-63f6-c938-668877662222",
  "submittedAt": "2025-11-23T12:20:00Z"
}
```

### GET /partner
Get all partner inquiries (admin endpoint).

**Query Parameters:**
- `status` (optional) - Filter by status: new, reviewing, qualified, not_qualified, negotiating, agreement, closed
- `type` (optional) - Filter by partnership type: integration, reseller, referral, strategic, other
- `limit` (optional) - Number of results (default: 100)
- `offset` (optional) - Pagination offset (default: 0)

**Example:**
```
GET /partner?status=qualified&type=integration
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "770fa622-g40d-63f6-c938-668877662222",
      "status": "new",
      "name": "Alex Johnson",
      "email": "alex@partner.com",
      "company": "Partner Inc",
      "phone": "+44 20 7946 0960",
      "job_title": "VP of Partnerships",
      "company_website": "https://partner.com",
      "partnership_type": "integration",
      "message": "We offer complementary scheduling software...",
      "revenue_potential": "£500k-1M annually",
      "geographic_focus": "UK, EU",
      "existing_customers": "200+ home service companies",
      "assigned_to": null,
      "qualification_notes": null,
      "partnership_tier": null,
      "agreement_date": null,
      "agreement_value": null,
      "created_at": "2025-11-23T12:20:00Z",
      "updated_at": "2025-11-23T12:20:00Z",
      "contacted_at": null,
      "qualified_at": null,
      "crm_id": null,
      "internal_notes": null,
      ...
    }
  ],
  "count": 15,
  "limit": 100,
  "offset": 0
}
```

### PATCH /partner/:id
Update a partner inquiry (admin endpoint).

**Request Body:**
```json
{
  "status": "qualified",
  "assignedTo": "Partnership Manager",
  "qualificationNotes": "Strong fit for integration partnership. 200+ customers, solid tech stack.",
  "partnershipTier": "silver",
  "crmId": "SF-PART-123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Partner inquiry updated successfully",
  "data": {
    "id": "770fa622-g40d-63f6-c938-668877662222",
    "status": "qualified",
    "assigned_to": "Partnership Manager",
    "qualification_notes": "Strong fit for integration partnership...",
    "partnership_tier": "silver",
    "qualified_at": "2025-11-23T16:00:00Z",
    "crm_id": "SF-PART-123",
    "crm_synced_at": "2025-11-23T16:00:00Z",
    ...
  }
}
```

---

## Error Responses

### 400 Bad Request
Missing required fields or invalid data.

```json
{
  "error": "Missing required fields: name, email, and company are required"
}
```

### 500 Internal Server Error
Server or database error.

```json
{
  "error": "Failed to submit demo request",
  "details": "relation \"demo_requests\" does not exist",
  "code": "42P01",
  "setupGuide": "See /DATABASE-TABLES-SETUP.md for table creation instructions"
}
```

---

## Status Workflows

### Demo Requests
```
new → contacted → scheduled → completed → converted / closed
```

### Sandbox Requests
```
new → reviewing → approved / rejected → provisioned → active → expired / converted / closed
```

### Partner Inquiries
```
new → reviewing → qualified / not_qualified → negotiating → agreement / closed
```

---

## Rate Limiting

Currently no rate limiting is enforced, but recommended best practices:
- Maximum 10 submissions per email per day
- Maximum 100 submissions per IP per hour

---

## Webhooks (Future)

Planned webhook support for:
- New submission events
- Status change events
- CRM sync events

---

## Examples

### cURL Examples

**Submit Demo Request:**
```bash
curl -X POST \
  https://your-project.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/demo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-anon-key" \
  -d '{
    "name": "John Doe",
    "email": "john@company.com",
    "company": "ACME Corp"
  }'
```

**Get Demo Requests:**
```bash
curl -X GET \
  "https://your-project.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/demo?status=new" \
  -H "Authorization: Bearer your-anon-key"
```

**Update Demo Status:**
```bash
curl -X PATCH \
  https://your-project.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/demo/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-anon-key" \
  -d '{
    "status": "contacted",
    "salesRep": "Sarah Johnson"
  }'
```

### JavaScript/TypeScript Examples

**Submit Sandbox Request:**
```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/sandbox`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({
      name: 'Jane Smith',
      email: 'jane@company.com',
      company: 'TechCo',
      useCase: 'Testing federation capabilities'
    }),
  }
);

const data = await response.json();
console.log(data.submissionId);
```

---

## Related Documentation

- **Database Setup**: `/DATABASE-TABLES-SETUP.md`
- **Troubleshooting**: `/TROUBLESHOOTING-CONTACT-FORMS.md`
- **Frontend Implementation**: `/pages/ContactPage.tsx`

---

**Version:** 1.0  
**Last Updated:** 23 November 2025
