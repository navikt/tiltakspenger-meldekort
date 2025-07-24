import { RequestHandler, Router } from 'express';
import { MeldekortFraBrukerDTO } from '@common/typer/meldekort-dto';
import { FetchFraApi, fetchFraApi } from '@fetch/apiFetch';
import { fetchFraApiMock } from '@fetch/apiFetchMock';
import { brukerTesterPågår, isProd } from '@utils/env';

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
        const korrigerteDager = req.body as { dato: string; status: string }[];

        const response = await fetcher(
            req,
            'korrigerte-dager',
            'POST',
            JSON.stringify(korrigerteDager),
        );

        res.status(response?.status ?? 500).send(response?.statusText ?? 'Ukjent feil!');
    };

export const setupApiRoutes = (router: Router) => {
    router.post('/api/send-inn', sendInnRoute(fetchFraApi));

    if (!isProd() || brukerTesterPågår()) {
        router.post('/demo/api/send-inn', sendInnRoute(fetchFraApiMock));
    }

    router.post('/api/korrigerte-dager', korrigerteDagerRoute(fetchFraApi));

    if (!isProd() || brukerTesterPågår()) {
        router.post('/demo/api/korrigerte-dager', korrigerteDagerRoute(fetchFraApiMock));
    }
};
