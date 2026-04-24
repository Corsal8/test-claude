import { createContext, useContext, useEffect, useState } from "react";
import {
  defaultLocale,
  LOCALE_COOKIE_KEY,
  LOCALE_MAX_AGE,
  translations,
  type Locale,
} from "~/i18n";

interface SettingsContextValue {
  language: Locale;
  setLanguage: (lang: Locale) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  language: defaultLocale,
  setLanguage: () => {},
});

interface SettingsProviderProps {
  children: React.ReactNode;
  initialLang: Locale;
}

export function SettingsProvider({ children, initialLang }: SettingsProviderProps) {
  const [language, setLanguageState] = useState<Locale>(initialLang);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    document.cookie = `${LOCALE_COOKIE_KEY}=${lang}; path=/; max-age=${LOCALE_MAX_AGE}; samesite=lax`;
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <SettingsContext.Provider value={{ language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useTranslation() {
  const { language } = useSettings();
  return translations[language];
}
