import React from 'react';
import { BodyLong } from '@navikt/ds-react';

type Props = {
    tekst: React.ReactNode;
    weight?: 'regular' | 'semibold';
};

export const Undertekst = ({ tekst, weight = 'regular' }: Props) => {
    return <BodyLong weight={weight}>{tekst}</BodyLong>;
};
