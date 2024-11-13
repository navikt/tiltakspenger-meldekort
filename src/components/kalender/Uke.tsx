import styles from './Kalender.module.css';
import { MeldekortDag } from '@typer/meldekort-utfylling';
import { Dag } from '@components/kalender/dag/Dag';

type Props = {
    meldekortUke: MeldekortDag[];
    setValgtDag: (dag: MeldekortDag) => void;
    readonly?: boolean;
};

export const Uke = ({ meldekortUke, setValgtDag, readonly }: Props) => {

    return (
        <tr className={styles.ukeRadKontainer}>
            {meldekortUke.map((dag) => (
                <Dag dag={dag} setValgtDag={setValgtDag} readonly={readonly} key={dag.dato} />
            ))}
        </tr>
    );
};
