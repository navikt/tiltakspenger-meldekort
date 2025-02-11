import React, { useCallback, useState } from 'react';
import { MeldekortUtfyllingContext } from '@context/meldekort-utfylling/MeldekortUtfyllingContext';
import { MeldekortDag, MeldekortUtfylling } from '../../../commonSrc/typer/meldekort-utfylling.ts';
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
    const [valgtMeldekortDag, setValgtMeldekortDag] = useState<MeldekortDag | null>(null);

    const lagreMeldekortDag = useCallback(
        (dag: MeldekortDag) => {
            const meldekortDagerUpdated = [...meldekortUtfylling.dager];
            meldekortDagerUpdated[dag.index] = dag;

            setMeldekortUtfylling({
                ...meldekortUtfylling,
                dager: meldekortDagerUpdated,
            });
        },
        [meldekortUtfylling]
    );

    return (
        <MeldekortUtfyllingContext.Provider
            value={{
                meldekortUtfylling,
                setMeldekortUtfylling,
                valgtMeldekortDag,
                setValgtMeldekortDag,
                lagreMeldekortDag,
                setMeldekortSteg,
            }}
        >
            {children}
        </MeldekortUtfyllingContext.Provider>
    );
};
