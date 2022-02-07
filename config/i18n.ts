import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonKo from 'public/locales/ko/common.json';
import homeKo from 'public/locales/ko/home.json';

export const defaultNS = 'common';
export const resources = {
  ko: {
    common: commonKo,
    home: homeKo,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'ko',
  fallbackLng: 'ko',
  ns: ['common', 'home'],
  defaultNS,
  resources,
});

export default i18n;
