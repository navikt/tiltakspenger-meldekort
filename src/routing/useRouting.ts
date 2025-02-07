import { useLocation, useRouter } from 'wouter';

export const useRouting = () => {
    const [path, navigate] = useLocation();
    const { base } = useRouter();

    return {
        path,
        navigate,
        base,
    };
};
