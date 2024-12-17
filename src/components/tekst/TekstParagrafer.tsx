import { BodyLong, BodyLongProps } from '@navikt/ds-react';
import { getTekster, TekstId } from '@tekster/utils';
import React from 'react';

type Props = {
    id: TekstId;
} & Omit<BodyLongProps, 'children' | 'id'>;

export const TekstParagrafer = ({ id, ...rest }: Props) => {
    return getTekster(id).map((tekst, index, array) => {
        const erSist = index === array.length - 1;

        return (
            <BodyLong key={`${id}-${index}`} spacing={!erSist} {...rest}>
                {tekst}
            </BodyLong>
        );
    });
};
