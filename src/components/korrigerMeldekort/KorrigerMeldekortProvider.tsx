import { useState } from 'react';
import { KorrigerMeldekortContext } from './KorrigerMeldekortContext';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/meldekort-utfylling';

export const KorrigerMeldekortProvider = (props: { children: React.ReactNode }) => {
    const [dager, setDager] = useState<MeldekortDag[]>([]);

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
