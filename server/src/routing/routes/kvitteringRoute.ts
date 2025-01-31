import { RequestHandler } from 'express';
import { SsrRenderer } from '@ssr/htmlRenderer';

export const kvitteringRoute =
    (render: SsrRenderer): RequestHandler =>
    async (req, res) => {
        const html = await render(req.originalUrl, {
            route: 'kvittering',
            props: {},
        });

        res.send(html);
    };
