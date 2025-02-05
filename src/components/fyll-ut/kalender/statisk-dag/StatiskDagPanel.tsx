import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { MeldekortDag } from '@typer/meldekort-utfylling.ts';
import { formatterDato } from '@utils/datetime';
import {
    statusTilIkon,
    meldekortStatusTilStyle,
    statusTilTekstId,
} from '@components/fyll-ut/dag-felles/dagFellesUtils';
import { classNames } from '@utils/classNames.ts';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';
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
            <IkonKomponent className={style.ikon} />
            <BodyLong>{`${datoTekst}: `}</BodyLong>
            <TekstParagrafer
                id={harRett ? statusTilTekstId[status] : 'ikkeRett'}
                weight={'semibold'}
            />
        </div>
    );
};
