import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import React from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { Meldekort } from '@common/typer/MeldekortBruker';

type Props = {
    brukersMeldekort: Meldekort;
    meldekortUtfylling: Meldekort;
    ikkeVisDagTeller?: boolean;
    className?: string;
};

export const DagerUtfyltTeller = React.forwardRef<HTMLDivElement, Props>(
    ({ brukersMeldekort, meldekortUtfylling, className, ikkeVisDagTeller }, ref) => {
        const { harForMangeDagerBesvart, antallDagerBesvart, harForFaDagerBesvart } =
            antallDagerValidering(brukersMeldekort, meldekortUtfylling);
        const { visValideringsfeil } = useMeldekortUtfylling();

        if (visValideringsfeil && antallDagerBesvart === 0) {
            return (
                <Alert className={className} variant={'warning'} ref={ref} tabIndex={-1}>
                    <Tekst id={'ingenDagerFyltUt'} />
                </Alert>
            );
        }

        if (visValideringsfeil && harForFaDagerBesvart) {
            return (
                <Alert className={className} variant={'warning'} ref={ref} tabIndex={-1}>
                    <Tekst
                        id={'forFaDagerBesvart'}
                        resolverProps={{
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
                            maks: brukersMeldekort.maksAntallDager,
                        }}
                    />
                </Alert>
            );
        }

        if (!ikkeVisDagTeller) {
            return (
                <BodyLong className={className} weight={'semibold'}>
                    <Tekst
                        id={'antallDagerBesvart'}
                        resolverProps={{ antall: antallDagerBesvart }}
                    />
                </BodyLong>
            );
        }

        return null;
    },
);

DagerUtfyltTeller.displayName = 'DagerUtfyltTeller';
