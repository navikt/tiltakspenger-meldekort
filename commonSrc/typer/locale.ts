export const baseLocale = 'nb';
export const localesWithSuffix = ['en'] as const;
export const locales = [baseLocale, ...localesWithSuffix] as const;

export type TeksterLocale = (typeof locales)[number];
