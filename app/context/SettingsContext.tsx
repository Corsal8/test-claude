import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  defaultLocale,
  LOCALE_COOKIE_KEY,
  LOCALE_MAX_AGE,
  translations,
  type Locale,
} from "~/i18n";

// useLayoutEffect on the client so the locale correction happens before the
// first browser paint — no visible flash if the cookie was lost but
// localStorage still holds the saved preference.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const VALID_LOCALES = new Set<string>(Object.keys(translations));

function isValidLocale(value: string | null): value is Locale {
  return value !== null && VALID_LOCALES.has(value);
}

// Writes to both the cookie (read by the SSR loader on the next request)
// and localStorage (persistent across browser sessions).
function persistLocale(lang: Locale): void {
  document.cookie = `${LOCALE_COOKIE_KEY}=${lang}; path=/; max-age=${LOCALE_MAX_AGE}; samesite=lax`;
  try {
    localStorage.setItem(LOCALE_COOKIE_KEY, lang);
  } catch {
    // localStorage blocked (private browsing policy, etc.)
  }
}

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

export function SettingsProvider({
  children,
  initialLang,
}: SettingsProviderProps) {
  const [language, setLanguageState] = useState<Locale>(initialLang);

  // On mount: if the cookie was lost between sessions (e.g. browser cleared it
  // on restart) but localStorage still has the saved preference, restore it.
  // useIsomorphicLayoutEffect ensures this runs before the first paint so the
  // correction from the server-rendered default to the saved locale is invisible.
  useIsomorphicLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_COOKIE_KEY);
      if (isValidLocale(stored) && stored !== initialLang) {
        setLanguageState(stored);
        document.documentElement.lang = stored;
        persistLocale(stored); // refresh the cookie for the next SSR request
      }
    } catch {
      // localStorage not available
    }
  }, []); // mount-only: intentionally compares against the server-provided initialLang

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    persistLocale(lang);
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
