import { Route, Switch } from 'wouter';
import { siteRoutes } from '@routing/siteRoutes.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { Feilside } from '@Feilside.tsx';
import React from 'react';
import { AppContext } from '@routing/appContext.ts';

type Props = {
    appContext: AppContext;
};

export const SiteRouter = ({ appContext }: Props) => {
    return (
        <Switch>
            <Route path={siteRoutes.forside.path}>
                <RouteComponent route={siteRoutes.forside} appContext={appContext} />
            </Route>
            <Route path={siteRoutes.alle.path}>
                <RouteComponent route={siteRoutes.alle} appContext={appContext} />
            </Route>
            <Route path={siteRoutes.fyllUt.path} nest>
                <Route path={siteRoutes.fyllUt.childRoutes.deltatt.path}>
                    <RouteComponent
                        route={siteRoutes.fyllUt.childRoutes.deltatt}
                        appContext={appContext}
                    />
                </Route>
                <Route path={siteRoutes.fyllUt.childRoutes.fravær.path}>
                    <RouteComponent
                        route={siteRoutes.fyllUt.childRoutes.fravær}
                        appContext={appContext}
                    />
                </Route>
                <Route path={siteRoutes.fyllUt.childRoutes.sendInn.path}>
                    <RouteComponent
                        route={siteRoutes.fyllUt.childRoutes.sendInn}
                        appContext={appContext}
                    />
                </Route>
            </Route>
            <Route path={siteRoutes.kvittering.path}>
                <RouteComponent route={siteRoutes.kvittering} appContext={appContext} />
            </Route>
            <Route>
                <Feilside />
            </Route>
        </Switch>
    );
};
