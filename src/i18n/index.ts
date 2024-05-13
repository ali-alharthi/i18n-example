import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const Locales = ['ar', 'en'] as const;
export type Locales = typeof Locales[number];
export const DefaultLocale = 'ar' as const;
export const LocalePrefix = 'always';

export default getRequestConfig(async ({ locale }) => {
    if (!Locales.includes(locale as any)) {
        notFound();
    }

    return {
        messages: (await import(`./locales/${locale}.json`)).default
    };
});
