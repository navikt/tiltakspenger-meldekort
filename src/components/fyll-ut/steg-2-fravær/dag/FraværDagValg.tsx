import React from 'react';
import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import { BodyLong, Button } from '@navikt/ds-react';
import classNames from 'classnames';
import { Tekst } from '@components/tekst/Tekst';
import { StatiskDag } from '@components/fyll-ut/dag-felles/StatiskDag';
import { meldekortStatusTilStyle } from '@components/fyll-ut/dag-felles/dagFellesUtils';

import style from './FraværDagValg.module.css';

type Props = {
    dag: MeldekortDag;
};

export const FraværDagValg = ({ dag }: Props) => {
    const { setValgtMeldekortDag } = useMeldekortUtfylling();

    const { dato, status } = dag;

    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

    const harDeltatt = status === MeldekortDagStatus.Deltatt;

    return harDeltatt ? (
        <StatiskDag dag={dag} />
    ) : (
        <div className={classNames(style.fravær, status && meldekortStatusTilStyle[status])}>
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
