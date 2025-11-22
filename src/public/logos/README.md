# Nexus Crux Logo Assets

Official logo files for the Nexus Crux brand. All logos follow the brand guidelines with the core design concept representing a federated service bus platform through network visualization.

---

## 🎨 Logo Concept & Design Inspiration

The Nexus Crux logo is a **network visualization** that embodies our platform's federated architecture through geometric precision and minimal elegance:

### Core Design Elements

- **Central Core Node** (large circle) = The **"Crux"** - the essential, indispensable platform core
- **Six Orbiting Nodes** (smaller circles arranged in hexagonal pattern) = Tenant brands, contractors, and connected services
- **Interconnecting Lines** = The **"Nexus"** - the connections, relationships, and data flow facilitated by the platform
- **Hexagonal Arrangement** = Network stability, distributed architecture, and federation principles

### Design Philosophy

**Geometric Network Aesthetic:**
- Hub-and-spoke topology representing the federated service bus
- Symmetrical hexagonal layout for balance and stability
- Clean lines connecting core to periphery
- Node-to-node relationships visualized through direct connections

**Minimal, Modern Expression:**
- Stripe-inspired simplicity and elegance
- Purposeful geometry without unnecessary decoration
- Scalable at any size while maintaining clarity
- Works equally well as icon or with wordmark

