import { SiteRouteConfig } from '@routing/siteRouteConfigs';
import { Alert, Loader } from '@navikt/ds-react';
import { useFetchPageData } from '@context/useFetchPageData';
import { AppContext } from '@meldekort/common/typer/appContext';
import { useRouting } from '@routing/useRouting';

type Props = {
    route: SiteRouteConfig;
    appContext: AppContext;
};

export const RouteComponent = ({ route, appContext }: Props) => {
    const { initialPath, initialProps } = appContext;
    const { Component } = route;

    const { path, base, isSSR } = useRouting();

    const { data, error } = useFetchPageData(
        path,
        base,
        isSSR || path === initialPath ? initialProps : undefined,
    );

    if (error) {
        return <Alert variant={'error'}>{`Noe gikk galt ved henting av data - ${error}`}</Alert>;
    }

    if (!data) {
        return <Loader />;
    }

    return <Component {...data} />;
};
