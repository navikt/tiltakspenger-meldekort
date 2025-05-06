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
    forrigeSteg: MeldekortSteg | null;
    setForrigeSteg: (steg: MeldekortSteg) => void;
    nesteSteg: MeldekortSteg | null;
    setNesteSteg: (steg: MeldekortSteg) => void;
    getUndertekster: () => { ukerTekst: React.ReactNode; datoerTekst: React.ReactNode };
    redirectHvisFeilSteg: (nåværendeSteg: MeldekortSteg) => void;
    redirectHvisMeldekortErInnsendt: (
        meldekortFraBackend: MeldekortUtfylling,
        meldekortFraKlient: MeldekortUtfylling | undefined,
        nåværendeSteg: MeldekortSteg
    ) => void;
    nullstillState: () => void;
};

export const MeldekortUtfyllingContext = createContext<MeldekortUtfyllingState>(
    {} as MeldekortUtfyllingState
);
