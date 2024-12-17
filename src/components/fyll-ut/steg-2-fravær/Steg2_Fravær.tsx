import { Button } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';
import { FraværHjelp } from '@components/fyll-ut/hjelp/FraværHjelp';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';

import style from './Steg2_Fravær.module.css';

export const Steg2_Fravær = () => {
    const { meldekortUtfylling, setMeldekortSteg } = useMeldekortUtfylling();

    if (!meldekortUtfylling) {
        console.log('ups, fant ingen meldekort til utfylling');
        return;
    }
    return (
        <>
            <FraværHjelp />
            <TekstParagrafer id={'fraværStegHeader'} weight={'semibold'} />
            <TekstParagrafer id={'fraværStegIngress'} />
            <Kalender meldekort={meldekortUtfylling} steg={'fravær'} />
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
