import React, { useState } from 'react';
import {
    MeldekortUtfyllingContext,
    MeldekortUtfyllingState,
} from '@context/meldekort-utfylling/MeldekortUtfyllingContext';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';

type Props = {
    meldekortUtfylling: MeldekortUtfylling;
    children: React.ReactNode;
};

export const MeldekortUtfyllingProvider = ({ meldekortUtfylling, children }: Props) => {
    const [_meldekortUtfylling, setMeldekortUtfylling] =
        useState<MeldekortUtfylling>(meldekortUtfylling);
    const [valgtMeldekortDag, setValgtMeldekortDag] =
        useState<MeldekortUtfyllingState['valgtMeldekortDag']>(null);

    return (
        <MeldekortUtfyllingContext.Provider
            value={{
                meldekortUtfylling: _meldekortUtfylling,
                setMeldekortUtfylling,
                valgtMeldekortDag,
                setValgtMeldekortDag,
            }}
        >
            {children}
        </MeldekortUtfyllingContext.Provider>
    );
};
