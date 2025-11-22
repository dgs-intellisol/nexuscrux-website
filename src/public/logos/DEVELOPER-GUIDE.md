# Nexus Crux Logo - Developer Integration Guide

Quick reference for implementing Nexus Crux network visualization logos in your projects.

---

## 🚀 Quick Start

### Option 1: Use the React Component (Recommended)
The NexusCruxLogo component renders an inline SVG with the network visualization dynamically.

```tsx
import { NexusCruxLogo } from './components/NexusCruxLogo';

// Basic usage - renders teal core + lime nodes with connecting lines
<NexusCruxLogo />

// With size variants
<NexusCruxLogo size="sm" />  // 32px
<NexusCruxLogo size="md" />  // 36px (default)
<NexusCruxLogo size="lg" />  // 48px

// With color variants
<NexusCruxLogo variant="primary" />      // Teal & Lime (default)
<NexusCruxLogo variant="inverse" />      // Light colors for dark backgrounds
<NexusCruxLogo variant="monochrome" />   // Single navy color

// With animation
<NexusCruxLogo animated={true} />

// With custom Tailwind classes
<NexusCruxLogo className="opacity-80 hover:opacity-100 transition-opacity" />
```

### Option 2: Use Static SVG Files
Pre-rendered SVG files including wordmark versions.

```html
<!-- Icon-only network visualization -->
<img src="/logos/nexus-crux-primary.svg" alt="Nexus Crux" width="100" height="100">

<!-- Horizontal with wordmark and tagline -->
<img src="/logos/nexus-crux-horizontal.svg" alt="Nexus Crux" width="400" height="80">

<!-- For favicon -->
<link rel="icon" type="image/svg+xml" href="/logos/nexus-crux-compact.svg">
```

---

## 📦 Available Variants

| Variant | File | Dimensions | Description |
|---------|------|------------|-------------|
| `primary` | nexus-crux-primary.svg | 100×100 | Network icon with teal core + lime nodes |
| `compact` | nexus-crux-compact.svg | 120×120 | Compact square format for small spaces |
| `horizontal` | nexus-crux-horizontal.svg | 400×80 | Icon + wordmark + tagline horizontal layout |
| `inverse` | nexus-crux-inverse.svg | 120×140 | Light colors for dark backgrounds |
| `monochrome` | nexus-crux-monochrome.svg | 120×140 | Single navy color for print |
| `icon-only` | nexus-crux-icon-only.svg | 120×120 | Larger icon format |

---

## 🎨 React Component Details

### Component Props
```typescript
interface NexusCruxLogoProps {
  variant?: 'primary' | 'compact' | 'horizontal' | 'inverse' | 'monochrome';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}
```

### Size Reference
- `sm`: 32px square - suitable for dense UIs, mobile navigation
- `md`: 36px square - default, balanced for most applications
- `lg`: 48px square - hero sections, feature highlights

### Color Schemes by Variant
```typescript
const colorSchemes = {
  primary: { 
    core: '#2AD1C8',           // Teal center
    nodes: '#A6F750',          // Lime orbiting nodes
    lines: '#2AD1C8',          // Teal connection lines
    lineOpacity: 0.6           // Semi-transparent connections
  },
  inverse: { 
    core: '#2AD1C8',           // Maintain teal for visibility
    nodes: '#A6F750',          // Maintain lime
    lines: '#2AD1C8',
    lineOpacity: 1             // Full opacity on dark
  },
  monochrome: { 
    core: '#0A1A2F',           // Navy for all elements
    nodes: '#0A1A2F',
    lines: '#0A1A2F',
    lineOpacity: 0.6           // Subtle line differentiation
  }
};
```

### Network Structure
The component renders:
- **1 central core node** (r=18 in 100×100 viewBox) = 18% of viewBox
- **6 orbiting nodes** (r=9 each) = 9% of viewBox
- **6 connecting lines** from core to each orbit node
- **Hexagonal arrangement** for visual balance

Node positions (in 100×100 viewBox):
- Top: (50, 10)
- Top-right: (84.64, 25)
- Bottom-right: (84.64, 75)
- Bottom: (50, 90)
- Bottom-left: (15.36, 75)
- Top-left: (15.36, 25)

---

## 💻 Common Implementation Patterns

