import { Router } from 'express';
import { SiteRoutesBuilder } from '@routing/SiteRoutesBuilder';
import { tilMeldekortBruker, tilMeldekortUtfylling } from '@fetch/transformDto';
import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';
import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';
import { siteRoutes } from '@common/siteRoutes';
import { isProd } from '@utils/env';
import { MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';
import { skalRedirecteTilArena } from '@utils/arenaRedirect';
import { appConfig } from '@common/appConfig';

// TODO: bedre feilhåndtering
export const setupSiteRoutes = async (router: Router, htmlRenderer: SiteHtmlRenderer) => {
    const routeBuilder = new SiteRoutesBuilder({ router, renderer: htmlRenderer });

    routeBuilder.routes(siteRoutes.forside, async (req, fetchFraApi) => {
        const meldekortBruker = await fetchFraApi(req, 'bruker', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortBrukerDTO>) : null
        );

        if (!meldekortBruker) {
            return {
                props: {},
                status: 500,
            };
        }

        const props = { meldekortBruker: tilMeldekortBruker(meldekortBruker) };

        if (skalRedirecteTilArena(meldekortBruker)) {
            return {
                props,
                redirectUrl: appConfig.arenaUrl,
            };
        }

        return {
            props,
        };
    });

    routeBuilder.routes(siteRoutes.alle, async (req, fetchFraApi) => {
        const alleMeldekort = await fetchFraApi(req, 'meldekort/alle', 'GET').then((res) =>
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

    routeBuilder.routes(siteRoutes.fravær, async (req, fetchFraApi) => {
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

    routeBuilder.routes(siteRoutes.sendInn, async (req, fetchFraApi) => {
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

    routeBuilder.routes(siteRoutes.kvittering, async (req, fetchFraApi) => {
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
};
