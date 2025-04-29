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
    setMeldekortSteg: ((steg: MeldekortSteg) => void) | undefined;
    forrigeSteg: MeldekortSteg | undefined;
    setForrigeSteg: ((steg: MeldekortSteg) => void) | undefined;
    getUndertekster: () => { ukerTekst: React.ReactNode; datoerTekst: React.ReactNode };
};

export const MeldekortUtfyllingContext = createContext<MeldekortUtfyllingState>(
    {} as MeldekortUtfyllingState
);
