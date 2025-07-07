import React, { createContext } from 'react';
import {
    MeldekortDag,
    MeldekortSteg,
    MeldekortUtfylling,
} from '@common/typer/meldekort-utfylling.ts';

export type MeldekortUtfyllingState = {
    meldekortUtfylling: MeldekortUtfylling | undefined;
    setMeldekortUtfylling: (meldekort: MeldekortUtfylling) => void;
    valgtMeldekortDag: MeldekortDag | null;
    setValgtMeldekortDag: (dag: MeldekortDag | null) => void;
    lagreMeldekortDag: (dag: MeldekortDag) => void;
    meldekortSteg: MeldekortSteg;
    setMeldekortSteg: (steg: MeldekortSteg) => void;
    getUndertekster: () => { ukerTekst: React.ReactNode; datoerTekst: React.ReactNode };
    redirectHvisMeldekortErInnsendt: (
        meldekortFraBackend: MeldekortUtfylling,
        meldekortFraKlient: MeldekortUtfylling | undefined,
        nåværendeSteg: MeldekortSteg
    ) => void;
    harHattFravær: boolean | null;
    setHarHattFravær: (harHattFravær: boolean | null) => void;
    harMottattLønn: boolean | null;
    setHarMottattLønn: (harMottattLønn: boolean | null) => void;
    visValideringsfeil: boolean | null;
    setVisValideringsfeil: (visValideringsfeil: boolean | null) => void;
};

export const MeldekortUtfyllingContext = createContext<MeldekortUtfyllingState>(
    {} as MeldekortUtfyllingState
);
