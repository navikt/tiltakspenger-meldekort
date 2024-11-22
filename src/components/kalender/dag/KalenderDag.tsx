import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { Checkbox } from '@navikt/ds-react';
import classNames from 'classnames';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';

import style from './KalenderDag.module.css';

type Props = {
    dag: MeldekortDag;
};

export const KalenderDag = ({ dag }: Props) => {
    const { lagreMeldekortDag } = useMeldekortUtfylling();

    const erValgt = dag.status === MeldekortDagStatus.Deltatt;

    return (
        <li key={dag.dato}>
            <Checkbox
                onChange={(e) => {
                    lagreMeldekortDag({
                        ...dag,
                        status: e.target.checked ? MeldekortDagStatus.Deltatt : null,
                    });
                }}
                checked={erValgt}
                className={classNames(style.dag, erValgt && style.valgt)}
            >
                {formatterDato(dag.dato, true)}
            </Checkbox>
        </li>
    );
};
