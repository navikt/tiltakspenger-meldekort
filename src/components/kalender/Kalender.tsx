import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { KalenderUke } from '@components/kalender/uke/KalenderUke';

export const Kalender = () => {
    const { meldekortUtfylling } = useMeldekortUtfylling();

    if (!meldekortUtfylling) {
        console.error('Oh noes, fant ingen meldekort!');
        return null;
    }

    const forsteUke = meldekortUtfylling.meldekortDager.slice(0, 7);
    const andreUke = meldekortUtfylling.meldekortDager.slice(7, 14);

    return (
        <div>
            <KalenderUke dager={forsteUke} />
            <KalenderUke dager={andreUke} />
        </div>
    );
};
