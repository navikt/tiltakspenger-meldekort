import { MeldeperiodeForPeriodeResponse } from '@common/typer/Meldeperiode';
import { Nullable } from '@common/typer/Nullable';
import { createContext, useContext } from 'react';

export interface MeldeperiodeForPeriodeContextState {
    meldeperiodeForPeriode: Nullable<MeldeperiodeForPeriodeResponse>;
    setMeldeperiodeForPeriode: (meldeperiode: Nullable<MeldeperiodeForPeriodeResponse>) => void;
}

export const MeldeperiodeForPeriodeContext = createContext<MeldeperiodeForPeriodeContextState>(
    {} as MeldeperiodeForPeriodeContextState,
);

export const useMeldeperiodeForPeriodeContext = () => useContext(MeldeperiodeForPeriodeContext);
