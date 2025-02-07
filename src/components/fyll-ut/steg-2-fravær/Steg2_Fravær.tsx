import { Button } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { FraværHjelp } from '@components/fyll-ut/steg-2-fravær/hjelp/FraværHjelp.tsx';
import { BetingetKnapp } from '@components/betinget-knapp/BetingetKnapp.tsx';
import { useRef } from 'react';

import style from './Steg2_Fravær.module.css';

export const Steg2_Fravær = () => {
    const varselRef = useRef<HTMLDivElement>(null);
    const { meldekortUtfylling, setMeldekortSteg } = useMeldekortUtfylling();

    const { harForMangeDagerRegistrert } = antallDagerValidering(meldekortUtfylling);

    return (
        <>
            <FraværHjelp />
            <Kalender meldekort={meldekortUtfylling} steg={'fravær'} className={style.kalender} />
            <DagerUtfyltTeller
                meldekortUtfylling={meldekortUtfylling}
                className={style.teller}
                ref={varselRef}
            />
            <div className={style.knapper}>
                <Button
                    onClick={() => {
                        setMeldekortSteg('deltatt');
                    }}
                >
                    <Tekst id={'forrige'} />
                </Button>
                <BetingetKnapp
                    onClick={() => {
                        if (!harForMangeDagerRegistrert) {
                            setMeldekortSteg('bekreft');
                        } else {
                            varselRef.current?.focus();
                        }
                        return !harForMangeDagerRegistrert;
                    }}
                >
                    <Tekst id={'neste'} />
                </BetingetKnapp>
            </div>
        </>
    );
};
