import { defineMiddleware } from 'astro:middleware';
import { setLocale } from '@/messages';

export const onRequest = defineMiddleware(({ url }, next) => {
    // Extract locale from the first path segment (e.g., /en/page -> 'en')
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const localeFromPath = pathSegments[0];

    setLocale(localeFromPath);

    return next();
});
