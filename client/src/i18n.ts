import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

await i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
