import React, { useEffect, useState } from 'react';
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
} from '@common/typer/meldekort-utfylling.ts';
import { TekstId } from '@tekster/typer.ts';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';

import style from './Steg1_Deltatt.module.css';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { useRouting } from '@routing/useRouting.ts';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg1_Deltatt = ({ meldekort }: SSRProps) => {
    const { meldekortUtfylling, setMeldekortUtfylling, setForrigeSteg, getUndertekster } =
        useMeldekortUtfylling();
    const [nesteStegValg, setNesteStegValg] = useState<MeldekortSteg | null>(null);
    const [feil, setFeil] = useState<TekstId | null>(null);
    const { navigate } = useRouting();
    const { fravær, sendInn } = siteRoutes;

    // Steg 1 sørger for at meldekortet som skal fylles ut blir lastet inn i context (via SSR)
    useEffect(() => {
        if (meldekort) {
            setMeldekortUtfylling(meldekort);
        }
    }, [meldekort, setMeldekortUtfylling]);

    useEffect(() => {
        if (meldekortUtfylling) {
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
    const meldekortId = meldekortUtfylling.id;
    const { harForMangeDagerRegistrert, harIngenDagerRegistrert } =
        antallDagerValidering(meldekortUtfylling);
    const undertekster = getUndertekster();

    const nesteStegRoute = nesteStegValg === 'fravær' ? fravær : sendInn;

    return (
        <MeldekortStegWrapper>
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
                    navigate(getPath(nesteStegRoute, { meldekortId }));
                    return true;
                }}
            >
                <Tekst id={'neste'} />
            </FlashingButton>
        </MeldekortStegWrapper>
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
