import { Router } from 'express';
import { SiteRoutesBuilder } from '@routing/SiteRoutesBuilder';
import {
    tilInnsendteMeldekortProps,
    tilMeldekortBruker,
    tilMeldekortUtfylling,
} from '@fetch/transformDto';
import { Meldekort } from '@common/typer/MeldekortBruker';
import { siteRoutes } from '@common/siteRoutes';
import { MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';
import { skalRedirecteTilArena } from '@utils/arenaRedirect';
import { appConfig } from '@common/appConfig';
import { InnsendteMeldekortDTO } from '@common/typer/alle-meldekort';
import { MeldekortForKjedeResponse } from '@common/typer/MeldeperiodeKjede';
import { HtmlRenderFunc } from '@ssr/htmlRenderUtils';
import { KorrigerMeldekortResponse } from '@common/typer/KorrigerMeldekort';

// TODO: bedre feilhåndtering
export const setupSiteRoutes = async (router: Router, htmlRenderer: HtmlRenderFunc) => {
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
                redirectUrl: appConfig.arenaTidligereMeldekortUrl,
            };
        }

        return { props };
    });

    routeBuilder.routes(siteRoutes.meldekortForKjede, async (req, fetchFraApi) => {
        const { kjedeId } = req.params;

        const meldekortForKjede = await fetchFraApi(req, `kjede/${kjedeId}`, 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortForKjedeResponse>) : null,
        );

        const meldekortBrukerDto = await fetchFraApi(req, 'bruker', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortBrukerDTO>) : null,
        );

        if (!meldekortBrukerDto) {
            return {
                props: {},
                status: 404,
            };
        }

        return meldekortForKjede
            ? {
                  props: {
                      meldekortForKjede: meldekortForKjede,
                      kanSendeInnHelgForMeldekort: meldekortBrukerDto.harSak
                          ? meldekortBrukerDto.kanSendeInnHelgForMeldekort
                          : false,
                  },
              }
            : { props: {}, status: 404 };
    });

    routeBuilder.routes(siteRoutes.deltakelse, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );

        const meldekortBrukerDto = await fetchFraApi(req, 'bruker', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortBrukerDTO>) : null,
        );

        if (!meldekortBrukerDto) {
            return {
                props: {},
                status: 404,
            };
        }

        return meldekortDto
            ? {
                  props: {
                      brukersMeldekort: tilMeldekortUtfylling(meldekortDto),
                      kanFylleUtHelg: meldekortBrukerDto.harSak
                          ? meldekortBrukerDto.kanSendeInnHelgForMeldekort
                          : false,
                  },
              }
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

        const meldekortBrukerDto = await fetchFraApi(req, 'bruker', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortBrukerDTO>) : null,
        );

        if (!meldekortBrukerDto) {
            return {
                props: {},
                status: 404,
            };
        }

        return meldekortDto
            ? {
                  props: {
                      brukersMeldekort: tilMeldekortUtfylling(meldekortDto),
                      kanFylleUtHelg: meldekortBrukerDto.harSak
                          ? meldekortBrukerDto.kanSendeInnHelgForMeldekort
                          : false,
                  },
              }
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

        const meldekortBrukerDto = await fetchFraApi(req, 'bruker', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortBrukerDTO>) : null,
        );

        if (!meldekortBrukerDto) {
            return {
                props: {},
                status: 404,
            };
        }

        return meldekortDto
            ? {
                  props: {
                      brukersMeldekort: tilMeldekortUtfylling(meldekortDto),
                      kanFylleUtHelg: meldekortBrukerDto.harSak
                          ? meldekortBrukerDto.kanSendeInnHelgForMeldekort
                          : false,
                  },
              }
            : { props: {}, status: 404 };
    });

    routeBuilder.routes(siteRoutes.sendInn, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;
        const meldekortDto = await fetchFraApi(req, `meldekort/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<Meldekort>) : null),
        );

        const meldekortBrukerDto = await fetchFraApi(req, 'bruker', 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<MeldekortBrukerDTO>) : null,
        );

        if (!meldekortBrukerDto) {
            return {
                props: {},
                status: 404,
            };
        }

        return meldekortDto
            ? {
                  props: {
                      brukersMeldekort: tilMeldekortUtfylling(meldekortDto),
                      kanFylleUtHelg: meldekortBrukerDto.harSak
                          ? meldekortBrukerDto.kanSendeInnHelgForMeldekort
                          : false,
                  },
              }
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

        const meldekortDto = await fetchFraApi(req, `korrigering/${meldekortId}`, 'GET').then(
            (res) => (res?.ok ? (res.json() as Promise<KorrigerMeldekortResponse>) : null),
        );

        return meldekortDto
            ? {
                  props: {
                      forrigeMeldekort: tilMeldekortUtfylling(meldekortDto.forrigeMeldekort),
                      tilUtfylling: meldekortDto.tilUtfylling,
                  },
              }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.korrigerMeldekortOppsummering, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;

        const response = await fetchFraApi(req, `korrigering/${meldekortId}`, 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<KorrigerMeldekortResponse>) : null,
        );

        return response
            ? { props: { originaleMeldekort: tilMeldekortUtfylling(response.forrigeMeldekort) } }
            : {
                  props: {},
                  status: 404,
              };
    });

    routeBuilder.routes(siteRoutes.korrigerMeldekortKvittering, async (req, fetchFraApi) => {
        const { meldekortId } = req.params;

        const response = await fetchFraApi(req, `korrigering/${meldekortId}`, 'GET').then((res) =>
            res?.ok ? (res.json() as Promise<KorrigerMeldekortResponse>) : null,
        );

        return response
            ? { props: { originaleMeldekort: tilMeldekortUtfylling(response.forrigeMeldekort) } }
            : {
                  props: {},
                  status: 404,
              };
    });
};
