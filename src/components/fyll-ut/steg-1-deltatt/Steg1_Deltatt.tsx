import React, { useEffect, useRef, useState } from 'react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { Tekst } from '@components/tekst/Tekst';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { DeltattHjelp } from '@components/fyll-ut/steg-1-deltatt/hjelp/DeltattHjelp.tsx';
import {
    MeldekortDagStatus,
    MeldekortSteg,
    MeldekortUtfylling,
} from '../../../../commonSrc/typer/meldekort-utfylling.ts';
import { TekstId } from '@tekster/typer.ts';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';

import style from './Steg1_Deltatt.module.css';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { useRouting } from '@routing/useRouting.ts';
import { Undertekst } from '@components/page-header/Undertekst.tsx';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg1_Deltatt = ({ meldekort }: SSRProps) => {
    const { meldekortUtfylling, setMeldekortUtfylling, setForrigeSteg, getUndertekster } =
        useMeldekortUtfylling();
    // Steg 1 sørger for at meldekortet som skal fylles ut blir lastet inn i context (via SSR)
    useEffect(() => {
        if (meldekort) {
            setMeldekortUtfylling(meldekort);
        }
    }, [meldekort, setMeldekortUtfylling]);

    const [nesteStegValg, setNesteStegValg] = useState<MeldekortSteg | null>(null);
    const [feil, setFeil] = useState<TekstId | null>(null);

    const ref = useRef<HTMLDivElement>(null);
    const { navigate } = useRouting();

    useEffect(() => {
        if (meldekortUtfylling) {
            scrollTo(0, 0);
            ref.current?.focus();
            setMeldekortUtfylling(fjernFravær(meldekortUtfylling));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFeil(null);
    }, [nesteStegValg, meldekortUtfylling]);

    if (!meldekortUtfylling) {
        return null;
    }

    const { harForMangeDagerRegistrert, harIngenDagerRegistrert } =
        antallDagerValidering(meldekortUtfylling);
    const undertekster = getUndertekster();

    const nesteStegUrl =
        nesteStegValg === 'fravær'
            ? `/${meldekortUtfylling.id}/fraver`
            : `/${meldekortUtfylling.id}/send-inn`;

    return (
        <div ref={ref} tabIndex={-1} className={style.wrapper}>
            <PageHeader
                tekstId={'deltattTittel'}
                underTekst={
                    <div className={style.undertekstWrapper}>
                        <Undertekst tekst={undertekster.ukerTekst} weight={'semibold'} />
                        <Undertekst tekst={undertekster.datoerTekst} />
                    </div>
                }
            />
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
                    setFeil(null);
                    setForrigeSteg?.(nesteStegValg);
                    navigate(nesteStegUrl);
                    return true;
                }}
            >
                <Tekst id={'neste'} />
            </FlashingButton>
        </div>
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
