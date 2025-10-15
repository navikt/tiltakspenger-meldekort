import { KalenderUke } from '@components/kalender/uke/KalenderUke.tsx';
import { BrukersMeldekortUtfylling, MeldekortSteg } from '@common/typer/BrukersMeldekortUtfylling';
import { classNames } from '@utils/classNames.ts';

import style from './Kalender.module.css';

type Props = {
    meldekort: BrukersMeldekortUtfylling;
    steg: MeldekortSteg;
    kanFylleUtHelg: boolean;
    className?: string;
};

export const Kalender = ({ steg, meldekort, kanFylleUtHelg, className }: Props) => {
    console.log('Kalender render', kanFylleUtHelg);

    const forsteUke = kanFylleUtHelg ? meldekort.dager.slice(0, 7) : meldekort.dager.slice(0, 5);
    const andreUke = kanFylleUtHelg ? meldekort.dager.slice(7, 14) : meldekort.dager.slice(7, 12);

    return (
        <div className={classNames(style.kalender, className)}>
            <KalenderUke dager={forsteUke} steg={steg} />
            <KalenderUke dager={andreUke} steg={steg} />
        </div>
    );
};
