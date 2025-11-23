import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export function SEO({
  title,
  description,
  keywords = 'service bus, multi-tenant platform, home service brands, contractors, federated messaging, ReClova AI',
  ogType = 'website',
  ogImage = '/og-image.png',
  canonicalUrl,
  structuredData,
}: SEOProps) {
  const fullTitle = `${title} | Nexus Crux`;
  const url = canonicalUrl || `https://nexuscrux.io${window.location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update or create link tags
    const updateLinkTag = (rel: string, href: string, type?: string, sizes?: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      
      element.href = href;
      if (type) element.type = type;
      if (sizes) element.setAttribute('sizes', sizes);
    };

    // Favicons
    updateLinkTag('icon', '/logos/nexus-crux-compact.svg', 'image/svg+xml');
    updateLinkTag('apple-touch-icon', '/logos/nexus-crux-compact.svg');
    updateLinkTag('icon', '/logos/nexus-crux-compact.svg', 'image/svg+xml', '32x32');
    updateLinkTag('shortcut icon', '/logos/nexus-crux-compact.svg', 'image/svg+xml');

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Nexus Crux');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#2AD1C8');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', 'Nexus Crux', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [fullTitle, description, keywords, ogType, ogImage, url, structuredData]);

  return null;
}