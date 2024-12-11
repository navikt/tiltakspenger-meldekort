import { AlleMeldekort } from '@components/alle/AlleMeldekort';
import { GetServerSideProps } from 'next';
import { fetchAlleMeldekort } from '@utils/apiFetch';
import { tilMeldekortUtfylling } from '@utils/transformMeldekort';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const alleMeldekort = await fetchAlleMeldekort(req);

    return {
        props: { alleMeldekort: alleMeldekort ? alleMeldekort.map(tilMeldekortUtfylling) : [] },
    };
};

export default AlleMeldekort;
