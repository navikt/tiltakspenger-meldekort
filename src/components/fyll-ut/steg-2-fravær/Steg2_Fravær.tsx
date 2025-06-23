import React, { useEffect, useRef, useState } from 'react';
import style from './Steg2_Fravær.module.css';
import { Alert, Button, Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { FraværHjelp } from '@components/fyll-ut/steg-2-fravær/hjelp/FraværHjelp.tsx';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { TekstId } from '@tekster/typer.ts';
import { FraværModal } from '@components/fyll-ut/steg-2-fravær/fravær-modal/FraværModal.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { MeldekortDagStatus, MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { useRouting } from '@routing/useRouting.ts';
import { getPath, getPathForMeldekortSteg, siteRoutes } from '@common/siteRoutes.ts';
import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg2_Fravær = ({ meldekort }: SSRProps) => {
    const { navigate } = useRouting();
    const {
        meldekortUtfylling,
        setMeldekortSteg,
        getUndertekster,
        redirectHvisMeldekortErInnsendt,
        harHattFravær,
        setHarHattFravær,
    } = useMeldekortUtfylling();
    const varselRef = useRef<HTMLDivElement>(null);
    const [feil, setFeil] = useState<TekstId | null>(null);

    useEffect(() => {
        redirectHvisMeldekortErInnsendt(meldekort, meldekortUtfylling, 'fravær');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!meldekortUtfylling) return;
    const { harForMangeDagerBesvart, harIngenDagerBesvart } =
        antallDagerValidering(meldekortUtfylling);
    const undertekster = getUndertekster();

    return (
        <MeldekortStegWrapper>
            <PageHeader
                tekstId={'fraværTittel'}
                underTekst={
                    <div className={style.undertekstWrapper}>
                        <Undertekst tekst={undertekster.ukerTekst} weight={'semibold'} />
                        <Undertekst tekst={undertekster.datoerTekst} />
                    </div>
                }
            />

            <RadioGroup
                legend={<Tekst id={'fraværStegFraværSpørsmål'} />}
                value={harHattFravær}
                error={feil && <Tekst id={feil} />}
                onChange={(harHattFraværSpørsmålSvar: boolean) => {
                    setHarHattFravær(harHattFraværSpørsmålSvar);
                }}
                className={style.fraværValg}
            >
                <Radio value={true}>
                    <Tekst id={'fraværHarHattFraværSvarJa'} />
                </Radio>
                <Radio value={false}>
                    <Tekst id={'fraværHarHattFraværSvarNei'} />
                </Radio>
            </RadioGroup>

            {harHattFravær && (
                <>
                    <FraværHjelp />
                    <Kalender
                        meldekort={meldekortUtfylling}
                        steg={'fravær'}
                        className={style.kalender}
                    />
                    <DagerUtfyltTeller
                        meldekortUtfylling={meldekortUtfylling}
                        className={style.teller}
                        ref={varselRef}
                    />
                    <FraværModal />
                </>
            )}
            <div className={style.knapperOgVarsel}>
                {feil && (
                    <Alert variant={'error'} className={style.varsel}>
                        <Tekst id={feil} />
                    </Alert>
                )}
                <div className={style.knapper}>
                    <Button
                        variant={'secondary'}
                        onClick={() => {
                            setMeldekortSteg('fravær');
                            navigate(getPath(siteRoutes.forside));
                        }}
                    >
                        <Tekst id={'forrige'} />
                    </Button>
                    <FlashingButton
                        onClick={() => {
                            if (harForMangeDagerBesvart) {
                                setFeil('forMangeDagerEnkel');
                                return false;
                            }
                            if (harHattFravær && harIngenDagerBesvart) {
                                setFeil('ingenDagerMedFravær');
                                return false;
                            }

                            setFeil(null);
                            setMeldekortSteg('lønn');
                            navigate(getPathForMeldekortSteg('lønn', meldekortUtfylling.id));
                            return true;
                        }}
                    >
                        <Tekst id={'neste'} />
                    </FlashingButton>
                </div>
            </div>
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
