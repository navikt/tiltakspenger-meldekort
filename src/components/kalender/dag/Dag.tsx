import { format } from 'date-fns';
import { MeldekortDag } from '@typer/meldekort-utfylling';
import classNames from 'classnames';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { FirstAidFillIcon } from '@navikt/aksel-icons';

import style from './Dag.module.css';

const getStatusStyle = (dag: MeldekortDag) => {
    const { deltattValg, underValg } = dag.status;

    if (deltattValg === 'deltatt') {
        return underValg === 'DELTATT_UTEN_LØNN' ? style.deltatt : style.deltattMedLønn;
    }

    if (deltattValg === 'ikkeDeltatt') {
        return underValg === 'IKKE_DELTATT' ? style.ikkeDeltatt : style.fravær;
    }

    return style.ikkeValgt;
};

type Props = {
    dag: MeldekortDag;
    readonly?: boolean;
};

export const Dag = ({ dag, readonly }: Props) => {
    const { setValgtMeldekortDag } = useMeldekortUtfylling();

    const formattedDate = `${format(dag.dato, 'd')}.`;

    return (
        <td key={dag.dato} className={classNames(style.datoKontainer)}>
            <button
                className={classNames(style.dato, getStatusStyle(dag))}
                onClick={() => {
                    setValgtMeldekortDag(dag);
                }}
                disabled={readonly}
            >
                {formattedDate}
                {dag.status.deltattValg === 'ikkeDeltatt' &&
                    dag.status.underValg !== 'IKKE_DELTATT' && <FirstAidFillIcon className={style.ikon} />}
            </button>
        </td>
    );
};
