import React, { createContext } from 'react';
import { MeldekortSteg } from '@common/typer/BrukersMeldekortUtfylling';
import { Meldekort, MeldekortDag } from '@common/typer/MeldekortBruker';

export type MeldekortUtfyllingState = {
    meldekortUtfylling: Meldekort | undefined;
    setMeldekortUtfylling: (meldekort: Meldekort) => void;
    valgtMeldekortDag: MeldekortDag | null;
    setValgtMeldekortDag: (dag: MeldekortDag | null) => void;
    lagreMeldekortDag: (dag: MeldekortDag) => void;
    meldekortSteg: MeldekortSteg;
    setMeldekortSteg: (steg: MeldekortSteg) => void;
    getUndertekster: () => { ukerTekst: React.ReactNode; datoerTekst: React.ReactNode };
    redirectHvisMeldekortErInnsendt: (
        meldekortFraBackend: Meldekort,
        meldekortFraKlient: Meldekort | undefined,
        nåværendeSteg: MeldekortSteg,
    ) => void;
    harHattFravær: boolean | null;
    setHarHattFravær: (harHattFravær: boolean | null) => void;
    harMottattLønn: boolean | null;
    setHarMottattLønn: (harMottattLønn: boolean | null) => void;
    visValideringsfeil: boolean | null;
    setVisValideringsfeil: (visValideringsfeil: boolean | null) => void;
};

export const MeldekortUtfyllingContext = createContext<MeldekortUtfyllingState>(
    {} as MeldekortUtfyllingState,
);
