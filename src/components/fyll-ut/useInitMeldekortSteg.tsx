import { MeldekortSteg } from '@common/typer/BrukersMeldekortUtfylling';
import { useEffect } from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { Meldekort } from '@common/typer/MeldekortBruker';

/**
 * Hook som redirecter om meldekortet er innsendt basert på meldekortet lastet inn fra SSR, hvis ikke får bruker fylle ut og riktig steg settes.
 */
export function useInitMeldekortSteg(brukersMeldekort: Meldekort, steg: MeldekortSteg) {
    const {
        meldekortUtfylling,
        setMeldekortUtfylling,
        setMeldekortSteg,
        redirectHvisMeldekortErInnsendt,
    } = useMeldekortUtfylling();

    useEffect(() => {
        setMeldekortSteg(steg);
        const utfyllingPåbegynt = brukersMeldekort && meldekortUtfylling;
        if (utfyllingPåbegynt) {
            redirectHvisMeldekortErInnsendt(brukersMeldekort, meldekortUtfylling, steg);
        } else {
            setMeldekortUtfylling(brukersMeldekort);
        }
        // Skal bare kjøre en gang ved initial render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
