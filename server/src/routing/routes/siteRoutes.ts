import { Router } from 'express';
import { SiteRoutesBuilder } from '@routing/SiteRoutesBuilder';
import { tilMeldekortUtfylling } from '@fetch/transformMeldekort';
import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';
import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';
import { siteRoutes } from '@common/siteRoutes';

// TODO: bedre feilhåndtering
export const setupSiteRoutes = async (router: Router, htmlRenderer: SiteHtmlRenderer) => {
    const routeBuilder = new SiteRoutesBuilder({ router, renderer: htmlRenderer });

    routeBuilder.routes(siteRoutes.forside, async (req, fetchFraApi) => {
        const meldekortDto = await fetchFraApi(req, 'neste', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO>) : null
        );

        return {
            props: { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null },
            status: 200,
        };
    });

    routeBuilder.routes(siteRoutes.alle, async (req, fetchFraApi) => {
        const alleMeldekort = await fetchFraApi(req, 'alle', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO[]>) : null
        );

        return alleMeldekort
            ? { props: { alleMeldekort: alleMeldekort.map(tilMeldekortUtfylling) }, status: 200 }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.fyllUt, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO>) : null)
        );

        return meldekortDto
            ? { props: { meldekort: tilMeldekortUtfylling(meldekortDto) }, status: 200 }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.kvittering, async (req) => {
        return {
            props: {},
            status: 200,
        };
    });
};
