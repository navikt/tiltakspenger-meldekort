import { Router } from 'express';
import { initHtmlRenderer } from '@ssr/initHtmlRenderer';
import { SiteRouteBuilder } from '@routing/SiteRouteBuilder';
import { tilMeldekortUtfylling } from '@fetch/transformMeldekort';
import { fetchFraApi } from '@fetch/apiFetch';
import { MeldekortMottakDto } from '@client/typer/meldekort-dto';

export const setupSiteRoutes = async (router: Router) => {
    const htmlRenderer = await initHtmlRenderer({
        router: router,
    });

    const routeBuilder = new SiteRouteBuilder({ router, renderer: htmlRenderer });

    routeBuilder.route('/', async (req) => {
        const meldekortDto = await fetchFraApi(req, 'siste', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortMottakDto>) : null
        );
        return { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null };
    });

    routeBuilder.route('/alle', async (req) => {
        const alleMeldekort = await fetchFraApi(req, 'alle', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortMottakDto[]>) : null
        );

        return { alleMeldekort: alleMeldekort ? alleMeldekort.map(tilMeldekortUtfylling) : [] }
    });

    routeBuilder.route('/:meldekortId/fyll-ut', async (req) => {
        const meldekortId = req.params.meldekortId;

        const meldekortDto = await fetchFraApi(req, 'siste', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortMottakDto>) : null
        );

        return { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null }
    });

    routeBuilder.route('/:meldekortId/kvittering', async (req) => {
        return {}
    });
};
