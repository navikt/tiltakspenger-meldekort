import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, Button, ConfirmationPanel } from '@navikt/ds-react';
import { useRef, useState } from 'react';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt.tsx';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { fetchSendInn } from '@utils/fetch.ts';
import { useRouting } from '@routing/useRouting.ts';

import style from './Steg3_SendInn.module.css';

type Props = {
    forrigeSteg?: MeldekortSteg;
};

export const Steg3_SendInn = ({ forrigeSteg = 'deltatt' }: Props) => {
    const [harBekreftet, setHarBekreftet] = useState(false);
    const [visFeil, setVisFeil] = useState(false);
    const [innsendingFeilet, setInnsendingFeilet] = useState(false);

    const varselRef = useRef<HTMLDivElement>(null);

    const { navigate, base } = useRouting();

    const { setMeldekortSteg, meldekortUtfylling } = useMeldekortUtfylling();

    const sendInn = () => {
        fetchSendInn(meldekortUtfylling, base).then((bleSendt) => {
            if (bleSendt) {
                navigate(`/${meldekortUtfylling!.id}/kvittering`);
            } else {
                setInnsendingFeilet(true);
                varselRef.current?.focus();
            }
        });
    };

    return (
        <>
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
                        setMeldekortSteg(forrigeSteg);
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
        </>
    );
};
