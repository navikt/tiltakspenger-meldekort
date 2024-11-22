import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { Checkbox } from '@navikt/ds-react';
import classNames from 'classnames';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';

import style from './DeltattDagValg.module.css';

type Props = {
    dag: MeldekortDag;
};

export const DeltattDagValg = ({ dag }: Props) => {
    const { lagreMeldekortDag } = useMeldekortUtfylling();

    const erValgt = dag.status === MeldekortDagStatus.Deltatt;

    return (
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
            {formatterDato({ dato: dag.dato, medUkeDag: true })}
        </Checkbox>
    );
};
