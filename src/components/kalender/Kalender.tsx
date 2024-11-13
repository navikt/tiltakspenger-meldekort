import { Uke } from './Uke';
import classNames from 'classnames';
import { formatterDato, Ukedager } from '@utils/datetime';
import { getISOWeek } from 'date-fns';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';

import style from './Kalender.module.css';

type Props = {
    readonly?: boolean;
};

export const Kalender = ({ readonly = false }: Props) => {
    const { meldekortUtfylling } = useMeldekortUtfylling();

    if (!meldekortUtfylling) {
        console.error('Oh noes, fant ingen meldekort!');
        return null;
    }

    const { fraOgMed, tilOgMed } = meldekortUtfylling.periode;

    const forsteUke = meldekortUtfylling.meldekortDager.slice(0, 7);
    const andreUke = meldekortUtfylling.meldekortDager.slice(7, 14);

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
                aria-disabled={!meldekortUtfylling.kanSendes || readonly}
            >
                <thead aria-hidden>
                    <tr className={style.ukedagKontainer}>
                        {Ukedager.nb.map((ukedag) => {
                            return (
                                <th
                                    scope="col"
                                    key={ukedag.kort}
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
};
