// West African Language Configuration for MTN MoMo Users

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  country: string;
  flag: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  // Benin
  { code: 'fr-BJ', name: 'French (Benin)', nativeName: 'Français', country: 'Benin', flag: '🇧🇯' },
  { code: 'fon', name: 'Fon', nativeName: 'Fɔngbe', country: 'Benin', flag: '🇧🇯' },
  { code: 'yo-BJ', name: 'Yoruba (Benin)', nativeName: 'Yorùbá', country: 'Benin', flag: '🇧🇯' },
  
  // Côte d'Ivoire
  { code: 'fr-CI', name: 'French (Côte d\'Ivoire)', nativeName: 'Français', country: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: 'dyu', name: 'Dioula', nativeName: 'Jula', country: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: 'bci', name: 'Baoulé', nativeName: 'Baoulé', country: 'Côte d\'Ivoire', flag: '🇨🇮' },
  
  // Ghana
  { code: 'en-GH', name: 'English (Ghana)', nativeName: 'English', country: 'Ghana', flag: '🇬🇭' },
  { code: 'tw', name: 'Twi', nativeName: 'Twi', country: 'Ghana', flag: '🇬🇭' },
  { code: 'ga', name: 'Ga', nativeName: 'Ga', country: 'Ghana', flag: '🇬🇭' },
  { code: 'ee', name: 'Ewe', nativeName: 'Eʋegbe', country: 'Ghana', flag: '🇬🇭' },
  { code: 'dag', name: 'Dagbani', nativeName: 'Dagbanli', country: 'Ghana', flag: '🇬🇭' },
  
  // Guinea-Bissau
  { code: 'pt-GW', name: 'Portuguese (Guinea-Bissau)', nativeName: 'Português', country: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'pov', name: 'Crioulo', nativeName: 'Kriol', country: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'ff-GW', name: 'Fula (Guinea-Bissau)', nativeName: 'Fulfulde', country: 'Guinea-Bissau', flag: '🇬🇼' },
  
  // Guinea-Conakry
  { code: 'fr-GN', name: 'French (Guinea)', nativeName: 'Français', country: 'Guinea', flag: '🇬🇳' },
  { code: 'sus', name: 'Susu', nativeName: 'Sosoxui', country: 'Guinea', flag: '🇬🇳' },
  { code: 'ff-GN', name: 'Fulfulde (Guinea)', nativeName: 'Fulfulde', country: 'Guinea', flag: '🇬🇳' },
  { code: 'mnk', name: 'Maninka', nativeName: 'Maninka', country: 'Guinea', flag: '🇬🇳' },
  
  // Liberia
  { code: 'en-LR', name: 'English (Liberia)', nativeName: 'English', country: 'Liberia', flag: '🇱🇷' },
  { code: 'kpe', name: 'Kpelle', nativeName: 'Kpɛlɛwoo', country: 'Liberia', flag: '🇱🇷' },
  { code: 'bss', name: 'Bassa', nativeName: 'Ɓàsàa', country: 'Liberia', flag: '🇱🇷' },
  { code: 'vai', name: 'Vai', nativeName: 'Vai', country: 'Liberia', flag: '🇱🇷' },
  
  // Nigeria
  { code: 'en-NG', name: 'English (Nigeria)', nativeName: 'English', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'yo-NG', name: 'Yoruba (Nigeria)', nativeName: 'Yorùbá', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'pcm', name: 'Nigerian Pidgin', nativeName: 'Naijá', country: 'Nigeria', flag: '🇳🇬' },

  // South Africa
  { code: 'en-ZA', name: 'English (South Africa)', nativeName: 'English', country: 'South Africa', flag: '🇿🇦' },
  { code: 'zu', name: 'isiZulu', nativeName: 'isiZulu', country: 'South Africa', flag: '🇿🇦' },
  { code: 'tn', name: 'Setswana', nativeName: 'Setswana', country: 'South Africa', flag: '🇿🇦' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', country: 'South Africa', flag: '🇿🇦' },
  { code: 'xh', name: 'isiXhosa', nativeName: 'isiXhosa', country: 'South Africa', flag: '🇿🇦' },
];

export const DEFAULT_LANGUAGE = 'en-GH'; // Default to Ghana English

