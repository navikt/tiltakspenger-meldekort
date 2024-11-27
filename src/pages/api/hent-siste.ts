import { NextApiHandler } from 'next';
import { fetchFraApi } from '@utils/apiFetch';
import { getFnr } from '@utils/auth';

const hentSisteHandler: NextApiHandler = async (req, res) => {
    const fnr = getFnr(req);

    const apiResponse = await fetchFraApi(req, `/meldekort/siste?fnr=${fnr}`).then((apiRes) =>
        apiRes?.ok ? apiRes.json() : null
    );

    res.json(apiResponse);
};

export default hentSisteHandler;
