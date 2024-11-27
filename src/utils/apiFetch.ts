import { NextApiRequest } from 'next';
import { getOboToken } from '@utils/auth';

export const fetchFraApi = async (req: NextApiRequest, path: string) => {
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
