import { Forside } from '@components/forside/Forside';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await fetch(`http://localhost:3050/tiltakspenger/meldekort/api/neste`).then(
        (res) => res.json()
    );

    return {
        props: { nesteMeldekortIds: response?.ids },
    };
};

export default Forside;
