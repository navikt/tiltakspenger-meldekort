import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { createContext, useContext } from 'react';

export interface KorrigerMeldekortContextState {
    dager: MeldekortDag[];
    setDager: (dager: MeldekortDag[]) => void;
    oppdaterDag: (dato: string, status: MeldekortDagStatus) => void;
}

export const KorrigerMeldekortContext = createContext<KorrigerMeldekortContextState>(
    {} as KorrigerMeldekortContextState,
);

export const useKorrigerMeldekortContext = () => useContext(KorrigerMeldekortContext);
