import { NextApiHandler } from 'next';

const nesteMeldekortIdHandler: NextApiHandler = (req, res) => {
    return res.send({
        ids: ['asdf']
    });
};

export default nesteMeldekortIdHandler;
