import { Router } from 'express';
import { initHtmlRenderer } from '@ssr/initHtmlRenderer';
import { sendInnRoute } from '@routing/routes/sendInnRoute';
import { SiteRouter } from '@routing/SiteRouter';
import { tilMeldekortUtfylling } from '@fetch/transformMeldekort';
import { fetchFraApi } from '@fetch/apiFetch';
import { MeldekortMottakDto } from '@client/typer/meldekort-dto';

export const setupSiteRoutes = async (router: Router) => {
    const htmlRenderer = await initHtmlRenderer({
        router: router,
    });

    const siteRouter = new SiteRouter({ router, renderer: htmlRenderer });

    siteRouter.handle('/', async (req) => {
        const meldekortDto = await fetchFraApi(req, 'siste', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortMottakDto>) : null
        );
        return { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null };
    });

    siteRouter.handle('/alle', async (req) => {
        const alleMeldekort = await fetchFraApi(req, 'alle', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortMottakDto[]>) : null
        );

        return { alleMeldekort: alleMeldekort ? alleMeldekort.map(tilMeldekortUtfylling) : [] }
    });

    siteRouter.handle('/:meldekortId/fyll-ut', async (req) => {
        const meldekortId = req.params.meldekortId;

        const meldekortDto = await fetchFraApi(req, 'siste', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortMottakDto>) : null
        );

        return { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null }
    });

    siteRouter.handle('/alle', async (req) => {
        return {}
    });

    router.post('/api/send-inn', sendInnRoute);
};
