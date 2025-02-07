import { teksterNb } from '@tekster/nb';
import { TeksterRecord, TeksterLocale, TeksterProps, TekstId } from '@tekster/typer.ts';

const tekster: Record<TeksterLocale, TeksterRecord> = {
    nb: teksterNb,
} as const;

export const getTekster = <Id extends TekstId>({
    id,
    locale = 'nb',
    resolverProps,
}: TeksterProps<Id>): string[] => {
    const tekstVerdi = tekster[locale][id];

    if (typeof tekstVerdi === 'function') {
        // :_(
        return [tekstVerdi(resolverProps as any)];
    }

    return Array.isArray(tekstVerdi) ? tekstVerdi : [tekstVerdi];
};
