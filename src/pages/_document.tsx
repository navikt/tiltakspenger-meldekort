import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { DecoratorComponentsReact, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import classNames from 'classnames';

class MyDocument extends Document<{ Decorator: DecoratorComponentsReact }> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        const Decorator = await fetchDecoratorReact({
            env: 'dev',
        });

        return { ...initialProps, Decorator };
    }

    render() {
        const { Decorator } = this.props;
        const isLocal = !process.env.NAIS_CLUSTER_NAME;

        return (
            <Html>
                <Head>
                    <Decorator.HeadAssets />
                </Head>
                <body className={classNames(isLocal && 'localBody')}>
                    <Decorator.Header />
                    <Main />
                    <Decorator.Footer />
                    <Decorator.Scripts />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
