import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SUPPORTED_LANGUAGES, 
  DEFAULT_LANGUAGE, 
  detectUserLanguage, 
  getWelcomeMessage,
  getCurrencyByLanguage,
  formatCurrency,
  getMoMoProviderByLanguage,
  type Language 
} from '../i18n/languages';
import { getTranslation, type TranslationKeys } from '../i18n/translations';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: keyof TranslationKeys) => string;
  getWelcome: (userName: string) => string;
  formatPrice: (amount: number) => string;
  getCurrency: () => { code: string; symbol: string; name: string };
  getMoMoProvider: () => string;
  getCurrentLanguageInfo: () => Language | undefined;
  getSupportedLanguages: () => Language[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Try to get language from localStorage first
    const savedLanguage = localStorage.getItem('careernest-language');
    if (savedLanguage && SUPPORTED_LANGUAGES.find(lang => lang.code === savedLanguage)) {
      return savedLanguage;
    }
    
    // Otherwise detect from browser
    return detectUserLanguage();
  });

  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('careernest-language', currentLanguage);
    
    // Update RTL status
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage);
    setIsRTL(language?.rtl || false);
    
    // Update document language and direction
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);

  const setLanguage = (language: string) => {
    if (SUPPORTED_LANGUAGES.find(lang => lang.code === language)) {
      setCurrentLanguage(language);
    }
  };

  const t = (key: keyof TranslationKeys): string => {
    return getTranslation(currentLanguage, key);
  };

  const getWelcome = (userName: string): string => {
    return getWelcomeMessage(currentLanguage, userName);
  };

  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currentLanguage);
  };

  const getCurrency = () => {
    return getCurrencyByLanguage(currentLanguage);
  };

  const getMoMoProvider = (): string => {
    return getMoMoProviderByLanguage(currentLanguage);
  };

  const getCurrentLanguageInfo = (): Language | undefined => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage);
  };

  const getSupportedLanguages = (): Language[] => {
    return SUPPORTED_LANGUAGES;
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    getWelcome,
    formatPrice,
    getCurrency,
    getMoMoProvider,
    getCurrentLanguageInfo,
    getSupportedLanguages,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Hook for easy translation access
export const useTranslation = () => {
  const { t, currentLanguage, formatPrice, getWelcome, getCurrency, getMoMoProvider } = useLanguage();
  
  return {
    t,
    language: currentLanguage,
    formatPrice,
    getWelcome,
    getCurrency,
    getMoMoProvider,
  };
};

// Hook for currency formatting
export const useCurrency = () => {
  const { formatPrice, getCurrency } = useLanguage();
  
  return {
    formatPrice,
    currency: getCurrency(),
  };
};

// Hook for MoMo provider information
export const useMoMo = () => {
  const { getMoMoProvider, getCurrency } = useLanguage();
  
  return {
    provider: getMoMoProvider(),
    currency: getCurrency(),
  };
};
