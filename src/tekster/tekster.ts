import { teksterNb } from '@tekster/nb';
import { TeksterRecord, TeksterLocale, TeksterProps, TekstId } from '@tekster/typer.ts';

const tekster: Record<TeksterLocale, TeksterRecord> = {
    nb: teksterNb,
} as const;

const getTekstVerdi = <Id extends TekstId>({
    id,
    locale = 'nb',
    resolverProps,
}: TeksterProps<Id>): string | string[] => {
    const tekstVerdi = tekster[locale][id];

    if (typeof tekstVerdi === 'function') {
        // :_(
        return tekstVerdi(resolverProps as any);
    }

    return tekstVerdi;
};

export const getTekster = <Id extends TekstId>(props: TeksterProps<Id>): string[] => {
    const tekstVerdi = getTekstVerdi(props);
    return Array.isArray(tekstVerdi) ? tekstVerdi : [tekstVerdi];
};

export const getTekst = <Id extends TekstId>(props: TeksterProps<Id>): string => {
    const tekstVerdi = getTekstVerdi(props);
    return Array.isArray(tekstVerdi) ? tekstVerdi.join(' ') : tekstVerdi;
};
