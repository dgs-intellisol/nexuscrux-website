# 🎯 Contact & Lead Management System - Quick Start

Welcome to the Nexus Crux Contact System! This system uses **three separate database tables** to manage different types of leads with optimized workflows and CRM integration capabilities.

---

## 🚀 5-Minute Quick Start

### 1. Create Database Tables

**Go to Supabase Dashboard → SQL Editor and run this SQL:**

📄 **Copy the complete SQL from:** `/DATABASE-TABLES-SETUP.md`

This creates:
- ✅ `demo_requests` table
- ✅ `sandbox_requests` table  
- ✅ `partner_inquiries` table
- ✅ All indexes, triggers, and RLS policies

### 2. Verify Tables

Go to **Table Editor** and confirm you see all three tables.

### 3. Test Forms

Visit `/contact` on your website and test all three forms:
1. **Book a Demo** (left column)
2. **Request Sandbox** (middle column)
3. **Partner Inquiry** (right column)

### 4. Check Submissions

Go to **Table Editor** in Supabase and verify submissions appear in the correct tables.

---

## 📋 System Components

### Three Forms = Three Tables

| Form | Table | Purpose |
|------|-------|---------|
| 📅 Book a Demo | `demo_requests` | Sales demos & consultations |
| 🧪 Request Sandbox | `sandbox_requests` | Trial/sandbox environment access |
| 🤝 Partner Inquiry | `partner_inquiries` | Partnership opportunities |

### Each Table Has:
- ✅ Dedicated schema optimized for its workflow
- ✅ Status tracking (new → contacted → qualified → converted)
- ✅ CRM integration fields (crm_id, crm_synced_at)
- ✅ Rich metadata (UTM params, user agent, IP address)
- ✅ Automatic timestamps (created_at, updated_at)
- ✅ Performance indexes

---

## 📚 Documentation

### Essential Reading (Start Here)

1. **`/DATABASE-TABLES-SETUP.md`** ⭐ MUST READ
   - Complete SQL for all 3 tables
   - Field descriptions
   - Status workflows
   - Setup instructions

2. **`/CONTACT-SYSTEM-OVERVIEW.md`**
   - System architecture
   - Usage patterns
   - Reporting queries
   - CRM integration examples

3. **`/TROUBLESHOOTING-CONTACT-FORMS.md`**
   - Common errors and solutions
   - Debugging steps
   - Testing checklist

### Reference Documentation

4. **`/API-DOCUMENTATION.md`**
   - Complete API reference
   - Request/response examples
   - cURL and JavaScript examples
   - All endpoints documented

---

## 🎨 Frontend Implementation

The contact page (`/pages/ContactPage.tsx`) features:

- **Three-column layout** (responsive, stacks on mobile)
- **Independent form states** (each form manages its own loading/success/error)
- **Beautiful success messages** with checkmark icons
- **Automatic form disabling** after successful submission
- **Detailed error logging** for debugging

### Form Icons:
- 📅 **Calendar** - Book a Demo (teal-to-lime gradient)
- 🧪 **Flask** - Request Sandbox (lime-to-teal gradient)
- 🤝 **Handshake** - Partner Inquiry (teal-to-lime gradient)

---

## 🔌 Backend API

The API (`/supabase/functions/server/contact.ts`) provides:

### Demo Requests
- `POST /api/contact/demo` - Submit request
- `GET /api/contact/demo` - List all (admin)
- `PATCH /api/contact/demo/:id` - Update status (admin)

### Sandbox Requests
- `POST /api/contact/sandbox` - Submit request
- `GET /api/contact/sandbox` - List all (admin)
- `PATCH /api/contact/sandbox/:id` - Update status (admin)

### Partner Inquiries
- `POST /api/contact/partner` - Submit inquiry
- `GET /api/contact/partner` - List all (admin)
- `PATCH /api/contact/partner/:id` - Update status (admin)

**Full details:** `/API-DOCUMENTATION.md`

---

## 🔄 Status Workflows

### Demo Requests
```
new → contacted → scheduled → completed → converted / closed
```

### Sandbox Requests
```
new → reviewing → approved → provisioned → active → expired / converted
```

### Partner Inquiries
```
new → reviewing → qualified → negotiating → agreement / closed
```

---

## 🎯 Use Cases

### For Sales Team (Demo Requests)
- Track demo scheduling pipeline
- Manage follow-ups
- Measure conversion rates
- CRM sync for lead management

### For Operations Team (Sandbox Requests)
- Approve/reject trial requests
- Provision sandbox environments
- Track trial usage
- Monitor expiration dates
- Convert trials to paid accounts

### For Partnerships Team (Partner Inquiries)
- Qualify partnership opportunities
- Track negotiation stages
- Manage partnership tiers
- Record agreement values
- CRM sync for partnership deals

---

## 📊 Key Features

### ✅ Separation of Concerns
Each lead type has its own table with optimized fields and workflows.

