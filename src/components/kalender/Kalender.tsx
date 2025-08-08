import { KalenderUke } from '@components/kalender/uke/KalenderUke.tsx';
import { BrukersMeldekortUtfylling, MeldekortSteg } from '@common/typer/BrukersMeldekortUtfylling';
import { classNames } from '@utils/classNames.ts';

import style from './Kalender.module.css';

type Props = {
    meldekort: BrukersMeldekortUtfylling;
    steg: MeldekortSteg;
    className?: string;
};

export const Kalender = ({ steg, meldekort, className }: Props) => {
    const forsteUke = meldekort.dager.slice(0, 7);
    const andreUke = meldekort.dager.slice(7, 14);

    return (
        <div className={classNames(style.kalender, className)}>
            <KalenderUke dager={forsteUke} steg={steg} />
            <KalenderUke dager={andreUke} steg={steg} />
        </div>
    );
};
