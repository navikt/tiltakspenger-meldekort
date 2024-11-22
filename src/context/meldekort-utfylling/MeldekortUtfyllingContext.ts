import { createContext } from 'react';
import { MeldekortDag, MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt';

export type MeldekortUtfyllingState = {
    meldekortUtfylling: MeldekortUtfylling | null;
    setMeldekortUtfylling: (meldekort: MeldekortUtfylling) => void;
    valgtMeldekortDag: MeldekortDag | null;
    setValgtMeldekortDag: (dag: MeldekortDag | null) => void;
    lagreMeldekortDag: (dag: MeldekortDag) => void;
    setMeldekortSteg: (steg: MeldekortSteg) => void;
};

export const MeldekortUtfyllingContext = createContext<MeldekortUtfyllingState>({
    meldekortUtfylling: null,
    setMeldekortUtfylling: () => {},
    valgtMeldekortDag: null,
    setValgtMeldekortDag: () => {},
    lagreMeldekortDag: () => {},
    setMeldekortSteg: () => {},
});
