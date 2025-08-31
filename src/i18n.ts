import { de, enGB, fr, type Locale } from "date-fns/locale";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGUAGES = ["de"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnNull: false,
    fallbackLng: "de",
    debug: import.meta.env.MODE !== "production",
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    backend: {
      queryStringParams: { v: import.meta.env.VITE_VERSION || "0" },
    },
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
  });

export const supportedDateLocales: Partial<Record<string, Locale>> = { de, en: enGB, fr };

export default i18n;
