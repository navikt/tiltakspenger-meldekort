import './global.css';
import React from 'react';
import { Alert, Page, VStack } from '@navikt/ds-react';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Route } from 'wouter';
import { AppContext } from '@routing/appContext.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { siteRoutes } from '@routing/siteRoutes.ts';

import style from './App.module.css';

export const App = ({ initialRoute, initialProps, error }: AppContext) => {
    return (
        <Page className={style.app}>
            <PageHeader />
            <Page.Block width={'md'} as={'main'} id={'maincontent'}>
                <VStack className={style.text}>
                    {error && <Alert variant={'error'}>{error}</Alert>}
                    {Object.values(siteRoutes).map((route) => (
                        <Route path={route.path} key={route.path}>
                            <RouteComponent
                                route={route}
                                initialProps={
                                    initialRoute === route.path ? initialProps : undefined
                                }
                            />
                        </Route>
                    ))}
                </VStack>
            </Page.Block>
        </Page>
    );
};
