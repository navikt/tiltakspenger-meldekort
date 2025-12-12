import { appConfig } from '@common/appConfig';
import { getPath, siteRoutes } from '@common/siteRoutes';
import { AppContext } from '@common/typer/appContext';

import { Nullable } from '@common/typer/Nullable';
import { KorrigerMeldekortProvider } from '@context/korriger/KorrigerMeldekortProvider';
import { Alert, Loader } from '@navikt/ds-react';
import { RouteComponent } from '@routing/RouteComponent';
import { siteRouteConfigs } from '@routing/siteRouteConfigs';
import { useRouting } from '@routing/useRouting';
import { useApiClient } from '@utils/apiClient';
import { useEffect, useState } from 'react';
import { Route, Switch, useParams } from 'wouter';

//Vi holder provideren ute av wrapper-komponenten for å unngå unødvendig re-renders av provideren ved navigasjon mellom korrigeringssider.
const KorrigeringAvMeldekortRouteWrapper = (props: { appContext: AppContext }) => {
    return (
        <KorrigerMeldekortProvider>
            <KorrigeringRouteWrapper appContext={props.appContext} />
        </KorrigerMeldekortProvider>
    );
};

export default KorrigeringAvMeldekortRouteWrapper;

const KorrigeringRouteWrapper = (props: { appContext: AppContext }) => {
    const params = useParams();
    const { navigate, path } = useRouting();

    const [pageData, setPageData] =
        useState<Nullable<{ resultat: { kanKorrigeres: boolean } }>>(null);

    const apiClient = useApiClient<{
        resultat: { kanKorrigeres: boolean };
    }>({
        url: `${appConfig.baseUrl}/${params.meldekortId}/korrigering/data`,
        method: 'GET',
    });

    const {
        korrigerMeldekortUtfylling,
        korrigerMeldekortOppsummering,
        korrigerMeldekortKvittering,
    } = siteRouteConfigs;

    const kvitteringPath = getPath(siteRoutes.korrigerMeldekortKvittering, {
        meldekortId: params.meldekortId!,
    });

    useEffect(() => {
        if (apiClient.apiStatus === 'initial' && path !== kvitteringPath) {
            apiClient.callApi({
                onSuccess: (data) => {
                    setPageData(data);
                    apiClient.resetToInitial();
                },
            });
        }
        //Her ønsker vi kun å trigge ved sideinnlasting av de forskjellige pathene.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    useEffect(() => {
        if (pageData?.resultat.kanKorrigeres === false) {
            navigate(getPath(siteRoutes.forside));
        }
    }, [pageData?.resultat.kanKorrigeres, params.meldekortId, navigate]);

    if (status === 'loading') {
        return <Loader />;
    }

    if (apiClient.response?.status === 'error') {
        return (
            <Alert
                variant={'error'}
            >{`Noe gikk galt ved henting av data - ${apiClient.response.error.errorBody.melding}`}</Alert>
        );
    }

    return (
        <Switch>
            <Route path={korrigerMeldekortUtfylling.path}>
                <RouteComponent route={korrigerMeldekortUtfylling} appContext={props.appContext} />
            </Route>
            <Route path={korrigerMeldekortOppsummering.path}>
                <RouteComponent
                    route={korrigerMeldekortOppsummering}
                    appContext={props.appContext}
                />
            </Route>
            <Route path={korrigerMeldekortKvittering.path}>
                <RouteComponent route={korrigerMeldekortKvittering} appContext={props.appContext} />
            </Route>
        </Switch>
    );
};
