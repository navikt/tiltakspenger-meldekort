import React, { useEffect, useState } from 'react';
import style from './Steg1_Deltatt.module.css';
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
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { useRouting } from '@routing/useRouting.ts';
import { getPathForMeldekortSteg } from '@common/siteRoutes.ts';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg1_Deltatt = ({ meldekort }: SSRProps) => {
    const { navigate } = useRouting();
    const {
        meldekortUtfylling,
        setMeldekortUtfylling,
        setMeldekortSteg,
        nesteSteg,
        setNesteSteg,
        setForrigeSteg,
        getUndertekster,
        redirectHvisMeldekortErInnsendt,
    } = useMeldekortUtfylling();
    const [feil, setFeil] = useState<TekstId | null>(null);
    const utfyllingPåbegynt = meldekort && meldekortUtfylling;

    useEffect(() => {
        // I første steg settes meldekortUtfylling til å være meldekortet fra SSR ved første render dersom det ikke er satt fra før.
        if (utfyllingPåbegynt) {
            redirectHvisMeldekortErInnsendt(meldekort, meldekortUtfylling, 'deltatt');
        } else {
            setMeldekortSteg('deltatt');
            setMeldekortUtfylling(meldekort);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!meldekortUtfylling) {
        return null;
    }
    const { harForMangeDagerBesvart, harIngenDagerBesvart } =
        antallDagerValidering(meldekortUtfylling);
    const undertekster = getUndertekster();

    // For å få type-safety på radioknappene sine values..
    const fravær: MeldekortSteg = 'fravær';
    const sendInn: MeldekortSteg = 'sendInn';

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
                value={nesteSteg}
                error={feil && <Tekst id={feil} />}
                onChange={(value: MeldekortSteg) => {
                    setNesteSteg(value);

                    // Dersom bruker har navigert tilbake til siden om deltakelse etter å ha fylt ut fravær og deretter velger at
                    // de ikke har vært fraværende, så må vi fjerne fravær fra meldekortet.
                    if (nesteSteg !== 'fravær') {
                        setMeldekortUtfylling(fjernFravær(meldekortUtfylling));
                    }
                }}
                className={style.fraværValg}
            >
                <Radio value={fravær}>
                    <Tekst id={'deltattStegFraværJa'} />
                </Radio>
                <Radio value={sendInn}>
                    <Tekst id={'deltattStegFraværNei'} />
                </Radio>
            </RadioGroup>
            <FlashingButton
                onClick={() => {
                    if (harForMangeDagerBesvart) {
                        setFeil('forMangeDagerEnkel');
                        return false;
                    }
                    if (harIngenDagerBesvart && nesteSteg !== 'fravær') {
                        setFeil('ingenDagerDeltatt');
                        return false;
                    }
                    if (!nesteSteg) {
                        setFeil('deltattStegFraværIkkeValgt');
                        return false;
                    }
                    setFeil(null);
                    setMeldekortSteg(nesteSteg);
                    if (nesteSteg === 'sendInn') {
                        // Fordi bruker kan ha fylt ut fravær, gått tilbake til steg 1 og endret valget
                        // til å si at de ikke har hatt fravær og skal dermed sendes rett til steg 3.
                        setMeldekortUtfylling(fjernFravær(meldekortUtfylling));
                        setForrigeSteg('deltatt');
                    } else {
                        setForrigeSteg('fravær');
                    }
                    navigate(getPathForMeldekortSteg(nesteSteg, meldekortUtfylling.id));
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
        status: dagStatusMedFravær.has(dag.status) ? MeldekortDagStatus.IKKE_BESVART : dag.status,
    })),
});
