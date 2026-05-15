import { KalenderUke } from '@components/kalender/uke/KalenderUke';
import { MeldekortSteg } from '@meldekort/common/typer/BrukersMeldekortUtfylling';
import { classNames } from '@utils/classNames';
import { Meldekort } from '@meldekort/common/typer/MeldekortBruker';

import style from './Kalender.module.css';

type Props = {
    meldekort: Meldekort;
    steg: MeldekortSteg;
    kanFylleUtHelg: boolean;
    className?: string;
};

export const Kalender = ({ steg, meldekort, kanFylleUtHelg, className }: Props) => {
    const forsteUke = kanFylleUtHelg ? meldekort.dager.slice(0, 7) : meldekort.dager.slice(0, 5);
    const andreUke = kanFylleUtHelg ? meldekort.dager.slice(7, 14) : meldekort.dager.slice(7, 12);

    return (
        <div className={classNames(style.kalender, className)}>
            <KalenderUke dager={forsteUke} steg={steg} />
            <KalenderUke dager={andreUke} steg={steg} />
        </div>
    );
};
