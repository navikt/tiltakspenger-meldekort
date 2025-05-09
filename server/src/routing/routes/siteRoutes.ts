import { Router } from 'express';
import { SiteRoutesBuilder } from '@routing/SiteRoutesBuilder';
import {
    tilAlleMeldekortProps,
    tilMeldekortBruker,
    tilMeldekortUtfylling,
} from '@fetch/transformDto';
import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';
import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';
import { siteRoutes } from '@common/siteRoutes';
import { MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';
import { skalRedirecteTilArena } from '@utils/arenaRedirect';
import { appConfig } from '@common/appConfig';
import { AlleMeldekortDTO } from '@common/typer/alle-meldekort';

// TODO: bedre feilhåndtering
export const setupSiteRoutes = async (router: Router, htmlRenderer: SiteHtmlRenderer) => {
    const routeBuilder = new SiteRoutesBuilder({ router, renderer: htmlRenderer });

    routeBuilder.routes(siteRoutes.forside, async (req, fetchFraApi) => {
        const meldekortBrukerDto = await fetchFraApi(req, 'bruker', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortBrukerDTO>) : null
        );

        if (!meldekortBrukerDto) {
            return {
                props: {},
                status: 500,
            };
        }

        const props = { meldekortBruker: tilMeldekortBruker(meldekortBrukerDto) };

        if (skalRedirecteTilArena(meldekortBrukerDto)) {
            return {
                props,
                redirectUrl: appConfig.arenaUrl,
            };
        }

        return { props };
    });

    routeBuilder.routes(siteRoutes.alle, async (req, fetchFraApi) => {
        const alleMeldekortDto = await fetchFraApi(req, 'meldekort/alle', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<AlleMeldekortDTO>) : null
        );

        console.log(alleMeldekortDto);

        if (!alleMeldekortDto) {
            return {
                props: {},
                status: 500,
            };
        }

        const props = tilAlleMeldekortProps(alleMeldekortDto);

        if (skalRedirecteTilArena(alleMeldekortDto.bruker)) {
            return {
                props,
                redirectUrl: appConfig.arenaUrl,
            };
        }

        return { props };
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
