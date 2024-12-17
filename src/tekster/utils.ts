import { teksterNb } from '@tekster/nb';

export type TekstId = keyof typeof teksterNb;

type Locale = keyof typeof tekster

const tekster: Record<string, typeof teksterNb> = {
    nb: teksterNb,
} as const;

export const getTekster = (id: TekstId, locale: Locale = 'nb'): string[] => {
    const tekstVerdi = tekster[locale][id];

    return Array.isArray(tekstVerdi) ? tekstVerdi : [tekstVerdi];
};