import { Alert, Button } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { FraværHjelp } from '@components/fyll-ut/steg-2-fravær/hjelp/FraværHjelp.tsx';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { useEffect, useRef, useState } from 'react';
import { TekstId } from '@tekster/typer.ts';

import style from './Steg2_Fravær.module.css';

export const Steg2_Fravær = () => {
    const varselRef = useRef<HTMLDivElement>(null);
    const [feil, setFeil] = useState<TekstId | null>(null);

    const { meldekortUtfylling, setMeldekortSteg } = useMeldekortUtfylling();

    const { harForMangeDagerRegistrert, harIngenDagerRegistrert } =
        antallDagerValidering(meldekortUtfylling);

    useEffect(() => {
        setFeil(null);
    }, [meldekortUtfylling]);

    return (
        <>
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
                        }}
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
                            setMeldekortSteg('bekreft');
                            return true;
                        }}
                    >
                        <Tekst id={'neste'} />
                    </FlashingButton>
                </div>
            </div>
        </>
    );
};
