import React, { useEffect, useRef, useState } from 'react';
import style from './Steg2_Fravær.module.css';
import { Alert, Button } from '@navikt/ds-react';
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
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { useRouting } from '@routing/useRouting.ts';
import { getPathForMeldekortSteg } from '@common/siteRoutes.ts';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg2_Fravær = ({ meldekort }: SSRProps) => {
    const { navigate } = useRouting();
    const {
        meldekortUtfylling,
        setMeldekortSteg,
        getUndertekster,
        redirectHvisFeilSteg,
        redirectHvisMeldekortErInnsendt,
    } = useMeldekortUtfylling();
    const varselRef = useRef<HTMLDivElement>(null);
    const [feil, setFeil] = useState<TekstId | null>(null);

    useEffect(() => {
        redirectHvisMeldekortErInnsendt(meldekort, meldekortUtfylling, 'fravær');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        redirectHvisFeilSteg('fravær');
    }, [redirectHvisFeilSteg]);

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
                        onClick={() => {
                            setMeldekortSteg('deltatt');
                            navigate(getPathForMeldekortSteg('deltatt', meldekortUtfylling.id));
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
                            if (harIngenDagerBesvart) {
                                setFeil('ingenDagerMedFravær');
                                return false;
                            }

                            setFeil(null);
                            setMeldekortSteg('sendInn');
                            navigate(getPathForMeldekortSteg('sendInn', meldekortUtfylling.id));
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
