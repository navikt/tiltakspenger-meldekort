import './global.css';
import React from 'react';
import { Page, VStack } from '@navikt/ds-react';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { AppProps, routeComponents } from '@appProps.ts';

import style from './App.module.css';

export const App = ({ route, props }: AppProps) => {
    const Component = routeComponents[route];

    return (
        <Page className={style.app}>
            <PageHeader />
            <Page.Block width={'md'} as={'main'} id={'maincontent'}>
                <VStack className={style.text}>
                    {/*
                    // @ts-ignore TS skjønner ikke denne :sadpanda: */}
                    <Component {...props} />
                </VStack>
            </Page.Block>
        </Page>
    );
};
