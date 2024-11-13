import { format } from 'date-fns';
import { MeldekortDag } from '@typer/meldekort-utfylling';
import classNames from 'classnames';

import style from './Dag.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';

type Props = {
    dag: MeldekortDag;
    readonly?: boolean;
};

export const Dag = ({ dag, readonly }: Props) => {
    const { setValgtMeldekortDag } = useMeldekortUtfylling()

    const formattedDate = `${format(dag.dato, 'd')}.`;

    return (
        <td key={dag.dato} className={classNames(style.datoKontainer)}>
            <button
                className={classNames(style.dato)}
                onClick={() => {
                    setValgtMeldekortDag(dag)
                }}
                disabled={readonly}
            >
                {formattedDate}
            </button>
        </td>
    );
};
