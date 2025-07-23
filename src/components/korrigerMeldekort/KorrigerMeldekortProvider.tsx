import { useState } from 'react';
import { KorrigerMeldekortStatus, KorrigertMeldekortDag } from './KorrigerMeldekortUtils';
import { KorrigerMeldekortContext } from './KorrigerMeldekortContext';

export const KorrigerMeldekortProvider = (props: { children: React.ReactNode }) => {
    const [dager, setDager] = useState<KorrigertMeldekortDag[]>([]);

    const oppdaterDag = (dato: string, status: KorrigerMeldekortStatus) => {
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
