import { teksterNb } from '@tekster/nb.ts';
import { TeksterLocale } from '@common/typer/locale.ts';

type TeksterNB = typeof teksterNb;

type TeksterKeysNB = keyof TeksterNB;

export type TeksterRecord = {
    [key in TeksterKeysNB]: TeksterNB[key] extends string
        ? string
        : TeksterNB[key] extends string[]
          ? string[]
          : TeksterNB[key];
};

export type TekstId = keyof TeksterRecord;

export type TekstResolver = (props: any) => string;

export type TeksterProps<Id extends TekstId> = {
    id: Id;
    resolverProps?: unknown;
} & TekstResolverProps<TeksterRecord[Id]>;

export type TeksterPropsMedLocale<Id extends TekstId> = {
    locale: TeksterLocale;
} & TeksterProps<Id>;

type TekstResolverProps<TekstVerdi extends TeksterRecord[TekstId]> =
    TekstVerdi extends TekstResolver
        ? {
              resolverProps: Parameters<TekstVerdi>[0];
          }
        : {
              resolverProps?: never;
          };
