import React from 'react';
import {
    BabyWrappedFillIcon,
    CheckmarkCircleFillIcon,
    FirstAidFillIcon,
    SunFillIcon,
    XMarkOctagonFillIcon,
    QuestionmarkDiamondIcon,
} from '@navikt/aksel-icons';
import { BodyLong } from '@navikt/ds-react';
import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { formatterDato } from '@utils/datetime';
import { Tekst } from '@components/tekst/Tekst';
import classNames from 'classnames';
import { getMeldekortDagStatusStyle } from '@components/fyll-ut/dag-felles/dagFellesUtils';

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
                <Tekst id={status || 'ikkeRegistrert'} />
            </BodyLong>
        </div>
    );
};

const getIkonKomponent = (status: MeldekortDagStatus | null) => {
    switch (status) {
        case MeldekortDagStatus.Deltatt:
            return CheckmarkCircleFillIcon;
        case MeldekortDagStatus.FraværSyk:
            return FirstAidFillIcon;
        case MeldekortDagStatus.FraværSyktBarn:
            return BabyWrappedFillIcon;
        case MeldekortDagStatus.FraværAnnet:
            return SunFillIcon;
        case MeldekortDagStatus.IkkeDeltatt:
            return XMarkOctagonFillIcon;
    }

    return QuestionmarkDiamondIcon;
};
