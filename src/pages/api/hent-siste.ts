import { NextApiHandler } from 'next';
import { fetchFraApi } from '@utils/apiFetch';
import { getFnrFraToken } from '@utils/auth';

const hentSisteHandler: NextApiHandler = async (req, res) => {
    const fnr = getFnrFraToken(req);
    console.log(`Fnr: ${fnr}`);

    const apiResponse = await fetchFraApi(req, `/meldekort/siste?fnr=${fnr}`).then((apiRes) =>
        apiRes?.ok ? apiRes.json() : null
    );

    res.json(apiResponse);
};

export default hentSisteHandler;
