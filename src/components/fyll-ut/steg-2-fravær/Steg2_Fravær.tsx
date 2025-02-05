import { Alert, BodyLong, Button } from '@navikt/ds-react';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';
import { FraværHjelp } from '@components/fyll-ut/hjelp/FraværHjelp';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling.ts';

import style from './Steg2_Fravær.module.css';

export const Steg2_Fravær = () => {
    const { meldekortUtfylling, setMeldekortSteg, harForMangeDagerRegistrert } = useMeldekortUtfylling();

    const antallDagerRegistrert = meldekortUtfylling.dager.filter(
        (dag) => dag.status !== MeldekortDagStatus.IkkeRegistrert
    ).length;

    const dagerDeltattString = `${antallDagerRegistrert} dag${antallDagerRegistrert === 1 ? '' : 'er'} med deltatt eller fravær.`;

    return (
        <>
            <FraværHjelp />
            <TekstParagrafer id={'fraværStegHeader'} weight={'semibold'} />
            <TekstParagrafer id={'fraværStegIngress'} />
            <Kalender meldekort={meldekortUtfylling} steg={'fravær'} />
            {harForMangeDagerRegistrert ? (
                <Alert className={style.teller} variant={'warning'}>
                    {`Du har fylt ut ${antallDagerRegistrert} dager. Det er maks ${meldekortUtfylling.maksAntallDager} dager med tiltak i denne perioden.`}
                </Alert>
            ) : (
                <BodyLong className={style.teller} weight={'semibold'}>
                    {dagerDeltattString}
                </BodyLong>
            )}
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
