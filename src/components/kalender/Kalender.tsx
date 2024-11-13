import { Uke } from './Uke';
import classNames from 'classnames';
import { MeldekortDag, MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { formatterDato, Ukedager } from '@utils/datetime';
import { getISOWeek } from 'date-fns';

import style from './Kalender.module.css';

type Props = {
    meldekort: MeldekortUtfylling;
    setValgtDag: (dag: MeldekortDag) => void;
    readonly?: boolean;
};

export const Kalender = ({ meldekort, setValgtDag, readonly = false }: Props) => {
    const { fraOgMed, tilOgMed } = meldekort.periode;

    const forsteUke = meldekort.meldekortDager.slice(0, 7);
    const andreUke = meldekort.meldekortDager.slice(7, 14);

    const periodeUkenummerTekst = `Uke ${getISOWeek(new Date(fraOgMed))} - ${getISOWeek(new Date(tilOgMed))}`;
    const periodeFomTomDatoTekst = `${formatterDato(fraOgMed, true)} til ${formatterDato(tilOgMed)}`;

    return (
        <>
            <div className={style.headerKontainer}>
                <div>
                    <p className={style.header}>
                        {periodeUkenummerTekst}
                        <span className="tekst-subtil">{periodeFomTomDatoTekst}</span>
                    </p>
                </div>
            </div>
            <table
                className={style.kalender}
                role="grid"
                aria-disabled={!meldekort.kanSendes || readonly}
            >
                <thead aria-hidden>
                    <tr className={style.ukedagKontainer}>
                        {Ukedager.nb.map((ukedag, index) => {
                            return (
                                <th
                                    scope="col"
                                    key={`${meldekort.id}-${index}`}
                                    className={style.ukedag}
                                >
                                    <span>{ukedag.kort}</span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className={classNames(style.ukerKontainer)}>
                    <Uke meldekortUke={forsteUke} setValgtDag={setValgtDag} readonly={readonly} />
                    <Uke meldekortUke={andreUke} setValgtDag={setValgtDag} readonly={readonly} />
                </tbody>
            </table>
        </>
    );
};
