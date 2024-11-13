import React, { useState } from 'react';
import {
    MeldekortUtfyllingContext,
    MeldekortUtfyllingState,
} from '@context/meldekort-utfylling/MeldekortUtfyllingContext';
import { MeldekortDag, MeldekortUtfylling } from '@typer/meldekort-utfylling';

type Props = {
    meldekortUtfylling: MeldekortUtfylling;
    children: React.ReactNode;
};

export const MeldekortUtfyllingProvider = ({
    meldekortUtfylling: meldekortUtfyllingInitial,
    children,
}: Props) => {
    const [meldekortUtfylling, setMeldekortUtfylling] =
        useState<MeldekortUtfylling>(meldekortUtfyllingInitial);
    const [valgtMeldekortDag, setValgtMeldekortDag] =
        useState<MeldekortUtfyllingState['valgtMeldekortDag']>(null);

    const lagreMeldekortDag = (dag: MeldekortDag) => {
        const meldekortDagerUpdated = [...meldekortUtfylling.meldekortDager];
        meldekortDagerUpdated[dag.index] = dag;

        setMeldekortUtfylling({
            ...meldekortUtfylling,
            meldekortDager: meldekortDagerUpdated,
        });
    };

    return (
        <MeldekortUtfyllingContext.Provider
            value={{
                meldekortUtfylling,
                setMeldekortUtfylling,
                valgtMeldekortDag,
                setValgtMeldekortDag,
                lagreMeldekortDag,
            }}
        >
            {children}
        </MeldekortUtfyllingContext.Provider>
    );
};
