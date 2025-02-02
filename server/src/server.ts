import { createHttpTerminator } from 'http-terminator';
import express from 'express';
import compression from 'compression';
import { setupErrorHandlers } from '@routing/errorHandlers';
import { appConfig } from '@appConfig';
import { validateEnv } from '@validateEnv';
import { cspMiddleware } from '@routing/cspMiddleware';
import { setupInternalRoutes } from '@routing/routes/internalRoutes';
import { setupSiteRoutes } from '@routing/routes/siteRoutes';
import { setupApiRoutes } from '@routing/routes/apiRoutes';

const { port, basePath } = appConfig;

validateEnv()
    .then(async () => {
        const app = express().use(compression());
        const baseRouter = express.Router()
        const siteRouter = express.Router().use(express.json(), await cspMiddleware())

        app.use(basePath, baseRouter);
        baseRouter.use(siteRouter);

        app.get('/', (req, res) => {
            return res.redirect(basePath);
        });

        await setupSiteRoutes(siteRouter);
        setupInternalRoutes(baseRouter);
        setupApiRoutes(baseRouter);
        setupErrorHandlers(baseRouter);

        return app;
    })
    .catch((e) => {
        console.error(`Error occured while initializing server - ${e}`);
        throw e;
    })
    .then((app) => {
        const server = app.listen(port, () => {
            console.log(`Server starting on port ${port}`);
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
