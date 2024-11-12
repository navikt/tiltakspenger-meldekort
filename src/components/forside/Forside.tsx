import { BodyLong, Button, Checkbox } from '@navikt/ds-react';

import style from './Forside.module.css';
import Link from 'next/link';

export const Forside = () => {
    const nesteMeldekortId = 'asdf';

    return (
        <>
            <BodyLong spacing={true}>
                {
                    'For å motta tiltakspenger må du være registrert på et tiltak hos NAV og sende meldekort hver 14. dag.'
                }
            </BodyLong>
            <BodyLong spacing={true}>
                {
                    'På meldekortet må du registrere om du har jobbet mens du var på tiltak, om du har vært syk, om ditt barn eller barnepasser har vært syk, om du har hatt ferie/fravær eller andre grunner til at du ikke har deltatt på tiltak/kurs/utdanning. NAV trenger dette for å beregne hvor mye du skal ha i tiltakspenger.'
                }
            </BodyLong>
            <BodyLong spacing={true}>
                {'Husk at du også må sende meldekort mens du venter på svar på søknaden din.'}
            </BodyLong>
            <BodyLong weight={'semibold'} size={'large'}>
                {'Takk for at du er ærlig!'}
            </BodyLong>
            <BodyLong spacing={true}>
                {'Det er viktig at du gir oss riktige opplysninger.'}
            </BodyLong>
            <Checkbox>
                {'Jeg bekrefter at jeg vil fylle ut meldekortet så riktig som jeg kan'}
            </Checkbox>
            <Button
                className={style.button}
                variant={'primary'}
                href={`/periode/${nesteMeldekortId}/fyll-ut`}
                as={Link}
            >
                {'Neste →'}
            </Button>
            <Link href={'/innsendt'}>
                {'Se og endre innsendte meldekort'}
            </Link>
        </>
    );
};
