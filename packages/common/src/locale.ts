export const baseLocale = 'nb';
export const localesWithSuffix = ['en'] as const;
export const locales = [baseLocale, ...localesWithSuffix] as const;

export type TeksterLocale = (typeof locales)[number];

export const erLocaleGyldig = (locale: string): locale is TeksterLocale => {
    return locales.includes(locale as TeksterLocale);
};
