import { BodyLong, Radio } from '@navikt/ds-react';
import classNames from 'classnames';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { Tekst, TekstId } from '@components/tekst/Tekst';
import {
    meldekortStatusTilStyle,
    statusTilTekstId,
} from '@components/fyll-ut/dag-felles/dagFellesUtils';

import style from './FraværStatusPanel.module.css';

type Props = {
    status: MeldekortDagStatus;
    valgtStatus: MeldekortDagStatus | null;
    ingressId: TekstId;
};

export const FraværStatusPanel = ({ status, ingressId, valgtStatus }: Props) => {
    const erValgt = status === valgtStatus;

    return (
        <Radio
            value={status}
            className={classNames(style.valg, meldekortStatusTilStyle[status])}
        >
            <BodyLong weight={'semibold'}>
                <Tekst id={statusTilTekstId[status]} />
            </BodyLong>
            {erValgt && (
                <BodyLong className={style.ingress}>
                    <Tekst id={ingressId} />
                </BodyLong>
            )}
        </Radio>
    );
};
