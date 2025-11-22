# Nexus Crux - Brand & Development Guidelines

**Version:** 1.0  
**Last Updated:** 22 November 2025  
**Company:** Nexus Crux Ltd

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Logo Guidelines](#logo-guidelines)
5. [Design Principles](#design-principles)
6. [Component Library](#component-library)
7. [Development Standards](#development-standards)
8. [SEO & Localization](#seo--localization)
9. [Legal & Compliance](#legal--compliance)
10. [Contact & Support](#contact--support)

---

## Brand Identity

### Brand Essence

**Nexus Crux** represents the intersection of connection and core value:

- **Nexus** = Connection Hub
  - The central point where all systems converge
  - Facilitates communication and data flow
  - Represents our federated architecture
  - Symbolizes network effects and ecosystem growth

- **Crux** = Essential Core
  - The critical, indispensable element
  - The heart of operational efficiency
  - The decisive point that matters most
  - Foundation of reliability and trust

### Platform Positioning

**What We Do:**
Multi-tenant federated service bus platform for home-service brands and van-and-man contractors

**Core Value Proposition:**
- Unify disparate systems into one coherent ecosystem
- AI-powered job reconciliation (ReClova™)
- Real-time data synchronization across platforms
- Seamless integration without vendor lock-in

**Target Audience:**
1. **Home-Service Brands** - Established companies with multiple systems
2. **Van-and-Man Contractors** - Individual operators and small teams
3. **Enterprise Operations** - Large-scale multi-brand deployments

### Brand Personality

- **Professional** yet approachable
- **Innovative** yet reliable
- **Technical** yet understandable
- **Premium** yet accessible
- **UK-focused** with global capabilities

---

## Color Palette

### Primary Colors

#### Deep Navy - `#0A1A2F`
- **Usage:** Primary background, headers, dark sections
- **RGB:** `10, 26, 47`
- **Purpose:** Trust, stability, professionalism
- **Accessibility:** Use white text for WCAG AAA compliance

#### Teal - `#2AD1C8`
- **Usage:** Primary accent, CTAs, links, highlights
- **RGB:** `42, 209, 200`
- **Purpose:** Innovation, connection, technology
- **Accessibility:** Ensure 4.5:1 contrast on dark backgrounds

#### Lime - `#A6F750`
- **Usage:** Secondary accent, success states, highlights
- **RGB:** `166, 247, 80`
- **Purpose:** Growth, energy, action
- **Accessibility:** Use dark text for readability

#### White - `#FFFFFF`
- **Usage:** Text, backgrounds, spacing
- **RGB:** `255, 255, 255`
- **Purpose:** Clarity, cleanliness, simplicity

### Color Usage Guidelines

**Gradients:**
```css
/* Primary Gradient */
background: linear-gradient(135deg, #2AD1C8 0%, #A6F750 100%);

/* Subtle Background Gradients */
background: linear-gradient(to bottom right, rgba(42, 209, 200, 0.1), rgba(166, 247, 80, 0.1));
```

**Opacity Variations:**
- `text-white/60` - Secondary text
- `text-white/80` - Body text
- `text-white` - Headings
- `bg-white/5` - Subtle backgrounds
- `bg-white/10` - Card backgrounds
- `border-white/10` - Borders and dividers

**Color Combinations:**
- ✅ Teal on Navy
- ✅ Lime on Navy
- ✅ White on Navy
- ✅ Navy on White
- ✅ Teal/Lime gradient on Navy or White
- ❌ Teal on Lime (poor contrast)
- ❌ Lime on White (insufficient contrast)

---

## Typography

### Font Family

**Manrope Variable Font Family**
- **Primary Font:** 'Manrope', system-ui, -apple-system, sans-serif
- **Variable Weight Range:** 200-800
- **CDN:** Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet">
```

### Typography Scale

Default typography is defined in `/styles/globals.css`:

**Headings:**
```css
h1 { font-size: 3rem; font-weight: 700; line-height: 1.2; }      /* 48px */
h2 { font-size: 2.25rem; font-weight: 600; line-height: 1.3; }   /* 36px */
h3 { font-size: 1.875rem; font-weight: 600; line-height: 1.3; }  /* 30px */
h4 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }    /* 24px */
h5 { font-size: 1.25rem; font-weight: 600; line-height: 1.4; }   /* 20px */
h6 { font-size: 1.125rem; font-weight: 600; line-height: 1.4; }  /* 18px */
```

**Body Text:**
```css
body, p { font-size: 1rem; font-weight: 400; line-height: 1.6; } /* 16px */
```

**Small Text:**
```css
small { font-size: 0.875rem; line-height: 1.5; } /* 14px */
```

### Typography Rules

**⚠️ IMPORTANT - Do NOT Override:**
- Do NOT use Tailwind classes for font-size (e.g., `text-2xl`)
- Do NOT use Tailwind classes for font-weight (e.g., `font-bold`)
- Do NOT use Tailwind classes for line-height (e.g., `leading-none`)
- Use semantic HTML tags (`h1`, `h2`, `p`, etc.) for automatic styling

**Exceptions:**
- Only override when specifically requested by design requirements
- Use utility classes for color, spacing, and layout only

---

## Logo Guidelines

### Logo Variants

Located in `/public/logos/`:

1. **nexus-crux-primary.svg** (120×140px)
   - Full color gradient with wordmark
   - Use for: Hero sections, main branding

2. **nexus-crux-compact.svg** (120×120px)
   - Icon only, no text
   - Use for: Favicons, app icons, avatars

3. **nexus-crux-horizontal.svg** (200×80px)
   - Icon + text side-by-side
   - Use for: Navigation bars, headers

4. **nexus-crux-inverse.svg** (120×140px)
   - White version for dark backgrounds
   - Use for: Dark mode, print materials

5. **nexus-crux-icon-only.svg** (100×100px)
   - Square icon without text
   - Use for: Social media, small spaces

6. **nexus-crux-monochrome.svg** (120×140px)
   - Single color version
   - Use for: Fax, photocopies, watermarks

### Logo Symbolism

- **Central Core Node** (large circle) = The "Crux" - essential platform core
- **Four Orbiting Nodes** = Tenant brands, contractors, services
- **Interconnecting Arcs** = The "Nexus" - connections and data flow
- **Inner Ring** = Security and data layer

### Logo Usage Rules

**Minimum Sizes:**
- Digital: 32px height minimum
- Print: 0.5 inches (13mm) height minimum
- Favicon: 16×16px, 32×32px, 180×180px

**Clear Space:**
- Maintain clear space equal to height of one orbit node
- No text, graphics, or elements within clear space

**Do's:**
- ✅ Use official logo files only
- ✅ Maintain aspect ratio
- ✅ Use appropriate variant for context
- ✅ Ensure sufficient contrast with background

**Don'ts:**
- ❌ Distort, stretch, or skew the logo
- ❌ Change colors (except approved variants)
- ❌ Add effects (shadows, glows, outlines)
- ❌ Rotate or tilt the logo
- ❌ Recreate or modify the logo

### React Logo Component

Use the `NexusCruxLogo` component for consistent rendering:

```tsx
import { NexusCruxLogo } from './components/NexusCruxLogo';

// Inline SVG - automatic sizing
<NexusCruxLogo className="h-8" />

// With custom size
<NexusCruxLogo className="h-12 w-auto" />
```

**Documentation:**
- Full logo documentation: `/public/logos/README.md`
- Developer guide: `/public/logos/DEVELOPER-GUIDE.md`
- Visual preview: `/public/logos/index.html`

---

## Design Principles

### Visual Style

**Geometric Precision:**
- Rounded geometric shapes
- Clean lines and curves
- Network-node visuals
- Smooth arcs and circles

**Minimal Elegance:**
- Stripe-like simplicity
- Generous white space
- Clear visual hierarchy
- Purposeful animations

**Network Aesthetics:**
- Node connection visuals
- Flowing data paths
- Hub-and-spoke patterns
- Federated architecture representation

### Layout Principles

**Spacing:**
- Use consistent spacing multiples (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Tailwind spacing scale: `gap-4`, `p-6`, `mt-8`, `mb-12`

**Grid System:**
- 12-column grid for desktop
- Stack to single column on mobile
- Use Tailwind grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

**Responsive Breakpoints:**
- `sm:` 640px - Mobile landscape
- `md:` 768px - Tablet
- `lg:` 1024px - Desktop
- `xl:` 1280px - Large desktop
- `2xl:` 1536px - Extra large

### Animation Guidelines

**Principles:**
- Subtle and purposeful
- Enhance UX, don't distract
- 200-300ms for micro-interactions
- 500-800ms for page transitions

**Approved Effects:**
```css
/* Hover transitions */
transition-colors duration-300

/* Fade in */
opacity-0 animate-in fade-in duration-500

/* Slide in */
translate-y-4 animate-in slide-in-from-bottom duration-500

/* Scale on hover */
hover:scale-105 transition-transform
```

**Motion Library:**
- Use `motion/react` (formerly Framer Motion)
- Subtle spring physics for natural feel
- Stagger children animations for lists

---

## Component Library

### Custom Components

#### BrandButton (`/components/BrandButton.tsx`)
Premium button with gradient effects
```tsx
<BrandButton variant="primary">Get Started</BrandButton>
<BrandButton variant="secondary">Learn More</BrandButton>
<BrandButton variant="outline">Contact Sales</BrandButton>
```

#### BrandCard (`/components/BrandCard.tsx`)
Consistent card styling with hover effects
```tsx
<BrandCard>
  <h3>Card Title</h3>
  <p>Card content...</p>
</BrandCard>
```

#### ValuePropCard (`/components/ValuePropCard.tsx`)
Feature highlight cards with icons
```tsx
<ValuePropCard
  icon={<Icon className="w-6 h-6" />}
  title="Feature Title"
  description="Feature description"
/>
```

#### NetworkNodes (`/components/NetworkNodes.tsx`)
Animated network visualization background
```tsx
<NetworkNodes />
```

#### NexusCruxLogo (`/components/NexusCruxLogo.tsx`)
Brand logo component (inline SVG)
```tsx
<NexusCruxLogo className="h-8" />
```

### ShadCN UI Components

Available in `/components/ui/`:
- Buttons, Cards, Forms
- Dialogs, Modals, Sheets
- Navigation, Menus, Tabs
- Input fields, Selects, Checkboxes
- Tables, Charts, Progress
- Tooltips, Popovers, Alerts

**Usage:**
```tsx
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
```

### Icons

**Primary Library:** Lucide React
```tsx
import { ArrowRight, CheckCircle, Settings } from 'lucide-react';

<ArrowRight className="w-5 h-5 text-[#2AD1C8]" />
```

**Custom Icons:**
- TikTok: `/components/icons/TikTokIcon.tsx`

---

## Development Standards

### Tech Stack

**Framework:** React 18+ with TypeScript
**Styling:** Tailwind CSS v4.0
**Routing:** React Router v6
**UI Library:** ShadCN UI
**Icons:** Lucide React
**Animation:** Motion/React
**Build:** Vite

### File Structure

```
/
├── components/
│   ├── ui/              # ShadCN components
│   ├── icons/           # Custom icons
│   ├── figma/           # Figma integration utilities
│   └── *.tsx            # Brand components
├── pages/               # Route pages
├── styles/
│   └── globals.css      # Global styles & typography
├── config/
│   └── socialMedia.ts   # Social media configuration
├── public/
│   ├── logos/           # Logo assets
│   ├── manifest.json    # PWA manifest
│   ├── robots.txt       # SEO robots
│   └── sitemap.xml      # SEO sitemap
└── App.tsx              # Main app component
```

### Coding Conventions

**Component Naming:**
- PascalCase for components: `BrandButton.tsx`
- camelCase for utilities: `socialMedia.ts`
- kebab-case for pages: `about-page.tsx` (use PascalCase internally)

**Import Order:**
1. React/external libraries
2. UI components
3. Custom components
4. Utilities/config
5. Types/interfaces
6. Styles

**TypeScript:**
- Use TypeScript for all new files
- Define prop interfaces for components
- Avoid `any` - use proper types

**CSS/Tailwind:**
- Prefer Tailwind classes over custom CSS
- Use design tokens from globals.css
- Maintain mobile-first responsive design

### Accessibility (A11y)

**Requirements:**
- WCAG 2.1 Level AA compliance
- Semantic HTML structure
- ARIA labels for icons and interactive elements
- Keyboard navigation support
- Screen reader compatibility

**Examples:**
```tsx
// Proper semantic structure
<nav aria-label="Main navigation">
  <Link to="/" aria-current="page">Home</Link>
</nav>

// Icon accessibility
<button aria-label="Close menu">
  <X className="w-5 h-5" />
</button>

// Form accessibility
<label htmlFor="email">Email Address</label>
<input id="email" type="email" aria-required="true" />
```

### Performance

**Best Practices:**
- Lazy load routes with React.lazy()
- Optimize images (WebP, proper sizing)
- Code splitting for large components
- Minimize bundle size
- Use React.memo for expensive renders

**Images:**
- Use `ImageWithFallback` component
- Provide alt text for all images
- Use Unsplash for placeholder images
- WebP format preferred

---

## SEO & Localization

### SEO Configuration

**SEO Component:** `/components/SEO.tsx`

```tsx
import { SEO } from './components/SEO';

<SEO
  title="Page Title"
  description="Page description"
  canonical="/page-url"
/>
```

**Metadata Standards:**
- Title: 50-60 characters
- Description: 150-160 characters
- Include relevant keywords
- Unique per page

### UK Localization

**Currency:** GBP (£)
**Date Format:** DD/MM/YYYY
**Spelling:** British English (colour, organisation, optimise)
**Phone:** +44 format
**Address:** UK postal format
**Time:** 24-hour format or 12-hour with am/pm

**Language Examples:**
- "Optimise" not "Optimize"
- "Colour" not "Color"
- "Catalogue" not "Catalog"
- "Centre" not "Center"

### Sitemap & Robots

**Sitemap:** `/public/sitemap.xml`
- Updated for all public pages
- Priority weights assigned
- Change frequency specified

**Robots:** `/public/robots.txt`
- Allow all crawlers
- Sitemap reference included

---

## Legal & Compliance

### Required Pages

1. **Privacy Policy** (`/privacy-policy`)
   - UK GDPR compliant
   - Data collection and usage
   - User rights explained

2. **Terms of Service** (`/terms-of-service`)
   - Service agreement
   - Billing and subscriptions
   - Liability limitations

3. **GDPR Compliance** (`/gdpr`)
   - Data protection rights
   - Legal basis for processing
   - ICO complaint process

### Data Protection

**Compliance:**
- UK GDPR and Data Protection Act 2018
- ISO 27001 security practices
- ICO registration required

**Contact Points:**
- Privacy: privacy@nexuscrux.com
- DPO: dpo@nexuscrux.com
- Legal: legal@nexuscrux.com

### Cookie Policy

**Implementation Required:**
- Cookie consent banner
- Preference management
- Essential vs. optional cookies
- Clear opt-out mechanism

---

## Pricing & Subscriptions

### Pricing Tiers

1. **Foundation** - £299/month (£239/month annual)
   - Startups and small operations
   - 3 active tenants
   - 10,000 API calls/month

2. **Growth** - £799/month (£639/month annual)
   - Scaling brands
   - 10 active tenants
   - 50,000 API calls/month

3. **Professional** - £1,899/month (£1,519/month annual)
   - Established multi-brand
   - 30 active tenants
   - 250,000 API calls/month

4. **Enterprise** - Custom pricing
   - Large-scale deployments
   - Unlimited tenants
   - Unlimited API calls

**Annual Discount:** 20% off all tiers

### Billing Guidelines

- Monthly and annual billing options
- Prices in GBP (£) including VAT
- 14-day free trial available
- No setup fees
- Cancel anytime

---

## Contact & Support

### Email Addresses

**Configuration:** `/config/socialMedia.ts`

- General: hello@nexuscrux.com
- Support: support@nexuscrux.com
- Sales: sales@nexuscrux.com
- Privacy: privacy@nexuscrux.com
- DPO: dpo@nexuscrux.com
- Legal: legal@nexuscrux.com

### Social Media

**Links:** Configured in `/config/socialMedia.ts`

- Twitter: https://twitter.com/nexuscrux
- LinkedIn: https://linkedin.com/company/nexuscrux
- GitHub: https://github.com/nexuscrux
- YouTube: https://youtube.com/@nexuscrux
- Instagram: https://instagram.com/nexuscrux
- TikTok: https://tiktok.com/@nexuscrux

### Support Channels

**Documentation:** `/documentation`
**Contact Form:** `/contact`
**Office:** London, United Kingdom

---

## Version History

### v1.0 - 22 November 2025
- Initial brand guidelines
- Complete design system
- Development standards
- SEO and localization
- Legal compliance framework
- Social media integration

---

## Quick Reference

### Brand Colors
```
Navy:  #0A1A2F
Teal:  #2AD1C8
Lime:  #A6F750
White: #FFFFFF
```

### Typography
```
Font: Manrope Variable (200-800)
H1: 3rem / 700
H2: 2.25rem / 600
Body: 1rem / 400
```

### Logo Files
```
Primary: /public/logos/nexus-crux-primary.svg
Horizontal: /public/logos/nexus-crux-horizontal.svg
Compact: /public/logos/nexus-crux-compact.svg
```

### Key Components
```tsx
<BrandButton variant="primary" />
<BrandCard />
<ValuePropCard />
<NetworkNodes />
<NexusCruxLogo />
<SEO title="..." description="..." />
```

---

**For questions or clarifications:**
📧 hello@nexuscrux.com  
🌐 https://nexuscrux.com  
📍 London, United Kingdom

---

*This document is maintained by the Nexus Crux team and should be referenced for all brand and development decisions.*
