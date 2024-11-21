import { NextApiHandler } from 'next';
import { getToken, requestOboToken, validateToken } from '@navikt/oasis';

const testHandler: NextApiHandler = async (req, res) => {
    const token = getToken(req);
    if (!token) {
        return res.status(401).send("Oh no, couldn't get token!");
    }

    const validation = await validateToken(token);
    if (!validation.ok) {
        return res
            .status(401)
            .send(`Oh no, couldn't validate token! ${validation.errorType} - ${validation.error}`);
    }

    const oboToken = await requestOboToken(token, process.env.MELDEKORT_API_SCOPE);
    if (!oboToken.ok) {
        return res.status(401).send(`Oh no, couldn't get obo token! ${oboToken.error}`);
    }

    const meldekortApiResponse = await fetch(`${process.env.MELDEKORT_API_URL}/test`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${oboToken.token}`,
        },
    }).catch((e) => {
        console.error(`Failed to fetch from meldekort-api! ${e}`);
        return null;
    });

    if (!meldekortApiResponse) {
        return res.status(401).send('Oh no, failed to fetch from meldekort-api!');
    }

    return res.send({
        status: meldekortApiResponse.status,
        text: await meldekortApiResponse.text(),
    });
};

export default testHandler;
