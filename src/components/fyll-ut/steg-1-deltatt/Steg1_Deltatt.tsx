import { useEffect, useState } from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Button, Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { Tekst } from '@components/tekst/Tekst';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { DeltattHjelp } from '@components/fyll-ut/steg-1-deltatt/hjelp/DeltattHjelp.tsx';

import style from './Steg1_Deltatt.module.css';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt.tsx';
import { TekstId } from '@tekster/utils.ts';

export const Steg1_Deltatt = () => {
    const [nesteSteg, setNesteSteg] = useState<MeldekortSteg | null>(null);
    const [feil, setFeil] = useState<TekstId | null>(null);

    const { meldekortUtfylling, setMeldekortSteg } = useMeldekortUtfylling();

    const { harForMangeDagerRegistrert } = antallDagerValidering(meldekortUtfylling);

    useEffect(() => {
        if (harForMangeDagerRegistrert) {
            setFeil("forMangeDagerEnkel")
        } else {
            setFeil(null)
        }

    }, [harForMangeDagerRegistrert])

    return (
        <>
            <DeltattHjelp />
            <Kalender meldekort={meldekortUtfylling} steg={'deltatt'} />
            <DagerUtfyltTeller meldekortUtfylling={meldekortUtfylling} className={style.teller} />
            <RadioGroup
                legend={<Tekst id={'deltattStegFraværSpørsmål'} />}
                description={<Tekst id={'deltattStegFraværSpørsmålUndertekst'} />}
                value={nesteSteg}
                error={feil && <Tekst id={feil} />}
                onChange={(value: MeldekortSteg) => {
                    setNesteSteg(value);
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
                onClick={() => {
                    if (harForMangeDagerRegistrert) {
                        setFeil("forMangeDagerEnkel")
                        return;
                    }

                    if (!nesteSteg) {
                        setFeil('deltattStegFraværIkkeValgt')
                        return;
                    }

                    setMeldekortSteg(nesteSteg);
                }}
            >
                {'Neste'}
            </Button>
        </>
    );
};
