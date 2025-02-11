import { Route, Switch } from 'wouter';
import { siteRouteConfigs } from '@routing/siteRouteConfigs.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { Feilside } from '@Feilside.tsx';
import React from 'react';
import { AppContext } from '../../commonSrc/typer/appContext.ts';

type Props = {
    appContext: AppContext;
};

export const SiteRouter = ({ appContext }: Props) => {
    return (
        <Switch>
            {Object.values(siteRouteConfigs).map((route) => (
                <Route path={route.path} key={route.path}>
                    <RouteComponent route={route} appContext={appContext} />
                </Route>
            ))}
            <Route>
                <Feilside />
            </Route>
        </Switch>
    );
};
