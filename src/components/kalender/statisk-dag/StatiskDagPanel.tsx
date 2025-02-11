import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { MeldekortDag } from '../../../../commonSrc/typer/meldekort-utfylling.ts';
import { formatterDato } from '@utils/datetime.ts';
import {
    statusTilIkon,
    meldekortStatusTilStyle,
    statusTilTekstId,
} from '@components/kalender/dag-felles/dagFellesUtils.ts';
import { classNames } from '@utils/classNames.ts';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { CircleSlashIcon } from '@navikt/aksel-icons';

import style from './StatiskDagPanel.module.css';

type Props = {
    dag: MeldekortDag;
};

export const StatiskDagPanel = ({ dag }: Props) => {
    const { status, dato, harRett } = dag;

    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

    const IkonKomponent = harRett ? statusTilIkon[status] : CircleSlashIcon;

    return (
        <div className={classNames(style.statiskDag, meldekortStatusTilStyle[status])}>
            <IkonKomponent />
            <BodyLong>{`${datoTekst}: `}</BodyLong>
            <TekstSegmenter
                id={harRett ? statusTilTekstId[status] : 'ikkeRett'}
                weight={'semibold'}
            />
        </div>
    );
};
