import { RequestHandler, Router } from 'express';
import { FetchFraApi, fetchFraApi } from '@fetch/apiFetch';
import { fetchFraApiMock } from '@fetch/apiFetchMock';
import { brukerTesterPågår, isProd } from '@utils/env';
import { KorrigerMeldekortRequest } from '@common/typer/KorrigerMeldekort';
import { appConfig } from '@common/appConfig';
import { MeldekortUtfyltDTO } from '@common/typer/BrukersMeldekortUtfylling.ts';

const sendInnRoute =
    (fetcher: FetchFraApi): RequestHandler =>
    async (req, res) => {
        const body = req.body as MeldekortUtfyltDTO;

        const response = await fetcher(req, 'send-inn', 'POST', JSON.stringify(body));

        const responseText = response?.text ? await response.text() : null;

        res.status(response?.status ?? 500).send(responseText);
    };

const korrigerteDagerRoute =
    (fetcher: FetchFraApi): RequestHandler =>
    async (req, res) => {
        const request = req.body as KorrigerMeldekortRequest;

        const response = await fetcher(
            req,
            `${request.meldekortId}/korriger`,
            'PATCH',
            JSON.stringify(request.korrigerteDager),
        );

        const responseText = response?.text ? await response.text() : null;

        res.status(response?.status ?? 500).send(responseText);
    };

export const setupApiRoutes = (router: Router) => {
    router.post('/api/send-inn', sendInnRoute(fetchFraApi));
    router.patch('/api/korriger', korrigerteDagerRoute(fetchFraApi));

    if (!isProd() || brukerTesterPågår()) {
        router.post(`${appConfig.demoRoutePrefix}/api/send-inn`, sendInnRoute(fetchFraApiMock));
        router.patch(
            `${appConfig.demoRoutePrefix}/api/korriger`,
            korrigerteDagerRoute(fetchFraApiMock),
        );
    }
};
