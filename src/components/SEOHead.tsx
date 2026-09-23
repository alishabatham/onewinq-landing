import { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export function SEOHead({
  title,
  description,
  canonical = 'https://onewinq.com/',
  keywords,
  ogType = 'website',
  ogImage = 'https://onewinq.com/onewinq_brand_logo.png',
  noindex = false,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper to update meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('meta[', '').replace(']', '').split('=');
        el.setAttribute(attrName, attrVal.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // 2. Standard Meta Tags
    setMeta('meta[name="description"]', 'content', description);
    if (keywords) {
      setMeta('meta[name="keywords"]', 'content', keywords);
    }
    setMeta(
      'meta[name="robots"]',
      'content',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 3. Open Graph
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:site_name"]', 'content', 'OneWinq');
    setMeta('meta[property="og:locale"]', 'content', 'en_IN');

    // 4. Twitter Cards
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

    // 5. Canonical URL
    let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    // 6. JSON-LD Dynamic Injection
    const JSON_LD_ID = 'dynamic-jsonld-schema';
    let scriptJsonLd = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.id = JSON_LD_ID;
        scriptJsonLd.type = 'application/ld+json';
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = JSON.stringify(
        Array.isArray(jsonLd)
          ? { '@context': 'https://schema.org', '@graph': jsonLd }
          : jsonLd
      );
    } else if (scriptJsonLd) {
      scriptJsonLd.remove();
    }

    // Scroll to top on page navigation
    window.scrollTo(0, 0);
  }, [title, description, canonical, keywords, ogType, ogImage, noindex, jsonLd]);

  return null;
}
