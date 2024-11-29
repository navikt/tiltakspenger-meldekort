import { getOboToken } from '@utils/auth';
import { MeldekortInnsendingDto, MeldekortTilUtfyllingDto } from '@typer/meldekort-dto';
import { NextRequestType } from '@typer/request';

const fetchFraApi = async (
    req: NextRequestType,
    path: string,
    method: 'GET' | 'POST',
    body?: BodyInit
) => {
    const oboToken = await getOboToken(req);

    if (!oboToken) {
        console.error('Kunne ikke hente obo token');
        return null;
    }

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
    return fetchFraApi(req, '/meldekort/siste', 'GET').then((res) =>
        res?.ok ? (res.json() as Promise<MeldekortTilUtfyllingDto>) : null
    );
};

export const fetchGenererMeldekort = async (req: NextRequestType) => {
    return fetchFraApi(req, '/meldekort/generer', 'GET').then((res) =>
        res?.ok ? (res.json() as Promise<MeldekortTilUtfyllingDto>) : null
    );
};

export const fetchSendInnMeldekort = async (
    req: NextRequestType,
    meldekort: MeldekortInnsendingDto
) => {
    return fetchFraApi(req, '/meldekort/send-inn', 'POST', JSON.stringify(meldekort));
};