### Navigation Bar
```tsx
import { Link } from 'react-router-dom';
import { NexusCruxLogo } from './components/NexusCruxLogo';

// Light background navigation
<nav className="bg-white border-b border-gray-200">
  <Link to="/" className="flex items-center gap-3">
    <NexusCruxLogo size="md" />
    <span className="text-lg text-[#0A1A2F]">Nexus Crux</span>
  </Link>
</nav>

// Dark background navigation
<nav className="bg-[#0A1A2F]">
  <Link to="/" className="flex items-center gap-3">
    <NexusCruxLogo variant="inverse" size="md" />
    <span className="text-lg text-white">Nexus Crux</span>
  </Link>
</nav>
```

### Hero Section
```tsx
<section className="hero bg-gradient-to-br from-gray-50 to-white py-20">
  <div className="text-center">
    <NexusCruxLogo 
      size="lg" 
      animated={true}
      className="mx-auto mb-6"
    />
    <h1 className="text-4xl text-[#0A1A2F]">Nexus Crux</h1>
    <p className="text-[#0A1A2F]/60">Where Connections Become Capability</p>
  </div>
</section>
```

### Dark Mode Toggle
```tsx
interface LogoProps {
  darkMode: boolean;
}

const Logo = ({ darkMode }: LogoProps) => (
  <NexusCruxLogo 
    variant={darkMode ? "inverse" : "primary"} 
    size="md"
    className="transition-opacity duration-300"
  />
);
```

### Mobile Responsive
```tsx
<div className="logo-container">
  {/* Desktop - Use horizontal with wordmark */}
  <div className="hidden md:block">
    <img 
      src="/logos/nexus-crux-horizontal.svg" 
      alt="Nexus Crux"
      className="h-10 w-auto"
    />
  </div>
  
  {/* Mobile - Use compact icon only */}
  <div className="block md:hidden">
    <NexusCruxLogo size="md" />
  </div>
</div>
```

### Feature Card Icon
```tsx
<div className="feature-card p-6 bg-white rounded-xl border border-gray-200">
  <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 rounded-lg flex items-center justify-center mb-4">
    <NexusCruxLogo size="sm" />
  </div>
  <h3 className="text-lg text-[#0A1A2F]">Federated Architecture</h3>
  <p className="text-[#0A1A2F]/60">Connect multiple systems seamlessly</p>
</div>
```

### Loading Spinner
```tsx
import { motion } from 'motion/react';

<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
>
  <NexusCruxLogo size="lg" />
</motion.div>
```

---

## 🌐 HTML/CSS Implementation

### Basic Image Tag
```html
<img 
  src="/logos/nexus-crux-horizontal.svg" 
  alt="Nexus Crux - Federated Service Bus Platform"
  width="400"
  height="80"
  class="logo"
/>
```

### Responsive Image with Picture Element
```html
<picture>
  <!-- Mobile: Icon only -->
  <source 
    media="(max-width: 767px)" 
    srcset="/logos/nexus-crux-compact.svg"
  >
  <!-- Tablet/Desktop: Horizontal with wordmark -->
  <source 
    media="(min-width: 768px)" 
    srcset="/logos/nexus-crux-horizontal.svg"
  >
  <img 
    src="/logos/nexus-crux-horizontal.svg" 
    alt="Nexus Crux"
    class="logo"
  >
</picture>
```

### CSS Background
```css
.logo-background {
  background-image: url('/logos/nexus-crux-icon-only.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 120px;
  height: 120px;
}

/* Hover effect */
.logo-background:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
```

### Inline SVG for Custom Styling
```html
<svg 
  width="36" 
  height="36" 
  viewBox="0 0 100 100" 
  class="custom-logo"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Connection lines -->
  <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" stroke-width="2" opacity="0.6"/>
  <line x1="50" y1="50" x2="84.64" y2="25" stroke="currentColor" stroke-width="2" opacity="0.6"/>
  <line x1="50" y1="50" x2="84.64" y2="75" stroke="currentColor" stroke-width="2" opacity="0.6"/>
  <line x1="50" y1="50" x2="50" y2="90" stroke="currentColor" stroke-width="2" opacity="0.6"/>
  <line x1="50" y1="50" x2="15.36" y2="75" stroke="currentColor" stroke-width="2" opacity="0.6"/>
  <line x1="50" y1="50" x2="15.36" y2="25" stroke="currentColor" stroke-width="2" opacity="0.6"/>
  
  <!-- Core node -->
  <circle cx="50" cy="50" r="18" fill="#2AD1C8"/>
  
  <!-- Orbiting nodes -->
  <circle cx="50" cy="10" r="9" fill="#A6F750"/>
  <circle cx="84.64" cy="25" r="9" fill="#A6F750"/>
  <circle cx="84.64" cy="75" r="9" fill="#A6F750"/>
  <circle cx="50" cy="90" r="9" fill="#A6F750"/>
  <circle cx="15.36" cy="75" r="9" fill="#A6F750"/>
  <circle cx="15.36" cy="25" r="9" fill="#A6F750"/>
</svg>

<style>
.custom-logo {
  color: #2AD1C8; /* Changes connection line color */
  transition: transform 0.3s, color 0.3s;
}
.custom-logo:hover {
  transform: scale(1.1) rotate(5deg);
  color: #A6F750;
}
</style>
```

