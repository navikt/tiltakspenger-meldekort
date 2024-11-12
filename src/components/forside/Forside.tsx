import { BodyLong, Button, Checkbox } from '@navikt/ds-react';

import style from './Forside.module.css';
import Link from 'next/link';
import { Tekst } from '@/src/components/tekst/Tekst';

export const Forside = () => {
    const nesteMeldekortId = 'asdf';

    return (
        <>
            <BodyLong spacing={true}>
                <Tekst id={'forsideIngress1'} />
            </BodyLong>
            <BodyLong spacing={true}>
                <Tekst id={'forsideIngress2'} />
            </BodyLong>
            <BodyLong spacing={true}>
                <Tekst id={'forsideIngress3'} />
            </BodyLong>
            <BodyLong weight={'semibold'} size={'large'}>
                <Tekst id={'forsideTakk'} />
            </BodyLong>
            <BodyLong spacing={true}>
                <Tekst id={'forsideOpplysninger'} />
            </BodyLong>
            <Checkbox>
                <Tekst id={'forsideBekrefter'} />
            </Checkbox>
            <Button
                className={style.button}
                variant={'primary'}
                href={`/periode/${nesteMeldekortId}/fyll-ut`}
                as={Link}
            >
                <Tekst id={'neste'} />
            </Button>
            <Link href={'/innsendt'}>
                <Tekst id={'seOgEndre'} />
            </Link>
        </>
    );
};
