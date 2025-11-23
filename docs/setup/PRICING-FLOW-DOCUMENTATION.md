# Pricing Page Flow Documentation

**Last Updated**: 23 November 2025  
**Domain**: nexuscrux.io

---

## User Flow Overview

The pricing page now offers **TWO distinct paths** for customers:

1. **Start 14-Day Free Trial** (Primary CTA - Big button)
2. **Subscribe Now** (Secondary CTA - Text link below)

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PRICING PAGE                             │
│  /pricing                                                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
┌───────────────────────┐      ┌──────────────────────┐
│ START 14-DAY FREE     │      │  SUBSCRIBE NOW       │
│ TRIAL (Big Button)    │      │  (Text Link)         │
└───────────────────────┘      └──────────────────────┘
            │                             │
            ▼                             ▼
┌───────────────────────┐      ┌──────────────────────┐
│  Trial Dialog Opens   │      │ Subscribe Dialog     │
│  Shows:               │      │ Opens                │
│  - Plan name          │      │ Shows:               │
│  - Billing cycle      │      │ - Plan name          │
│  - Price              │      │ - Billing cycle      │
│  - "14 days free..."  │      │ - Price              │
│  - Cancel anytime     │      │ - "14 days free..."  │
│  - Full features      │      │ - Cancel anytime     │
└───────────────────────┘      └──────────────────────┘
            │                             │
            ▼                             ▼
┌───────────────────────┐      ┌──────────────────────┐
│  User Fills Form:     │      │ User Fills Form:     │
│  - Name*              │      │ - Name*              │
│  - Email*             │      │ - Email*             │
│  - Company*           │      │ - Company*           │
│  - Phone* (NEW!)      │      │ - Phone* (NEW!)      │
│  - Additional Info    │      │ - Additional Info    │
└───────────────────────┘      └──────────────────────┘
            │                             │
            ▼                             ▼
┌───────────────────────┐      ┌──────────────────────┐
│  Clicks "Request      │      │ Clicks "Subscribe"   │
│  Free Trial"          │      │                      │
└───────────────────────┘      └──────────────────────┘
            │                             │
            ▼                             ▼
┌───────────────────────┐      ┌──────────────────────┐
│  Email Client Opens   │      │ Email Client Opens   │
│  TO: sales@nexuscrux  │      │ TO: sales@nexuscrux  │
│      .io              │      │      .io             │
│  SUBJECT:             │      │ SUBJECT:             │
│  "14-Day Free Trial   │      │ "Subscription        │
│  Request - [Plan]"    │      │  Request - [Plan]"   │
│                       │      │                      │
│  BODY:                │      │ BODY:                │
│  - Free Trial Signup  │      │ - Subscription       │
│  - Plan: [Name]       │      │   Signup             │
│  - Billing: Monthly/  │      │ - Plan: [Name]       │
│    Annual             │      │ - Billing: Monthly/  │
│  - Name: [value]      │      │   Annual             │
│  - Email: [value]     │      │ - Name: [value]      │
│  - Company: [value]   │      │ - Email: [value]     │
│  - Phone: [value]     │      │ - Company: [value]   │
│  - Additional: [text] │      │ - Phone: [value]     │
└───────────────────────┘      │ - Additional: [text] │
            │                  └──────────────────────┘
            ▼                             │
┌───────────────────────┐                │
│  User Sends Email     │◄───────────────┘
│  Manually             │
└───────────────────────┘
            │
            ▼
┌───────────────────────┐
│  Email Arrives at     │
│  sales@nexuscrux.io   │
└───────────────────────┘
            │
            ▼
┌───────────────────────┐
│  Sales Team           │
│  Manually Processes:  │
│                       │
│  FOR TRIAL:           │
│  1. Create account    │
│  2. Send login creds  │
│  3. Set 14-day timer  │
│  4. Follow up         │
│                       │
│  FOR SUBSCRIPTION:    │
│  1. Send invoice/     │
│     payment link      │
│  2. Collect payment   │
│  3. Create account    │
│  4. Send login creds  │
└───────────────────────┘
```

---

## Current Implementation Details

### Technology Stack
- **Frontend**: React + TypeScript
- **Email Method**: `mailto:` links
- **Destination**: sales@nexuscrux.io
- **Form Validation**: HTML5 native validation (required fields)

### Email Subject Lines

#### Free Trial Request
```
Subject: 14-Day Free Trial Request - [Plan Name] Plan
```

#### Subscription Request
```
Subject: Subscription Request - [Plan Name] Plan
```

### Email Body Format

#### Free Trial
```
Free Trial Signup

