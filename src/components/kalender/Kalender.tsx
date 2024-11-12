import { EndringsLenke } from './Endringslenke';
import { Uke } from './Uke';
import classNames from 'classnames';
import { MeldekortData } from '@/src/typer/meldekort';

import style from './Kalender.module.css';

const ukedager = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag']

type Props = {
    periode: MeldekortData;
    visEndringslenke?: boolean;
    readonly?: boolean;
}

export function Kalender(props: Props) {
    const { periode, readonly = false, visEndringslenke = false } = props;

    const { fraOgMed, tilOgMed } = periode.periode;

    const forsteUke = [...periode.meldekortDager].splice(0, 7);
    const andreUke = [...periode.meldekortDager].splice(7, 7);

    const periodeUkenummerTekst = `Uke n - n+1`;

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
                {visEndringslenke && <EndringsLenke id={periode.id} status={periode.status} />}
            </div>
            <table
                className={style.kalender}
                role="grid"
                aria-disabled={!periode.kanSendes || readonly}
            >
                <thead aria-hidden>
                    <tr className={style.ukedagKontainer}>
                        {ukedager.map((ukedag, index) => {
                            return (
                                <th
                                    scope="col"
                                    key={`${periode.id}-${index}`}
                                    className={style.ukedag}
                                >
                                    <span>{ukedag}</span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className={classNames(style.ukerKontainer)}>
                    <Uke
                        rapporteringUke={forsteUke}
                        readonly={readonly}
                    />
                    <Uke
                        rapporteringUke={andreUke}
                        readonly={readonly}
                    />
                </tbody>
            </table>
        </>
    );
}
