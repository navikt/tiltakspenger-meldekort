import { Nullable } from '@common/typer/Nullable';
import { useState } from 'react';
import { MeldeperiodeForPeriodeContext } from './MeldeperiodeForPeriodeContext';
import { MeldekortTilKorrigeringUtfylling } from '@common/typer/KorrigerMeldekort.ts';

export const MeldeperiodeForPeriodeProvider = (props: { children: React.ReactNode }) => {
    const [meldeperiodeForPeriode, setMeldeperiodeForPeriode] =
        useState<Nullable<MeldekortTilKorrigeringUtfylling>>(null);

    return (
        <MeldeperiodeForPeriodeContext.Provider
            value={{ meldeperiodeForPeriode, setMeldeperiodeForPeriode }}
        >
            {props.children}
        </MeldeperiodeForPeriodeContext.Provider>
    );
};
