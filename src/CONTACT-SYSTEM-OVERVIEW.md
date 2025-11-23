# Contact & Lead Management System Overview

## 📋 Executive Summary

The Nexus Crux contact system uses **three separate database tables** to manage different types of leads:

1. **Demo Requests** (`demo_requests`) - For scheduling product demonstrations
2. **Sandbox Requests** (`sandbox_requests`) - For trial/sandbox environment access
3. **Partner Inquiries** (`partner_inquiries`) - For partnership opportunities

Each table has its own optimized schema, workflow, and CRM integration capabilities.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXUS CRUX WEBSITE                       │
│                     /contact Page                           │
│                                                             │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│   │  Book Demo   │  │  Request     │  │  Partner     │   │
│   │  Form        │  │  Sandbox     │  │  Inquiry     │   │
│   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
└──────────┼──────────────────┼──────────────────┼───────────┘
           │                  │                  │
           │ POST /demo       │ POST /sandbox    │ POST /partner
           │                  │                  │
           ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│              SUPABASE EDGE FUNCTIONS                        │
│           /supabase/functions/server/                       │
│                                                             │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│   │ Demo API     │  │ Sandbox API  │  │ Partner API  │   │
│   │ POST/GET/    │  │ POST/GET/    │  │ POST/GET/    │   │
│   │ PATCH        │  │ PATCH        │  │ PATCH        │   │
│   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
└──────────┼──────────────────┼──────────────────┼───────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│              SUPABASE POSTGRESQL DATABASE                   │
│                                                             │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│   │demo_requests │  │sandbox_      │  │partner_      │   │
│   │              │  │requests      │  │inquiries     │   │
│   │              │  │              │  │              │   │
│   │• status      │  │• status      │  │• status      │   │
│   │• scheduled   │  │• approved    │  │• qualified   │   │
│   │• sales_rep   │  │• sandbox_url │  │• partnership │   │
│   │• crm_id      │  │• expires_at  │  │  _tier       │   │
│   └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
           │                  │                  │
           └──────────────────┴──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   CRM SYSTEMS (Future)                      │
│          Salesforce | HubSpot | Pipedrive                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Table Structures

### 1. demo_requests

**Purpose:** Track sales demos from initial request to completion

**Key Fields:**
- Contact: name, email, company, phone
- Demo Details: company_size, interest, preferred_date, scheduled_date
- Sales: sales_rep, demo_notes, demo_completed_at
- CRM: crm_id, crm_synced_at

**Status Workflow:**
```
new → contacted → scheduled → completed → converted / closed
```

**Use Cases:**
- Sales team demo scheduling
- Lead qualification pipeline
- Demo completion tracking
- Conversion rate analysis

---

### 2. sandbox_requests

**Purpose:** Manage trial/sandbox environment provisioning

**Key Fields:**
- Contact: name, email, company, phone, job_title
- Sandbox: use_case, expected_timeline, number_of_users
- Technical: technical_contact_email, technical_contact_name
- Provisioning: sandbox_url, expires_at, approved_by
- Usage: last_accessed_at, api_calls_count
- CRM: crm_id, crm_synced_at

**Status Workflow:**
```
new → reviewing → approved / rejected → provisioned → active → expired / converted / closed
```

**Use Cases:**
- Self-service trial management
- Technical evaluation tracking
- Sandbox expiry automation
- Trial-to-customer conversion

---

### 3. partner_inquiries

**Purpose:** Track partnership opportunities and agreements

**Key Fields:**
- Contact: name, email, company, phone, job_title, company_website
- Partnership: partnership_type, message, revenue_potential
- Business: geographic_focus, existing_customers
- Qualification: assigned_to, qualification_notes, partnership_tier
- Agreement: agreement_date, agreement_value
- CRM: crm_id, crm_synced_at

**Status Workflow:**
```
new → reviewing → qualified / not_qualified → negotiating → agreement / closed
```

**Use Cases:**
- Partnership development pipeline
- Partner qualification process
- Agreement tracking
- Partnership tier management

---

## 🔑 Key Features

### ✅ Separation of Concerns
- Each lead type has dedicated table
- Optimized schemas for specific workflows
- No confusion between different lead types

### ✅ CRM Ready
- `crm_id` field for external system linking
- `crm_synced_at` timestamp tracking
- Status workflows map to CRM stages

### ✅ Comprehensive Tracking
- Full contact information
- Rich metadata (UTM params, user agent, IP)
- Workflow timestamps
- Internal notes

### ✅ Status Management
- Enum-constrained status fields
- Automatic timestamp updates
- Status-specific fields (e.g., expires_at for sandboxes)

### ✅ Audit Trail
- `created_at`, `updated_at` auto-managed
- Workflow timestamps (contacted_at, qualified_at, etc.)
- User agent and referrer capture

### ✅ Performance
- Optimized indexes on common queries
- Fast filtering by status, date, email
- Efficient pagination support

---

## 🚀 Setup Instructions

