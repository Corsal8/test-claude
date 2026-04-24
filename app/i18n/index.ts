import { en } from "./en";
import { it } from "./it";
export type { Translations } from "./types";

export type Locale = "en" | "it";

export const translations: Record<Locale, typeof en> = { en, it };

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE_KEY = "settings.language";
export const LOCALE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
