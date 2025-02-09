import { Router } from 'express';
import { SiteRoutesBuilder } from '@routing/SiteRoutesBuilder';
import { tilMeldekortUtfylling } from '@fetch/transformMeldekort';
import { MeldekortTilBrukerDTO } from '@client/typer/meldekort-dto';
import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';

export const setupSiteRoutes = async (router: Router, htmlRenderer: SiteHtmlRenderer) => {
    const routeBuilder = new SiteRoutesBuilder({ router, renderer: htmlRenderer });

    routeBuilder.routes('/', async (req, fetcher) => {
        const meldekortDto = await fetcher(req, 'siste', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO>) : null
        );
        return { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null };
    });

    routeBuilder.routes('/alle', async (req, fetcher) => {
        const alleMeldekort = await fetcher(req, 'alle', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO[]>) : null
        );
        return { alleMeldekort: alleMeldekort ? alleMeldekort.map(tilMeldekortUtfylling) : [] };
    });

    routeBuilder.routes('/:meldekortId/fyll-ut/:underside', async (req, fetcher) => {
        const { meldekortId, underside } = req.params;
        console.log(meldekortId, underside);
        const meldekortDto = await fetcher(req, `meldekort/${meldekortId}`, 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO>) : null
        );
        return { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null };
    });

    routeBuilder.routes('/:meldekortId/kvittering', async (req) => {
        return {};
    });
};
