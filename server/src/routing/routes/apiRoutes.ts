import { RequestHandler, Router } from 'express';
import { MeldekortFraBrukerDTO } from '@common/typer/meldekort-dto';
import { FetchFraApi, fetchFraApi } from '@fetch/apiFetch';
import { fetchFraApiMock } from '@fetch/apiFetchMock';
import { brukerTesterPågår, isProd } from '@utils/env';
import { KorrigerMeldekortRequest } from '@common/typer/KorrigerMeldekort';

const sendInnRoute =
    (fetcher: FetchFraApi): RequestHandler =>
    async (req, res) => {
        const body = req.body as MeldekortFraBrukerDTO;

        const response = await fetcher(req, 'send-inn', 'POST', JSON.stringify(body));

        res.status(response?.status ?? 500).send(response?.statusText ?? 'Ukjent feil!');
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

        res.status(response?.status ?? 500).send(response?.statusText ?? 'Ukjent feil!');
    };

export const setupApiRoutes = (router: Router) => {
    router.post('/api/send-inn', sendInnRoute(fetchFraApi));

    if (!isProd() || brukerTesterPågår()) {
        router.post('/demo/api/send-inn', sendInnRoute(fetchFraApiMock));
    }

    router.patch('/api/korriger', korrigerteDagerRoute(fetchFraApi));

    if (!isProd() || brukerTesterPågår()) {
        router.patch('/demo/api/korriger', korrigerteDagerRoute(fetchFraApiMock));
    }
};
