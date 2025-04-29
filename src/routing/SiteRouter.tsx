import { Route, Switch } from 'wouter';
import { siteRouteConfigs } from '@routing/siteRouteConfigs.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { Feilside } from '@Feilside.tsx';
import React from 'react';
import { AppContext } from '@common/typer/appContext.ts';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider.tsx';

type Props = {
    appContext: AppContext;
};

export const SiteRouter = ({ appContext }: Props) => {
    const { forside, alle, deltakelse, fravær, sendInn, kvittering } = siteRouteConfigs;

    return (
        <Switch>
            <Route path={forside.path} key={forside.path}>
                <RouteComponent route={forside} appContext={appContext} />
            </Route>
            <Route path={alle.path} key={alle.path}>
                <RouteComponent route={alle} appContext={appContext} />
            </Route>

            <MeldekortUtfyllingProvider>
                <Route path={deltakelse.path} key={deltakelse.path}>
                    <RouteComponent route={deltakelse} appContext={appContext} />
                </Route>
                <Route path={fravær.path} key={fravær.path}>
                    <RouteComponent route={fravær} appContext={appContext} />
                </Route>
                <Route path={sendInn.path} key={sendInn.path}>
                    <RouteComponent route={sendInn} appContext={appContext} />
                </Route>
                <Route path={kvittering.path} key={kvittering.path}>
                    <RouteComponent route={kvittering} appContext={appContext} />
                </Route>
            </MeldekortUtfyllingProvider>

            <Route>
                <Feilside />
            </Route>
        </Switch>
    );
};
