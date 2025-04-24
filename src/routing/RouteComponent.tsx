import React from 'react';
import { SiteRouteConfig } from '@routing/siteRouteConfigs.ts';
import { Alert, Loader } from '@navikt/ds-react';
import { useFetchPageData } from '@context/useFetchPageData.ts';
import { AppContext } from '@common/typer/appContext.ts';
import { useRouting } from '@routing/useRouting.ts';

type Props = {
    route: SiteRouteConfig;
    appContext: AppContext;
};

export const RouteComponent = ({ route, appContext }: Props) => {
    const { initialPath, initialProps } = appContext;
    const { Component } = route;

    const { path, base } = useRouting();

    const { data, error } = useFetchPageData(
        path,
        base,
        path === initialPath ? initialProps : undefined
    );

    if (error) {
        return <Alert variant={'error'}>{`Noe gikk galt ved henting av data - ${error}`}</Alert>;
    }

    if (!data) {
        return <Loader />;
    }

    return <Component {...data} />;
};
