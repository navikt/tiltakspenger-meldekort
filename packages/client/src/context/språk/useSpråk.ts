import { useContext } from 'react';
import { SpråkContext } from '@context/språk/SpråkContext.tsx';

export const useSpråk = () => {
    return useContext(SpråkContext);
};
