import { BodyLong, BodyLongProps } from '@navikt/ds-react';
import { getTekster, TeksterProps, TekstId } from '@tekster/utils';
import React from 'react';

type Props<Id extends TekstId> = TeksterProps<Id> & Omit<BodyLongProps, 'children' | 'id'>;

export const TekstParagrafer = <Id extends TekstId>(props: Props<Id>) => {
    const {
        id,
        locale,
        resolverProps,
        ...bodyLongProps
    } = props;

    return getTekster(props).map((tekst, index, array) => {
        const erSist = index === array.length - 1;

        return (
            <BodyLong key={`${id}-${index}`} spacing={!erSist} {...bodyLongProps}>
                {tekst}
            </BodyLong>
        );
    });
};
