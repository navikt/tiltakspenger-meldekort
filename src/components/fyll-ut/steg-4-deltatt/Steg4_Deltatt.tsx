import React, { useEffect, useState } from 'react';
import style from './Steg4_Deltatt.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, Button } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { Tekst } from '@components/tekst/Tekst';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { DeltattHjelp } from '@components/fyll-ut/steg-4-deltatt/hjelp/DeltattHjelp.tsx';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { TekstId } from '@tekster/typer.ts';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { useRouting } from '@routing/useRouting.ts';
import { getPath, getPathForMeldekortSteg, siteRoutes } from '@common/siteRoutes.ts';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg4_Deltatt = ({ meldekort }: SSRProps) => {
    const { navigate } = useRouting();
    const {
        meldekortUtfylling,
        setMeldekortUtfylling,
        setMeldekortSteg,
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
                            setMeldekortSteg('lønn');
                            navigate(getPath(siteRoutes.lønn));
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
                                setFeil('ingenDagerDeltatt');
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
        </MeldekortStegWrapper>
    );
};
