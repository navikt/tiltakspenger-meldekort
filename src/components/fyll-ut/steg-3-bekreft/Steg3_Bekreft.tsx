import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import style from '@components/fyll-ut/steg-2-fravær/Steg2_Fravær.module.css';
import { Alert, Button, Checkbox } from '@navikt/ds-react';
import { useState } from 'react';
import { Lenke } from '@components/lenke/Lenke';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';

export const Steg3_Bekreft = () => {
    const [harBekreftet, setHarBekreftet] = useState(false);

    const { setMeldekortSteg, meldekortUtfylling } = useMeldekortUtfylling();

    const harFravær = meldekortUtfylling?.meldekortDager.some(
        (dag) => dag.status && dag.status !== MeldekortDagStatus.Deltatt
    );

    return (
        <>
            <Alert variant={'warning'}>{'Meldekortet er ikke sendt ennå!'}</Alert>
            <Kalender steg={'bekreft'} />
            <Checkbox onChange={() => setHarBekreftet(!harBekreftet)}>
                <Tekst id={'bekreftCheckbox'} />
            </Checkbox>
            <div className={style.knapper}>
                <Button
                    onClick={() => {
                        setMeldekortSteg(harFravær ? 'fravær' : 'deltatt');
                    }}
                >
                    {'Forrige'}
                </Button>
                <Button
                    disabled={!harBekreftet}
                    as={Lenke}
                    href={`/[meldekortId]/kvittering?meldekortId=${meldekortUtfylling!.id}`}
                >
                    {'Send inn'}
                </Button>
            </div>
        </>
    );
};
