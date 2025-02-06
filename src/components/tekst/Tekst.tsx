import React, { ComponentProps } from 'react';
import { getTekster, TeksterProps, TekstId } from '@tekster/utils';

// TODO: type uten any :_(
type Props<Id extends TekstId, As extends React.FunctionComponent<any>> = TeksterProps<Id> & {
    as?: As;
} & Omit<React.ComponentProps<As>, keyof TeksterProps<Id> | 'children'>;

export const Tekst = <Id extends TekstId, As extends React.FunctionComponent<any>>({
    as: Component,
    id,
    locale,
    resolverProps,
    ...rest
}: Props<Id, As>) => {
    const teksterProps = { id, locale, resolverProps } as TeksterProps<Id>;

    const tekst = getTekster(teksterProps).join(' ');

    return Component ? <Component {...(rest as ComponentProps<any>)}>{tekst}</Component> : tekst;
};
