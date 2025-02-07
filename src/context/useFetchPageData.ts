import useSWR, { preload } from 'swr';
import { fetchJson } from '@utils/fetch.ts';
import { stripTrailingSlash } from '@utils/urls.ts';

const basePath = import.meta.env.BASE_URL;

const isSsr = import.meta.env.SSR;

const fetchPageData = async (pagePath: string) => {
    return fetchJson<any>(`${basePath}${stripTrailingSlash(pagePath)}/data`);
};

const fetchDemoData = async (pagePath: string) => {
    return fetchJson<any>(`${basePath}/demo${stripTrailingSlash(pagePath)}/data`);
};

export const useFetchPageData = (path: string, initialProps?: any, demo?: boolean) => {
    const { isLoading, data, error, mutate } = useSWR(path, demo ? fetchDemoData : fetchPageData, {
        fallbackData: initialProps,
    });

    return { isLoading, data, error, mutate };
};

export const usePreloadPageData = (path: string) => {
    if (!isSsr) {
        preload(path, fetchPageData);
    }
};