---

## 🎯 Favicon Setup

### Standard Implementation
```html
<!-- In your index.html -->
<link rel="icon" type="image/svg+xml" href="/logos/nexus-crux-compact.svg">
<link rel="apple-touch-icon" sizes="180x180" href="/logos/nexus-crux-compact.svg">
```

### Full PWA Setup
```json
// manifest.json
{
  "name": "Nexus Crux",
  "short_name": "Nexus",
  "description": "Federated Service Bus Platform",
  "icons": [
    {
      "src": "/logos/nexus-crux-compact.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "/logos/nexus-crux-icon-only.svg",
      "sizes": "120x120",
      "type": "image/svg+xml"
    }
  ],
  "theme_color": "#2AD1C8",
  "background_color": "#0A1A2F"
}
```

---

## 🎨 Tailwind CSS Integration

### Basic Usage
```tsx
// Icon-only with size control
<img 
  src="/logos/nexus-crux-primary.svg" 
  alt="Nexus Crux"
  className="h-10 w-10"
/>

// Horizontal with responsive sizing
<img 
  src="/logos/nexus-crux-horizontal.svg" 
  alt="Nexus Crux"
  className="h-8 w-auto md:h-10"
/>
```

### With Hover Effects
```tsx
<img 
  src="/logos/nexus-crux-compact.svg" 
  alt="Nexus Crux"
  className="h-12 w-12 transition-all duration-300 hover:scale-110 hover:rotate-6"
/>
```

### Centered in Container
```tsx
<div className="flex items-center justify-center p-8 bg-white rounded-2xl">
  <img 
    src="/logos/nexus-crux-primary.svg" 
    alt="Nexus Crux"
    className="h-20 w-20"
  />
</div>
```

### Dark Background Variant
```tsx
<div className="bg-[#0A1A2F] p-8 rounded-xl">
  <img 
    src="/logos/nexus-crux-inverse.svg" 
    alt="Nexus Crux"
    className="h-16 w-auto mx-auto"
  />
</div>
```

---

## 📱 Responsive Sizing Guide

### Desktop (1024px+)
```tsx
// Navigation: 36-48px
<NexusCruxLogo size="md" /> // or <img className="h-10" />

// Hero: 48-80px
<NexusCruxLogo size="lg" /> // or <img className="h-20" />

// Horizontal wordmark: 200-400px width
<img src="/logos/nexus-crux-horizontal.svg" className="h-10 w-auto" />
```

### Tablet (768px - 1023px)
```tsx
// Navigation: 32-40px
<NexusCruxLogo size="sm" /> // or <img className="h-8" />

// Content: 40-56px
<NexusCruxLogo size="md" /> // or <img className="h-12" />
```

### Mobile (< 768px)
```tsx
// Navigation: 28-36px
<img src="/logos/nexus-crux-compact.svg" className="h-8 w-8" />

// Splash: 56-80px
<NexusCruxLogo size="lg" />
```

### Responsive Class Example
```tsx
<img 
  src="/logos/nexus-crux-compact.svg"
  className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
  alt="Nexus Crux"
/>
```

---

## 🎬 Animation Examples

### Fade In
```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <NexusCruxLogo size="lg" />
</motion.div>
```

