import { teksterNb } from '@tekster/nb';
import { TeksterRecord, TekstId, TeksterPropsMedLocale } from '@tekster/typer.ts';
import { teksterEn } from '@tekster/en.ts';
import { TeksterLocale } from '@common/typer/locale.ts';

const tekster: Record<TeksterLocale, TeksterRecord> = {
    nb: teksterNb,
    en: teksterEn,
} as const;

const getTekstVerdi = <Id extends TekstId>({
    id,
    locale = 'nb',
    resolverProps,
}: TeksterPropsMedLocale<Id>): string | string[] => {
    const tekstVerdi = tekster[locale][id];

    if (typeof tekstVerdi === 'function') {
        // :_(
        return tekstVerdi(resolverProps as any);
    }

    return tekstVerdi;
};

export const getTekster = <Id extends TekstId>(props: TeksterPropsMedLocale<Id>): string[] => {
    const tekstVerdi = getTekstVerdi(props);
    return Array.isArray(tekstVerdi) ? tekstVerdi : [tekstVerdi];
};

export const getTekst = <Id extends TekstId>(props: TeksterPropsMedLocale<Id>): string => {
    const tekstVerdi = getTekstVerdi(props);
    return Array.isArray(tekstVerdi) ? tekstVerdi.join(' ') : tekstVerdi;
};
