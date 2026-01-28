import { AppContext } from '@common/typer/appContext';

import { KorrigerMeldekortProvider } from '@context/korriger/KorrigerMeldekortProvider';
import { RouteComponent } from '@routing/RouteComponent';
import { siteRouteConfigs } from '@routing/siteRouteConfigs';
import { Route, Switch } from 'wouter';
import { TeksterLocale } from '@common/typer/locale.ts';
import { addLocaleSuffix } from '@common/urls.ts';

const KorrigeringAvMeldekortRouteWrapper = (props: {
    appContext: AppContext;
    locale: TeksterLocale;
}) => {
    const {
        korrigerMeldekortUtfylling,
        korrigerMeldekortOppsummering,
        korrigerMeldekortKvittering,
    } = siteRouteConfigs;

    return (
        <KorrigerMeldekortProvider>
            <Switch>
                <Route path={addLocaleSuffix(korrigerMeldekortUtfylling.path, props.locale)}>
                    <RouteComponent
                        route={korrigerMeldekortUtfylling}
                        appContext={props.appContext}
                    />
                </Route>
                <Route path={addLocaleSuffix(korrigerMeldekortOppsummering.path, props.locale)}>
                    <RouteComponent
                        route={korrigerMeldekortOppsummering}
                        appContext={props.appContext}
                    />
                </Route>
                <Route path={addLocaleSuffix(korrigerMeldekortKvittering.path, props.locale)}>
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
