import { Nullable } from '@common/typer/Nullable';
import { createContext, useContext } from 'react';
import { MeldekortTilKorrigeringUtfylling } from '@common/typer/KorrigerMeldekort.ts';

export interface MeldeperiodeForPeriodeContextState {
    meldeperiodeForPeriode: Nullable<MeldekortTilKorrigeringUtfylling>;
    setMeldeperiodeForPeriode: (meldeperiode: Nullable<MeldekortTilKorrigeringUtfylling>) => void;
}

export const MeldeperiodeForPeriodeContext = createContext<MeldeperiodeForPeriodeContextState>(
    {} as MeldeperiodeForPeriodeContextState,
);

export const useMeldeperiodeForPeriodeContext = () => useContext(MeldeperiodeForPeriodeContext);
