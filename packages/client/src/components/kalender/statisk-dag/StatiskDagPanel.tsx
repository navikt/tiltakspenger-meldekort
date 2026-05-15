import { BodyLong } from '@navikt/ds-react';

import { formatterDato } from '@utils/datetime';
import {
    meldekortStatusTilStyle,
    statusTilIkon,
    statusTilTekstId,
} from '@components/kalender/meldekortDagUtils';
import { classNames } from '@utils/classNames';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter';

import style from './StatiskDagPanel.module.css';
import { MeldekortDag } from '@meldekort/common/typer/MeldekortBruker';

import { useSpråk } from '@context/språk/useSpråk';

type Props = {
    dag: MeldekortDag;
};

export const MeldekortdagOppsummering = ({ dag }: Props) => {
    const { status, dag: dato } = dag;
    const { valgtSpråk } = useSpråk();

    const datoTekst = formatterDato({
        dato,
        medUkeDag: true,
        medStorForbokstav: true,
        locale: valgtSpråk,
    });

    const IkonKomponent = statusTilIkon[status];
    const tekstId = statusTilTekstId[status];

    return (
        <div className={classNames(style.statiskDag, meldekortStatusTilStyle[status])}>
            <IkonKomponent aria-hidden />
            <BodyLong>{`${datoTekst}: `}</BodyLong>
            <TekstSegmenter id={tekstId} weight={'semibold'} />
        </div>
    );
};
