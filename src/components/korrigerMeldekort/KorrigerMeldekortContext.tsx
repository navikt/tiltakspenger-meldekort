import { createContext, useContext } from 'react';
import { KorrigerMeldekortStatus, KorrigertMeldekortDag } from './KorrigerMeldekortUtils';

export interface KorrigerMeldekortContextState {
    dager: KorrigertMeldekortDag[];
    setDager: (dager: KorrigertMeldekortDag[]) => void;
    oppdaterDag: (dato: string, status: KorrigerMeldekortStatus) => void;
}

export const KorrigerMeldekortContext = createContext<KorrigerMeldekortContextState>(
    {} as KorrigerMeldekortContextState,
);

export const useKorrigerMeldekortContext = () => useContext(KorrigerMeldekortContext);