export const LANGUAGE_GROUPS = {
  'Official Languages': ['fr-BJ', 'fr-CI', 'en-GH', 'pt-GW', 'fr-GN', 'en-LR', 'en-NG', 'en-ZA', 'af'],
  'Local Languages': ['fon', 'yo-BJ', 'dyu', 'bci', 'tw', 'ga', 'ee', 'dag', 'pov', 'ff-GW', 'sus', 'ff-GN', 'mnk', 'kpe', 'bss', 'vai', 'ha', 'yo-NG', 'ig', 'pcm', 'zu', 'tn', 'xh']
};

export const getLanguageByCode = (code: string): Language | undefined => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
};

export const getLanguagesByCountry = (country: string): Language[] => {
  return SUPPORTED_LANGUAGES.filter(lang => lang.country === country);
};

export const detectUserLanguage = (): string => {
  // Try to detect from browser language
  const browserLang = navigator.language || navigator.languages?.[0];
  
  // Check if we support the exact browser language
  const exactMatch = SUPPORTED_LANGUAGES.find(lang => lang.code === browserLang);
  if (exactMatch) return exactMatch.code;
  
  // Check for language family match (e.g., 'en' matches 'en-GH')
  const langFamily = browserLang.split('-')[0];
  const familyMatch = SUPPORTED_LANGUAGES.find(lang => lang.code.startsWith(langFamily));
  if (familyMatch) return familyMatch.code;
  
  // Default to Ghana English
  return DEFAULT_LANGUAGE;
};

export const getWelcomeMessage = (language: string, userName: string): string => {
  const welcomeMessages: Record<string, string> = {
    // French variants
    'fr-BJ': `Bienvenue ${userName}!`,
    'fr-CI': `Bienvenue ${userName}!`,
    'fr-GN': `Bienvenue ${userName}!`,
    
    // English variants
    'en-GH': `Welcome ${userName}!`,
    'en-LR': `Welcome ${userName}!`,
    'en-NG': `Welcome ${userName}!`,
    
    // Portuguese
    'pt-GW': `Bem-vindo ${userName}!`,
    
    // Local languages
    'fon': `Kú àbɔ̀ ${userName}!`, // Fon welcome
    'yo-BJ': `Káàbọ̀ ${userName}!`, // Yoruba welcome
    'yo-NG': `Káàbọ̀ ${userName}!`, // Yoruba welcome
    'dyu': `I ni ce ${userName}!`, // Dioula welcome
    'bci': `Akwaba ${userName}!`, // Baoulé welcome
    'tw': `Akwaaba ${userName}!`, // Twi welcome
    'ga': `Akwaaba ${userName}!`, // Ga welcome
    'ee': `Woezɔ ${userName}!`, // Ewe welcome
    'dag': `Desabre ${userName}!`, // Dagbani welcome
    'pov': `Bon bindi ${userName}!`, // Crioulo welcome
    'ff-GW': `Jaraama ${userName}!`, // Fula welcome
    'ff-GN': `Jaraama ${userName}!`, // Fula welcome
    'sus': `I barka ${userName}!`, // Susu welcome
    'mnk': `I ni ce ${userName}!`, // Maninka welcome
    'kpe': `Kɛlɛɛ ${userName}!`, // Kpelle welcome
    'bss': `Sannu ${userName}!`, // Bassa welcome
    'vai': `Kɛlɛɛ ${userName}!`, // Vai welcome
    'ha': `Sannu ${userName}!`, // Hausa welcome
    'ig': `Nnọọ ${userName}!`, // Igbo welcome
    'pcm': `Welcome ${userName}!`, // Nigerian Pidgin

    // South African languages
    'en-ZA': `Welcome ${userName}!`, // South African English
    'zu': `Sawubona ${userName}!`, // isiZulu welcome
    'tn': `Dumela ${userName}!`, // Setswana welcome
    'af': `Welkom ${userName}!`, // Afrikaans welcome
    'xh': `Molo ${userName}!`, // isiXhosa welcome
  };
  
  return welcomeMessages[language] || `Welcome ${userName}!`;
};

