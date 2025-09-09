import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Check, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANGUAGE_GROUPS, type Language } from '@/i18n/languages';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface LanguageSelectorProps {
  onLanguageSelect?: (language: string) => void;
  showWelcomeMessage?: boolean;
  compact?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  onLanguageSelect, 
  showWelcomeMessage = false,
  compact = false 
}) => {
  const { currentLanguage, setLanguage, getCurrentLanguageInfo, getSupportedLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLangInfo = getCurrentLanguageInfo();
  const supportedLanguages = getSupportedLanguages();

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode);
    setIsOpen(false);
    onLanguageSelect?.(languageCode);
  };

  const getLanguagesByGroup = (groupName: string): Language[] => {
    const codes = LANGUAGE_GROUPS[groupName as keyof typeof LANGUAGE_GROUPS] || [];
    return codes.map(code => supportedLanguages.find(lang => lang.code === code)).filter(Boolean) as Language[];
  };

  if (compact) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-auto">
            <Globe className="h-4 w-4 mr-2" />
            {currentLangInfo?.flag} {currentLangInfo?.nativeName}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <ScrollArea className="h-96">
            <div className="p-4">
              <h4 className="font-medium text-sm mb-3">{t('settings')}</h4>
              {Object.entries(LANGUAGE_GROUPS).map(([groupName, _]) => {
                const languages = getLanguagesByGroup(groupName);
                if (languages.length === 0) return null;

                return (
                  <div key={groupName} className="mb-4">
                    <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      {groupName}
                    </h5>
                    <div className="space-y-1">
                      {languages.map((language) => (
                        <Button
                          key={language.code}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-auto p-2"
                          onClick={() => handleLanguageSelect(language.code)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{language.flag}</span>
                              <div className="text-left">
                                <div className="font-medium text-sm">{language.nativeName}</div>
                                <div className="text-xs text-muted-foreground">{language.country}</div>
                              </div>
                            </div>
                            {currentLanguage === language.code && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Globe className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Choose Your Language</CardTitle>
        </div>
        <CardDescription>
          Select your preferred language to use CareerNest. We support multiple West African languages for MTN MoMo users.
        </CardDescription>
        {showWelcomeMessage && currentLangInfo && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-lg font-medium">
              {currentLangInfo.flag} {currentLangInfo.nativeName}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome message will appear as: <strong>"{t('welcomeMessage')}"</strong>
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-6">
            {Object.entries(LANGUAGE_GROUPS).map(([groupName, _]) => {
              const languages = getLanguagesByGroup(groupName);
              if (languages.length === 0) return null;

              return (
                <div key={groupName}>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="font-semibold text-lg">{groupName}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {languages.length} languages
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {languages.map((language) => (
                      <Button
                        key={language.code}
                        variant={currentLanguage === language.code ? "default" : "outline"}
                        className="h-auto p-4 justify-start"
                        onClick={() => handleLanguageSelect(language.code)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-2xl">{language.flag}</span>
                          <div className="text-left flex-1">
                            <div className="font-medium">{language.nativeName}</div>
                            <div className="text-sm opacity-70">{language.name}</div>
                            <div className="text-xs opacity-50">{language.country}</div>
                          </div>
                          {currentLanguage === language.code && (
                            <Check className="h-5 w-5 ml-auto" />
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                  
                  {groupName !== 'Local Languages' && <Separator className="mt-6" />}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💳</span>
            <h4 className="font-medium">MTN Mobile Money Support</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            All languages support MTN MoMo payments in local currencies. 
            Your selected language will determine the currency and payment provider.
          </p>
          {currentLangInfo && (
            <div className="mt-2 flex items-center gap-4 text-sm">
              <span>
                <strong>Currency:</strong> {(() => {
                  const { formatPrice } = useLanguage();
                  return formatPrice(100);
                })()}
              </span>
              <span>
                <strong>Provider:</strong> {(() => {
                  const { getMoMoProvider } = useLanguage();
                  return getMoMoProvider();
                })()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;
