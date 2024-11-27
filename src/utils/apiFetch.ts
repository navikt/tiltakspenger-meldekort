import { getFnr, getOboToken } from '@utils/auth';
import { MeldekortTilUtfyllingDto } from '@typer/meldekort-dto';
import { NextRequestType } from '@typer/request';

export const fetchFraApi = async (req: NextRequestType, path: string) => {
    const oboToken = getOboToken(req);

    return fetch(`${process.env.MELDEKORT_API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${oboToken}`,
        },
    }).catch((e) => {
        console.error(`Failed to fetch from meldekort-api - ${e}`);
        return null;
    });
};

export const fetchSisteMeldekort = async (req: NextRequestType) => {
    const fnr = getFnr(req);

    return fetchFraApi(req, `/meldekort/siste?fnr=${fnr}`).then((apiRes) =>
        apiRes?.ok ? (apiRes.json() as Promise<MeldekortTilUtfyllingDto>) : null
    );
};

export const fetchGenererMeldekort = async (req: NextRequestType)=> {
    const fnr = getFnr(req);

    return fetchFraApi(req, `/meldekort/generer?fnr=${fnr}`).then((apiRes) =>
        apiRes?.ok ? (apiRes.json() as Promise<MeldekortTilUtfyllingDto>) : null
    );
}