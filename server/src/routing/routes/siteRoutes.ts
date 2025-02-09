import { Router } from 'express';
import { SiteRoutesBuilder } from '@routing/SiteRoutesBuilder';
import { tilMeldekortUtfylling } from '@fetch/transformMeldekort';
import { MeldekortTilBrukerDTO } from '@client/typer/meldekort-dto';
import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';
import { siteRoutes } from '@client/routing/siteRoutes';

export const setupSiteRoutes = async (router: Router, htmlRenderer: SiteHtmlRenderer) => {
    const routeBuilder = new SiteRoutesBuilder({ router, renderer: htmlRenderer });

    routeBuilder.routes(siteRoutes.forside.path, async (req, fetchFraApi) => {
        const meldekortDto = await fetchFraApi(req, 'siste', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO>) : null
        );
        return { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null };
    });

    routeBuilder.routes(siteRoutes.alle.path, async (req, fetchFraApi) => {
        const alleMeldekort = await fetchFraApi(req, 'alle', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO[]>) : null
        );
        return { alleMeldekort: alleMeldekort ? alleMeldekort.map(tilMeldekortUtfylling) : [] };
    });

    routeBuilder.routes(siteRoutes.fyllUt.path, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO>) : null)
        );
        return { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null };
    });

    routeBuilder.routes(siteRoutes.kvittering.path, async (req) => {
        return {};
    });
};
