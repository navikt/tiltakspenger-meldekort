import { Forside } from '@components/forside/Forside';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: { nesteMeldekortIds: ['asdf'] },
    };
};

export default Forside;
