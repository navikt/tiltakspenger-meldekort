import { BodyLong, BodyLongProps } from '@navikt/ds-react';
import { getTekster } from '@tekster/tekster.ts';
import React from 'react';
import { TeksterProps, TekstId } from '@tekster/typer.ts';

type Props<Id extends TekstId> = TeksterProps<Id> & Omit<BodyLongProps, 'children' | 'id'>;

export const TekstSegmenter = <Id extends TekstId>(props: Props<Id>) => {
    const { id, ...bodyLongProps } = props;

    return getTekster(props).map((tekst, index, array) => {
        const erSist = index === array.length - 1;

        return (
            <BodyLong key={`${id}-${index}`} spacing={!erSist} {...bodyLongProps}>
                {tekst}
            </BodyLong>
        );
    });
};
