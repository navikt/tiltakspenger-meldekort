import { Request } from 'express';
import { getOboToken } from '@fetch/auth';

const API_BASE_URL = `${process.env.MELDEKORT_API_URL}/meldekort/bruker`;

export const fetchFraApi = async (
    req: Request,
    path: string,
    method: 'GET' | 'POST',
    body?: BodyInit
) => {
    const oboToken = await getOboToken(req);

    if (!oboToken) {
        console.error('Kunne ikke hente obo token');
        return null;
    }

    const url = `${API_BASE_URL}/${path}`;

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

export type FetchFraApi = typeof fetchFraApi;
