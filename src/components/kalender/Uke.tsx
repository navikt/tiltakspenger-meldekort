import styles from './Kalender.module.css';
import classNames from 'classnames';
import { format } from 'date-fns';
import { MeldekortDag } from '@/src/typer/meldekort';

type Props = {
    readonly?: boolean;
    rapporteringUke: MeldekortDag[];
};

export function Uke(props: Props) {
    const { rapporteringUke, readonly } = props;

    return (
        <tr className={styles.ukeRadKontainer}>
            {rapporteringUke.map((dag) => {
                return (
                    <td key={dag.dato} className={styles.datoKontainer}>
                        {readonly && (
                            <span
                                className={classNames(styles.dato, styles.readonly)}
                            >
                                {`${format(new Date(dag.dato), 'd')}. `}
                            </span>
                        )}

                        {!readonly && (
                            <button
                                className={classNames(styles.dato)}
                                onClick={() => console.log('Open modal')}
                            >
                                {`${format(new Date(dag.dato), 'd')}.`}
                            </button>
                        )}
                    </td>
                );
            })}
        </tr>
    );
}
