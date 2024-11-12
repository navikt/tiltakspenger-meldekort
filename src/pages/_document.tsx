import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { DecoratorComponentsReact, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';

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

        return (
            <Html>
                <Head>
                    <Decorator.HeadAssets />
                </Head>
                <body>
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