### Scale and Fade
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <NexusCruxLogo size="md" />
</motion.div>
```

### Rotate In (Network Spin)
```tsx
<motion.div
  initial={{ opacity: 0, rotate: -180 }}
  animate={{ opacity: 1, rotate: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <NexusCruxLogo size="lg" />
</motion.div>
```

### Pulsing Network
```tsx
<motion.div
  animate={{ 
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1]
  }}
  transition={{ 
    duration: 2, 
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  <NexusCruxLogo size="md" />
</motion.div>
```

### Built-in Component Animation
```tsx
// The component has built-in fade-in animation
<NexusCruxLogo animated={true} />
```

---

## 🔍 SEO & Accessibility

### Proper Alt Text
```html
<!-- For navigation logo -->
<img 
  src="/logos/nexus-crux-horizontal.svg" 
  alt="Nexus Crux home page" 
/>

<!-- For hero/branding -->
<img 
  src="/logos/nexus-crux-primary.svg" 
  alt="Nexus Crux - Federated Service Bus Platform" 
  role="img"
/>

<!-- For decorative use (screen readers skip) -->
<img 
  src="/logos/nexus-crux-compact.svg" 
  alt="" 
  role="presentation"
  aria-hidden="true"
/>
```

### Structured Data for Logo
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nexus Crux",
  "logo": "https://nexuscrux.com/logos/nexus-crux-primary.svg",
  "url": "https://nexuscrux.com",
  "description": "Multi-tenant federated service bus platform"
}
</script>
```

---

## 🐛 Troubleshooting

### Issue: Logo Not Displaying
```tsx
// ✗ Wrong - relative path
<img src="logos/nexus-crux-horizontal.svg" />

// ✓ Correct - absolute path from public folder
<img src="/logos/nexus-crux-horizontal.svg" />
```

### Issue: Logo Blurry on Retina Displays
```tsx
// ✗ Using raster PNG at 1x
<img src="logo.png" width="40" height="40" />

// ✓ Using vector SVG (perfect at any density)
<img src="/logos/nexus-crux-compact.svg" width="40" height="40" />
```

### Issue: Colors Not Showing
```tsx
// ✗ Using monochrome variant
<NexusCruxLogo variant="monochrome" />

// ✓ Use colored variant
<NexusCruxLogo variant="primary" />
```

### Issue: Logo Too Small/Large
```tsx
// ✗ Fixed pixel size
<NexusCruxLogo size="sm" /> // Always 32px

// ✓ Responsive with Tailwind
<div className="w-8 h-8 md:w-12 md:h-12">
  <img src="/logos/nexus-crux-primary.svg" className="w-full h-full" />
</div>
```

### Issue: Network Structure Not Clear
- Ensure minimum size: 32×32px for icons
- Use primary variant on light backgrounds
- Use inverse variant on dark backgrounds
- Avoid busy/patterned backgrounds
- Maintain clear space around logo

---

## 📦 File Locations

```
/public/logos/
├── nexus-crux-primary.svg         # 100×100 - Network icon
├── nexus-crux-compact.svg         # 120×120 - Compact icon
├── nexus-crux-horizontal.svg      # 400×80 - With wordmark
├── nexus-crux-inverse.svg         # 120×140 - For dark backgrounds
├── nexus-crux-monochrome.svg      # 120×140 - Single color
├── nexus-crux-icon-only.svg       # 120×120 - Larger icon
├── README.md                      # Full documentation
├── DEVELOPER-GUIDE.md             # This file
└── index.html                     # Visual preview

/components/
└── NexusCruxLogo.tsx              # React component (inline SVG)
```

---

## 🔗 Related Resources

- **React Component**: `/components/NexusCruxLogo.tsx`
- **Brand Guidelines**: `/guidelines/Guidelines.md`
- **Full Logo Docs**: `/public/logos/README.md`
- **Visual Preview**: `/public/logos/index.html`
- **Design System**: Nexus Crux Brand Identity

---

## ✅ Quick Checklist

- [ ] Using correct variant for background color
- [ ] Logo meets minimum size (32×32px for icons)
- [ ] Proper alt text for accessibility
- [ ] SVG format for scalability
- [ ] Sufficient clear space (equal to one node radius)
- [ ] Logo is legible at display size
- [ ] Network structure clearly visible
- [ ] Using absolute paths from `/public`
- [ ] Tested on different screen densities
- [ ] Color contrast sufficient (4.5:1 minimum)

---

**Questions?** Email: hello@nexuscrux.com  
**Version**: 1.0 • 22 November 2025  
**Design**: Network visualization representing federated architecture
