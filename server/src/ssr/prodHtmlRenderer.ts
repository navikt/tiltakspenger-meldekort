import {
    getTemplateWithDecorator,
    HtmlRenderFunc,
    processHtmlTemplate,
} from '@ssr/htmlRenderUtils';
import sirv from 'sirv';
import { Router } from 'express';
import path from 'path';

// På nais bruker vi CDN for assets
const ASSETS_DIR = path.resolve(process.cwd(), 'dist', 'client');

export const initProdRenderer = async (router: Router): Promise<HtmlRenderFunc> => {
    console.log(`Configuring site renderer for production mode - Using assets dir ${ASSETS_DIR}`);

    router.use(
        '/',
        sirv(ASSETS_DIR, {
            extensions: [],
        }),
    );

    const { render } = await import('@_ssr-dist/main-server');

    return async (url, context) => {
        const template = await getTemplateWithDecorator(context.språk);

        try {
            const appHtml = render(url, context);
            return processHtmlTemplate(template, appHtml, context);
        } catch (e) {
            console.error(`Rendering failed ${e}}`);
            return processHtmlTemplate(template, '', context);
        }
    };
};
