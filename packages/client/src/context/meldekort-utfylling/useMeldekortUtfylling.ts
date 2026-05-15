import { useContext } from 'react';
import { MeldekortUtfyllingContext } from '@context/meldekort-utfylling/MeldekortUtfyllingContext';

export const useMeldekortUtfylling = () => {
    return useContext(MeldekortUtfyllingContext);
};
