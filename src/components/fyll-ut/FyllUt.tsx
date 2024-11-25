import { BodyLong, Heading } from '@navikt/ds-react';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { FraværModal } from '@components/fyll-ut/steg-2-fravær/fravær-modal/FraværModal';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider';
import { useEffect, useState } from 'react';
import { Steg1_Deltatt } from '@components/fyll-ut/steg-1-deltatt/Steg1_Deltatt';
import { getISOWeek } from 'date-fns';
import { formatterDato } from '@utils/datetime';
import { Steg2_Fravær } from '@components/fyll-ut/steg-2-fravær/Steg2_Fravær';
import { Steg3_Bekreft } from '@components/fyll-ut/steg-3-bekreft/Steg3_Bekreft';

type Props = {
    meldekort: MeldekortUtfylling;
};

export type MeldekortSteg = 'deltatt' | 'fravær' | 'bekreft';

export const FyllUt = ({ meldekort }: Props) => {
    // TODO: bruk next-router eller window.history for state slik at en kan bruke back/forward-navigering etc
    const [meldekortSteg, setMeldekortSteg] = useState<MeldekortSteg>('deltatt');

    const { fraOgMed, tilOgMed } = meldekort.periode;

    const ukerTekst = `Uke ${getISOWeek(fraOgMed)} - ${getISOWeek(tilOgMed)}`;

    const datoerTekst = `${formatterDato({ dato: fraOgMed, medUkeDag: false })} - ${formatterDato({
        dato: tilOgMed,
        medUkeDag: false,
    })}`;

    useEffect(() => {
        scrollTo(0, 0);
    }, [meldekortSteg]);

    return (
        <div>
            <Heading size={'medium'} level={'2'}>
                {ukerTekst}
            </Heading>
            <BodyLong weight={'semibold'} spacing={true}>
                {datoerTekst}
            </BodyLong>
            <MeldekortUtfyllingProvider
                meldekortUtfylling={meldekort}
                setMeldekortSteg={setMeldekortSteg}
            >
                {meldekortSteg === 'deltatt' && <Steg1_Deltatt />}
                {meldekortSteg === 'fravær' && <Steg2_Fravær />}
                {meldekortSteg === 'bekreft' && <Steg3_Bekreft />}
                <FraværModal />
            </MeldekortUtfyllingProvider>
        </div>
    );
};
