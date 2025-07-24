import { createContext, useContext } from 'react';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/meldekort-utfylling';

export interface KorrigerMeldekortContextState {
    dager: MeldekortDag[];
    setDager: (dager: MeldekortDag[]) => void;
    oppdaterDag: (dato: string, status: MeldekortDagStatus) => void;
}

export const KorrigerMeldekortContext = createContext<KorrigerMeldekortContextState>(
    {} as KorrigerMeldekortContextState,
);

export const useKorrigerMeldekortContext = () => useContext(KorrigerMeldekortContext);
