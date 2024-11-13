import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@/src/components/tekst/Tekst';
import {
    MeldekortDag,
    MeldekortDagStatus,
    MeldekortUtfylling,
    MeldekortStatus,
} from '@/src/typer/meldekort-utfylling';
import { Kalender } from '@/src/components/kalender/Kalender';
import { MeldekortDagModal } from '@/src/components/meldekort-dag-modal/MeldekortDagModal';
import { useState } from 'react';

const fraOgMed = '2024-11-11';
const tilOgMed = '2024-11-24';

const dummyMeldekort: MeldekortUtfylling = {
    id: 'asdf',
    periode: {
        fraOgMed,
        tilOgMed,
    },
    status: MeldekortStatus.TilUtfylling,
    kanSendes: true,
    meldekortDager: Array.from({ length: 14 }).map((_, index) => {
        return {
            dato: `2024-11-${11 + index}`,
            status: MeldekortDagStatus.IkkeUtfylt,
        };
    }),
};

export const FyllUt = () => {
    const [valgtDag, setValgtDag] = useState<MeldekortDag | null>(null);

    return (
        <div>
            <Heading size={'medium'}>
                <Tekst id={'fyllUtTittel'} />
            </Heading>
            <BodyLong>
                <Tekst id={'fyllUtKlikkPåDato'} />
            </BodyLong>
            <ReadMore header={<Tekst id={'fyllUtLesMerHeader'} />}>{'Blah blah'}</ReadMore>
            <Kalender meldekort={dummyMeldekort} setValgtDag={setValgtDag} />
            <MeldekortDagModal dag={valgtDag} setValgtDag={setValgtDag} />
        </div>
    );
};
