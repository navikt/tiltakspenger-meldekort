import { Request, RequestHandler } from 'express';
import { MeldekortMottakDto } from '@client/typer/meldekort-dto';
import { fetchFraApi } from '@fetch/apiFetch';
import { SsrRenderer } from '@ssr/htmlRenderer';
import { tilMeldekortUtfylling } from '@fetch/transformMeldekort';

const fetchSisteMeldekort = async (req: Request) => {
    return fetchFraApi(req, 'siste', 'GET').then((res) =>
        res?.ok ? (res.json() as Promise<MeldekortMottakDto>) : null
    );
};

export const forsideRoute =
    (render: SsrRenderer): RequestHandler =>
    async (req, res) => {
        const meldekortDto = await fetchSisteMeldekort(req);

        const html = await render(req.originalUrl, {
            route: 'forside',
            props: { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null },
        });

        res.send(html);
    };
