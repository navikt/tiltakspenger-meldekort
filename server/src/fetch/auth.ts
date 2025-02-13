import { getToken, parseIdportenToken, requestOboToken, validateToken } from '@navikt/oasis';
import { Request } from 'express';

export const getOboToken = async (req: Request) => {
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

export const getFnr = (req: Request) => {
    const token = getToken(req);
    if (!token) {
        return null;
    }

    const pid = parseIdportenToken(token);

    return pid.ok ? pid.pid : null;
};
