import '@navikt/ds-css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Page, VStack } from '@navikt/ds-react';
import { PageHeader } from '@components/page-header/PageHeader';
import { teksterNb } from '@tekster/nb';

import style from '@components/forside/Forside.module.css';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Page className={style.forside}>
            <Head>
                <title>{`${teksterNb['sideTittel']} - nav.no`}</title>
            </Head>
            <PageHeader />
            <Page.Block width={'md'} as={'main'} id={'maincontent'}>
                <VStack className={style.text}>
                    <Component {...pageProps} />
                </VStack>
            </Page.Block>
        </Page>
    );
};

export default App;
