import { Router } from 'express';
import path from 'path';
import { createServer } from 'vite';
import { devRenderer, SsrRenderer, prodRenderer } from './htmlRenderer';
import sirv from 'sirv';
import { appConfig } from '@appConfig';
import { render } from '@_ssr-dist/main-server';

const assetsDir = path.resolve(process.cwd(), 'dist', 'client');

const ssrModulePath = '/src/main-server.tsx';

type Props = {
    router: Router;
};

export const initHtmlRenderer = async ({ router }: Props): Promise<SsrRenderer> => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Configuring site renderer for development mode');

        const vite = await createServer({
            server: { middlewareMode: true },
            appType: 'custom',
            root: '../',
            base: appConfig.baseUrl,
        });

        router.use(vite.middlewares);

        return devRenderer(vite, ssrModulePath);
    }

    console.log(`Configuring site renderer for production mode - Using assets dir ${assetsDir}`);

    router.use(
        '/',
        sirv(assetsDir, {
            extensions: [],
        })
    );

    return prodRenderer(render);
};
