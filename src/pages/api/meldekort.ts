import { NextApiHandler } from 'next';
import { MeldekortStatus, MeldekortUtfylling } from '@typer/meldekort-utfylling';

const fraOgMed = '2024-11-11';
const tilOgMed = '2024-11-24';

const dummyMeldekort: MeldekortUtfylling = {
    id: 'asdf',
    periode: {
        fraOgMed,
        tilOgMed,
    },
    status: MeldekortStatus.TilUtfylling,
    kanSendes: true,
    meldekortDager: Array.from({ length: 14 }).map((_, index) => {
        return {
            dato: `2024-11-${11 + index}`,
            index,
            status: { deltattValg: 'ikkeValgt' },
        };
    }),
};

const meldekortMock: Record<string, MeldekortUtfylling> = {
    asdf: dummyMeldekort,
};

const meldekortHandler: NextApiHandler = (req, res) => {
    const { id } = req.query;

    if (typeof id !== 'string') {
        return res.status(400).send({ msg: 'Parameter "id" er påkrevd' });
    }

    const meldekort = meldekortMock[id];

    if (!meldekort) {
        return res.status(404).send({ msg: `Fant ikke meldekort med id ${id}` });
    }

    return res.send(dummyMeldekort);
};

export default meldekortHandler;
