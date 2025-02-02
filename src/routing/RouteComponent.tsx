import React from 'react';
import { SiteRouteConfig, SiteRouteProps } from '@routing/siteRouteConfigs.ts';
import { useLocation } from 'wouter';
import { Loader } from '@navikt/ds-react';
import { useFetchPageProps } from '@context/useFetchPageData.ts';

type Props = {
    config: SiteRouteConfig<any>;
    initialProps?: SiteRouteProps<any>;
};

export const RouteComponent = ({ config, initialProps }: Props) => {
    const { Component } = config;
    const [location] = useLocation();

    const { isLoading, data, error } = useFetchPageProps(location, initialProps);

    console.log(`Route path: ${location} - ${isLoading} - ${error}`);

    if (!data) {
        return <Loader />;
    }

    return <Component {...(data)} />;
};
