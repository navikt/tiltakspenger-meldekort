import { Router } from 'express';
import { SiteRoutesBuilder } from '@routing/SiteRoutesBuilder';
import {
    tilInnsendteMeldekortProps,
    tilMeldekortBruker,
    tilMeldekortUtfylling,
} from '@fetch/transformDto';
import { Meldekort } from '@common/typer/MeldekortBruker';
import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';
import { siteRoutes } from '@common/siteRoutes';
import { MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';
import { skalRedirecteTilArena } from '@utils/arenaRedirect';
import { appConfig } from '@common/appConfig';
import { InnsendteMeldekortDTO } from '@common/typer/alle-meldekort';

// TODO: bedre feilhåndtering
export const setupSiteRoutes = async (router: Router, htmlRenderer: SiteHtmlRenderer) => {
    const routeBuilder = new SiteRoutesBuilder({ router, renderer: htmlRenderer });

    routeBuilder.routes(siteRoutes.forside, async (req, fetchFraApi) => {
        const meldekortBrukerDto = await fetchFraApi(req, 'bruker', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortBrukerDTO>) : null,
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

    routeBuilder.routes(siteRoutes.innsendte, async (req, fetchFraApi) => {
        const innsendteMeldekortDto = await fetchFraApi(req, 'meldekort/innsendte', 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<InnsendteMeldekortDTO>) : null),
        );

        if (!innsendteMeldekortDto) {
            return {
                props: {},
                status: 500,
            };
        }

        const props = tilInnsendteMeldekortProps(innsendteMeldekortDto);

        if (skalRedirecteTilArena(innsendteMeldekortDto.bruker)) {
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
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );

        return meldekortDto
            ? { props: { brukersMeldekort: tilMeldekortUtfylling(meldekortDto) } }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.fravær, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );

        return meldekortDto
            ? { props: { brukersMeldekort: tilMeldekortUtfylling(meldekortDto) } }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.lønn, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );

        return meldekortDto
            ? { props: { brukersMeldekort: tilMeldekortUtfylling(meldekortDto) } }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.sendInn, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );

        return meldekortDto
            ? { props: { brukersMeldekort: tilMeldekortUtfylling(meldekortDto) } }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.kvittering, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );

        return meldekortDto
            ? { props: { brukersMeldekort: tilMeldekortUtfylling(meldekortDto) } }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.korrigerMeldekort, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;

        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );
        return meldekortDto
            ? { props: { meldekort: tilMeldekortUtfylling(meldekortDto) } }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.korrigerMeldekortOppsummering, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );
        return meldekortDto
            ? { props: { originaleMeldekort: tilMeldekortUtfylling(meldekortDto) } }
            : {
                  props: {},
                  status: 404,
              };
    });
    routeBuilder.routes(siteRoutes.korrigerMeldekortKvittering, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );
        return meldekortDto
            ? { props: { originaleMeldekort: tilMeldekortUtfylling(meldekortDto) } }
            : {
                  props: {},
                  status: 404,
              };
    });
};
