/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n, { Resource } from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';

import { AnyAction, Store } from '@reduxjs/toolkit';

const initI18n = (resources: Resource) =>
  i18n
    .use(initReactI18next)
    // .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'en',
      defaultNS: 'ns1',
      interpolation: {
        escapeValue: false,
      },
    });

export const Tquinlan1992App: React.FC<{
  store: Store<unknown, AnyAction>;
  resources: Resource;
}> = ({ store, resources, children }) => {
  initI18n(resources);
  return <Provider store={store}>{children as any}</Provider>;
};
