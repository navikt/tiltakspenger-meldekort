import { getToken, requestOboToken, validateToken } from '@navikt/oasis';
import { Request } from 'express';

const brukFakeAuth =
    process.env.BRUK_LOKAL_FAKE_AUTH === 'true' && process.env.NAIS_CLUSTER_NAME === undefined;

// Ved bruk av fake auth i backend forventes et "token" som også er et fnr
const fakeToken = process.env.LOKAL_FNR ?? '12345678911';

const getOboTokenEkte = async (req: Request) => {
    const token = getToken(req);
    if (!token) {
        console.error('Kunne ikke hente token fra request');
        return null;
    }

    const validation = await validateToken(token);
    if (!validation.ok) {
        console.error(`Token-validering feiled: ${validation.errorType} - ${validation.error}`);
        return null;
    }

    const oboToken = await requestOboToken(token, process.env.MELDEKORT_API_SCOPE);
    if (!oboToken.ok) {
        console.error(`Kunne ikke hente obo token: ${oboToken.error}`);
        return null;
    }

    return oboToken.token;
};

const getOboTokenFake = async () => fakeToken;

export const getOboToken = brukFakeAuth ? getOboTokenFake : getOboTokenEkte;
