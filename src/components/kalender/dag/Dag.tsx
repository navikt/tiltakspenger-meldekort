import { format } from 'date-fns';
import { MeldekortDag } from '@/src/typer/meldekort-utfylling';
import { useState } from 'react';
import classNames from 'classnames';

import style from './Dag.module.css';

type Props = {
    dag: MeldekortDag;
    setValgtDag: (dag: MeldekortDag) => void;
    readonly?: boolean;
};

export const Dag = ({ dag, setValgtDag, readonly }: Props) => {
    const [isSelected, setIsSelected] = useState(false);

    const formattedDate = `${format(new Date(dag.dato), 'd')}.`;

    return (
        <td key={dag.dato} className={classNames(style.datoKontainer)}>
            <button
                className={classNames(style.dato, isSelected && style.selected)}
                onClick={() => {
                    // setIsSelected(!isSelected);
                    setValgtDag(dag)
                }}
                disabled={readonly}
            >
                {formattedDate}
            </button>
        </td>
    );
};
