import { useState } from 'react';
import { KorrigerMeldekortContext } from './KorrigerMeldekortContext';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';

export const KorrigerMeldekortProvider = (props: { children: React.ReactNode }) => {
    const [dager, setDager] = useState<MeldekortDag[]>([]);

    const oppdaterDag = (dato: string, status: MeldekortDagStatus) => {
        setDager((prevDager) =>
            prevDager.map((dag) => (dag.dag === dato ? { ...dag, status } : dag)),
        );
    };

    return (
        <KorrigerMeldekortContext.Provider value={{ dager, setDager, oppdaterDag }}>
            {props.children}
        </KorrigerMeldekortContext.Provider>
    );
};
