import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import React from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { BrukersMeldekortUtfylling } from '@common/typer/BrukersMeldekortUtfylling';
import { Meldekort } from '@common/typer/MeldekortBruker';

type Props = {
    brukersMeldekort: Meldekort;
    meldekortUtfylling: BrukersMeldekortUtfylling;
    className?: string;
};

export const DagerUtfyltTeller = React.forwardRef<HTMLDivElement, Props>(
    ({ brukersMeldekort, meldekortUtfylling, className }, ref) => {
        const { harForMangeDagerBesvart, antallDagerBesvart, harForFaDagerBesvart } =
            antallDagerValidering(brukersMeldekort, meldekortUtfylling);
        const { visValideringsfeil } = useMeldekortUtfylling();

        if (visValideringsfeil && harForFaDagerBesvart) {
            return (
                <Alert className={className} variant={'warning'} ref={ref} tabIndex={-1}>
                    <Tekst
                        id={'forFaDagerBesvart'}
                        resolverProps={{
                            antall: antallDagerBesvart,
                            min: brukersMeldekort.minAntallDager,
                            maks: brukersMeldekort.maksAntallDager,
                        }}
                    />
                </Alert>
            );
        }
        if (harForMangeDagerBesvart) {
            return (
                <Alert className={className} variant={'warning'} ref={ref} tabIndex={-1}>
                    <Tekst
                        id={'forMangeDagerBesvart'}
                        resolverProps={{
                            antall: antallDagerBesvart,
                            min: brukersMeldekort.minAntallDager,
                            maks: brukersMeldekort.maksAntallDager,
                        }}
                    />
                </Alert>
            );
        }
        return (
            <BodyLong className={className} weight={'semibold'}>
                <Tekst id={'antallDagerBesvart'} resolverProps={{ antall: antallDagerBesvart }} />
            </BodyLong>
        );
    },
);

DagerUtfyltTeller.displayName = 'DagerUtfyltTeller';
