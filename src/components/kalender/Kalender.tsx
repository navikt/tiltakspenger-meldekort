import { KalenderUke } from '@components/kalender/uke/KalenderUke.tsx';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt.tsx';
import { MeldekortUtfylling } from '../../../commonSrc/typer/meldekort-utfylling.ts';
import { classNames } from '@utils/classNames.ts';

import style from './Kalender.module.css';

type Props = {
    meldekort: MeldekortUtfylling;
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
