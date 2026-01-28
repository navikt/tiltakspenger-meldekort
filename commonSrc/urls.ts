import { TeksterLocale } from '@common/typer/locale.ts';

export const stripTrailingSlash = (path: string) => path.replace(/\/$/, '');

export const getLastPathSegment = (path: string) => {
    return stripTrailingSlash(path).split('/').slice(-1)[0];
};

export const addLocaleSuffix = (path: string, locale: TeksterLocale) => {
    if (locale === 'nb') {
        return path;
    }

    return `${stripTrailingSlash(path)}/${locale}`;
};
