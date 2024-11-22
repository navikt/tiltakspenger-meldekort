import { Alert, BodyLong, Button, Checkbox, Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { KalenderOld } from '@components/kalender/KalenderOld';
import { MeldekortDagModal } from '@components/meldekort-dag-modal/MeldekortDagModal';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider';
import { useState } from 'react';

import style from './FyllUt.module.css';
import { Lenke } from '@components/lenke/Lenke';
import { Kalender } from '@components/kalender/Kalender';

type Props = {
    meldekort: MeldekortUtfylling;
};

export const FyllUt = ({ meldekort }: Props) => {
    const [ferdigUtfylt, setFerdigUtfylt] = useState(false);
    const [harBekreftet, setHarBekreftet] = useState(false);

    return (
        <div>
            <Heading size={'medium'}>
                <Tekst id={ferdigUtfylt ? 'bekreftTittel' : 'fyllUtTittel'} />
            </Heading>
            <BodyLong>
                <Tekst id={ferdigUtfylt ? 'bekreftTekst' : 'fyllUtKlikkPåDato'} />
            </BodyLong>
            {ferdigUtfylt && <Alert variant={'warning'}>{'Meldekortet er ikke sendt ennå!'}</Alert>}
            <ReadMore header={<Tekst id={'fyllUtLesMerHeader'} />}>{'Blah blah'}</ReadMore>
            <MeldekortUtfyllingProvider meldekortUtfylling={meldekort}>
                <Kalender />
                <MeldekortDagModal />
            </MeldekortUtfyllingProvider>
            {ferdigUtfylt && (
                <Checkbox onChange={() => setHarBekreftet(!harBekreftet)}>
                    <Tekst id={'bekreftCheckbox'} />
                </Checkbox>
            )}
            <Button
                className={style.knapp}
                variant={ferdigUtfylt ? 'secondary' : 'primary'}
                onClick={() => {
                    setFerdigUtfylt(!ferdigUtfylt);
                }}
            >
                {ferdigUtfylt ? 'Forrige' : 'Neste'}
            </Button>
            {ferdigUtfylt && (
                <Button
                    disabled={!harBekreftet}
                    as={Lenke}
                    href={`/[meldekortId]/kvittering?meldekortId=${meldekort.id}`}
                >
                    {'Send inn'}
                </Button>
            )}
        </div>
    );
};
