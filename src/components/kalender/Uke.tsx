import styles from './Kalender.module.css';
import classNames from 'classnames';
import { format } from 'date-fns';
import { MeldekortDag } from '@/src/typer/meldekort';

type Props = {
    readonly?: boolean;
    meldekortUke: MeldekortDag[];
};

export function Uke(props: Props) {
    const { meldekortUke, readonly } = props;

    return (
        <tr className={styles.ukeRadKontainer}>
            {meldekortUke.map((dag) => {
                const formattedDate = `${format(new Date(dag.dato), 'd')}.`;

                return (
                    <td key={dag.dato} className={styles.datoKontainer}>
                        {readonly ? (
                            <span className={classNames(styles.dato, styles.readonly)}>
                                {formattedDate}
                            </span>
                        ) : (
                            <button
                                className={classNames(styles.dato)}
                                onClick={() => console.log('Open modal')}
                            >
                                {formattedDate}
                            </button>
                        )}
                    </td>
                );
            })}
        </tr>
    );
}
