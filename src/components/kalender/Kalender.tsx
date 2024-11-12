import { Uke } from './Uke';
import classNames from 'classnames';
import { MeldekortData } from '@/src/typer/meldekort';
import { Ukedager } from '@/src/utils/ukedager';
import { getISOWeek } from 'date-fns';

import style from './Kalender.module.css';

type Props = {
    periode: MeldekortData;
    readonly?: boolean;
};

export function Kalender(props: Props) {
    const { periode, readonly = false } = props;

    const { fraOgMed, tilOgMed } = periode.periode;

    const forsteUke = periode.meldekortDager.slice(0, 7);
    const andreUke = periode.meldekortDager.slice(7, 14);

    const periodeUkenummerTekst = `Uke ${getISOWeek(new Date(fraOgMed))} - ${getISOWeek(new Date(tilOgMed))}`;
    const periodeFomTomDatoTekst = `${fraOgMed} - ${tilOgMed}`;

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
                aria-disabled={!periode.kanSendes || readonly}
            >
                <thead aria-hidden>
                    <tr className={style.ukedagKontainer}>
                        {Ukedager.nb.map((ukedag, index) => {
                            return (
                                <th
                                    scope="col"
                                    key={`${periode.id}-${index}`}
                                    className={style.ukedag}
                                >
                                    <span>{ukedag.kort}</span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className={classNames(style.ukerKontainer)}>
                    <Uke meldekortUke={forsteUke} readonly={readonly} />
                    <Uke meldekortUke={andreUke} readonly={readonly} />
                </tbody>
            </table>
        </>
    );
}
