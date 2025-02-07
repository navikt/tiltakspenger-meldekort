import { teksterNb } from '@tekster/nb.ts';

export type TeksterRecord = typeof teksterNb;

export type TekstId = keyof TeksterRecord;
export type TeksterLocale = 'nb';

export type TekstResolver = (props: any) => string;

export type TeksterProps<Id extends TekstId> = {
    id: Id;
    locale?: TeksterLocale;
    resolverProps?: unknown;
} & TekstResolverProps<TeksterRecord[Id]>;

type TekstResolverProps<TekstVerdi extends TeksterRecord[TekstId]> = TekstVerdi extends TekstResolver
    ? {
          resolverProps: Parameters<TekstVerdi>[0];
      }
    : {
          resolverProps?: never;
      };
