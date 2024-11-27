import { NextApiHandler } from 'next';
import { fetchGenererMeldekort } from '@utils/apiFetch';

const handler: NextApiHandler = async (req, res) => {
    const apiResponse = fetchGenererMeldekort(req);
    res.json(apiResponse);
};

export default handler;
