import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { Locales, DefaultLocale } from '@/i18n';

const handleI18nRouting = createMiddleware({
    // A list of all locales that are supported
    locales: Locales,

    // Used when no locale matches
    defaultLocale: DefaultLocale
});

export default async function middleware(request: NextRequest) {
    const response = handleI18nRouting(request);
    response.headers.set('x-pathname', request.nextUrl.pathname)
    return response;
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(ar|en)/:path*']
};