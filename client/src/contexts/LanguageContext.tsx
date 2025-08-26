import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage on mount
    try {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'en' || saved === 'pt')) {
        setLanguage(saved);
      }
    } catch (error) {
      console.log('Could not access localStorage');
    }
  }, []);

  useEffect(() => {
    // Save language changes to localStorage
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.log('Could not save to localStorage');
    }
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}