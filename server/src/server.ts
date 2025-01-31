import { createHttpTerminator } from 'http-terminator';
import express from 'express';
import compression from 'compression';
import { setupNaisProbeHandlers } from '@routing/internal';
import { setupErrorHandlers } from '@routing/errorHandlers';
import { setupSiteRoutes } from '@routing/site';
import { appConfig } from '@appConfig';

const { port, basePath } = appConfig;

(async () => {
    const app = express();
    app.use(compression());

    const router = express.Router();
    router.use(express.json());

    app.use(basePath, router);

    app.get('/', (req, res) => {
        return res.redirect(basePath);
    });

    setupNaisProbeHandlers(router);

    await setupSiteRoutes(router);

    setupErrorHandlers(router);

    return app;
})()
    .then()
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
