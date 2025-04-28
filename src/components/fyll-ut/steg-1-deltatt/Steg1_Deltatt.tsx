import { useEffect, useState } from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { Tekst } from '@components/tekst/Tekst';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { DeltattHjelp } from '@components/fyll-ut/steg-1-deltatt/hjelp/DeltattHjelp.tsx';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt.tsx';
import {
    MeldekortDagStatus,
    MeldekortUtfylling,
} from '../../../../commonSrc/typer/meldekort-utfylling.ts';
import { TekstId } from '@tekster/typer.ts';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';

import style from './Steg1_Deltatt.module.css';

export const Steg1_Deltatt = () => {
    const [nesteStegValg, setNesteStegValg] = useState<MeldekortSteg | null>(null);
    const [feil, setFeil] = useState<TekstId | null>(null);

    const { meldekortUtfylling, setMeldekortSteg, setMeldekortUtfylling } = useMeldekortUtfylling();

    const { harForMangeDagerRegistrert, harIngenDagerRegistrert } =
        antallDagerValidering(meldekortUtfylling);

    useEffect(() => {
        setFeil(null);
    }, [nesteStegValg, meldekortUtfylling]);

    useEffect(() => {
        setMeldekortUtfylling(fjernFravær(meldekortUtfylling));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <DeltattHjelp />
            <Kalender meldekort={meldekortUtfylling} steg={'deltatt'} />
            <DagerUtfyltTeller meldekortUtfylling={meldekortUtfylling} className={style.teller} />
            <RadioGroup
                legend={<Tekst id={'deltattStegFraværSpørsmål'} />}
                description={<Tekst id={'deltattStegFraværSpørsmålUndertekst'} />}
                value={nesteStegValg}
                error={feil && <Tekst id={feil} />}
                onChange={(value: MeldekortSteg) => {
                    setNesteStegValg(value);
                }}
                className={style.fraværValg}
            >
                <Radio value={'fravær'}>
                    <Tekst id={'deltattStegFraværJa'} />
                </Radio>
                <Radio value={'bekreft'}>
                    <Tekst id={'deltattStegFraværNei'} />
                </Radio>
            </RadioGroup>
            <FlashingButton
                onClick={() => {
                    if (harForMangeDagerRegistrert) {
                        setFeil('forMangeDagerEnkel');
                        return false;
                    }
                    if (harIngenDagerRegistrert && nesteStegValg !== 'fravær') {
                        setFeil('ingenDagerDeltatt');
                        return false;
                    }
                    if (!nesteStegValg) {
                        setFeil('deltattStegFraværIkkeValgt');
                        return false;
                    }

                    setMeldekortSteg(nesteStegValg);
                    setFeil(null);
                    return true;
                }}
            >
                <Tekst id={'neste'} />
            </FlashingButton>
        </>
    );
};

const fjernFravær = (meldekortUtfylling: MeldekortUtfylling) => ({
    ...meldekortUtfylling,
    dager: meldekortUtfylling.dager.map((dag) => ({
        ...dag,
        status: dagStatusMedFravær.has(dag.status)
            ? MeldekortDagStatus.IKKE_REGISTRERT
            : dag.status,
    })),
});
