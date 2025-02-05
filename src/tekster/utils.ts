import { teksterNb } from '@tekster/nb';
import React from 'react';

type Locale = 'nb';

export type TekstResolver = (props: any) => React.ReactNode;

type Tekster = typeof teksterNb;

export type TekstId = keyof Tekster;

const tekster: Record<Locale, Tekster> = {
    nb: teksterNb,
} as const;

export type TeksterProps<Id extends TekstId> = {
    id: Id;
    locale?: Locale;
    resolverProps?: unknown;
} & TekstResolverProps<Tekster[Id]>;

type TekstResolverProps<TekstVerdi extends Tekster[TekstId]> = TekstVerdi extends TekstResolver
    ? {
          resolverProps: Parameters<TekstVerdi>[0];
      }
    : {
          resolverProps?: never;
      };

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