Plan: Starter / Growth / Scale
Billing Cycle: monthly / annual

Name: John Doe
Email: john@company.com
Company: Acme Services Ltd
Phone: +44 20 7946 0958

Additional Information:
We're a home services company looking to expand...
```

#### Direct Subscription
```
Subscription Signup

Plan: Starter / Growth / Scale
Billing Cycle: monthly / annual

Name: John Doe
Email: john@company.com
Company: Acme Services Ltd
Phone: +44 20 7946 0958

Additional Information:
We want to start immediately without trial...
```

---

## Key Differences: Trial vs. Subscribe

| Feature | Free Trial | Subscribe Now |
|---------|-----------|---------------|
| **Button Type** | Large gradient button | Small text link |
| **Subject Line** | "14-Day Free Trial Request" | "Subscription Request" |
| **User Intent** | "I want to try before buying" | "I'm ready to pay now" |
| **Urgency** | Low - just exploring | High - ready to commit |
| **Sales Response** | Setup 14-day trial | Send invoice immediately |
| **Payment Timing** | After 14 days | Immediate |
| **Dialog Title** | "Start Your 14-Day Free Trial" | "Subscribe to [Plan] Plan" |
| **Submit Button** | "Request Free Trial" | "Subscribe" |

---

## User Personas & Motivations

### Trial Users
**Who they are:**
- First-time buyers unsure about commitment
- Companies evaluating multiple solutions
- Decision makers who need proof of value
- Budget-conscious startups

**What they need:**
- Risk-free evaluation period
- No credit card upfront
- Time to test all features
- Ability to cancel easily

### Direct Subscribers
**Who they are:**
- Companies already familiar with the product (demos, referrals)
- Enterprises with approved budgets
- Users migrating from competitors
- Businesses with urgent needs

**What they need:**
- Immediate access
- Fast onboarding
- Quick invoice/payment process
- Priority setup

---

## Current Limitations & Future Improvements

### ❌ Current Limitations

1. **Manual Processing Required**
   - Sales team must manually create accounts
   - No automated provisioning
   - Delays in activation (hours/days)
   - Human error possible

2. **Mailto Dependency**
   - Requires user to have email client configured
   - Some corporate firewalls block mailto
   - Mobile users may struggle
   - No confirmation that email was sent

3. **No Payment Collection**
   - Can't collect payment information upfront
   - No automated billing
   - Manual invoice generation needed
   - Risk of payment delays

4. **No Account Creation**
   - User can't log in immediately
   - No self-service onboarding
   - Depends on sales team availability
   - Poor UX for users expecting instant access

5. **No Data Persistence**
   - Form data only exists in email
   - No CRM integration
   - Manual data entry required
   - Risk of lost emails

### ✅ Recommended Future Improvements

#### Phase 1: Backend Integration (Immediate Priority)

```
┌─────────────────────────────────────┐
│  STRIPE / PAYMENT GATEWAY           │
│                                     │
│  - Collect payment info upfront     │
│  - Automated billing                │
│  - Subscription management          │
│  - Invoice generation               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  USER DATABASE & AUTH               │
│                                     │
│  - Auto account creation            │
│  - Email verification               │
│  - Password setup                   │
│  - Login system                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  API BACKEND                        │
│                                     │
│  - POST /api/signup/trial           │
│  - POST /api/signup/subscribe       │
│  - Email confirmation               │
│  - Webhook handlers                 │
└─────────────────────────────────────┘
```

**Benefits:**
- Instant account creation
- Automated trial timer (14 days)
- Automatic payment collection
- No sales team intervention needed
- Better user experience

#### Phase 2: Enhanced UX

1. **Progress Indicators**
   - Show "Creating your account..."
   - Success confirmation page
   - Email confirmation sent notice

2. **Onboarding Wizard**
   - Step-by-step setup after signup
   - Tutorial videos
   - Sample data pre-loaded
   - Guided first job creation

3. **Smart Routing**
   - High-value leads → Sales team
   - Standard signups → Self-service
   - Enterprise tier → Always sales call

4. **Analytics & Tracking**
   - Conversion funnel tracking
   - A/B testing of CTAs
   - Drop-off analysis
   - Signup attribution

#### Phase 3: Advanced Features

1. **Payment Integration**
   ```tsx
   // Stripe example
   <StripeCheckout
     plan={selectedPlan}
     billingCycle={billingCycle}
     onSuccess={handlePaymentSuccess}
   />
   ```

2. **CRM Integration**
   - Salesforce/HubSpot sync
   - Automatic lead scoring
   - Email nurture campaigns
   - Sales pipeline tracking

3. **Self-Service Portal**
   - Instant login after signup
   - In-app onboarding
   - Plan upgrades/downgrades
   - Usage dashboard

4. **Webhooks & Notifications**
   - Slack notifications for new signups
   - Email alerts to sales team
   - Customer success triggers
   - Payment failure handling

---

## Migration Path: mailto → API

### Step 1: Add Backend Endpoint
```typescript
// /api/signup/trial
POST /api/signup/trial
Body: {
  plan: string,
  billingCycle: 'monthly' | 'annual',
  name: string,
  email: string,
  company: string,
  phone: string,
  additionalInfo: string
}

