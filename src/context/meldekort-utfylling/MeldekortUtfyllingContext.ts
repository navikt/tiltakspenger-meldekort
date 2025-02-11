import { createContext } from 'react';
import { MeldekortDag, MeldekortUtfylling } from '../../../commonSrc/typer/meldekort-utfylling.ts';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt';

export type MeldekortUtfyllingState = {
    meldekortUtfylling: MeldekortUtfylling;
    setMeldekortUtfylling: (meldekort: MeldekortUtfylling) => void;
    valgtMeldekortDag: MeldekortDag | null;
    setValgtMeldekortDag: (dag: MeldekortDag | null) => void;
    lagreMeldekortDag: (dag: MeldekortDag) => void;
    setMeldekortSteg: (steg: MeldekortSteg) => void;
};

export const MeldekortUtfyllingContext = createContext<MeldekortUtfyllingState>(
    {} as MeldekortUtfyllingState
);
