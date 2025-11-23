# Nexus Crux Email Setup Guide for Hostinger

**Domain:** nexuscrux.io  
**Hosting Provider:** Hostinger  
**Date:** 23 November 2025

---

## Table of Contents

1. [Email Accounts Required](#email-accounts-required)
2. [Step-by-Step Setup on Hostinger](#step-by-step-setup-on-hostinger)
3. [DNS Configuration](#dns-configuration)
4. [Email Client Configuration](#email-client-configuration)
5. [Testing Your Emails](#testing-your-emails)
6. [Forwarding Rules (Optional)](#forwarding-rules-optional)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Email Accounts Required

Based on your website configuration, you need the following email addresses:

### Primary Email Accounts

1. **hello@nexuscrux.io** - General inquiries, main contact
2. **sales@nexuscrux.io** - Sales inquiries, demos, trial requests
3. **support@nexuscrux.io** - Customer support
4. **privacy@nexuscrux.io** - Privacy/GDPR requests
5. **dpo@nexuscrux.io** - Data Protection Officer
6. **legal@nexuscrux.io** - Legal matters, terms disputes

### Priority by Usage

**High Priority** (these receive the most traffic from your website):
- sales@nexuscrux.io (Demo requests, trial signups, pricing inquiries)
- hello@nexuscrux.io (General contact form submissions)
- support@nexuscrux.io (Customer support requests)

**Medium Priority**:
- privacy@nexuscrux.io (GDPR and privacy requests)

**Lower Priority** (rarely used but legally required):
- dpo@nexuscrux.io (Data Protection Officer communications)
- legal@nexuscrux.io (Legal disputes and terms inquiries)

---

## Step-by-Step Setup on Hostinger

### Step 1: Access Hostinger Email Management

1. Log in to your **Hostinger Account** at https://hpanel.hostinger.com
2. Navigate to **Emails** section in the dashboard
3. Select your domain **nexuscrux.io**
4. Click **"Create Email Account"** or **"Manage Emails"**

### Step 2: Create Each Email Account

For **each email address** listed above, follow these steps:

#### Creating hello@nexuscrux.io (example - repeat for all)

1. Click **"Create Email Account"** or **"New Email"**
2. Fill in the details:
   - **Email prefix**: `hello`
   - **Domain**: `nexuscrux.io` (should be pre-selected)
   - **Password**: Create a strong password (min. 12 characters)
     - Example format: `NexusH3llo!2025$ecure`
   - **Storage quota**: 
     - hello@: 5 GB (high traffic)
     - sales@: 10 GB (highest traffic - many attachments)
     - support@: 5 GB
     - privacy@: 2 GB
     - dpo@: 2 GB
     - legal@: 2 GB

3. Click **"Create"** or **"Save"**
4. **Important**: Save the password securely in a password manager

#### Recommended Storage Allocation

```
sales@nexuscrux.io     → 10 GB (receives most emails + attachments)
hello@nexuscrux.io     → 5 GB  (general inquiries)
support@nexuscrux.io   → 5 GB  (customer support)
privacy@nexuscrux.io   → 2 GB  (GDPR requests)
dpo@nexuscrux.io       → 2 GB  (DPO communications)
legal@nexuscrux.io     → 2 GB  (legal matters)
```

### Step 3: Verify Email Creation

After creating each account:
1. Go to **Email Accounts** list
2. Verify all 6 accounts are listed
3. Note the status (should show "Active")

---

## DNS Configuration

Hostinger typically configures DNS automatically, but verify these records:

### Step 1: Access DNS Zone Editor

1. In Hostinger panel, go to **DNS / Name Servers**
2. Click **"DNS Zone Editor"**

### Step 2: Verify MX Records

Ensure these MX (Mail Exchange) records exist:

```
Type: MX
Name: @ (or nexuscrux.io)
Priority: 10
Value: mx1.hostinger.com (or similar Hostinger mail server)

Type: MX
Name: @ (or nexuscrux.io)
Priority: 20
Value: mx2.hostinger.com
```

**Note**: Hostinger's exact mail server names may vary. Check Hostinger documentation or support for exact values.

### Step 3: Add SPF Record (Anti-Spam)

Add this TXT record to prevent your emails from being marked as spam:

```
Type: TXT
Name: @ (or nexuscrux.io)
Value: v=spf1 include:_spf.hostinger.com ~all
```

**What this does**: Tells receiving servers that Hostinger is authorized to send email from nexuscrux.io

### Step 4: Add DKIM Record (Email Authentication)

1. In Hostinger, go to **Email** → **DKIM**
2. Click **"Generate DKIM"** for nexuscrux.io
3. Copy the generated DKIM record
4. Add it to your DNS as a TXT record

Example format:
```
Type: TXT
Name: default._domainkey (or as provided by Hostinger)
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBA... (long key)
```

### Step 5: Add DMARC Record (Email Policy)

Add this TXT record for additional email security:

```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dpo@nexuscrux.io; ruf=mailto:dpo@nexuscrux.io; fo=1
```

**What this does**: 
- Tells other mail servers how to handle emails that fail SPF/DKIM checks
- Sends reports to your DPO email

### Step 6: Verify DNS Propagation

1. Wait 24-48 hours for DNS changes to propagate globally
2. Use online tools to verify:
   - MXToolbox: https://mxtoolbox.com/SuperTool.aspx?action=mx%3anexuscrux.io
   - DNS Checker: https://dnschecker.org/#MX/nexuscrux.io

---

## Email Client Configuration

### Option 1: Webmail (Easiest)

**Hostinger Webmail Access**:
```
URL: https://webmail.hostinger.com
OR
URL: https://nexuscrux.io:2096 (cPanel webmail if available)

Username: hello@nexuscrux.io (full email address)
Password: [your password]
```

### Option 2: Desktop Email Client (Outlook, Thunderbird, etc.)

#### IMAP Settings (Recommended - syncs across devices)

```
Incoming Mail Server (IMAP):
- Server: imap.hostinger.com
- Port: 993
- Security: SSL/TLS
- Username: hello@nexuscrux.io (full email address)
- Password: [your password]

Outgoing Mail Server (SMTP):
- Server: smtp.hostinger.com
- Port: 465 (SSL) or 587 (TLS)
- Security: SSL/TLS or STARTTLS
- Authentication: Required
- Username: hello@nexuscrux.io (full email address)
- Password: [your password]
```

#### POP3 Settings (Alternative - downloads to one device)

```
Incoming Mail Server (POP3):
- Server: pop.hostinger.com
- Port: 995
- Security: SSL/TLS
- Username: hello@nexuscrux.io
- Password: [your password]

Outgoing Mail Server (SMTP): [same as above]
```

### Option 3: Mobile Devices (iOS/Android)

#### iOS Mail App

1. Go to **Settings** → **Mail** → **Accounts** → **Add Account**
2. Select **"Other"**
3. Tap **"Add Mail Account"**
4. Enter:
   - Name: Nexus Crux Sales (or whatever role)
   - Email: sales@nexuscrux.io
   - Password: [your password]
   - Description: Nexus Crux Sales
5. Tap **Next**, then select **IMAP**
6. Enter incoming/outgoing server details (same as above)

#### Android Gmail App

1. Open **Gmail** app
2. Tap **Menu** (☰) → **Settings** → **Add account**
3. Select **"Other"**
4. Enter email address and password
5. Configure incoming/outgoing servers (same settings as above)

---

## Testing Your Emails

### Test 1: Send Email

1. Log in to **hello@nexuscrux.io** via webmail
2. Send a test email to your personal email
3. Verify you receive it (check spam folder if needed)

### Test 2: Receive Email

1. Send an email from your personal account to **hello@nexuscrux.io**
2. Check webmail to confirm you received it

### Test 3: Website Form Integration

Since your forms use `mailto:` links:

1. Go to your Pricing page at https://nexuscrux.io/pricing
2. Click **"Start Free Trial"** on any plan
3. Fill out the modal form
4. Click **Submit**
5. Verify your default email client opens with pre-filled message
6. Send the email
7. Check **sales@nexuscrux.io** webmail to confirm receipt

### Test 4: Spam Score Check

Use these tools to ensure your emails won't be marked as spam:

1. **Mail-Tester**: https://www.mail-tester.com
   - Send an email to the address they provide
   - Check your score (aim for 9/10 or higher)

2. **MXToolbox**: https://mxtoolbox.com/emailhealth/
   - Enter nexuscrux.io
   - Check for any issues

---

## Forwarding Rules (Optional)

### Option 1: Forward All to One Central Inbox

If you want all emails to go to one person initially:

1. In Hostinger **Email** section
2. Select an email account (e.g., sales@nexuscrux.io)
3. Click **"Forwarders"** or **"Email Forwarding"**
4. Create a forward to a central email (e.g., your personal email)
5. Check **"Keep a copy"** to preserve the original in sales@ inbox

**Recommended Setup**:
```
sales@nexuscrux.io    → Forward to: founder@yourdomain.com (keep copy)
hello@nexuscrux.io    → Forward to: founder@yourdomain.com (keep copy)
support@nexuscrux.io  → Forward to: founder@yourdomain.com (keep copy)
privacy@nexuscrux.io  → Keep in inbox (check weekly)
dpo@nexuscrux.io      → Keep in inbox (check monthly)
legal@nexuscrux.io    → Keep in inbox (check as needed)
```

### Option 2: Autoresponders (Out of Office)

For emails that receive lower volume:

1. Select email account (e.g., legal@nexuscrux.io)
2. Click **"Autoresponder"**
3. Set up automatic reply:

```
Subject: Re: Your inquiry to Nexus Crux Legal

Dear [name],

Thank you for contacting the Nexus Crux legal team.

We have received your email and will respond within 2-3 business days. For urgent matters, please contact our general support at hello@nexuscrux.io.

Best regards,
Nexus Crux Legal Team
```

---

## Best Practices

### Security

1. **Use Strong Passwords**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Different password for each account
   - Use a password manager (LastPass, 1Password, Bitwarden)

2. **Enable Two-Factor Authentication** (if Hostinger supports it)
   - Go to Account Security in Hostinger
   - Enable 2FA for your Hostinger account

3. **Regular Password Changes**
   - Change passwords every 6 months
   - Immediately change if you suspect compromise

### Organization

1. **Set up Email Signatures**

```
Best regards,

[Your Name]
[Your Title]
Nexus Crux

📧 hello@nexuscrux.io
🌐 https://nexuscrux.io
📍 London, United Kingdom

Multi-tenant federated service bus platform for home-service brands
```

2. **Create Email Templates** for common responses:
   - Demo request confirmation
   - Trial signup confirmation
   - Privacy request acknowledgment
   - General inquiry response

3. **Set up Folders/Labels**:
   - Demos (for sales@)
   - Trials (for sales@)
   - GDPR Requests (for privacy@)
   - Urgent
   - Follow-up Needed

### Compliance

1. **Response Times** (as mentioned on your website):
   - General inquiries: 1 business day
   - Sales: Same day (business hours)
   - Privacy/GDPR: Within 30 days (UK GDPR requirement)
   - Support: 24-48 hours

2. **Email Retention**:
   - Keep all emails for at least 7 years (UK legal requirement)
   - Back up regularly using Hostinger's backup feature

3. **Privacy**:
   - Don't share customer emails
   - Use BCC when sending to multiple recipients
   - Include unsubscribe link in marketing emails

---

## Troubleshooting

### Problem: Emails Going to Spam

**Solution**:
1. Verify SPF, DKIM, and DMARC records are correct
2. Check spam score at mail-tester.com
3. Ask recipients to whitelist your domain
4. Avoid spam trigger words: "FREE!", "ACT NOW!", excessive caps

### Problem: Can't Send Emails

**Solution**:
1. Verify SMTP settings are correct
2. Check if port 465 or 587 is blocked by firewall
3. Try alternative port (465 vs 587)
4. Verify username is full email address (not just "hello")
5. Check Hostinger status page for outages

### Problem: Not Receiving Emails

**Solution**:
1. Verify MX records are pointing to Hostinger servers
2. Check email quota isn't full (log in to webmail)
3. Check spam/junk folder
4. Verify sender isn't blocked
5. Use MXToolbox to test mail server: https://mxtoolbox.com/

### Problem: DNS Changes Not Taking Effect

**Solution**:
1. DNS propagation takes 24-48 hours globally
2. Clear your DNS cache:
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo killall -HUP mDNSResponder`
   - Linux: `sudo systemd-resolve --flush-caches`
3. Check propagation status: https://dnschecker.org/

### Problem: Webmail Not Loading

**Solution**:
1. Clear browser cache and cookies
2. Try incognito/private browsing mode
3. Try different browser
4. Check Hostinger status: https://www.hostinger.com/status
5. Contact Hostinger support

---

## Support Contacts

### Hostinger Support

- **Live Chat**: Available 24/7 in Hostinger panel
- **Email**: support@hostinger.com
- **Knowledge Base**: https://support.hostinger.com/en/collections/1548605-email

### Nexus Crux Internal

- **IT Lead**: [Your IT contact]
- **Email Admin**: [Person managing emails]

---

## Quick Reference Card

### Most Used Information

```
Domain: nexuscrux.io

Webmail: https://webmail.hostinger.com

IMAP/SMTP Settings:
- IMAP Server: imap.hostinger.com (Port 993, SSL)
- SMTP Server: smtp.hostinger.com (Port 465, SSL)
- Username: [full email address]

High-Traffic Emails:
- sales@nexuscrux.io (Demo/Trial requests)
- hello@nexuscrux.io (General contact)
- support@nexuscrux.io (Customer support)

Password Format: [Store in password manager]
```

---

## Checklist: Email Setup Completion

Use this checklist to ensure everything is configured:

### Account Creation
- [ ] hello@nexuscrux.io created
- [ ] sales@nexuscrux.io created
- [ ] support@nexuscrux.io created
- [ ] privacy@nexuscrux.io created
- [ ] dpo@nexuscrux.io created
- [ ] legal@nexuscrux.io created

### DNS Configuration
- [ ] MX records verified
- [ ] SPF record added
- [ ] DKIM record generated and added
- [ ] DMARC record added
- [ ] DNS propagation confirmed (24-48 hours)

### Testing
- [ ] Sent test email from each account
- [ ] Received test email to each account
- [ ] Tested website form (pricing trial signup)
- [ ] Checked spam score (mail-tester.com)
- [ ] Verified SPF/DKIM/DMARC (MXToolbox)

### Configuration
- [ ] Email clients configured (desktop/mobile)
- [ ] Email signatures created
- [ ] Forwarding rules set up (if needed)
- [ ] Autoresponders configured (if needed)
- [ ] Folders/labels created for organization

### Security
- [ ] Strong passwords created and saved in password manager
- [ ] 2FA enabled on Hostinger account (if available)
- [ ] Backup plan established
- [ ] Team trained on email best practices

---

## Next Steps After Setup

1. **Week 1**: Monitor all inboxes daily to ensure emails are flowing correctly
2. **Week 2**: Set up email templates for common responses
3. **Month 1**: Review spam scores and deliverability
4. **Month 3**: Audit email usage and adjust storage quotas if needed
5. **Month 6**: Change all passwords
6. **Ongoing**: Backup emails monthly, review and respond per SLA

---

**Document Version**: 1.0  
**Last Updated**: 23 November 2025  
**Maintained By**: Nexus Crux IT Team

For questions about this guide, contact: [your-it-contact]
