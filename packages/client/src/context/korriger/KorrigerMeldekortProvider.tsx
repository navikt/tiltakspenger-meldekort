import { useState } from 'react';
import { KorrigerMeldekortContext } from './KorrigerMeldekortContext';
import { MeldekortDagStatus } from '@meldekort/common/typer/MeldekortBruker';
import { MeldekortKorrigeringTilUtfylling } from '@meldekort/common/typer/KorrigerMeldekort';

export const KorrigerMeldekortProvider = (props: { children: React.ReactNode }) => {
    const [utfylling, setUtfylling] = useState<MeldekortKorrigeringTilUtfylling>();
    const dager = utfylling?.dager ?? [];

    const oppdaterDag = (dato: string, status: MeldekortDagStatus) => {
        if (!utfylling) return;

        setUtfylling((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                dager: prev.dager.map((dag) => (dag.dag === dato ? { ...dag, status } : dag)),
            };
        });
    };

    return (
        <KorrigerMeldekortContext.Provider
            value={{
                dager,
                meldeperiodeId: utfylling?.meldeperiodeId,
                setUtfylling,
                oppdaterDag,
                kanSendeInnHelg: utfylling?.kanSendeInnHelg ?? false,
            }}
        >
            {props.children}
        </KorrigerMeldekortContext.Provider>
    );
};