### Step 1: Create Database Tables (Required)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **SQL Editor**
3. Copy the complete SQL from `/DATABASE-TABLES-SETUP.md`
4. Run the SQL to create all three tables

**This creates:**
- ✅ demo_requests table
- ✅ sandbox_requests table
- ✅ partner_inquiries table
- ✅ Indexes for performance
- ✅ Triggers for auto-timestamps
- ✅ RLS policies for security

### Step 2: Verify Tables

1. Go to **Table Editor**
2. Verify all three tables exist
3. Check table structures match documentation

### Step 3: Test Contact Forms

1. Visit `/contact` on your website
2. Test all three forms:
   - Book a Demo
   - Request Sandbox
   - Partner Inquiry
3. Verify submissions appear in respective tables

---

## 📖 API Endpoints

### Demo Requests
- `POST /api/contact/demo` - Submit demo request
- `GET /api/contact/demo` - List demo requests (admin)
- `PATCH /api/contact/demo/:id` - Update demo request (admin)

### Sandbox Requests
- `POST /api/contact/sandbox` - Submit sandbox request
- `GET /api/contact/sandbox` - List sandbox requests (admin)
- `PATCH /api/contact/sandbox/:id` - Update sandbox request (admin)

### Partner Inquiries
- `POST /api/contact/partner` - Submit partner inquiry
- `GET /api/contact/partner` - List partner inquiries (admin)
- `PATCH /api/contact/partner/:id` - Update partner inquiry (admin)

**Full API documentation:** `/API-DOCUMENTATION.md`

---

## 📁 File Structure

```
/
├── pages/
│   └── ContactPage.tsx                  # Frontend with 3 forms
├── supabase/functions/server/
│   ├── index.tsx                        # Route mounting
│   └── contact.ts                       # Complete API implementation
├── DATABASE-TABLES-SETUP.md             # SQL for all 3 tables ⭐
├── API-DOCUMENTATION.md                 # Complete API docs
├── TROUBLESHOOTING-CONTACT-FORMS.md     # Debug guide
└── CONTACT-SYSTEM-OVERVIEW.md           # This file
```

---

## 🎯 Usage Patterns

### For Sales Team (Demo Requests)

1. **New lead comes in** → Status: `new`
2. **Sales rep contacts** → Update status to `contacted`
3. **Demo scheduled** → Set `scheduled_date`, status to `scheduled`
4. **Demo completed** → Status to `completed`, add `demo_notes`
5. **Customer signs up** → Status to `converted`

### For Ops Team (Sandbox Requests)

1. **Request received** → Status: `new`
2. **Reviewing request** → Status: `reviewing`
3. **Approved** → Status: `approved`, set `approved_by`
4. **Sandbox provisioned** → Status: `provisioned`, add `sandbox_url`, `expires_at`
5. **Customer using** → Status: `active`, track `last_accessed_at`
6. **Trial expires or converts** → Status: `expired` or `converted`

### For Partnerships Team (Partner Inquiries)

1. **Inquiry received** → Status: `new`
2. **Initial review** → Status: `reviewing`, assign to `assigned_to`
3. **Qualified lead** → Status: `qualified`, add `qualification_notes`
4. **Negotiating terms** → Status: `negotiating`, set `partnership_tier`
5. **Agreement signed** → Status: `agreement`, set `agreement_date` and `agreement_value`

---

## 🔄 CRM Integration Workflows

### Automatic Sync (Recommended)

```javascript
// Webhook listener for new submissions
app.post('/webhook/crm-sync', async (req, res) => {
  const { table, record_id } = req.body;
  
  // Fetch record from Supabase
  const record = await fetchRecord(table, record_id);
  
  // Push to CRM (Salesforce, HubSpot, etc.)
  const crmRecord = await pushToCRM(record);
  
  // Update with CRM ID
  await updateRecord(table, record_id, {
    crm_id: crmRecord.id,
    crm_synced_at: new Date()
  });
});
```

### Scheduled Sync

```javascript
// Cron job runs every 15 minutes
async function syncPendingToCRM() {
  // Get unsynced records
  const pending = await getRecordsWhere('crm_id', 'IS NULL');
  
  for (const record of pending) {
    const crmRecord = await createCRMLead(record);
    await updateCRMId(record.id, crmRecord.id);
  }
}
```

### Manual Export

```sql
-- Export new demo requests as CSV
COPY (
  SELECT 
    name, email, company, phone, company_size, 
    interest, preferred_date, created_at
  FROM demo_requests
  WHERE status = 'new'
) TO '/tmp/new_demo_requests.csv' WITH CSV HEADER;
```

---

## 📊 Reporting Queries

### Demo Conversion Rate
```sql
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as total_requests,
  COUNT(*) FILTER (WHERE status = 'converted') as conversions,
  ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'converted') / COUNT(*), 2) as conversion_rate
FROM demo_requests
GROUP BY month
ORDER BY month DESC;
```

### Active Sandboxes Expiring Soon
```sql
SELECT 
  id, name, email, company, sandbox_url,
  expires_at,
  expires_at - NOW() as time_remaining
FROM sandbox_requests
WHERE status = 'active'
  AND expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'
ORDER BY expires_at ASC;
```

