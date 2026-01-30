import path from 'path';
import { DecoratorEnvProps, DecoratorLocale } from '@navikt/nav-dekoratoren-moduler';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { AppContext } from '@common/typer/appContext';
import { locales } from '@common/locale.ts';

export type HtmlRenderFunc = (url: string, appContext: AppContext) => Promise<string>;

const envProps: DecoratorEnvProps = { env: 'prod' };

export const getTemplateWithDecorator = async (språk: DecoratorLocale) => {
    const templatePath =
        process.env.NODE_ENV === 'development'
            ? path.resolve(process.cwd(), '..', 'index.html')
            : path.resolve(process.cwd(), 'dist', 'client', 'index.html');

    return injectDecoratorServerSide({
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
