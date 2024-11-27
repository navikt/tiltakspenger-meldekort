import { getFnr, getOboToken } from '@utils/auth';
import { MeldekortInnsendingDto, MeldekortTilUtfyllingDto } from '@typer/meldekort-dto';
import { NextRequestType } from '@typer/request';

const fetchFraApi = async (
    req: NextRequestType,
    path: string,
    method: 'GET' | 'POST',
    body?: BodyInit
) => {
    const oboToken = await getOboToken(req);

    const url = `${process.env.MELDEKORT_API_URL}${path}`;

    return fetch(url, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${oboToken}`,
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.error(`Feil-response fra meldekort-api ${url} - ${res.status}`);
            }

            return res;
        })
        .catch((e) => {
            console.error(`Exception ved fetch fra meldekort-api - ${e}`);
            return null;
        });
};

export const fetchSisteMeldekort = async (req: NextRequestType) => {
    const fnr = getFnr(req);

    return fetchFraApi(req, `/meldekort/siste?fnr=${fnr}`, 'GET').then((res) =>
        res?.ok ? (res.json() as Promise<MeldekortTilUtfyllingDto>) : null
    );
};

export const fetchGenererMeldekort = async (req: NextRequestType) => {
    const fnr = getFnr(req);

    return fetchFraApi(req, `/meldekort/generer?fnr=${fnr}`, 'GET').then((res) =>
        res?.ok ? (res.json() as Promise<MeldekortTilUtfyllingDto>) : null
    );
};

export const fetchSendInnMeldekort = async (
    req: NextRequestType,
    meldekort: MeldekortInnsendingDto
) => {
    return fetchFraApi(
        req,
        '/meldekort/send-inn',
        'POST',
        JSON.stringify(meldekort)
    );
};