Response: {
  success: boolean,
  accountId: string,
  message: string,
  loginUrl: string
}
```

### Step 2: Update Frontend
```typescript
const handleTrialSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  
  // NEW: API call instead of mailto
  const response = await fetch('/api/signup/trial', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plan: selectedPlan,
      billingCycle,
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      additionalInfo: formData.get('additionalInfo')
    })
  });
  
  if (response.ok) {
    const data = await response.json();
    // Show success message
    // Redirect to login or onboarding
    navigate('/welcome', { state: { accountId: data.accountId } });
  }
};
```

### Step 3: Backend Processing
```python
# Example backend (Python/Flask)
@app.route('/api/signup/trial', methods=['POST'])
def create_trial():
    data = request.json
    
    # 1. Create user account
    user = User.create(
        name=data['name'],
        email=data['email'],
        company=data['company'],
        phone=data['phone']
    )
    
    # 2. Create trial subscription
    subscription = Subscription.create(
        user_id=user.id,
        plan=data['plan'],
        billing_cycle=data['billingCycle'],
        trial_end=datetime.now() + timedelta(days=14),
        status='trialing'
    )
    
    # 3. Send welcome email
    send_welcome_email(user, subscription)
    
    # 4. Notify sales team
    notify_sales_team(user, subscription)
    
    return jsonify({
        'success': True,
        'accountId': user.id,
        'message': 'Trial account created successfully',
        'loginUrl': f'/login?email={user.email}'
    })
```

---

## Sales Team Playbook

### When You Receive a Trial Request Email

**Subject**: "14-Day Free Trial Request - [Plan] Plan"

**Steps**:
1. ✅ **Acknowledge** (within 1 hour)
   - Reply with "Thanks! Setting up your account..."
   
2. ✅ **Create Account** (within 2 hours)
   - Set up tenant in system
   - Generate login credentials
   - Configure 14-day trial period
   
3. ✅ **Send Welcome Email**
   ```
   Subject: Your Nexus Crux Trial is Ready!
   
   Hi [Name],
   
   Your 14-day free trial of Nexus Crux is ready!
   
   Login Details:
   URL: https://app.nexuscrux.io
   Email: [their email]
   Temporary Password: [generated password]
   
   Your trial includes:
   - [List plan features]
   - Full access to ReClova™ AI
   - Priority support
   
   Next Steps:
   1. Log in and change your password
   2. Complete onboarding wizard
   3. Schedule demo call (optional): [cal.com link]
   
   Your trial ends on: [Date 14 days from now]
   
   Questions? Reply to this email or call +44 20 XXXX XXXX
   
   Best regards,
   [Your Name]
   Sales Team, Nexus Crux
   ```

4. ✅ **Schedule Follow-ups**
   - Day 3: Check-in email
   - Day 7: Mid-trial check-in call
   - Day 12: Conversion discussion
   - Day 14: Trial ending notification

### When You Receive a Subscription Request Email

**Subject**: "Subscription Request - [Plan] Plan"

**Steps**:
1. ✅ **Respond Immediately** (within 30 minutes)
   - High-intent buyer - don't lose them!
   
2. ✅ **Send Invoice/Payment Link**
   ```
   Subject: Nexus Crux Subscription - Next Steps
   
   Hi [Name],
   
   Thank you for choosing Nexus Crux!
   
   To complete your subscription:
   
   Plan: [Plan Name]
   Billing: [Monthly/Annual]
   Price: [Amount]
   
   Payment Options:
   1. Pay by card: [Stripe payment link]
   2. Bank transfer: [Invoice attached]
   3. Purchase order: [PO form attached]
   
   Once payment is confirmed, we'll:
   - Create your account (same day)
   - Provide login credentials
   - Schedule onboarding call
   - Assign dedicated support contact
   
   Need help? Call me directly: +44 20 XXXX XXXX
   
   Best regards,
   [Your Name]
   Sales Team, Nexus Crux
   ```

3. ✅ **Priority Setup**
   - Create account immediately upon payment
   - Expedite onboarding
   - Assign customer success manager

---

## Analytics & Tracking

### Key Metrics to Track

```typescript
// Track button clicks
analytics.track('Pricing_CTA_Clicked', {
  cta_type: 'free_trial' | 'subscribe_now',
  plan: selectedPlan,
  billing_cycle: billingCycle,
  page: 'pricing'
});

