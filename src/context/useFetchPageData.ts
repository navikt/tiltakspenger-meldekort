import useSWR, { preload } from 'swr';
import { fetchJson } from '@utils/fetch.ts';
import { stripTrailingSlash } from '@common/urls.ts';

const isSsr = import.meta.env.SSR;

const fetchPageData = (baseUrl: string) => async (pagePath: string) => {
    return fetchJson<any>(`${baseUrl}${stripTrailingSlash(pagePath)}/data`);
};

export const useFetchPageData = (path: string, baseUrl: string, fallbackData?: any) => {
    const { isLoading, data, error, mutate } = useSWR(path, fetchPageData(baseUrl), {
        fallbackData,
    });

    return { isLoading, data, error, mutate };
};

export const usePreloadPageData = (path: string) => {
    if (!isSsr) {
        preload(path, fetchPageData);
    }
};
