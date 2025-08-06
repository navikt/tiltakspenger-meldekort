import { BodyLong } from '@navikt/ds-react';
import { MeldekortDag } from '@common/typer/meldekort-utfylling.ts';
import { formatterDato } from '@utils/datetime.ts';
import {
    meldekortStatusTilStyle,
    statusTilIkon,
    statusTilTekstId,
} from '@components/kalender/dag-felles/dagFellesUtils.ts';
import { classNames } from '@utils/classNames.ts';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';

import style from './StatiskDagPanel.module.css';

type Props = {
    dag: MeldekortDag;
};

export const MeldekortdagOppsummering = ({ dag }: Props) => {
    const { status, dato } = dag;

    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

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
