import { MeldeperiodeForPeriodeResponse } from '@common/typer/Meldeperiode';
import { Nullable } from '@common/typer/Nullable';
import { useState } from 'react';
import { MeldeperiodeForPeriodeContext } from './MeldeperiodeForPeriodeContext';

export const MeldeperiodeForPeriodeProvider = (props: { children: React.ReactNode }) => {
    const [meldeperiodeForPeriode, setMeldeperiodeForPeriode] =
        useState<Nullable<MeldeperiodeForPeriodeResponse>>(null);

    return (
        <MeldeperiodeForPeriodeContext.Provider
            value={{ meldeperiodeForPeriode, setMeldeperiodeForPeriode }}
        >
            {props.children}
        </MeldeperiodeForPeriodeContext.Provider>
    );
};
