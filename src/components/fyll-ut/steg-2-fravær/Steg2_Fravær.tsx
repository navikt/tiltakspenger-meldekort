import { BodyLong, Button } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';

import style from './Steg2_Fravær.module.css';

export const Steg2_Fravær = () => {
    const { setMeldekortSteg } = useMeldekortUtfylling();

    return (
        <>
            <BodyLong weight={'semibold'}>
                {'Legg inn når du ikke fikk deltatt på tiltaket'}
            </BodyLong>
            <BodyLong>
                {
                    'Velg grunnen til at du ikke fikk deltatt på tiltaket. Noen grunner vil gi deg utbetaling allikevel, mens andre vil ikke. De dagene du ikke skulle vært på tiltaket trenger du ikke registrere noe på'
                }
            </BodyLong>
            <Kalender steg={'fravær'} />
            <div className={style.knapper}>
                <Button
                    onClick={() => {
                        setMeldekortSteg('deltatt');
                    }}
                >
                    {'Forrige'}
                </Button>
                <Button
                    onClick={() => {
                        setMeldekortSteg('bekreft');
                    }}
                >
                    {'Neste'}
                </Button>
            </div>
        </>
    );
};
