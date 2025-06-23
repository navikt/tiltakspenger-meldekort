import { MeldekortDag, MeldekortDagStatus } from '@common/typer/meldekort-utfylling.ts';
import { Checkbox } from '@navikt/ds-react';
import { classNames } from '@utils/classNames.ts';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import { Tekst } from '@components/tekst/Tekst';

import style from './DeltattDagPanel.module.css';

type Props = {
    dag: MeldekortDag;
};

export const DeltattDagPanel = ({ dag }: Props) => {
    const { lagreMeldekortDag } = useMeldekortUtfylling();

    const erValgt = dag.status === MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET;

    return (
        <Checkbox
            onChange={(e) => {
                lagreMeldekortDag({
                    ...dag,
                    status: e.target.checked
                        ? MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET
                        : MeldekortDagStatus.IKKE_BESVART,
                });
            }}
            checked={erValgt}
            className={classNames(style.dag, erValgt && style.valgt)}
        >
            <Tekst id={'deltattDagPrefix'} />
            {formatterDato({ dato: dag.dato, medUkeDag: true })}
        </Checkbox>
    );
};