**Color & Brand Expression:**
- **Teal (#2AD1C8)**: Innovation, connection, technology - used for core and connecting lines
- **Lime (#A6F750)**: Growth, energy, action - used for orbiting nodes
- Gradient application creates visual depth
- Monochrome variant maintains recognition in single-color applications

### Symbolic Meaning

The logo tells our platform story visually:

1. **Connection** (Nexus): The lines radiating from center to nodes represent our platform's ability to connect disparate systems
2. **Core Value** (Crux): The large central node represents the essential, critical platform at the heart of operations
3. **Federation**: Multiple nodes around a central core visualize multi-tenant architecture
4. **Network Effect**: Six nodes suggest scalability and ecosystem growth
5. **Data Flow**: The connecting lines represent real-time synchronization and orchestration

---

## 📁 Available Files

### 1. **nexus-crux-primary.svg** (100×100px)
**Use for:** Main brand icon applications
- Network node visualization with gradient colors
- Icon only (no text) - square format
- Teal core + Lime orbiting nodes
- Best for: Hero sections, app tiles, feature highlights

### 2. **nexus-crux-compact.svg** (120×120px)
**Use for:** Favicon, app icons, social media avatars
- Compact square format
- Full color gradient
- Optimized for small display sizes
- Best for: Favicons, profile pictures, mobile apps

### 3. **nexus-crux-horizontal.svg** (400×80px)
**Use for:** Headers, navigation bars, email signatures
- Network icon + "Nexus Crux" wordmark + tagline
- Horizontal layout with right-aligned text
- "Where Connections Become Capability" tagline
- Best for: Website headers, email footers, letterheads, presentations

### 4. **nexus-crux-inverse.svg** (120×140px)
**Use for:** Dark backgrounds
- White/light version on dark background (#0A1A2F)
- Maintains gradient effect with lighter tones
- Includes wordmark
- Best for: Dark mode interfaces, dark photography, videos, dark presentations

### 5. **nexus-crux-monochrome.svg** (120×140px)
**Use for:** Single-color printing, embossing, engraving
- Single color (Deep Navy #0A1A2F)
- No gradients - solid fill only
- Network structure clearly visible
- Best for: Embroidery, screen printing, laser etching, fax/photocopies, stamps

### 6. **nexus-crux-icon-only.svg** (120×120px)
**Use for:** Larger icon applications
- Icon only, no text
- Full color gradient network visualization
- Square format, slightly larger than compact
- Best for: Mobile apps, PWA icons, browser tabs, splash screens

---

## 🎯 Usage Guidelines

### Minimum Sizes
- **Digital**: Minimum 32×32px for icon-only versions
- **Print**: Minimum 0.4 inch (10mm) for icon-only versions
- **Wordmark versions**: Minimum 80px height (digital) or 0.75 inch (print)

### Clear Space
Maintain clear space around the logo equal to the radius of one orbiting node (approximately 9-10% of the logo width/height). No text, graphics, or elements should intrude into this clear space.

### Color Specifications

#### Primary Brand Colors
- **Deep Navy**: `#0A1A2F` (RGB: 10, 26, 47)
- **Teal**: `#2AD1C8` (RGB: 42, 209, 200)
- **Lime**: `#A6F750` (RGB: 166, 247, 80)
- **White**: `#FFFFFF` (RGB: 255, 255, 255)

#### Logo Color Application
- **Core Node**: Teal (#2AD1C8)
- **Orbiting Nodes**: Lime (#A6F750)
- **Connection Lines**: Teal (#2AD1C8) at 60% opacity
- **Wordmark**: Deep Navy (#0A1A2F) on light backgrounds, White on dark

#### When to Use Each Variant

**Primary/Compact/Icon-Only (Color):**
- White or light backgrounds
- Digital interfaces and web applications
- Marketing materials and presentations
- When full brand color expression is needed

**Horizontal:**
- Navigation bars and site headers
- Headers with limited vertical space
- Email signatures and digital communications
- Business cards and stationery
- Presentations with landscape orientation

**Inverse:**
- Dark backgrounds (#0A1A2F or darker)
- Photography overlays with dark images
- Dark mode applications and interfaces
- Video graphics and motion design
- Dark-themed marketing materials

**Monochrome:**
- Black and white printing
- Embossing, debossing, or engraving
- Single-color applications (stamps, seals)
- When color reproduction is not possible
- Fax, photocopies, or low-quality printing

### Do's ✅

- ✅ Use official logo files only
- ✅ Maintain aspect ratio when scaling
- ✅ Use appropriate variant for background context
- ✅ Ensure sufficient contrast with background
- ✅ Maintain clear space around the logo
- ✅ Use SVG format for digital applications
- ✅ Use monochrome variant for single-color printing
- ✅ Test legibility at intended display size

### Don'ts ❌

- ❌ Don't change the logo colors (except using approved variants)
- ❌ Don't rotate or skew the logo
- ❌ Don't add effects (shadows, outlines, glows, gradients)
- ❌ Don't alter the spacing between nodes and core
- ❌ Don't change the number or position of orbiting nodes
- ❌ Don't use low-resolution raster versions when SVG is available
- ❌ Don't place on busy backgrounds without sufficient contrast
- ❌ Don't stretch or compress disproportionately
- ❌ Don't rearrange icon and wordmark in horizontal version
- ❌ Don't recreate or modify the logo design

---

## 💻 Integration Examples

### HTML
```html
<!-- Primary Logo -->
<img src="/logos/nexus-crux-primary.svg" alt="Nexus Crux" width="100" height="100">

<!-- Horizontal Logo in Header -->
<img src="/logos/nexus-crux-horizontal.svg" alt="Nexus Crux" width="400" height="80">

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/logos/nexus-crux-compact.svg">
```

### React Component
```tsx
import { NexusCruxLogo } from '../components/NexusCruxLogo';

// Using the React component (renders inline network SVG)
<NexusCruxLogo variant="primary" size="md" />
<NexusCruxLogo variant="compact" size="sm" />
<NexusCruxLogo variant="inverse" size="lg" />
```

### CSS Background
```css
.logo {
  background-image: url('/logos/nexus-crux-icon-only.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

---

## 📱 Responsive Usage

### Desktop (1024px+)
- Use **horizontal** variant in navigation (200-400px width)
- Use **primary** variant in hero sections (80-120px)
- Icon variants for feature cards and UI elements

### Tablet (768px - 1023px)
- Use **horizontal** variant in navigation (180-300px width)
- Use **compact** or **icon-only** in tight spaces
- Consider reducing to icon-only in collapsed menus

### Mobile (< 768px)
- Use **icon-only** or **compact** in navigation (32-48px)
- Reserve full wordmark versions for splash screens
- Horizontal variant can work in landscape orientation

---

## 🔄 File Formats

All logos are provided in **SVG (Scalable Vector Graphics)** format for:
- ✅ Infinite scalability without quality loss
- ✅ Small file sizes (typically < 5KB)
- ✅ Sharp rendering at any resolution (1x, 2x, 3x displays)
- ✅ Easy editing in vector software (Illustrator, Figma, Inkscape)
- ✅ CSS styling capabilities
- ✅ Accessibility and semantic markup

### Need Other Formats?
The SVG files can be converted to:
- **PNG** (for raster applications): Export at 2x or 3x resolution for Retina displays
- **PDF** (for print): Direct export from SVG preserves vector quality
- **EPS** (for professional print): Convert via Adobe Illustrator or Inkscape
- **ICO** (for legacy favicons): Convert compact variant at multiple sizes (16, 32, 48px)

---

## 🎨 Design System Integration

The logo is part of the broader Nexus Crux design system:

- **Typography**: Manrope Variable Font Family (200-800 weight range)
- **Geometric Design**: Rounded shapes, clean arcs, network-node visuals
- **Color Palette**: Navy, Teal, Lime, White with gradient applications
- **Animation**: Available via the React component with `animated={true}` prop
- **Accessibility**: All SVGs include proper ARIA labels and semantic markup
- **Responsive**: Scales beautifully from 16px favicon to large-format displays

### Design Inspiration
Our logo draws inspiration from:
- **Network topology diagrams** - hub-and-spoke architecture
- **Molecular structures** - interconnected systems
- **Stripe's minimal aesthetic** - clean, purposeful design
- **Federated architecture** - distributed yet connected nodes
- **Data visualization** - clear representation of relationships

---

## 📞 Questions?

For logo usage questions or custom variants:
- Review the full brand guidelines in `/guidelines/Guidelines.md`
- Email: hello@nexuscrux.com
- Developer integration guide: `/public/logos/DEVELOPER-GUIDE.md`
- Visual preview: `/public/logos/index.html`

---

## ✅ Checklist for Logo Usage

- [ ] Selected the appropriate variant for my use case
- [ ] Verified minimum size requirements (32px+ for icons)
- [ ] Ensured sufficient clear space around logo (equal to one node radius)
- [ ] Checked contrast ratio with background (4.5:1 minimum)
- [ ] Using original SVG files (not modified versions)
- [ ] Logo is legible and recognizable at display size
- [ ] Following brand color specifications
- [ ] Network structure is clearly visible
- [ ] Tested across different screen densities (1x, 2x, 3x)

---

**Version**: 1.0  
**Last Updated**: 22 November 2025  
**Design System**: Nexus Crux Brand Identity  
**File Format**: SVG (Scalable Vector Graphics)  
**Design Philosophy**: Geometric network visualization with minimal elegance

---

*The Nexus Crux logo is a registered trademark of Nexus Crux Ltd. All rights reserved.*