### ✅ CRM Ready
Built-in `crm_id` and `crm_synced_at` fields for seamless CRM integration.

### ✅ Rich Metadata
Captures UTM parameters, user agent, IP address, and referrer for analytics.

### ✅ Status Management
Enum-constrained status fields with automatic timestamp updates.

### ✅ Performance Optimized
Indexed on common query patterns (status, email, date, crm_id).

### ✅ Security First
Row Level Security (RLS) enabled with proper policies.

---

## 🔍 Quick Queries

### Count Today's Submissions
```sql
SELECT 
  (SELECT COUNT(*) FROM demo_requests WHERE created_at::date = CURRENT_DATE) as demos,
  (SELECT COUNT(*) FROM sandbox_requests WHERE created_at::date = CURRENT_DATE) as sandboxes,
  (SELECT COUNT(*) FROM partner_inquiries WHERE created_at::date = CURRENT_DATE) as partners;
```

### Find Uncontacted Leads
```sql
-- Demo requests older than 24 hours
SELECT * FROM demo_requests
WHERE status = 'new' 
  AND contacted_at IS NULL
  AND created_at < NOW() - INTERVAL '24 hours'
ORDER BY created_at ASC;
```

### Active Sandboxes Expiring Soon
```sql
SELECT * FROM sandbox_requests
WHERE status = 'active'
  AND expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'
ORDER BY expires_at ASC;
```

**More queries:** `/CONTACT-SYSTEM-OVERVIEW.md`

---

## 🛠️ Setup Checklist

- [ ] **Step 1:** Read `/DATABASE-TABLES-SETUP.md`
- [ ] **Step 2:** Run SQL in Supabase SQL Editor
- [ ] **Step 3:** Verify tables in Table Editor
- [ ] **Step 4:** Test Book a Demo form
- [ ] **Step 5:** Test Request Sandbox form
- [ ] **Step 6:** Test Partner Inquiry form
- [ ] **Step 7:** Check submissions in tables
- [ ] **Step 8:** Review API documentation
- [ ] **Step 9:** (Optional) Set up CRM integration

---

## 🚨 Troubleshooting

### Error: "Table does not exist"

**Solution:** You need to create the tables!
1. Open `/DATABASE-TABLES-SETUP.md`
2. Copy the complete SQL
3. Run in Supabase SQL Editor

### Error: "Missing required fields"

**Solution:** Ensure all required fields are filled:
- All forms: name, email, company
- Sandbox: also requires useCase
- Partner: also requires partnershipType and message

### More Help

See `/TROUBLESHOOTING-CONTACT-FORMS.md` for:
- Complete error reference
- Debugging steps
- Testing checklist
- API testing with curl

---

## 📁 File Structure

```
/
├── pages/
│   └── ContactPage.tsx                     # Frontend (3 forms)
│
├── supabase/functions/server/
│   ├── index.tsx                           # Route mounting
│   └── contact.ts                          # API implementation
│
├── DATABASE-TABLES-SETUP.md                # ⭐ START HERE
├── CONTACT-SYSTEM-OVERVIEW.md              # Architecture & usage
├── API-DOCUMENTATION.md                    # Complete API reference
├── TROUBLESHOOTING-CONTACT-FORMS.md        # Debug guide
└── README-CONTACT-SYSTEM.md                # This file
```

---

## 🔮 Future Enhancements

### Coming Soon
- Admin dashboard for viewing submissions
- Email notifications
- Automated follow-up reminders
- CSV export functionality

### Planned
- Webhook support for CRM
- Automated sandbox provisioning
- Lead scoring
- Analytics dashboard

---

## 📞 Support

### Documentation
- **Setup**: `/DATABASE-TABLES-SETUP.md`
- **Overview**: `/CONTACT-SYSTEM-OVERVIEW.md`
- **API**: `/API-DOCUMENTATION.md`
- **Troubleshooting**: `/TROUBLESHOOTING-CONTACT-FORMS.md`

### Quick Links
- [Supabase Dashboard](https://supabase.com/dashboard)
- Website: `/contact` page
- Table Editor: Supabase → Table Editor
- Logs: Supabase → Edge Functions → Logs

---

## ✨ Summary

You now have a **production-ready contact and lead management system** with:

✅ **Three optimized tables** for different lead types  
✅ **Complete API** with GET/POST/PATCH endpoints  
✅ **Beautiful frontend** with three responsive forms  
✅ **CRM integration** ready with dedicated fields  
✅ **Rich metadata** tracking for analytics  
✅ **Status workflows** for pipeline management  
✅ **Comprehensive documentation** for setup and usage  

**Next Steps:**
1. Create the database tables (5 minutes)
2. Test the forms
3. Start collecting leads!

---

**Version:** 1.0  
**Last Updated:** 23 November 2025  
**Status:** ✅ Production Ready

---

**Need help?** Check `/TROUBLESHOOTING-CONTACT-FORMS.md` or review the setup guide in `/DATABASE-TABLES-SETUP.md`
