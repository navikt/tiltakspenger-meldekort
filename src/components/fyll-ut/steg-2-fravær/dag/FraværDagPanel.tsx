import React from 'react';
import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import { BodyLong, Button } from '@navikt/ds-react';
import classNames from 'classnames';
import { Tekst } from '@components/tekst/Tekst';
import { StatiskDagPanel } from '@components/fyll-ut/kalender/statisk-dag/StatiskDagPanel';
import {
    meldekortStatusTilStyle,
    statusTilTekstId,
} from '@components/fyll-ut/dag-felles/dagFellesUtils';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';

import style from './FraværDagPanel.module.css';

type Props = {
    dag: MeldekortDag;
};

export const FraværDagPanel = ({ dag }: Props) => {
    const { setValgtMeldekortDag } = useMeldekortUtfylling();

    const { dato, status } = dag;

    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

    const harDeltatt = status === MeldekortDagStatus.Deltatt;

    return harDeltatt ? (
        <StatiskDagPanel dag={dag} />
    ) : (
        <div className={classNames(style.fravær, meldekortStatusTilStyle[status])}>
            <BodyLong>{datoTekst}</BodyLong>
            <div className={style.fraværRad}>
                <TekstParagrafer id={statusTilTekstId[status]} weight={'semibold'} />
                <Button
                    size={'small'}
                    variant={'secondary'}
                    onClick={() => {
                        setValgtMeldekortDag(dag);
                    }}
                    className={style.registrerKnapp}
                >
                    <Tekst id={status ? 'fraværPanelEndre' : 'fraværPanelRegistrer'} />
                </Button>
            </div>
        </div>
    );
};
