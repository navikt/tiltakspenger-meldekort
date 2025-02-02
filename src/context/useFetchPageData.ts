import useSWR, { preload } from 'swr';
import { fetchJson } from '@utils/fetchUtils.ts';

const basePath = import.meta.env.BASE_URL;

const isSsr = import.meta.env.SSR;

const fetcher = async (path: string) => {
    return fetchJson<any>(`${basePath}${path.replace(/\/$/, '')}/data`);
};

export const useFetchPageProps = (path: string, initialProps?: any) => {
    const { isLoading, data, error, mutate } = useSWR(path, fetcher, {
        fallbackData: initialProps,
    });

    return { isLoading, data, error, mutate };
};

export const usePreloadPageProps = (path: string) => {
    if (!isSsr) {
        preload(path, fetcher);
    }
};
