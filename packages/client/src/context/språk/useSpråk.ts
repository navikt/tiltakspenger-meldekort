import { useContext } from 'react';
import { SpråkContext } from '@context/språk/SpråkContext';

export const useSpråk = () => {
    return useContext(SpråkContext);
};
