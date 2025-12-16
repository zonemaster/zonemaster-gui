import { defineMiddleware } from 'astro:middleware';
import { setLocale, isValidLocale } from '@/messages';

export const onRequest = defineMiddleware(({ url }, next) => {
    // base should always end with '/'
    const base = import.meta.env.BASE_URL;
    let pathname = url.pathname;
    if (pathname.startsWith(base)) {
        pathname = pathname.slice(base.length);
    }

    // Extract locale from the first path segment after removing base URL
    // (e.g., /subdirectory/en/page -> en/page -> 'en')
    const pathSegments = pathname.split('/').filter(Boolean);
    const localeFromPath = pathSegments[0];

    if (isValidLocale(localeFromPath)) {
        setLocale(localeFromPath);
    }

    return next();
});
