import { Button } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';
import { FraværHjelp } from '@components/fyll-ut/hjelp/FraværHjelp';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';

import style from './Steg2_Fravær.module.css';

export const Steg2_Fravær = () => {
    const { meldekortUtfylling, setMeldekortSteg } = useMeldekortUtfylling();

    const { harForMangeDagerRegistrert } = antallDagerValidering(meldekortUtfylling);

    return (
        <>
            <FraværHjelp />
            <TekstParagrafer id={'fraværStegHeader'} weight={'semibold'} />
            <TekstParagrafer id={'fraværStegIngress'} />
            <Kalender meldekort={meldekortUtfylling} steg={'fravær'} />
            <DagerUtfyltTeller meldekortUtfylling={meldekortUtfylling} />
            <div className={style.knapper}>
                <Button
                    onClick={() => {
                        setMeldekortSteg('deltatt');
                    }}
                >
                    <Tekst id={'forrige'} />
                </Button>
                <Button
                    disabled={harForMangeDagerRegistrert}
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
