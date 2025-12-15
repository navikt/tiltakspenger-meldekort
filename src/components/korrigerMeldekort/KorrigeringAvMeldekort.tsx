import { AppContext } from '@common/typer/appContext';

import { KorrigerMeldekortProvider } from '@context/korriger/KorrigerMeldekortProvider';
import { RouteComponent } from '@routing/RouteComponent';
import { siteRouteConfigs } from '@routing/siteRouteConfigs';
import { Route, Switch } from 'wouter';

const KorrigeringAvMeldekortRouteWrapper = (props: { appContext: AppContext }) => {
    const {
        korrigerMeldekortUtfylling,
        korrigerMeldekortOppsummering,
        korrigerMeldekortKvittering,
    } = siteRouteConfigs;

    return (
        <KorrigerMeldekortProvider>
            <Switch>
                <Route path={korrigerMeldekortUtfylling.path}>
                    <RouteComponent
                        route={korrigerMeldekortUtfylling}
                        appContext={props.appContext}
                    />
                </Route>
                <Route path={korrigerMeldekortOppsummering.path}>
                    <RouteComponent
                        route={korrigerMeldekortOppsummering}
                        appContext={props.appContext}
                    />
                </Route>
                <Route path={korrigerMeldekortKvittering.path}>
                    <RouteComponent
                        route={korrigerMeldekortKvittering}
                        appContext={props.appContext}
                    />
                </Route>
            </Switch>
        </KorrigerMeldekortProvider>
    );
};

export default KorrigeringAvMeldekortRouteWrapper;
