import '@navikt/ds-css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Page, VStack } from '@navikt/ds-react';
import { PageHeader } from '@/src/components/page-header/PageHeader';

import style from '@/src/components/forside/Forside.module.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main>
            <Head>
                <title>{'Meldekort for tiltakspenger - nav.no'}</title>
            </Head>
            <Page className={style.forside}>
                <PageHeader />
                <Page.Block width={'lg'}>
                    <VStack className={style.text}>
                        <Component {...pageProps} />
                    </VStack>
                </Page.Block>
            </Page>
        </main>
    );
}
