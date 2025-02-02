import React from 'react';
import { SiteRouteConfig, SiteRouteProps } from '@routing/siteRouteConfigs.ts';
import { fetchJson } from '@utils/fetchUtils.ts';
import { useLocation } from 'wouter';
import { Loader } from '@navikt/ds-react';
import { useFetchPageProps } from '@context/useFetchPageData.ts';

type Props = {
    config: SiteRouteConfig<any>;
    initialProps?: SiteRouteProps<any>;
};

const basePath = import.meta.env.BASE_URL;

const fetcher = async (path: string) => {
    return fetchJson<any>(`${basePath}${path.replace(/\/$/, '')}/data`);
};

export const SiteRoute = ({ config, initialProps }: Props) => {
    const { Component } = config;
    const [location] = useLocation();

    const { isLoading, data, error } = useFetchPageProps(location, initialProps);

    if (!data) {
        return <Loader />;
    }

    console.log(`Route path: ${location} - ${isLoading} - ${error}`);

    return <Component {...(data)} />;
};
