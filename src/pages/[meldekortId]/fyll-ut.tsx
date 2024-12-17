import { FyllUt } from '@components/fyll-ut/FyllUt';
import { GetServerSideProps } from 'next';
import { fetchSisteMeldekort } from '@utils/apiFetch';
import { tilMeldekortUtfylling } from '@utils/transformMeldekort';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const sisteMeldekort = await fetchSisteMeldekort(req);

    if (!sisteMeldekort) {
        return {
            notFound: true,
        };
    }

    return {
        props: { meldekort: tilMeldekortUtfylling(sisteMeldekort) },
    };
};

export default FyllUt;
