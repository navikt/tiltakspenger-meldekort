import { BodyLong } from '@navikt/ds-react';
import Link from 'next/link';
import { Tekst } from '@/src/components/tekst/Tekst';
import { TilUtfylling } from '@/src/components/forside/til-utfylling/TilUtfylling';

export const Forside = () => {
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
            <TilUtfylling />
            <Link href={'/innsendt'}>
                <Tekst id={'seOgEndre'} />
            </Link>
        </>
    );
};
