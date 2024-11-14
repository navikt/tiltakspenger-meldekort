import { BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling';
import { Lenke } from '@components/lenke/Lenke';

type Props = {
    nesteMeldekortIds: string[];
};

export const Forside = ({ nesteMeldekortIds }: Props) => {
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
            <TilUtfylling nesteMeldekortId={nesteMeldekortIds[0]} />
            <Lenke href={'/innsendt'}>
                <Tekst id={'seOgEndre'} />
            </Lenke>
        </>
    );
};
