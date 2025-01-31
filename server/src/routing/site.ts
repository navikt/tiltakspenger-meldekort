import { Router } from 'express';
import { initHtmlRenderer } from '@ssr/initHtmlRenderer';
import { forsideRoute } from '@routing/routes/forsideRoute';
import { seAlleRoute } from '@routing/routes/seAlleRoute';
import { fyllUtRoute } from '@routing/routes/fyllUtRoute';
import { kvitteringRoute } from '@routing/routes/kvitteringRoute';
import { sendInnRoute } from '@routing/routes/sendInnRoute';

export const setupSiteRoutes = async (router: Router) => {
    const htmlRenderer = await initHtmlRenderer({
        router: router,
    });

    router.get('/', forsideRoute(htmlRenderer));
    router.get('/alle', seAlleRoute(htmlRenderer));
    router.get('/:meldekortId/fyll-ut', fyllUtRoute(htmlRenderer));
    router.get('/:meldekortId/kvittering', kvitteringRoute(htmlRenderer));

    router.post('/api/send-inn', sendInnRoute);
};
