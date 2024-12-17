import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { MeldekortDag } from '@typer/meldekort-utfylling';
import { formatterDato } from '@utils/datetime';
import classNames from 'classnames';
import {
    statusTilIkon,
    meldekortStatusTilStyle,
    statusTilTekstId,
} from '@components/fyll-ut/dag-felles/dagFellesUtils';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';

import style from './StatiskDagPanel.module.css';

type Props = {
    dag: MeldekortDag;
};

export const StatiskDagPanel = ({ dag }: Props) => {
    const { status, dato } = dag;

    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

    const IkonKomponent = statusTilIkon[status];

    return (
        <div className={classNames(style.statiskDag, meldekortStatusTilStyle[status])}>
            {IkonKomponent && <IkonKomponent className={style.ikon} />}
            <BodyLong>{`${datoTekst}: `}</BodyLong>
            <TekstParagrafer id={statusTilTekstId[status]} weight={'semibold'} />
        </div>
    );
};
