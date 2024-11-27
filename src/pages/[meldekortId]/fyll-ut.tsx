import { FyllUt } from '@components/fyll-ut/FyllUt';
import { GetServerSideProps } from 'next';
import {
    MeldekortDagStatus,
    MeldekortStatus,
    MeldekortUtfylling,
} from '@typer/meldekort-utfylling';

const fraOgMed = '2024-11-11';
const tilOgMed = '2024-11-24';

export const dummyMeldekort: MeldekortUtfylling = {
    id: 'meldekort_01JBVJW64CR5CQDB7AV6NMGEDS',
    periode: {
        fraOgMed,
        tilOgMed,
    },
    status: MeldekortStatus.TilUtfylling,
    meldekortDager: Array.from({ length: 14 }).map((_, index) => {
        return {
            dato: `2024-11-${11 + index}`,
            index,
            status: MeldekortDagStatus.IkkeRegistrert,
        };
    }),
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: { meldekort: dummyMeldekort },
    };
};

export default FyllUt;
