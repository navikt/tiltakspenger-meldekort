import React from 'react';
import {
    MeldekortDag,
    MeldekortDagStatus,
} from '../../../../../commonSrc/typer/meldekort-utfylling.ts';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import { BodyLong, Button } from '@navikt/ds-react';
import { classNames } from '@utils/classNames.ts';
import { Tekst } from '@components/tekst/Tekst';
import { StatiskDagPanel } from '@components/kalender/statisk-dag/StatiskDagPanel';
import {
    meldekortStatusTilStyle,
    statusTilTekstId,
} from '@components/kalender/dag-felles/dagFellesUtils';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';

import style from './FraværDagPanel.module.css';

type Props = {
    dag: MeldekortDag;
};

export const FraværDagPanel = ({ dag }: Props) => {
    const { setValgtMeldekortDag } = useMeldekortUtfylling();

    const { dato, status } = dag;

    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true, kort: true });

    const harDeltatt = status === MeldekortDagStatus.Deltatt;

    return harDeltatt ? (
        <StatiskDagPanel dag={dag} />
    ) : (
        <div className={classNames(style.fravær, meldekortStatusTilStyle[status])}>
            <div className={style.datoStatus}>
                <BodyLong className={style.dato}>{`${datoTekst}: `}</BodyLong>
                <TekstSegmenter id={statusTilTekstId[status]} weight={'semibold'} />
            </div>
            <Button
                size={'small'}
                variant={'secondary'}
                onClick={() => {
                    setValgtMeldekortDag(dag);
                }}
                className={style.knapp}
            >
                <Tekst id={'fraværPanelRegistrer'} />
            </Button>
        </div>
    );
};
