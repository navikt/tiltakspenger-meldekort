import { MeldekortSteg, MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { useEffect } from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';

/**
 * Hook som redirecter om meldekortet er innsendt basert på meldekortet lastet inn fra SSR, hvis ikke får bruker fylle ut og riktig steg settes.
 */
export function useInitMeldekortSteg(meldekort: MeldekortUtfylling, steg: MeldekortSteg) {
    const {
        meldekortUtfylling,
        setMeldekortUtfylling,
        setMeldekortSteg,
        redirectHvisMeldekortErInnsendt,
    } = useMeldekortUtfylling();

    useEffect(() => {
        setMeldekortSteg(steg);
        const utfyllingPåbegynt = meldekort && meldekortUtfylling;
        if (utfyllingPåbegynt) {
            redirectHvisMeldekortErInnsendt(meldekort, meldekortUtfylling, steg);
        } else {
            setMeldekortUtfylling(meldekort);
        }
        // Skal bare kjøre en gang ved initial render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
