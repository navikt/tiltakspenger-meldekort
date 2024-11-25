import { useState } from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { BodyLong, Button, Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';

import style from './Steg1_Deltatt.module.css';

type FraværStatus = 'medFravær' | 'utenFravær';

export const Steg1_Deltatt = () => {
    const { meldekortUtfylling, setMeldekortSteg } = useMeldekortUtfylling();

    const [fraværStatus, setFraværStatus] = useState<FraværStatus | null>(null);

    if (!meldekortUtfylling) {
        console.error('Oh no, fant ingen meldekort!');
        return null;
    }

    const antallDagerDeltatt = meldekortUtfylling.meldekortDager.filter(
        (dag) => dag.status === MeldekortDagStatus.Deltatt
    ).length;

    const dagerDeltattString = `${antallDagerDeltatt} dag${antallDagerDeltatt === 1 ? '' : 'er'} deltatt på tiltak`;

    return (
        <>
            <BodyLong weight={'semibold'}>{'Velg de dagene du deltok på tiltaket'}</BodyLong>
            <BodyLong>
                {'Hvis du har fravær fra tiltaket, kan du legge inn dette i neste steg.'}
            </BodyLong>
            <Kalender steg={'deltatt'} />
            <BodyLong className={style.teller} weight={'semibold'}>
                {dagerDeltattString}
            </BodyLong>
            <RadioGroup
                legend={'Har du hatt fravær fra tiltaket?'}
                value={fraværStatus}
                onChange={(value: FraværStatus) => {
                    setFraværStatus(value);
                }}
                className={style.fraværValg}
            >
                <Radio value={'medFravær'}>{'Ja, jeg har hatt fravær'}</Radio>
                <Radio value={'utenFravær'}>{'Nei, jeg har ikke hatt fravær'}</Radio>
            </RadioGroup>
            <Button
                disabled={!fraværStatus}
                onClick={() => {
                    setMeldekortSteg(fraværStatus === 'medFravær' ? 'fravær' : 'bekreft');
                }}
            >
                {'Neste'}
            </Button>
        </>
    );
};
