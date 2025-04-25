import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, Button, ConfirmationPanel } from '@navikt/ds-react';
import React, { useRef, useState } from 'react';
import { Tekst } from '@components/tekst/Tekst';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { fetchSendInn } from '@utils/fetch.ts';
import { useRouting } from '@routing/useRouting.ts';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import style from './Steg3_SendInn.module.css';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';

export const Steg3_SendInn = () => {
    const { meldekortUtfylling, forrigeSteg, getUndertekster } = useMeldekortUtfylling();
    const { navigate, base } = useRouting();
    const [harBekreftet, setHarBekreftet] = useState(false);
    const [visFeil, setVisFeil] = useState(false);
    const [innsendingFeilet, setInnsendingFeilet] = useState(false);
    const varselRef = useRef<HTMLDivElement>(null);
    const { fravær, deltakelse, kvittering } = siteRoutes;

    if (!meldekortUtfylling) return;

    const sendInn = () => {
        fetchSendInn(meldekortUtfylling, base).then((bleSendt) => {
            if (bleSendt) {
                navigate(getPath(kvittering, { meldekortId }));
            } else {
                setInnsendingFeilet(true);
                varselRef.current?.focus();
            }
        });
    };

    const undertekster = getUndertekster();
    const meldekortId = meldekortUtfylling.id;
    const forrigeStegRoute = forrigeSteg === 'fravær' ? fravær : deltakelse;

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
            <Kalender meldekort={meldekortUtfylling} steg={'bekreft'} />
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
                        navigate(getPath(forrigeStegRoute, { meldekortId }));
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
                        navigate(getPath(kvittering, { meldekortId }));
                        return true;
                    }}
                >
                    <Tekst id={'sendInn'} />
                </FlashingButton>
            </div>
        </MeldekortStegWrapper>
    );
};
