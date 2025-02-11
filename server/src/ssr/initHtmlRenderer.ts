import { Router } from 'express';
import path from 'path';
import { createServer } from 'vite';
import { devRenderer, SiteHtmlRenderer, prodRenderer } from './siteHtmlRenderer';
import sirv from 'sirv';
import { appConfig } from '@common/appConfig';
import { render } from '@_ssr-dist/main-server';

// På nais bruker vi CDN for assets
const ASSETS_DIR = path.resolve(process.cwd(), 'dist', 'client');

export const initHtmlRenderer = async (router: Router): Promise<SiteHtmlRenderer> => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Configuring site renderer for development mode');

        const vite = await createServer({
            server: { middlewareMode: true },
            appType: 'custom',
            root: '../',
            base: appConfig.baseUrl,
        });

        router.use(vite.middlewares);

        return devRenderer(vite);
    }

    console.log(`Configuring site renderer for production mode - Using assets dir ${ASSETS_DIR}`);

    router.use(
        '/',
        sirv(ASSETS_DIR, {
            extensions: [],
        })
    );

    return prodRenderer(render);
};
