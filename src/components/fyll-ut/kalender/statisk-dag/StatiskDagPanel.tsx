import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { MeldekortDag } from '@typer/meldekort-utfylling';
import { formatterDato } from '@utils/datetime';
import { Tekst } from '@components/tekst/Tekst';
import classNames from 'classnames';
import {
    getIkonKomponent,
    getMeldekortDagStatusStyle, getStatusTekstId,
} from '@components/fyll-ut/dag-felles/dagFellesUtils';

import style from './StatiskDagPanel.module.css';

type Props = {
    dag: MeldekortDag;
};

export const StatiskDagPanel = ({ dag }: Props) => {
    const { status, dato } = dag;

    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

    const IkonKomponent = getIkonKomponent(status);

    return (
        <div className={classNames(style.statiskDag, getMeldekortDagStatusStyle(status))}>
            {IkonKomponent && <IkonKomponent className={style.ikon} />}
            <BodyLong>{`${datoTekst}: `}</BodyLong>
            <BodyLong weight={'semibold'}>
                <Tekst id={getStatusTekstId(status)} />
            </BodyLong>
        </div>
    );
};
