import { useLocation, useRouter } from 'wouter';
import { addLocaleSuffix } from '@meldekort/common/urls';
import { useSpråk } from '@context/språk/useSpråk';

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
