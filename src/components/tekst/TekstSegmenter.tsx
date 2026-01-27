import { BodyLong, BodyLongProps } from '@navikt/ds-react';
import { getTekster } from '@tekster/tekster.ts';
import React from 'react';
import { TeksterProps, TekstId } from '@tekster/typer.ts';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

type Props<Id extends TekstId> = TeksterProps<Id> & Omit<BodyLongProps, 'children' | 'id'>;

export const TekstSegmenter = <Id extends TekstId>(props: Props<Id>) => {
    const { id, ...bodyLongProps } = props;
    const { valgtSpråk } = useValgtSpråk();

    return getTekster({ ...props, locale: valgtSpråk }).map((tekst, index, array) => {
        const erSist = index === array.length - 1;

        return (
            <BodyLong key={`${id}-${index}`} spacing={!erSist} {...bodyLongProps}>
                {tekst}
            </BodyLong>
        );
    });
};
