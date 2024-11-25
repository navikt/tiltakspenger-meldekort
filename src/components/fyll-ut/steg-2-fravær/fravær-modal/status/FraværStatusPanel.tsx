import { BodyLong, Radio } from '@navikt/ds-react';
import classNames from 'classnames';
import { FraværStatus } from '@typer/meldekort-utfylling';
import { Tekst, TekstId } from '@components/tekst/Tekst';
import { getMeldekortDagStatusStyle, getStatusTekstId } from '@components/fyll-ut/dag-felles/dagFellesUtils';

import style from './FraværStatusPanel.module.css';

type Props = {
    status: FraværStatus;
    ingressId: TekstId;
};

export const FraværStatusPanel = ({ status, ingressId }: Props) => {
    return (
        <Radio
            value={status}
            className={classNames(style.valg, getMeldekortDagStatusStyle(status))}
        >
            <BodyLong weight={'semibold'}>
                <Tekst id={getStatusTekstId(status)} />
            </BodyLong>
            <BodyLong>
                <Tekst id={ingressId} />
            </BodyLong>
        </Radio>
    );
};
