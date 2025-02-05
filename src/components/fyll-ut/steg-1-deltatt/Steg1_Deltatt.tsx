import { useState } from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Button, Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { Tekst } from '@components/tekst/Tekst';
import { DeltattHjelp } from '@components/fyll-ut/hjelp/DeltattHjelp';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';

import style from './Steg1_Deltatt.module.css';

type FraværStatus = 'medFravær' | 'utenFravær';

export const Steg1_Deltatt = () => {
    const { meldekortUtfylling, setMeldekortSteg } = useMeldekortUtfylling();

    const [fraværStatus, setFraværStatus] = useState<FraværStatus | null>(null);

    const { harForMangeDagerRegistrert } = antallDagerValidering(meldekortUtfylling);

    return (
        <>
            <DeltattHjelp />
            <TekstParagrafer id={'deltattStegHeader'} weight={'semibold'} />
            <TekstParagrafer id={'deltattStegIngress'} />
            <Kalender meldekort={meldekortUtfylling} steg={'deltatt'} />
            <DagerUtfyltTeller meldekortUtfylling={meldekortUtfylling} className={style.teller} />
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
