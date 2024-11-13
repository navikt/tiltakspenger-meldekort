import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { Kalender } from '@components/kalender/Kalender';
import { MeldekortDagModal } from '@components/meldekort-dag-modal/MeldekortDagModal';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider';

type Props = {
    meldekort: MeldekortUtfylling;
};

export const FyllUt = ({ meldekort }: Props) => {
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
                <Kalender />
                <MeldekortDagModal />
            </MeldekortUtfyllingProvider>
        </div>
    );
};
