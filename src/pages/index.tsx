import { Forside } from '@components/forside/Forside';
import { GetServerSideProps } from 'next';
import { fetchSisteMeldekort } from '@utils/apiFetch';
import { tilMeldekortUtfylling } from '@utils/transformMeldekort';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const meldekortDto = await fetchSisteMeldekort(req);

    return {
        props: { meldekort: meldekortDto ? tilMeldekortUtfylling(meldekortDto) : null },
    };
};

export default Forside;
