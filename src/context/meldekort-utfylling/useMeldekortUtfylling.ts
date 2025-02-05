import { useContext } from 'react';
import { MeldekortUtfyllingContext } from '@context/meldekort-utfylling/MeldekortUtfyllingContext';
import { MeldekortDagStatus, MeldekortUtfylling } from '@typer/meldekort-utfylling.ts';

export const useMeldekortUtfylling = () => {
    const context = useContext(MeldekortUtfyllingContext);

    return { ...context, harForMangeDagerRegistrert: harForMangeDagerRegistrert(context.meldekortUtfylling) };
};

const harForMangeDagerRegistrert = (meldekortUtfylling: MeldekortUtfylling): boolean => {
    return meldekortUtfylling.dager.filter(
        (dag) => dag.status !== MeldekortDagStatus.IkkeRegistrert
    ).length > meldekortUtfylling.maksAntallDager;
};
