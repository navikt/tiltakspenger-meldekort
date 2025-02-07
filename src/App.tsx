import './global.css';
import React from 'react';
import { Alert, Page, VStack } from '@navikt/ds-react';
import { Route } from 'wouter';
import { AppContext } from '@routing/appContext.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { siteRoutes } from '@routing/siteRoutes.ts';

import style from './App.module.css';

export const App = (appContext: AppContext) => {
    const { error } = appContext;

    return (
        <Page className={style.app}>
            <Page.Block width={'md'} as={'main'} id={'maincontent'}>
                <VStack className={style.text}>
                    {error && <Alert variant={'error'}>{error}</Alert>}
                    {siteRoutes.map((route) => (
                        <Route path={route.path} key={route.path}>
                            <RouteComponent route={route} appContext={appContext} />
                        </Route>
                    ))}
                </VStack>
            </Page.Block>
        </Page>
    );
};
