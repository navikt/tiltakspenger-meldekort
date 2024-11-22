import React, { useCallback, useState } from 'react';
import {
    MeldekortUtfyllingContext,
    MeldekortUtfyllingState,
} from '@context/meldekort-utfylling/MeldekortUtfyllingContext';
import { MeldekortDag, MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt';

type Props = {
    meldekortUtfylling: MeldekortUtfylling;
    setMeldekortSteg: (steg: MeldekortSteg) => void;
    children: React.ReactNode;
};

export const MeldekortUtfyllingProvider = ({
    meldekortUtfylling: meldekortUtfyllingInitial,
    setMeldekortSteg,
    children,
}: Props) => {
    const [meldekortUtfylling, setMeldekortUtfylling] =
        useState<MeldekortUtfylling>(meldekortUtfyllingInitial);
    const [valgtMeldekortDag, setValgtMeldekortDag] =
        useState<MeldekortUtfyllingState['valgtMeldekortDag']>(null);

    const lagreMeldekortDag = useCallback((dag: MeldekortDag) => {
        const meldekortDagerUpdated = [...meldekortUtfylling.meldekortDager];
        meldekortDagerUpdated[dag.index] = dag;

        setMeldekortUtfylling({
            ...meldekortUtfylling,
            meldekortDager: meldekortDagerUpdated,
        });
    }, [meldekortUtfylling]);

    return (
        <MeldekortUtfyllingContext.Provider
            value={{
                meldekortUtfylling,
                setMeldekortUtfylling,
                valgtMeldekortDag,
                setValgtMeldekortDag,
                lagreMeldekortDag,
                setMeldekortSteg
            }}
        >
            {children}
        </MeldekortUtfyllingContext.Provider>
    );
};
