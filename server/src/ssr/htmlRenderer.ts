import { ViteDevServer } from 'vite';
import { getTemplateWithDecorator } from '@ssr/htmlTemplate';
import { AppProps } from '@client/appProps';

export type AppHtmlRenderer = (url: string, context: AppProps) => string;
export type SsrRenderer = (url: string, context: AppProps) => Promise<string>;

const processTemplate = (templateHtml: string, appHtml: string, appContext: AppProps) => {
    return templateHtml
        .replace('<!--ssr-app-html-->', appHtml)
        .replace('"ssr-app-context"', JSON.stringify(appContext));
};

const devErrorHtml = (e: Error) => {
    return `
        <div style='max-width: 1344px;width: 100%;margin: 1rem auto'>
            <span>Server rendering error: ${e}</span>
            <div style='font-size: 0.75rem; margin-top: 1rem'>
                <code>${e.stack}</code>
            </div>
        </div>`;
};

export const devRenderer =
    (vite: ViteDevServer, ssrEntryModule: string): SsrRenderer =>
    async (url, context) => {
        const template = await getTemplateWithDecorator();
        const html = await vite.transformIndexHtml(url, template);

        try {
            const { render } = await vite.ssrLoadModule(ssrEntryModule);
            const appHtml = render(url, context);

            return processTemplate(html, appHtml, context);
        } catch (e: unknown) {
            if (e instanceof Error) {
                vite.ssrFixStacktrace(e);
                console.error(`Dev render error: ${e} \n ${e.stack}`);
                return processTemplate(html, devErrorHtml(e), context);
            } else {
                const msg = `Unknown error: ${e}`;
                console.error(msg);
                return msg;
            }
        }
    };

export const prodRenderer =
    (render: AppHtmlRenderer): SsrRenderer =>
    async (url, context) => {
        const template = await getTemplateWithDecorator();

        try {
            const appHtml = render(url, context);
            return processTemplate(template, appHtml, context);
        } catch (e) {
            console.error(`Rendering failed ${e}}`);
            return processTemplate(template, '', context);
        }
    };
