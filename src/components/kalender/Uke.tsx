import styles from './Kalender.module.css';
import { MeldekortDag } from '@typer/meldekort-utfylling';
import { Dag } from '@components/kalender/dag/Dag';

type Props = {
    meldekortUke: MeldekortDag[];
    readonly?: boolean;
};

export const Uke = ({ meldekortUke, readonly }: Props) => {
    return (
        <tr className={styles.ukeRadKontainer}>
            {meldekortUke.map((dag) => (
                <Dag dag={dag} readonly={readonly} key={dag.dato} />
            ))}
        </tr>
    );
};
