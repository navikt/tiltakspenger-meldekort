import { Request, RequestHandler } from 'express';
import { MeldekortInnsendingDto } from '@client/typer/meldekort-dto';
import { fetchFraApi } from '@fetch/apiFetch';

export const fetchSendInnMeldekort = async (req: Request, meldekort: MeldekortInnsendingDto) => {
    return fetchFraApi(req, 'send-inn', 'POST', JSON.stringify(meldekort));
};

export const sendInnRoute: RequestHandler = async (req, res) => {
    const body = req.body as MeldekortInnsendingDto;

    const response = await fetchSendInnMeldekort(req, body);

    res.status(response?.status ?? 500).send(response?.statusText ?? 'Ukjent feil!');
};
