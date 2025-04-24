import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { FraværHjelp } from '@components/fyll-ut/steg-2-fravær/hjelp/FraværHjelp.tsx';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { TekstId } from '@tekster/typer.ts';
import { useRouting } from '@routing/useRouting.ts';
import { FraværModal } from '@components/fyll-ut/steg-2-fravær/fravær-modal/FraværModal.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import style from './Steg2_Fravær.module.css';

export const Steg2_Fravær = () => {
    const { navigate } = useRouting();
    const varselRef = useRef<HTMLDivElement>(null);
    const [feil, setFeil] = useState<TekstId | null>(null);
    const { meldekortUtfylling, getUndertekster } = useMeldekortUtfylling();
    useEffect(() => {
        setFeil(null);
    }, [meldekortUtfylling]);

    if (!meldekortUtfylling) return;

    const { harForMangeDagerRegistrert, harIngenDagerRegistrert } =
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
            <FraværHjelp />
            <Kalender meldekort={meldekortUtfylling} steg={'fravær'} className={style.kalender} />
            <DagerUtfyltTeller
                meldekortUtfylling={meldekortUtfylling}
                className={style.teller}
                ref={varselRef}
            />
            <div className={style.knapperOgVarsel}>
                {feil && (
                    <Alert variant={'error'} className={style.varsel}>
                        <Tekst id={feil} />
                    </Alert>
                )}
                <div className={style.knapper}>
                    <Button
                        variant={'secondary'}
                        onClick={() => navigate(`/${meldekortUtfylling.id}/deltakelse`)}
                    >
                        <Tekst id={'forrige'} />
                    </Button>
                    <FlashingButton
                        onClick={() => {
                            if (harForMangeDagerRegistrert) {
                                setFeil('forMangeDagerEnkel');
                                return false;
                            }
                            if (harIngenDagerRegistrert) {
                                setFeil('ingenDagerMedFravær');
                                return false;
                            }

                            setFeil(null);
                            navigate(`/${meldekortUtfylling.id}/send-inn`);
                            return true;
                        }}
                    >
                        <Tekst id={'neste'} />
                    </FlashingButton>
                </div>
            </div>
            <FraværModal />
        </MeldekortStegWrapper>
    );
};
