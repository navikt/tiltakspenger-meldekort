import styles from './KalenderOld.module.css';
import { MeldekortDag } from '@typer/meldekort-utfylling';
import { KalenderDagOld } from '@components/kalender/dag/KalenderDagOld';

type Props = {
    meldekortUke: MeldekortDag[];
    readonly?: boolean;
};

export const KalenderUkeOld = ({ meldekortUke, readonly }: Props) => {
    return (
        <tr className={styles.ukeRadKontainer}>
            {meldekortUke.map((dag) => (
                <KalenderDagOld dag={dag} readonly={readonly} key={dag.dato} />
            ))}
        </tr>
    );
};
