import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type PageType = 'home' | 'casaDaPeixe' | 'lapicanha';

export function useDocumentTitle(pageType: PageType, restaurantSlug?: string) {
  const { t } = useLanguage();

  useEffect(() => {
    let title: string;
    let description: string;

    switch (pageType) {
      case 'home':
        title = t.seo.homePage.title;
        description = t.seo.homePage.description;
        break;
      case 'casaDaPeixe':
        title = t.seo.casaDaPeixe.title;
        description = t.seo.casaDaPeixe.description;
        break;
      case 'lapicanha':
        title = t.seo.lapicanha.title;
        description = t.seo.lapicanha.description;
        break;
      default:
        title = t.seo.homePage.title;
        description = t.seo.homePage.description;
    }

    // Set document title
    document.title = title;

    // Set or update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Set Open Graph meta tags for better social sharing
    const setOGMeta = (property: string, content: string) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (ogMeta) {
        ogMeta.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    setOGMeta('og:title', title);
    setOGMeta('og:description', description);
    setOGMeta('og:type', 'website');
    
  }, [pageType, restaurantSlug, t]);
}