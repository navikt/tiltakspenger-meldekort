import { TeksterLocale } from '@common/typer/TeksterLocale.ts';

export const stripTrailingSlash = (path: string) => path.replace(/\/$/, '');

export const getLastPathSegment = (path: string) => {
    return stripTrailingSlash(path).split('/').pop();
};

export const addLocaleSuffix = (path: string, locale: TeksterLocale) => {
    if (locale === 'nb') {
        return path;
    }

    return `${stripTrailingSlash(path)}/${locale}`;
};