### Partnership Pipeline Value
```sql
SELECT 
  status,
  partnership_type,
  COUNT(*) as count,
  SUM(agreement_value) as total_value
FROM partner_inquiries
WHERE status IN ('qualified', 'negotiating', 'agreement')
GROUP BY status, partnership_type
ORDER BY total_value DESC;
```

### Response Time Analysis
```sql
SELECT 
  DATE_TRUNC('week', created_at) as week,
  AVG(contacted_at - created_at) as avg_response_time
FROM demo_requests
WHERE contacted_at IS NOT NULL
GROUP BY week
ORDER BY week DESC;
```

---

## 🛠️ Admin Dashboard Queries

### Today's Submissions (All Types)
```sql
-- Demo requests today
SELECT 'Demo' as type, COUNT(*) as count
FROM demo_requests
WHERE created_at::date = CURRENT_DATE

UNION ALL

-- Sandbox requests today
SELECT 'Sandbox' as type, COUNT(*) as count
FROM sandbox_requests
WHERE created_at::date = CURRENT_DATE

UNION ALL

-- Partner inquiries today
SELECT 'Partner' as type, COUNT(*) as count
FROM partner_inquiries
WHERE created_at::date = CURRENT_DATE;
```

### Uncontacted Leads (Urgent)
```sql
SELECT 
  'Demo' as type,
  id,
  name,
  email,
  company,
  created_at,
  NOW() - created_at as age
FROM demo_requests
WHERE status = 'new' AND contacted_at IS NULL

UNION ALL

SELECT 
  'Sandbox' as type,
  id,
  name,
  email,
  company,
  created_at,
  NOW() - created_at as age
FROM sandbox_requests
WHERE status = 'new' AND contacted_at IS NULL

ORDER BY age DESC;
```

---

## 🔒 Security Considerations

### Row Level Security (RLS)
- ✅ RLS enabled on all tables
- ✅ Service role has full access
- ✅ Anon key cannot read/write directly (must go through API)

### Data Privacy
- Phone numbers are optional
- IP addresses captured for fraud detection
- User agent for analytics only
- No sensitive payment information stored

### API Security
- All requests require authentication (Bearer token)
- Input validation on all fields
- SQL injection prevention via parameterized queries
- Rate limiting recommended (not yet implemented)

---

## 📈 Metrics to Track

### Key Performance Indicators (KPIs)

**Demo Requests:**
- Submission rate (per day/week/month)
- Demo completion rate
- Time to first contact
- Demo-to-conversion rate

**Sandbox Requests:**
- Approval rate
- Average time to provisioning
- Sandbox utilization (API calls)
- Trial-to-conversion rate

**Partner Inquiries:**
- Qualification rate
- Average deal size
- Time to agreement
- Partnership revenue

---

## 🔮 Future Enhancements

### Phase 1 (Current) ✅
- Three separate tables
- Complete API endpoints
- Frontend forms
- Basic CRM fields

### Phase 2 (Planned)
- Admin dashboard for viewing submissions
- Email notifications on new submissions
- Automated follow-up reminders
- Export to CSV functionality

### Phase 3 (Future)
- Webhook support for CRM integration
- Automated sandbox provisioning
- Lead scoring algorithms
- Advanced analytics dashboard

### Phase 4 (Future)
- AI-powered lead qualification
- Automated demo scheduling
- Calendar integration
- Multi-language support

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| `/DATABASE-TABLES-SETUP.md` | Complete SQL for creating all 3 tables |
| `/API-DOCUMENTATION.md` | Full API reference with examples |
| `/TROUBLESHOOTING-CONTACT-FORMS.md` | Debug guide and solutions |
| `/CONTACT-SYSTEM-OVERVIEW.md` | This overview document |
| `/pages/ContactPage.tsx` | Frontend implementation |
| `/supabase/functions/server/contact.ts` | Backend API implementation |

---

## ✅ Quick Start Checklist

- [ ] Read this overview
- [ ] Create database tables using `/DATABASE-TABLES-SETUP.md`
- [ ] Verify tables in Supabase Table Editor
- [ ] Test Book a Demo form
- [ ] Test Request Sandbox form
- [ ] Test Partner Inquiry form
- [ ] Verify submissions appear in tables
- [ ] Review API documentation
- [ ] Set up CRM integration (optional)

---

## 🆘 Getting Help

### Common Issues
See `/TROUBLESHOOTING-CONTACT-FORMS.md` for solutions to:
- Table doesn't exist errors
- Missing required fields
- CRM integration issues
- API authentication problems

### Support Resources
- **Database Setup**: `/DATABASE-TABLES-SETUP.md`
- **API Docs**: `/API-DOCUMENTATION.md`
- **Troubleshooting**: `/TROUBLESHOOTING-CONTACT-FORMS.md`

---

**Version:** 1.0  
**Last Updated:** 23 November 2025  
**System Status:** Production Ready ✅
