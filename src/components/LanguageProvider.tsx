import React, { createContext, useContext, useState, useEffect } from 'react';
import { TERMINOLOGY } from '../data/terminology';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
  term: (key: keyof typeof TERMINOLOGY) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Arabic - موقع عربي افتراضي
  const [language, setLanguage] = useState<Language>('ar');
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    // Set document direction and language - ضبط الاتجاه واللغة
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
    document.body.className = `lang-${language}`;
    
    // Ensure RTL is applied correctly - التأكد من تطبيق RTL بشكل صحيح
    if (language === 'ar') {
      document.documentElement.style.direction = 'rtl';
      document.body.style.direction = 'rtl';
      document.body.style.textAlign = 'right';
    } else {
      document.documentElement.style.direction = 'ltr';
      document.body.style.direction = 'ltr';
      document.body.style.textAlign = 'left';
    }
  }, [language, dir]);

  const t = (ar: string, en: string) => (language === 'ar' ? ar : en);
  
  // Helper function to get standardized terminology
  const term = (key: keyof typeof TERMINOLOGY) => {
    const terminology = TERMINOLOGY[key];
    return language === 'ar' ? terminology.ar : terminology.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, term, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