export const getCurrencyByLanguage = (language: string): { code: string; symbol: string; name: string } => {
  const currencyMap: Record<string, { code: string; symbol: string; name: string }> = {
    // West African CFA Franc (Benin, Côte d'Ivoire, Guinea-Bissau)
    'fr-BJ': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    'fon': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    'yo-BJ': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    'fr-CI': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    'dyu': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    'bci': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    'pt-GW': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    'pov': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    'ff-GW': { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    
    // Ghanaian Cedi
    'en-GH': { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
    'tw': { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
    'ga': { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
    'ee': { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
    'dag': { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
    
    // Guinean Franc
    'fr-GN': { code: 'GNF', symbol: 'FG', name: 'Guinean Franc' },
    'sus': { code: 'GNF', symbol: 'FG', name: 'Guinean Franc' },
    'ff-GN': { code: 'GNF', symbol: 'FG', name: 'Guinean Franc' },
    'mnk': { code: 'GNF', symbol: 'FG', name: 'Guinean Franc' },
    
    // Liberian Dollar
    'en-LR': { code: 'LRD', symbol: 'L$', name: 'Liberian Dollar' },
    'kpe': { code: 'LRD', symbol: 'L$', name: 'Liberian Dollar' },
    'bss': { code: 'LRD', symbol: 'L$', name: 'Liberian Dollar' },
    'vai': { code: 'LRD', symbol: 'L$', name: 'Liberian Dollar' },
    
    // Nigerian Naira
    'en-NG': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    'ha': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    'yo-NG': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    'ig': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    'pcm': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },

    // South African Rand
    'en-ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    'zu': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    'tn': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    'af': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    'xh': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  };
  
  return currencyMap[language] || { code: 'USD', symbol: '$', name: 'US Dollar' };
};

// Exchange rates relative to 50 ZAR (South African Rand) as base
const EXCHANGE_RATES_TO_ZAR_50 = {
  'XOF': 1650,    // West African CFA Franc (50 ZAR ≈ 1,650 CFA)
  'GHS': 15,      // Ghanaian Cedi (50 ZAR ≈ 15 GHS)
  'GNF': 25000,   // Guinean Franc (50 ZAR ≈ 25,000 GNF)
  'LRD': 8,       // Liberian Dollar (50 ZAR ≈ 8 LRD)
  'NGN': 2200,    // Nigerian Naira (50 ZAR ≈ 2,200 NGN)
  'ZAR': 50,      // South African Rand (base currency)
  'USD': 3,       // US Dollar fallback (50 ZAR ≈ 3 USD)
};

export const getLocalizedPrice = (baseAmountZAR: number, language: string): number => {
  const currency = getCurrencyByLanguage(language);
  const rate = EXCHANGE_RATES_TO_ZAR_50[currency.code as keyof typeof EXCHANGE_RATES_TO_ZAR_50];

  if (!rate) return baseAmountZAR;

  // Calculate equivalent amount based on the ratio
  return Math.round((baseAmountZAR / 50) * rate);
};

export const formatCurrency = (baseAmountZAR: number, language: string): string => {
  const currency = getCurrencyByLanguage(language);
  const localAmount = getLocalizedPrice(baseAmountZAR, language);

  // Format based on local conventions
  if (currency.code === 'XOF') {
    return `${localAmount.toLocaleString()} ${currency.symbol}`;
  } else if (currency.code === 'GHS') {
    return `${currency.symbol}${localAmount.toFixed(0)}`;
  } else if (currency.code === 'GNF') {
    return `${localAmount.toLocaleString()} ${currency.symbol}`;
  } else if (currency.code === 'LRD') {
    return `${currency.symbol}${localAmount.toFixed(0)}`;
  } else if (currency.code === 'NGN') {
    return `${currency.symbol}${localAmount.toLocaleString()}`;
  } else if (currency.code === 'ZAR') {
    return `${currency.symbol}${localAmount.toFixed(0)}`;
  }

  return `${currency.symbol}${localAmount.toFixed(2)}`;
};

export const getCountryFromLanguage = (language: string): string => {
  const lang = getLanguageByCode(language);
  return lang?.country || 'Ghana';
};

export const getMoMoProviderByLanguage = (language: string): string => {
  const country = getCountryFromLanguage(language);
  
  const providers: Record<string, string> = {
    'Benin': 'MTN Benin',
    'Côte d\'Ivoire': 'MTN Côte d\'Ivoire',
    'Ghana': 'MTN Ghana',
    'Guinea-Bissau': 'MTN Guinea-Bissau',
    'Guinea': 'MTN Guinea',
    'Liberia': 'MTN Liberia',
    'Nigeria': 'MTN Nigeria',
    'South Africa': 'MTN South Africa',
  };
  
  return providers[country] || 'MTN Mobile Money';
};
