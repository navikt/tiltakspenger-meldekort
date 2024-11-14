import { BodyLong, Button, Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { Kalender } from '@components/kalender/Kalender';
import { MeldekortDagModal } from '@components/meldekort-dag-modal/MeldekortDagModal';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider';
import { useState } from 'react';

import style from './FyllUt.module.css';
import { Lenke } from '@components/lenke/Lenke';

type Props = {
    meldekort: MeldekortUtfylling;
};

export const FyllUt = ({ meldekort }: Props) => {
    const [ferdigUtfylt, setFerdigUtfylt] = useState(false);

    return (
        <div>
            <Heading size={'medium'}>
                <Tekst id={'fyllUtTittel'} />
            </Heading>
            <BodyLong>
                <Tekst id={'fyllUtKlikkPåDato'} />
            </BodyLong>
            <ReadMore header={<Tekst id={'fyllUtLesMerHeader'} />}>{'Blah blah'}</ReadMore>
            <MeldekortUtfyllingProvider meldekortUtfylling={meldekort}>
                <Kalender erUtfylt={ferdigUtfylt} />
                <MeldekortDagModal />
            </MeldekortUtfyllingProvider>
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
                    as={Lenke}
                    href={`/[meldekortId]/kvittering?meldekortId=${meldekort.id}`}
                >
                    {'Send inn'}
                </Button>
            )}
        </div>
    );
};
