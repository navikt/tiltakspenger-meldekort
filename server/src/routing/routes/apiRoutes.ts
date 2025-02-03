import { RequestHandler, Router } from 'express';
import { MeldekortFraBrukerDTO } from '@client/typer/meldekort-dto';
import { fetchFraApi } from '@fetch/apiFetch';

const sendInnRoute: RequestHandler = async (req, res) => {
    const body = req.body as MeldekortFraBrukerDTO;

    const response = await fetchFraApi(req, 'send-inn', 'POST', JSON.stringify(body));

    res.status(response?.status ?? 500).send(response?.statusText ?? 'Ukjent feil!');
};

export const setupApiRoutes = (router: Router) => {
    router.post('/api/send-inn', sendInnRoute);
};
