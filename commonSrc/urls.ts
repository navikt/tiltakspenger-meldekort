import { baseLocale, localesWithSuffix, TeksterLocale } from '@common/typer/locale.ts';

export const stripTrailingSlash = (path: string) => path.replace(/\/$/, '');

export const addLocaleSuffix = (path: string, locale: TeksterLocale) => {
    if (locale === baseLocale) {
        return path;
    }

    return `${stripTrailingSlash(path)}/${locale}`;
};

export const getPathWithoutLocaleSuffix = (path: string) => {
    const pathSegments = stripTrailingSlash(path).split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    const hasLocaleSuffix = localesWithSuffix.some((locale) => locale === lastSegment);

    return hasLocaleSuffix ? pathSegments.slice(0, -1).join('/') : path;
};

export const replaceLocaleSuffix = (path: string, newLocale: TeksterLocale) => {
    return addLocaleSuffix(getPathWithoutLocaleSuffix(path), newLocale);
};

export const getLocaleFromPath = (path: string): TeksterLocale => {
    const lastSegment = stripTrailingSlash(path).split('/').slice(-1)[0];

    const hasLocaleSuffix = localesWithSuffix.some((locale) => locale === lastSegment);

    return hasLocaleSuffix ? (lastSegment as TeksterLocale) : baseLocale;
};
