import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import React from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';

type Props = {
    meldekortUtfylling: MeldekortUtfylling;
    className?: string;
};

export const DagerUtfyltTeller = React.forwardRef<HTMLDivElement, Props>(
    ({ meldekortUtfylling, className }, ref) => {
        const { harForMangeDagerBesvart, antallDagerBesvart, harForFaDagerBesvart } =
            antallDagerValidering(meldekortUtfylling);
        const { visValideringsfeil } = useMeldekortUtfylling();

        if (visValideringsfeil && harForFaDagerBesvart) {
            return (
                <Alert className={className} variant={'warning'} ref={ref} tabIndex={-1}>
                    <Tekst
                        id={'forFaDagerBesvart'}
                        resolverProps={{
                            antall: antallDagerBesvart,
                            maks: meldekortUtfylling.maksAntallDager,
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
                            maks: meldekortUtfylling.maksAntallDager,
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
    }
);

DagerUtfyltTeller.displayName = 'DagerUtfyltTeller';
