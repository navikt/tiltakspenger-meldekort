import { BodyLong, BodyLongProps } from '@navikt/ds-react';
import { TeksterProps, TekstId } from '@tekster/typer';

import { useSpråk } from '@context/språk/useSpråk';

type Props<Id extends TekstId> = TeksterProps<Id> & Omit<BodyLongProps, 'children' | 'id'>;

export const TekstSegmenter = <Id extends TekstId>(props: Props<Id>) => {
    const { id, ...bodyLongProps } = props;
    const { getTeksterForSpråk } = useSpråk();

    return getTeksterForSpråk(props).map((tekst, index, array) => {
        const erSist = index === array.length - 1;

        return (
            <BodyLong key={`${id}-${index}`} spacing={!erSist} {...bodyLongProps}>
                {tekst}
            </BodyLong>
        );
    });
};
