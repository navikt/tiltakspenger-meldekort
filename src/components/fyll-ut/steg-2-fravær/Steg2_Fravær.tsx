import { BodyLong, Button } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';

import style from './Steg2_Fravær.module.css';

export const Steg2_Fravær = () => {
    const { setMeldekortSteg } = useMeldekortUtfylling();

    return (
        <>
            <BodyLong weight={'semibold'}>
                <Tekst id={'fraværStegHeader'} />
            </BodyLong>
            <BodyLong>
                <Tekst id={'fraværStegIngress'} />
            </BodyLong>
            <Kalender steg={'fravær'} />
            <div className={style.knapper}>
                <Button
                    onClick={() => {
                        setMeldekortSteg('deltatt');
                    }}
                >
                    <Tekst id={'forrige'} />
                </Button>
                <Button
                    onClick={() => {
                        setMeldekortSteg('bekreft');
                    }}
                >
                    <Tekst id={'neste'} />
                </Button>
            </div>
        </>
    );
};
