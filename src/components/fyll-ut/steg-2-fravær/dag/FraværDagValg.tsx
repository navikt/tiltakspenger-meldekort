import React from 'react';
import { FraværStatus, MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import { BodyLong, Button } from '@navikt/ds-react';
import classNames from 'classnames';
import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';

import style from './FraværDagValg.module.css';
import { Tekst } from '@components/tekst/Tekst';

type Props = {
    dag: MeldekortDag;
};

export const FraværDagValg = ({ dag }: Props) => {
    const { setValgtMeldekortDag } = useMeldekortUtfylling();

    const { dato, status } = dag;

    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

    const harDeltatt = status === MeldekortDagStatus.Deltatt;

    return harDeltatt ? (
        <div className={style.deltatt}>
            <CheckmarkCircleFillIcon className={style.ikon} />
            <BodyLong>{`${datoTekst}: `}</BodyLong>
            <BodyLong weight={'semibold'}>{'Deltatt'}</BodyLong>
        </div>
    ) : (
        <div className={classNames(style.fravær, status && statusTilStyle[status])}>
            <BodyLong>{datoTekst}</BodyLong>
            <div className={style.fraværRad}>
                <BodyLong weight={'semibold'}>
                    <Tekst id={status || 'ikkeRegistrert'} />
                </BodyLong>
                <Button
                    size={'small'}
                    variant={'secondary'}
                    onClick={() => {
                        setValgtMeldekortDag(dag);
                    }}
                    className={style.registrerKnapp}
                >
                    {'Registrer fravær'}
                </Button>
            </div>
        </div>
    );
};

const statusTilStyle: Record<FraværStatus, string> = {
    [MeldekortDagStatus.FraværSyk]: style.syk,
    [MeldekortDagStatus.FraværSyktBarn]: style.syktBarn,
    [MeldekortDagStatus.FraværAnnet]: style.annet,
    [MeldekortDagStatus.IkkeDeltatt]: style.ikkeDeltatt,
};
