import { useLocation, useRouter } from 'wouter';
import { addLocaleSuffix } from '@common/urls.ts';
import { useSpråk } from '@context/språk/useSpråk.ts';

export const useRouting = () => {
    const [path, navigate] = useLocation();
    const { base, ssrPath } = useRouter();
    const { valgtSpråk } = useSpråk();

    const navigateWithLocale: typeof navigate = (to, options) => {
        return navigate(addLocaleSuffix(to.toString(), valgtSpråk), options);
    };

    return {
        path,
        navigate: navigateWithLocale,
        base,
        isSSR: ssrPath !== undefined,
    };
};
