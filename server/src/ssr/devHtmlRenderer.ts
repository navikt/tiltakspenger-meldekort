import { createServer } from 'vite';
import {
    getTemplateWithDecorator,
    HtmlRenderFunc,
    processHtmlTemplate,
} from '@ssr/htmlRenderUtils';
import { appConfig } from '@common/appConfig';
import { Router } from 'express';

const SSR_ENTRY_PATH = '/src/main-server.tsx';

const devErrorHtml = (e: Error) => {
    return `
        <div style='max-width: 1344px;width: 100%;margin: 1rem auto'>
            <span>Server rendering error: ${e}</span>
            <div style='font-size: 0.75rem; margin-top: 1rem'>
                <code>${e.stack}</code>
            </div>
        </div>`;
};

export const initDevRenderer = async (router: Router): Promise<HtmlRenderFunc> => {
    console.log('Configuring html renderer for development mode');

    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        root: '../',
        base: appConfig.baseUrl,
    });

    router.use(vite.middlewares);

    return async (url, context) => {
        const template = await getTemplateWithDecorator(context.språk);
        const html = await vite.transformIndexHtml(url, template);

        try {
            const { render } = await vite.ssrLoadModule(SSR_ENTRY_PATH);
            const appHtml = render(url, context);

            return processHtmlTemplate(html, appHtml, context);
        } catch (e: unknown) {
            if (e instanceof Error) {
                vite.ssrFixStacktrace(e);
                console.error(`Dev render error: ${e} \n ${e.stack}`);
                return processHtmlTemplate(html, devErrorHtml(e), context);
            } else {
                const msg = `Unknown error: ${e}`;
                console.error(msg);
                return msg;
            }
        }
    };
};
