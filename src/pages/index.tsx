import { Forside } from '@components/forside/Forside';
import { GetServerSideProps } from 'next';
import { dummyMeldekort } from '@pages/[meldekortId]/fyll-ut';

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: { nesteMeldekortIds: [dummyMeldekort.id] },
    };
};

export default Forside;
