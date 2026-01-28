import { useLocation, useRouter } from 'wouter';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';
import { addLocaleSuffix } from '@common/urls.ts';

export const useRouting = () => {
    const [path, navigate] = useLocation();
    const { base, ssrPath } = useRouter();
    const { valgtSpråk } = useValgtSpråk();

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
