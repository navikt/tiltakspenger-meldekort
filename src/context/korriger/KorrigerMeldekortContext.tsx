import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { createContext, useContext } from 'react';
import { MeldekortKorrigeringTilUtfylling } from '@common/typer/KorrigerMeldekort.ts';

export interface KorrigerMeldekortContextState {
    dager?: MeldekortDag[];
    meldeperiodeId?: string;
    setUtfylling: (utfylling: MeldekortKorrigeringTilUtfylling) => void;
    oppdaterDag: (dato: string, status: MeldekortDagStatus) => void;
}

export const KorrigerMeldekortContext = createContext<KorrigerMeldekortContextState>(
    {} as KorrigerMeldekortContextState,
);

export const useKorrigerMeldekortContext = () => useContext(KorrigerMeldekortContext);
