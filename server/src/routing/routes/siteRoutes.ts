import { Router } from 'express';
import { SiteRoutesBuilder } from '@routing/SiteRoutesBuilder';
import { tilMeldekortUtfylling } from '@fetch/transformMeldekort';
import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';
import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';
import { siteRoutes } from '@common/siteRoutes';
import { isProd } from '@utils/env';
import { appConfig } from '@common/appConfig';

// TODO: bedre feilhåndtering
export const setupSiteRoutes = async (router: Router, htmlRenderer: SiteHtmlRenderer) => {
    const routeBuilder = new SiteRoutesBuilder({ router, renderer: htmlRenderer });

    routeBuilder.routes(siteRoutes.forside, async (req, fetchFraApi) => {
        const meldekortDto = await fetchFraApi(req, 'neste', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO>) : null
        );

        if (!meldekortDto && isProd()) {
            return {
                props: {},
                redirectUrl: appConfig.arenaUrl,
            };
        }

        return {
            props: { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null },
        };
    });

    routeBuilder.routes(siteRoutes.alle, async (req, fetchFraApi) => {
        const alleMeldekort = await fetchFraApi(req, 'alle', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO[]>) : null
        );

        if (!alleMeldekort && isProd()) {
            return {
                props: {},
                redirectUrl: appConfig.arenaUrl,
            };
        }

        return alleMeldekort
            ? { props: { alleMeldekort: alleMeldekort.map(tilMeldekortUtfylling) }, status: 200 }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.deltakelse, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<MeldekortTilBrukerDTO>) : null)
        );

        return meldekortDto
            ? { props: { meldekort: tilMeldekortUtfylling(meldekortDto) } }
            : {
                  props: {},
                  status: 404,
              };
    });

    // Routes som per nå ikke trenger å hente data fra API med Server-side Rendering (SSR)
    routeBuilder.routes(siteRoutes.fravær, async (req) => {
        return { props: {} };
    });

    routeBuilder.routes(siteRoutes.sendInn, async (req) => {
        return { props: {} };
    });

    routeBuilder.routes(siteRoutes.kvittering, async (req) => {
        return { props: {} };
    });
};
