import React, { useRef, useState } from 'react';
import style from './Steg3_Lønn.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { Alert, Button, Radio, RadioGroup } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { TekstId } from '@tekster/typer.ts';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { getPath, getPathForMeldekortSteg, siteRoutes } from '@common/siteRoutes.ts';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { useRouting } from '@routing/useRouting';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg3_Lønn = ({ meldekort }: SSRProps) => {
    const { navigate } = useRouting();
    const {
        meldekortUtfylling,
        meldekortSteg,
        setMeldekortSteg,
        harMottattLønn,
        setHarMottattLønn,
        getUndertekster,
    } = useMeldekortUtfylling();
    const [feil, setFeil] = useState<TekstId | null>(null);
    const varselRef = useRef<HTMLDivElement>(null);

    if (!meldekortUtfylling) return;

    const undertekster = getUndertekster();
    return (
        <MeldekortStegWrapper>
            <PageHeader
                tekstId={'lønnTittel'}
                underTekst={
                    <div className={style.undertekstWrapper}>
                        <Undertekst tekst={undertekster.ukerTekst} weight={'semibold'} />
                        <Undertekst tekst={undertekster.datoerTekst} />
                    </div>
                }
            />
            <RadioGroup
                legend={<Tekst id={'lønnHarMottattLønnSpørsmål'} />}
                value={harMottattLønn}
                error={feil && <Tekst id={feil} />}
                onChange={(harMottattLønnSpørsmålSvar: boolean) => {
                    setHarMottattLønn(harMottattLønnSpørsmålSvar);
                }}
                className={style.lønnValg}
            >
                <Radio value={true}>
                    <Tekst id={'lønnHarMottattLønnSvarJa'} />
                </Radio>
                <Radio value={false}>
                    <Tekst id={'lønnHarMottattLønnSvarNei'} />
                </Radio>
            </RadioGroup>
            {harMottattLønn && (
                <>
                    <Kalender
                        meldekort={meldekortUtfylling}
                        steg={'lønn'}
                        className={style.kalender}
                    />
                    <DagerUtfyltTeller
                        meldekortUtfylling={meldekortUtfylling}
                        className={style.teller}
                        ref={varselRef}
                    />
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
                            navigate(getPath(siteRoutes.fravær));
                        }}
                    >
                        <Tekst id={'forrige'} />
                    </Button>
                    <FlashingButton
                        onClick={() => {
                            // if (harForMangeDagerBesvart) {
                            //     setFeil('forMangeDagerEnkel');
                            //     return false;
                            // }
                            // if (harHattFravær && harIngenDagerBesvart) {
                            //     setFeil('ingenDagerMedFravær');
                            //     return false;
                            // }

                            setFeil(null);
                            setMeldekortSteg('deltatt');
                            navigate(getPathForMeldekortSteg('deltatt', meldekortUtfylling.id));
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
