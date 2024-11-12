import styles from './Kalender.module.css';
import classNames from 'classnames';
import { format } from 'date-fns';
import { AktivitetType, RapporteringsperiodeDag } from '@/src/typer/rapporteringsperiode';

interface IProps {
    readonly?: boolean;
    rapporteringUke: RapporteringsperiodeDag[];
}

const erAktivStil = (dag: RapporteringsperiodeDag, typer: AktivitetType[]) => {
    const dagenHarAktivitet = dag.aktiviteter.length > 0;

    if (!dagenHarAktivitet) return false;

    const alleTyperErTilstede = typer.map((type) =>
        dag.aktiviteter.some((aktivitet) => aktivitet.type === type)
    );

    return alleTyperErTilstede.every((type) => type === true);
};

export function Uke(props: IProps) {
    const { rapporteringUke, readonly } = props;

    return (
        <tr className={styles.ukeRadKontainer}>
            {rapporteringUke.map((dag) => {
                const dagenHarAktivitet = dag.aktiviteter.length > 0;

                const dagKnappStyle = {
                    [styles.arbeid]: erAktivStil(dag, [AktivitetType.Arbeid]),
                    [styles.sykdom]: erAktivStil(dag, [AktivitetType.Syk]),
                    [styles.fravaer]: erAktivStil(dag, [AktivitetType.Fravaer]),
                    [styles.utdanning]: erAktivStil(dag, [AktivitetType.Utdanning]),
                    [styles.arbeidOgUtdanning]: erAktivStil(dag, [
                        AktivitetType.Arbeid,
                        AktivitetType.Utdanning,
                    ]),
                    [styles.sykOgUtdanning]: erAktivStil(dag, [
                        AktivitetType.Syk,
                        AktivitetType.Utdanning,
                    ]),
                    [styles.fravaerOgUtdanning]: erAktivStil(dag, [
                        AktivitetType.Fravaer,
                        AktivitetType.Utdanning,
                    ]),
                    [styles.sykOgFravaer]: erAktivStil(dag, [
                        AktivitetType.Syk,
                        AktivitetType.Fravaer,
                    ]),
                    [styles.sykFravaerOgUtdanning]: erAktivStil(dag, [
                        AktivitetType.Syk,
                        AktivitetType.Fravaer,
                        AktivitetType.Utdanning,
                    ]),
                };

                return (
                    <td key={dag.dato} className={styles.datoKontainer}>
                        {readonly && (
                            <span
                                className={classNames(styles.dato, dagKnappStyle, styles.readonly)}
                            >
                                {`${format(new Date(dag.dato), 'd')}. `}
                            </span>
                        )}

                        {!readonly && (
                            <button
                                className={classNames(styles.dato, dagKnappStyle)}
                                onClick={() => console.log('Open modal')}
                            >
                                {`${format(new Date(dag.dato), 'd')}.`}
                            </button>
                        )}

                        {dagenHarAktivitet && erAktivStil(dag, [AktivitetType.Arbeid]) && (
                            <div className={classNames(styles.datoMedAktivitet)} aria-hidden>
                                {dag.dato}
                            </div>
                        )}
                    </td>
                );
            })}
        </tr>
    );
}
