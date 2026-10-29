import { BodyLong } from '@navikt/ds-react';
import { Infokort } from '@components/infokort/Infokort';
import { Tekst } from '@components/tekst/Tekst';
import { antallDagerValidering } from '@utils/utfyllingValidering';
import React from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Meldekort } from '@meldekort/common/typer/MeldekortBruker';

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
                <Infokort className={className} variant={'advarsel'} ref={ref} tabIndex={-1}>
                    <Tekst id={'ingenDagerFyltUt'} />
                </Infokort>
            );
        }

        if (visValideringsfeil && harForFaDagerBesvart) {
            return (
                <Infokort className={className} variant={'advarsel'} ref={ref} tabIndex={-1}>
                    <Tekst
                        id={'forFaDagerBesvart'}
                        resolverProps={{
                            maks: brukersMeldekort.maksAntallDager,
                        }}
                    />
                </Infokort>
            );
        }
        if (harForMangeDagerBesvart) {
            return (
                <Infokort className={className} variant={'advarsel'} ref={ref} tabIndex={-1}>
                    <Tekst
                        id={'forMangeDagerBesvart'}
                        resolverProps={{
                            maks: brukersMeldekort.maksAntallDager,
                        }}
                    />
                </Infokort>
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
