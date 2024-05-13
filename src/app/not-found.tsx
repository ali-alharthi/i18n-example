'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { Locales } from '@/i18n';

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.


const usePreferredLanguageSubscribe = (cb: any) => {
  window.addEventListener("languagechange", cb);
  return () => window.removeEventListener("languagechange", cb);
};

const getPreferredLanguageSnapshot = () => {
  return navigator.language;
};

const getPreferredLanguageServerSnapshot = () => {
  throw Error("usePreferredLanguage is a client-only hook");
};

export function usePreferredLanguage() {
  return React.useSyncExternalStore(
    usePreferredLanguageSubscribe,
    getPreferredLanguageSnapshot,
    getPreferredLanguageServerSnapshot
  );
}


export default function NotFound() {
  const language = usePreferredLanguage();

  return Locales.includes(language.substring(0, 2) as 'ar' | 'en') ? redirect(`/${language.substring(0, 2)}/not-found`) : redirect(`/${Locales[0]}/not-found`)
}