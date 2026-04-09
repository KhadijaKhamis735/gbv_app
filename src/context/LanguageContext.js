import React, { createContext, useContext } from 'react';

export const LANGUAGE_STORAGE_KEY = 'app_language';
export const LANGUAGE_SELECTED_KEY = 'app_language_selected';

export const LanguageContext = createContext({
  language: 'en',
  setAppLanguage: async () => {},
  hasSelectedLanguage: false,
});

export function useLanguage() {
  return useContext(LanguageContext);
}
