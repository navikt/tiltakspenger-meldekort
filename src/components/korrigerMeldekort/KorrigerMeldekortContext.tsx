import { MeldekortDagStatus } from '@common/typer/meldekort-utfylling';
import { createContext, useContext, useState } from 'react';

export interface KorrigerMeldekortContextState {
    dager: Array<{ dato: string; status: MeldekortDagStatus }>;
    setDager: (dager: Array<{ dato: string; status: MeldekortDagStatus }>) => void;
    oppdaterDag: (dato: string, status: MeldekortDagStatus) => void;
}

export const KorrigerMeldekortContext = createContext<KorrigerMeldekortContextState>(
    {} as KorrigerMeldekortContextState,
);

export const KorrigerMeldekortProvider = (props: { children: React.ReactNode }) => {
    const [dager, setDager] = useState<Array<{ dato: string; status: MeldekortDagStatus }>>([]);

    const oppdaterDag = (dato: string, status: MeldekortDagStatus) => {
        setDager((prevDager) =>
            prevDager.map((dag) => (dag.dato === dato ? { ...dag, status } : dag)),
        );
    };

    return (
        <KorrigerMeldekortContext.Provider value={{ dager, setDager, oppdaterDag }}>
            {props.children}
        </KorrigerMeldekortContext.Provider>
    );
};

export const useKorrigerMeldekortContext = () => useContext(KorrigerMeldekortContext);
