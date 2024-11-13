import { FyllUt } from '@components/fyll-ut/FyllUt';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const meldekort = await fetch(
        `http://localhost:3050/tiltakspenger/meldekort/api/meldekort?id=${context.params?.meldekortId}`
    ).then((res) => res.json());

    return {
        props: { meldekort },
    };
};

export default FyllUt;
