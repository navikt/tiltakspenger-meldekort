import { createContext } from 'react';
import { MeldekortDag, MeldekortUtfylling } from '@typer/meldekort-utfylling';

export type MeldekortUtfyllingState = {
    meldekortUtfylling: MeldekortUtfylling | null;
    setMeldekortUtfylling: (_: MeldekortUtfylling) => void;
    valgtMeldekortDag: MeldekortDag | null;
    setValgtMeldekortDag: (_: MeldekortDag | null) => void;
    lagreMeldekortDag: (dag: MeldekortDag) => void;
};

export const MeldekortUtfyllingContext = createContext<MeldekortUtfyllingState>({
    meldekortUtfylling: null,
    setMeldekortUtfylling: () => {},
    valgtMeldekortDag: null,
    setValgtMeldekortDag: () => {},
    lagreMeldekortDag: () => {},
});
