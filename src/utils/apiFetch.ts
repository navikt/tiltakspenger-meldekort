import { getFnr, getOboToken } from '@utils/auth';
import { MeldekortTilUtfyllingDto } from '@typer/meldekort-dto';
import { NextRequestType } from '@typer/request';

export const fetchFraApi = async <ResponseType = unknown>(
    req: NextRequestType,
    path: string
): Promise<ResponseType | null> => {
    const oboToken = await getOboToken(req);

    const url = `${process.env.MELDEKORT_API_URL}${path}`;

    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${oboToken}`,
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json() as ResponseType;
            }

            console.error(`Feil-response fra meldekort-api ${url} - ${res.status}`);

            return null;
        })
        .catch((e) => {
            console.error(`Exception ved fetch fra meldekort-api - ${e}`);
            return null;
        });
};

export const fetchSisteMeldekort = async (req: NextRequestType) => {
    const fnr = getFnr(req);

    return fetchFraApi<MeldekortTilUtfyllingDto>(req, `/meldekort/siste?fnr=${fnr}`);
};

export const fetchGenererMeldekort = async (req: NextRequestType) => {
    const fnr = getFnr(req);

    return fetchFraApi<MeldekortTilUtfyllingDto>(req, `/meldekort/generer?fnr=${fnr}`);
};
