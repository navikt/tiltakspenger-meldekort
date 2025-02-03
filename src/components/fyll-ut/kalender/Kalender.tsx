import { KalenderUke } from '@components/fyll-ut/kalender/uke/KalenderUke';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling.ts';

import style from './Kalender.module.css';

type Props = {
    meldekort: MeldekortUtfylling;
    steg: MeldekortSteg;
};

export const Kalender = ({ steg, meldekort }: Props) => {
    const forsteUke = meldekort.dager.slice(0, 7);
    const andreUke = meldekort.dager.slice(7, 14);

    return (
        <div className={style.kalender}>
            <KalenderUke dager={forsteUke} steg={steg} />
            <KalenderUke dager={andreUke} steg={steg} />
        </div>
    );
};
