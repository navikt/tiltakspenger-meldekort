import { useState } from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling.ts';
import { Alert, BodyLong, Button, Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { Tekst } from '@components/tekst/Tekst';
import { DeltattHjelp } from '@components/fyll-ut/hjelp/DeltattHjelp';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';

import style from './Steg1_Deltatt.module.css';

type FraværStatus = 'medFravær' | 'utenFravær';

export const Steg1_Deltatt = () => {
    const { meldekortUtfylling, setMeldekortSteg, harForMangeDagerRegistrert } =
        useMeldekortUtfylling();

    const [fraværStatus, setFraværStatus] = useState<FraværStatus | null>(null);

    const antallDagerRegistrert = meldekortUtfylling.dager.filter(
        (dag) => dag.status !== MeldekortDagStatus.IkkeRegistrert
    ).length;

    const dagerDeltattString = `${antallDagerRegistrert} dag${antallDagerRegistrert === 1 ? '' : 'er'} deltatt på tiltak`;

    return (
        <>
            <DeltattHjelp />
            <TekstParagrafer id={'deltattStegHeader'} weight={'semibold'} />
            <TekstParagrafer id={'deltattStegIngress'} />
            <Kalender meldekort={meldekortUtfylling} steg={'deltatt'} />
            {harForMangeDagerRegistrert ? (
                <Alert className={style.teller} variant={'warning'}>
                    {`Du har fylt ut ${antallDagerRegistrert} dager. Det er maks ${meldekortUtfylling.maksAntallDager} dager med tiltak i denne perioden.`}
                </Alert>
            ) : (
                <BodyLong className={style.teller} weight={'semibold'}>
                    {dagerDeltattString}
                </BodyLong>
            )}
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
                disabled={!fraværStatus || harForMangeDagerRegistrert}
                onClick={() => {
                    setMeldekortSteg(fraværStatus === 'medFravær' ? 'fravær' : 'bekreft');
                }}
            >
                {'Neste'}
            </Button>
        </>
    );
};
