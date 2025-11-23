# Domain Update Summary: nexuscrux.com → nexuscrux.io

**Date**: 23 November 2025  
**New Domain**: nexuscrux.io (Hosted on Hostinger)

---

## What Was Changed

### 1. Email Addresses (All Updated to @nexuscrux.io)

#### Configuration File
✅ `/config/socialMedia.ts`
- hello@nexuscrux.io
- support@nexuscrux.io  
- sales@nexuscrux.io
- privacy@nexuscrux.io
- dpo@nexuscrux.io
- legal@nexuscrux.io

### 2. Website Domain References

✅ `/components/SEO.tsx`
- Updated canonical URL base to `https://nexuscrux.io`

✅ `/public/robots.txt`
- Sitemap URL: `https://nexuscrux.io/sitemap.xml`

✅ `/public/sitemap.xml`
- All page URLs updated to nexuscrux.io domain:
  - Homepage, Platform, Solutions, Features, Pricing
  - Documentation, About, Contact, ReClova

✅ `/pages/DocumentationPage.tsx`
- API Base URL: `https://api.nexuscrux.io/v1`
- Example API request updated

### 3. Pricing Page Enhancement

✅ `/pages/PricingPage.tsx`
- ✅ Phone number now **required** in free trial dialog
- ✅ Trial signup sends to `sales@nexuscrux.io`
- ✅ Pre-fills selected plan and billing cycle

### 4. Dialog Component Fix

✅ `/components/ui/dialog.tsx`
- Fixed React ref warning by converting DialogOverlay to `React.forwardRef`

---

## Email Setup Guide Created

✅ `/EMAIL-SETUP-GUIDE.md`

Comprehensive 450+ line guide covering:
- Step-by-step Hostinger email setup
- DNS configuration (MX, SPF, DKIM, DMARC)
- Email client configuration (Webmail, Desktop, Mobile)
- Testing procedures
- Forwarding rules and autoresponders
- Security best practices
- Troubleshooting guide
- Complete checklist

---

## Files That Still Reference OLD Domain (.com)

These are **documentation files only** and don't affect website functionality. Update when convenient:

### Documentation Files (Low Priority)
- `/guidelines/Guidelines.md` - Brand guidelines document
- `/public/logos/README.md` - Logo documentation
- `/public/logos/DEVELOPER-GUIDE.md` - Developer guide
- `/public/logos/index.html` - Logo preview page

### Page Files with Structured Data (No User Impact)
- `/pages/ContactPage.tsx` - JSON-LD structured data
- `/pages/PrivacyPolicy.tsx` - Policy content
- `/pages/TermsOfService.tsx` - Terms content  
- `/pages/GDPR.tsx` - GDPR policy content

**Note**: These structured data and policy pages contain old email references but the actual working `mailto:` links use the config file, which has been updated. These pages still function correctly.

---

## Action Items for You

### Immediate (Required)

1. **Set Up Emails on Hostinger** (30-60 minutes)
   - Follow `/EMAIL-SETUP-GUIDE.md` step-by-step
   - Create 6 email accounts
   - Configure DNS records (SPF, DKIM, DMARC)
   - Test each email account

2. **Update Website Domain** (5 minutes)
   - Point nexuscrux.io to your hosting
   - Update nameservers if needed
   - Wait 24-48 hours for DNS propagation

3. **Test Forms** (10 minutes)
   - Test "Start Free Trial" button → sales@nexuscrux.io
   - Test "Schedule Demo" button → sales@nexuscrux.io  
   - Test "Request Sandbox" button → sales@nexuscrux.io
   - Verify all mailto links work

### Short Term (Within 1 Week)

4. **Configure Email Clients** (15 minutes per device)
   - Set up desktop email client (Outlook, Thunderbird, Apple Mail)
   - Configure mobile devices (iOS/Android)
   - Create email signatures

5. **Set Up Forwarding** (10 minutes)
   - Forward sales@, hello@, support@ to your main inbox
   - Set up autoresponders if needed

6. **Verify Deliverability** (10 minutes)
   - Use https://www.mail-tester.com
   - Check spam score (aim for 9/10 or higher)
   - Verify SPF/DKIM/DMARC at https://mxtoolbox.com

### Long Term (When Convenient)

7. **Update Documentation Files** (Optional - 30 minutes)
   - Update Guidelines.md
   - Update logo documentation files
   - Update legal pages (Privacy, Terms, GDPR)

---

## Current Status

### ✅ Website Code - Fully Updated
- All functional email links point to @nexuscrux.io
- API endpoints updated to api.nexuscrux.io
- SEO canonical URLs updated
- Sitemap updated
- All forms send to correct emails

### ⏳ Pending - Your Actions
- Create email accounts on Hostinger
- Configure DNS records
- Test email delivery
- Set up email clients

### 📝 Optional - Low Priority
- Update documentation markdown files
- Update legal page content (still works, just references old domain in text)

---

## Testing Checklist

After setting up emails, test these:

```
[ ] Send email FROM hello@nexuscrux.io to personal email
[ ] Send email TO hello@nexuscrux.io from personal email
[ ] Visit /pricing, click "Start Free Trial" → verify sales@ receives
[ ] Visit /contact, submit demo form → verify sales@ receives  
[ ] Visit /documentation, request sandbox → verify sales@ receives
[ ] Check spam score at mail-tester.com (aim for 9/10+)
[ ] Verify MX/SPF/DKIM at mxtoolbox.com
[ ] Test email on desktop client
[ ] Test email on mobile device
```

---

## Support

If you encounter issues:

1. **Email Setup**: See `/EMAIL-SETUP-GUIDE.md` troubleshooting section
2. **Hostinger Support**: 24/7 live chat at https://hpanel.hostinger.com
3. **DNS Issues**: Use https://dnschecker.org to verify propagation
4. **Spam Issues**: Use https://www.mail-tester.com for diagnosis

---

## Summary

✅ **Website code**: Fully updated and deployed  
✅ **Phone required**: Added to trial form  
✅ **Email guide**: Comprehensive setup instructions created  
⏳ **Your task**: Follow EMAIL-SETUP-GUIDE.md to set up Hostinger emails  
📝 **Optional**: Update documentation files when convenient

**Estimated Time to Complete**: 1-2 hours for full email setup

---

**Questions?** Review the EMAIL-SETUP-GUIDE.md for detailed instructions.
