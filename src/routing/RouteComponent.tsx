import React from 'react';
import { SiteRouteConfig, SiteRouteProps } from '@routing/siteRoutes.ts';
import { useLocation } from 'wouter';
import { Alert, Loader } from '@navikt/ds-react';
import { useFetchPageProps } from '@context/useFetchPageData.ts';

type Props = {
    route: SiteRouteConfig<any>;
    initialProps?: SiteRouteProps<any>;
};

export const RouteComponent = ({ route, initialProps }: Props) => {
    const { Component } = route;
    const [path] = useLocation();

    const { data, error } = useFetchPageProps(path, initialProps);

    if (error) {
        return <Alert variant={"error"}>{`Noe gikk galt ved henting av data - ${error}`}</Alert>
    }

    if (!data) {
        return <Loader />;
    }

    return <Component {...(data)} />;
};
