import styles from './Kalender.module.css';
import { MeldekortDag } from '@typer/meldekort-utfylling';
import { KalenderDag } from '@components/kalender/dag/KalenderDag';

type Props = {
    meldekortUke: MeldekortDag[];
    readonly?: boolean;
};

export const KalenderUke = ({ meldekortUke, readonly }: Props) => {
    return (
        <tr className={styles.ukeRadKontainer}>
            {meldekortUke.map((dag) => (
                <KalenderDag dag={dag} readonly={readonly} key={dag.dato} />
            ))}
        </tr>
    );
};
