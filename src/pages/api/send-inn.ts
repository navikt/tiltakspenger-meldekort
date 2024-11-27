import { NextApiHandler } from 'next';
import { fetchSendInnMeldekort } from '@utils/apiFetch';

const handler: NextApiHandler = async (req, res) => {
    const meldekort = req.body;
    if (!meldekort) {
        return res.status(400);
    }

    const apiResponse = await fetchSendInnMeldekort(req, JSON.parse(meldekort));

    res.status(apiResponse?.status || 500).end();
};

export default handler;
