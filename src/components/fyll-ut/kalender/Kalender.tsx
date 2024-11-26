import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { KalenderUke } from '@components/fyll-ut/kalender/uke/KalenderUke';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt';

import style from './Kalender.module.css'

type Props = {
    steg: MeldekortSteg;
};

export const Kalender = ({ steg }: Props) => {
    const { meldekortUtfylling } = useMeldekortUtfylling();

    if (!meldekortUtfylling) {
        console.error('Oh no, fant ingen meldekort!');
        return null;
    }

    const forsteUke = meldekortUtfylling.meldekortDager.slice(0, 7);
    const andreUke = meldekortUtfylling.meldekortDager.slice(7, 14);

    return (
        <div className={style.kalender}>
            <KalenderUke dager={forsteUke} steg={steg} />
            <KalenderUke dager={andreUke} steg={steg} />
        </div>
    );
};
