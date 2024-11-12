import '@navikt/ds-css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Page, VStack } from '@navikt/ds-react';
import { PageHeader } from '@/src/components/page-header/PageHeader';
import { teksterNb } from '@/src/components/tekst/nb';

import style from '@/src/components/forside/Forside.module.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Page className={style.forside}>
            <Head>
                <title>{`${teksterNb['meldekortTittel']} - nav.no`}</title>
            </Head>
            <PageHeader />
            <Page.Block width={'md'} as={"main"} id={"maincontent"}>
                <VStack className={style.text}>
                    <Component {...pageProps} />
                </VStack>
            </Page.Block>
        </Page>
    );
}
