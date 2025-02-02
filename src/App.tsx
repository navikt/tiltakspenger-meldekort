import './global.css';
import React from 'react';
import { Page, VStack } from '@navikt/ds-react';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Route } from 'wouter';

import { siteRouteConfigs } from '@routing/siteRouteConfigs.ts';
import style from './App.module.css';
import { AppContext } from '@routing/appContext.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';

export const App = ({ initialRoute, initialProps }: AppContext) => {
    console.log(`Initial path: ${initialRoute}`);

    return (
        <Page className={style.app}>
            <PageHeader />
            <Page.Block width={'md'} as={'main'} id={'maincontent'}>
                <VStack className={style.text}>
                    {Object.values(siteRouteConfigs).map((routeConfig) => (
                        <Route path={routeConfig.path} key={routeConfig.path}>
                            <RouteComponent
                                config={routeConfig}
                                initialProps={
                                    initialRoute === routeConfig.path ? initialProps : undefined
                                }
                            />
                        </Route>
                    ))}
                </VStack>
            </Page.Block>
        </Page>
    );
};
