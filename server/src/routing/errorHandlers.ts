import { ErrorRequestHandler, Router } from 'express';
import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';
import { appConfig } from '@appConfig';

export const setupErrorHandler = (router: Router, htmlRenderer: SiteHtmlRenderer) => {
    const getErrorHtml = async (url: string, status: number) => {
        return htmlRenderer(url, {
            baseUrl: appConfig.baseUrl,
            status,
            initialPath: url,
            initialProps: {},
        });
    };

    const serverErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
        const { path } = req;
        const { status, stack } = err;
        const msg = stack?.split('\n')[0];
        const statusCode = status || 500;

        console.error(`Server error on ${path}: ${statusCode} ${msg}`);

        const html = await getErrorHtml(req.url, statusCode);

        res.status(statusCode).send(html);
    };

    router.all('*path', async (req, res, _) => {
        console.log(`Not found: ${req.url}`);

        const html = await getErrorHtml(req.url, 404);

        res.status(404).send(html);
    });

    router.use(serverErrorHandler);
};
