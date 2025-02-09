import './global.css';
import React from 'react';
import { Page, VStack } from '@navikt/ds-react';
import { AppContext } from '@routing/appContext.ts';
import { SiteRouter } from '@routing/SiteRouter.tsx';
import { Feilside } from '@Feilside.tsx';

import style from './App.module.css';

export const App = (appContext: AppContext) => {
    return (
        <Page className={style.app}>
            <Page.Block width={'md'} as={'main'} id={'maincontent'}>
                <VStack className={style.text}>
                    {appContext.status >= 400 ? (
                        <Feilside />
                    ) : (
                        <SiteRouter appContext={appContext} />
                    )}
                </VStack>
            </Page.Block>
        </Page>
    );
};
