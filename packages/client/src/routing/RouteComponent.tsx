import { SiteRouteConfig } from '@routing/siteRouteConfigs';
import { Loader } from '@navikt/ds-react';
import { Infokort } from '@components/infokort/Infokort';
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
        return (
            <Infokort variant={'feil'}>{`Noe gikk galt ved henting av data - ${error}`}</Infokort>
        );
    }

    if (!data) {
        return <Loader />;
    }

    return <Component {...data} />;
};
