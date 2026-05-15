import './global.css';
import { Page, VStack } from '@navikt/ds-react';
import { AppContext } from '@meldekort/common/typer/appContext';
import { SiteRouter } from '@routing/SiteRouter';
import { Feilside } from '@Feilside';
import { FeilsideServerfeil } from '@FeilsideServerfeil';
import { SpråkProvider } from '@context/språk/SpråkProvider';

import style from './App.module.css';

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
