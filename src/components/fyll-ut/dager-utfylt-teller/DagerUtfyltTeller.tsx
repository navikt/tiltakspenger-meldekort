import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';

type Props = {
    meldekortUtfylling: MeldekortUtfylling;
    className?: string;
};

export const DagerUtfyltTeller = ({ meldekortUtfylling, className }: Props) => {
    const { harForMangeDagerRegistrert, antallDagerRegistrert } =
        antallDagerValidering(meldekortUtfylling);

    return harForMangeDagerRegistrert ? (
        <Alert className={className} variant={'warning'}>
            <Tekst
                id={'forMangeDagerRegistrert'}
                resolverProps={{
                    antall: antallDagerRegistrert,
                    maks: meldekortUtfylling.maksAntallDager,
                }}
            />
        </Alert>
    ) : (
        <BodyLong className={className} weight={'semibold'}>
            <Tekst
                id={'antallDagerRegistrert'}
                resolverProps={{ antall: antallDagerRegistrert }}
            />
        </BodyLong>
    );
};
