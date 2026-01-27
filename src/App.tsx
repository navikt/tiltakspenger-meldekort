import './global.css';

import { Page, VStack } from '@navikt/ds-react';
import { AppContext } from '@common/typer/appContext.ts';
import { SiteRouter } from '@routing/SiteRouter.tsx';
import { Feilside } from '@Feilside.tsx';

import style from './App.module.css';
import { FeilsideServerfeil } from '@FeilsideServerfeil.tsx';
import { SpråkProvider } from '@context/SpråkvelgerContext.tsx';

export const App = (appContext: AppContext) => {
    return (
        <Page className={style.app}>
            <Page.Block
                width={'md'}
                as={'main'}
                id={'maincontent'}
                tabIndex={-1}
                className={style.maincontent}
            >
                <SpråkProvider defaultSpråk={appContext.språk}>
                    <VStack className={style.text}>
                        {appContext.status >= 400 ? (
                            getFeilside(appContext.status)
                        ) : (
                            <SiteRouter appContext={appContext} />
                        )}
                    </VStack>
                </SpråkProvider>
            </Page.Block>
        </Page>
    );
};

const getFeilside = (statuskode: number) => {
    if (statuskode < 500) {
        return <Feilside />;
    } else {
        return <FeilsideServerfeil />;
    }
};
