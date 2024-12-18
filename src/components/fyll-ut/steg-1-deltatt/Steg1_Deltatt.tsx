import { useState } from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { BodyLong, Button, Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { Tekst } from '@components/tekst/Tekst';
import { DeltattHjelp } from '@components/fyll-ut/hjelp/DeltattHjelp';

import style from './Steg1_Deltatt.module.css';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';

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
            <DeltattHjelp />
            <TekstParagrafer id={'deltattStegHeader'} weight={'semibold'} />
            <TekstParagrafer id={'deltattStegIngress'} />
            <Kalender meldekort={meldekortUtfylling} steg={'deltatt'} />
            <BodyLong className={style.teller} weight={'semibold'}>
                {dagerDeltattString}
            </BodyLong>
            <RadioGroup
                legend={<Tekst id={'deltattStegFraværSpørsmål'} />}
                value={fraværStatus}
                onChange={(value: FraværStatus) => {
                    setFraværStatus(value);
                }}
                className={style.fraværValg}
            >
                <Radio value={'medFravær'}>
                    <Tekst id={'deltattStegFraværJa'} />
                </Radio>
                <Radio value={'utenFravær'}>
                    <Tekst id={'deltattStegFraværNei'} />
                </Radio>
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
