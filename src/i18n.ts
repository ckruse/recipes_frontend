import { de, enGB, fr } from "date-fns/locale";
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
    fallbackLng: "de",
    debug: process.env.NODE_ENV !== "production",
    supportedLngs: SUPPORTED_LANGUAGES,
    backend: {
      queryStringParams: { v: process.env.REACT_APP_VERSION || "0" },
    },
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
    },
  });

export const supportedDateLocales: Partial<Record<string, Locale>> = { de, en: enGB, fr };

export default i18n;
