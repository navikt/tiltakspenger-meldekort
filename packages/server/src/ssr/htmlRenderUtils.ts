import path from 'path';
import { DecoratorEnvProps, DecoratorLocale } from '@navikt/nav-dekoratoren-moduler';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { AppContext } from '@meldekort/common/typer/appContext';
import { locales } from '@meldekort/common/locale';

export type HtmlRenderFunc = (url: string, appContext: AppContext) => Promise<string>;

const envProps: DecoratorEnvProps = { env: 'prod' };

export const getTemplateWithDecorator = async (språk: DecoratorLocale) => {
    const templatePath =
        process.env.NODE_ENV === 'development'
            ? path.resolve(process.cwd(), '..', 'client', 'index.html')
            : path.resolve(process.cwd(), 'dist', 'client', 'index.html');

    const html = await injectDecoratorServerSide({
        ...envProps,
        filePath: templatePath,
        params: {
            simpleFooter: true,
            language: språk,
            availableLanguages: locales.map((locale) => ({
                locale,
                handleInApp: true,
            })),
        },
    });

    /**
     * nav dekoratøren cdn returnerer assets med </link> avslutningstagger, men <link> er et void element — parse5 kaster en exception i loggen.
     * En quick fix er å replace denne taggen med en tom string intill videre
     */
    return html.replace(/<\/link>/gi, '');
};

export const processHtmlTemplate = (
    templateHtml: string,
    appHtml: string,
    appContext: AppContext,
) => {
    return templateHtml
        .replace('<!--ssr-app-html-->', appHtml)
        .replace('"ssr-app-context"', JSON.stringify(appContext));
};
