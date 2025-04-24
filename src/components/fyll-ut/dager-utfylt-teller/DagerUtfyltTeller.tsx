import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import React from 'react';

type Props = {
    meldekortUtfylling: MeldekortUtfylling;
    className?: string;
};

export const DagerUtfyltTeller = React.forwardRef<HTMLDivElement, Props>(
    ({ meldekortUtfylling, className }, ref) => {
        const { harForMangeDagerRegistrert, antallDagerRegistrert } =
            antallDagerValidering(meldekortUtfylling);

        return harForMangeDagerRegistrert ? (
            <Alert className={className} variant={'warning'} ref={ref} tabIndex={-1}>
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
    }
);

DagerUtfyltTeller.displayName = 'DagerUtfyltTeller';
