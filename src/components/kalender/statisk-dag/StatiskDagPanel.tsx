import { BodyLong } from '@navikt/ds-react';

import { formatterDato } from '@utils/datetime.ts';
import {
    meldekortStatusTilStyle,
    statusTilIkon,
    statusTilTekstId,
} from '@components/kalender/dag-felles/dagFellesUtils.ts';
import { classNames } from '@utils/classNames.ts';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';

import style from './StatiskDagPanel.module.css';
import { MeldekortDag } from '@common/typer/MeldekortBruker';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

type Props = {
    dag: MeldekortDag;
};

export const MeldekortdagOppsummering = ({ dag }: Props) => {
    const { status, dag: dato } = dag;
    const { valgtSpråk } = useValgtSpråk();

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
