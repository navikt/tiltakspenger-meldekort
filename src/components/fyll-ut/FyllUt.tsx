import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import {
    MeldekortDagStatus,
    MeldekortUtfylling,
    MeldekortStatus,
} from '@typer/meldekort-utfylling';
import { Kalender } from '@components/kalender/Kalender';
import { MeldekortDagModal } from '@components/meldekort-dag-modal/MeldekortDagModal';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider';

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
    return (
        <div>
            <Heading size={'medium'}>
                <Tekst id={'fyllUtTittel'} />
            </Heading>
            <BodyLong>
                <Tekst id={'fyllUtKlikkPåDato'} />
            </BodyLong>
            <ReadMore header={<Tekst id={'fyllUtLesMerHeader'} />}>{'Blah blah'}</ReadMore>
            <MeldekortUtfyllingProvider meldekortUtfylling={dummyMeldekort}>
                <Kalender meldekort={dummyMeldekort} />
                <MeldekortDagModal />
            </MeldekortUtfyllingProvider>
        </div>
    );
};
