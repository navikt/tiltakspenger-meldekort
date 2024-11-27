import { Forside } from '@components/forside/Forside';
import { GetServerSideProps } from 'next';
import { fetchSisteMeldekort } from '@utils/apiFetch';

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const meldekort = await fetchSisteMeldekort(req);

    return {
        props: { nesteMeldekortId: meldekort?.id ?? null },
    };
};

export default Forside;
