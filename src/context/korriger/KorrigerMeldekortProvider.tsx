import { useEffect, useState } from 'react';
import { KorrigerMeldekortContext } from './KorrigerMeldekortContext';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { MeldekortKorrigeringTilUtfylling } from '@common/typer/KorrigerMeldekort.ts';

export const KorrigerMeldekortProvider = (props: { children: React.ReactNode }) => {
    const [utfylling, setUtfylling] = useState<MeldekortKorrigeringTilUtfylling>();
    const [dager, setDager] = useState<MeldekortDag[]>([]);

    const oppdaterDag = (dato: string, status: MeldekortDagStatus) => {
        setDager((prevDager) =>
            prevDager.map((dag) => (dag.dag === dato ? { ...dag, status } : dag)),
        );
    };

    useEffect(() => {
        if (utfylling) {
            setDager(utfylling.dager);
        }
    }, [utfylling]);

    return (
        <KorrigerMeldekortContext.Provider
            value={{ dager, meldeperiodeId: utfylling?.meldeperiodeId, setUtfylling, oppdaterDag }}
        >
            {props.children}
        </KorrigerMeldekortContext.Provider>
    );
};
