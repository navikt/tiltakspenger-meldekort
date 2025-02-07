import { Radio } from '@navikt/ds-react';
import { classNames } from '@utils/classNames.ts';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling.ts';
import {
    meldekortStatusTilStyle,
    statusTilTekstId,
} from '@components/kalender/dag-felles/dagFellesUtils';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { TekstId } from '@tekster/typer.ts';

import style from './FraværStatusPanel.module.css';

type Props = {
    status: MeldekortDagStatus;
    valgtStatus: MeldekortDagStatus | null;
    ingressId: TekstId;
};

export const FraværStatusPanel = ({ status, ingressId, valgtStatus }: Props) => {
    const erValgt = status === valgtStatus;

    return (
        <Radio value={status} className={classNames(style.valg)}>
            <TekstSegmenter id={statusTilTekstId[status]} weight={'semibold'} />
            <TekstSegmenter id={ingressId} className={style.ingress} />
        </Radio>
    );
};
