import { createHttpTerminator } from 'http-terminator';
import express from 'express';
import compression from 'compression';
import { setupErrorHandler } from '@routing/errorHandlers';
import { appConfig } from '@common/appConfig';
import { validateEnv } from '@utils/env';
import { cspMiddleware } from '@routing/cspMiddleware';
import { setupInternalRoutes } from '@routing/routes/internalRoutes';
import { setupSiteRoutes } from '@routing/routes/siteRoutes';
import { setupApiRoutes } from '@routing/routes/apiRoutes';
import { initDevRenderer } from '@ssr/devHtmlRenderer';
import { initProdRenderer } from '@ssr/prodHtmlRenderer';

const { baseUrl, demoRoutePrefix } = appConfig;

const PORT = 3050;

const isDevMode = process.env.NODE_ENV === 'development';

validateEnv()
    .then(async () => {
        const app = express();
        const siteRouter = express
            .Router()
            .use(compression(), express.json(), await cspMiddleware());

        app.use(baseUrl, siteRouter);

        app.get('/', (req, res) => {
            return res.redirect(baseUrl);
        });

        const htmlRenderer = await (isDevMode
            ? initDevRenderer(siteRouter)
            : initProdRenderer(siteRouter));

        await setupSiteRoutes(siteRouter, htmlRenderer);

        setupInternalRoutes(siteRouter);
        setupApiRoutes(siteRouter);
        setupErrorHandler(siteRouter, htmlRenderer);

        return app;
    })
    .catch((e) => {
        console.error(`Error occured while initializing server - ${e}`);
        throw e;
    })
    .then((app) => {
        const server = app.listen(PORT, () => {
            console.log(`Server starting on port ${PORT}`);
            console.log(`localhost \t\thttp://localhost:${PORT}${baseUrl}`);
            console.log(`localhost (DEMO)\thttp://localhost:${PORT}${baseUrl}${demoRoutePrefix}`);
        });

        const httpTerminator = createHttpTerminator({ server });

        const shutdown = (signal: string) => {
            console.log(`Received ${signal} - Server shutting down`);
            httpTerminator.terminate().then(() => {
                server.close(() => {
                    console.log('Shutdown complete!');
                    process.exit(0);
                });
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    });
