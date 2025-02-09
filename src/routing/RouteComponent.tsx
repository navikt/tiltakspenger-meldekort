import React from 'react';
import { SiteRouteConfig } from '@routing/siteRoutes.ts';
import { Alert, Loader } from '@navikt/ds-react';
import { useFetchPageData } from '@context/useFetchPageData.ts';
import { AppContext } from '@routing/appContext.ts';
import { useRouting } from '@routing/useRouting.ts';

type Props = {
    route: SiteRouteConfig<any>;
    appContext: AppContext;
};

export const RouteComponent = ({ route, appContext }: Props) => {
    const { initialPath, initialProps, baseUrl } = appContext;
    const { Component } = route;

    const { path } = useRouting();

    const { data, error } = useFetchPageData(
        path,
        baseUrl,
        path === initialPath ? initialProps : undefined,
    );

    if (error) {
        return <Alert variant={'error'}>{`Noe gikk galt ved henting av data - ${error}`}</Alert>;
    }

    if (!data) {
        return <Loader />;
    }

    return <Component {...data} />;
};
