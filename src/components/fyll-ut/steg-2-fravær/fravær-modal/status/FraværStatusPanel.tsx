import { Radio } from '@navikt/ds-react';
import classNames from 'classnames';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling';
import {
    meldekortStatusTilStyle,
    statusTilTekstId,
} from '@components/fyll-ut/dag-felles/dagFellesUtils';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';
import { TekstId } from '@tekster/utils';

import style from './FraværStatusPanel.module.css';

type Props = {
    status: MeldekortDagStatus;
    valgtStatus: MeldekortDagStatus | null;
    ingressId: TekstId;
};

export const FraværStatusPanel = ({ status, ingressId, valgtStatus }: Props) => {
    const erValgt = status === valgtStatus;

    return (
        <Radio value={status} className={classNames(style.valg, meldekortStatusTilStyle[status])}>
            <TekstParagrafer id={statusTilTekstId[status]} weight={'semibold'} />
            {erValgt && <TekstParagrafer id={ingressId} className={style.ingress} />}
        </Radio>
    );
};
