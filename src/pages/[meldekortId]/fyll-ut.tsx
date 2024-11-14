import { FyllUt } from '@components/fyll-ut/FyllUt';
import { GetServerSideProps } from 'next';
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

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: { meldekort: dummyMeldekort },
    };
};

export default FyllUt;
