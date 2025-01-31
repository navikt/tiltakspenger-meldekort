import { Request } from 'express';
import { SsrRenderer } from '@ssr/htmlRenderer';
import { RequestHandler } from 'express';
import { tilMeldekortUtfylling } from '@client/utils/transformMeldekort';
import { MeldekortMottakDto } from '@client/typer/meldekort-dto';
import { fetchFraApi } from '@fetch/apiFetch';

const fetchAlleMeldekort = async (req: Request) => {
    return fetchFraApi(req, 'alle', 'GET').then((res) =>
        res?.ok ? (res.json() as Promise<MeldekortMottakDto[]>) : null
    );
};

export const seAlleRoute =
    (render: SsrRenderer): RequestHandler =>
    async (req, res) => {
        const alleMeldekort = await fetchAlleMeldekort(req);

        const html = await render(req.originalUrl, {
            route: 'seAlle',
            props: { alleMeldekort: alleMeldekort ? alleMeldekort.map(tilMeldekortUtfylling) : [] },
        });

        res.send(html);
    };
