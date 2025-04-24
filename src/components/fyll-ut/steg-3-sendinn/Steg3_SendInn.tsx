import React, { useEffect, useRef, useState } from 'react';
import style from './Steg3_SendInn.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, Button, ConfirmationPanel } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { fetchSendInn } from '@utils/fetch.ts';
import { useRouting } from '@routing/useRouting.ts';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { getPathForMeldekortSteg } from '@common/siteRoutes.ts';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg3_SendInn = ({ meldekort }: SSRProps) => {
    const { base, navigate } = useRouting();
    const {
        meldekortUtfylling,
        setMeldekortSteg,
        forrigeSteg,
        getUndertekster,
        redirectHvisFeilSteg,
        redirectHvisMeldekortErInnsendt,
        nullstillState,
    } = useMeldekortUtfylling();
    const varselRef = useRef<HTMLDivElement>(null);
    const [harBekreftet, setHarBekreftet] = useState(false);
    const [visFeil, setVisFeil] = useState(false);
    const [innsendingFeilet, setInnsendingFeilet] = useState(false);

    useEffect(() => {
        redirectHvisMeldekortErInnsendt(meldekort, meldekortUtfylling, 'sendInn');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        redirectHvisFeilSteg('sendInn');
    }, [redirectHvisFeilSteg]);

    if (!meldekortUtfylling) return;

    const sendInn = () => {
        setMeldekortSteg('kvittering');
        fetchSendInn(meldekortUtfylling, base).then((bleSendt) => {
            if (bleSendt) {
                nullstillState();
                navigate(getPathForMeldekortSteg('kvittering', meldekortUtfylling.id));
            } else {
                setInnsendingFeilet(true);
                setMeldekortSteg('sendInn');
                varselRef.current?.focus();
            }
        });
    };

    const undertekster = getUndertekster();

    return (
        <MeldekortStegWrapper>
            <PageHeader
                tekstId={'sendInnTittel'}
                underTekst={
                    <div className={style.undertekstWrapper}>
                        <Undertekst tekst={undertekster.ukerTekst} weight={'semibold'} />
                        <Undertekst tekst={undertekster.datoerTekst} />
                    </div>
                }
            />
            <Kalender meldekort={meldekortUtfylling} steg={'sendInn'} />
            <Alert
                variant={innsendingFeilet ? 'error' : 'info'}
                className={style.varsel}
                ref={varselRef}
                tabIndex={-1}
            >
                <TekstSegmenter
                    id={innsendingFeilet ? 'sendInnInnsendingFeilet' : 'sendInnIkkeSendtEnnå'}
                />
            </Alert>
            <ConfirmationPanel
                onChange={() => {
                    setVisFeil(false);
                    setHarBekreftet(!harBekreftet);
                }}
                checked={harBekreftet}
                value={harBekreftet}
                label={<Tekst id={'sendInnBekrefter'} />}
                error={visFeil && <Tekst id={'sendInnBekrefterFeil'} />}
            />
            <div className={style.knapper}>
                <Button
                    variant={'secondary'}
                    onClick={() => {
                        if (forrigeSteg) {
                            navigate(getPathForMeldekortSteg(forrigeSteg, meldekortUtfylling.id));
                        }
                    }}
                >
                    <Tekst id={'forrige'} />
                </Button>
                <FlashingButton
                    onClick={() => {
                        if (!harBekreftet) {
                            setVisFeil(true);
                            return false;
                        }
                        sendInn();
                        return true;
                    }}
                >
                    <Tekst id={'sendInn'} />
                </FlashingButton>
            </div>
        </MeldekortStegWrapper>
    );
};
