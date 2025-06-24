import { Route, Switch } from 'wouter';
import { siteRouteConfigs } from '@routing/siteRouteConfigs.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { Feilside } from '@Feilside.tsx';
import React from 'react';
import { AppContext } from '@common/typer/appContext.ts';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider.tsx';
import { useRouting } from '@routing/useRouting.ts';

type Props = {
    appContext: AppContext;
};

export const SiteRouter = ({ appContext }: Props) => {
    const { forside, alle, deltakelse, fravær, lønn, sendInn, kvittering } = siteRouteConfigs;
    const { navigate } = useRouting();

    return (
        <Switch>
            <Route path={alle.path} key={alle.path}>
                <RouteComponent route={alle} appContext={appContext} />
            </Route>

            <MeldekortUtfyllingProvider navigate={navigate}>
                {/*Forsiden trenger å informere provideren om hvilket meldekort som det skal jobbes med i stegene*/}
                <Route path={forside.path}>
                    <RouteComponent route={forside} appContext={appContext} />
                </Route>

                <Route path={deltakelse.path}>
                    <RouteComponent route={deltakelse} appContext={appContext} />
                </Route>
                <Route path={fravær.path}>
                    <RouteComponent route={fravær} appContext={appContext} />
                </Route>
                <Route path={lønn.path}>
                    <RouteComponent route={lønn} appContext={appContext} />
                </Route>
                <Route path={sendInn.path}>
                    <RouteComponent route={sendInn} appContext={appContext} />
                </Route>
                <Route path={kvittering.path}>
                    <RouteComponent route={kvittering} appContext={appContext} />
                </Route>
            </MeldekortUtfyllingProvider>

            <Route>
                <Feilside />
            </Route>
        </Switch>
    );
};