// Track form submissions
analytics.track('Signup_Form_Submitted', {
  signup_type: 'trial' | 'subscription',
  plan: selectedPlan,
  billing_cycle: billingCycle
});

// Track mailto success (limited)
analytics.track('Mailto_Link_Opened', {
  signup_type: 'trial' | 'subscription'
});
```

### Conversion Funnel

```
Page View (Pricing)
       ↓ [80% continue]
CTA Click (Trial/Subscribe)
       ↓ [60% continue]
Form View (Dialog Open)
       ↓ [70% continue]
Form Submitted
       ↓ [90% continue] ← MAILTO FRICTION HERE
Email Sent
       ↓ [100% with API]
Account Created
```

**Current Estimated Conversion**: 38% (80% × 60% × 70% × 90%)  
**With API Backend**: 42% (80% × 60% × 70% × 100%)

---

## FAQ for Developers

### Q: Why use mailto instead of a proper backend?
**A**: This is a prototype/MVP approach. It allows us to:
- Launch quickly without backend infrastructure
- Validate demand before building complex systems
- Manually qualify leads in early stages
- Iterate on messaging and pricing

### Q: When should we migrate to API backend?
**A**: Migrate when you reach:
- 50+ signups per month
- Sales team overwhelmed with manual work
- Users complaining about slow activation
- Competitors offering instant access

### Q: Can we use a form service like Typeform/Google Forms instead?
**A**: Yes! Better than mailto. Options:
- **Typeform** → Webhook to Zapier → Create account
- **Tally** → Free, embeddable, webhook support
- **Google Forms** → Sheet → Apps Script automation
- **Airtable Forms** → Automations → Email/Slack

### Q: What about using Supabase for backend?
**A**: Excellent choice! Supabase provides:
- User authentication out of the box
- PostgreSQL database
- Row-level security
- Email templates
- Webhook triggers

Quick implementation:
```typescript
// Using Supabase
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const handleTrialSubmit = async (formData) => {
  // 1. Create user
  const { data: user, error } = await supabase.auth.signUp({
    email: formData.email,
    password: generateTempPassword(),
  })
  
  // 2. Store trial info
  await supabase.from('subscriptions').insert({
    user_id: user.id,
    plan: selectedPlan,
    status: 'trialing',
    trial_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  })
  
  // 3. Send welcome email (Supabase Edge Function)
  await supabase.functions.invoke('send-welcome-email', {
    body: { user_id: user.id }
  })
}
```

---

## Testing Checklist

### Manual Testing

- [ ] Click "Start 14-Day Free Trial" on Starter plan
- [ ] Verify dialog opens with correct plan name
- [ ] Verify billing cycle displays correctly (monthly/annual)
- [ ] Verify price displays correctly
- [ ] Fill out all required fields
- [ ] Verify phone is required (can't submit without it)
- [ ] Submit form
- [ ] Verify email client opens
- [ ] Verify subject line is correct
- [ ] Verify all form data is in email body
- [ ] Repeat for "Subscribe Now" link
- [ ] Test on all 3 plans (Starter, Growth, Scale)
- [ ] Test both monthly and annual billing
- [ ] Test on mobile device
- [ ] Test on different browsers (Chrome, Safari, Firefox)

### Edge Cases

- [ ] What if user has no email client configured?
- [ ] What if mailto is blocked by corporate firewall?
- [ ] What if user closes dialog without submitting?
- [ ] What if user submits empty optional field?
- [ ] What if user enters invalid phone format?
- [ ] What if email contains special characters?

---

## Summary

**Current State**: Functional MVP using mailto links  
**User Experience**: 6/10 (works but not optimal)  
**Sales Team**: Manual processing required  
**Scalability**: Low (10-50 signups/month max)  
**Next Step**: Implement API backend + Stripe integration

**Timeline Recommendation**:
- ✅ **Now**: Use current mailto solution
- 🔄 **Month 1-2**: Validate product-market fit
- 🚀 **Month 3**: Implement API backend if traction is good

---

**Questions?** Contact the development team or sales@nexuscrux.io
