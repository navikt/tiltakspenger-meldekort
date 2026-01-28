export const locales = ['nb', 'en'] as const;

export type TeksterLocale = (typeof locales)[number];
