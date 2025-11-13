import { useLocation, useRouter } from 'wouter';

export const useRouting = () => {
    const [path, navigate] = useLocation();
    const { base, ssrPath } = useRouter();

    return {
        path,
        navigate,
        base,
        isSSR: ssrPath !== undefined,
    };
};
