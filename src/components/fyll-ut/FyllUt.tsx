import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@/src/components/tekst/Tekst';
import { Rapporteringsperiode, RapporteringsperiodeStatus } from '@/src/typer/rapporteringsperiode';
import { Kalender } from '@/src/components/kalender/Kalender';

const fraOgMed = '2024-11-10T23:00:00.000Z'
const oneDayMs = 1000 * 3600 * 24;

const dummyPeriode: Rapporteringsperiode = {
    id: 'asdf',
    periode: {
        fraOgMed,
        tilOgMed: '2024-11-24T23:00:00.000Z'
    },
    dager: Array.from({length: 14}).map((_, index) => {
        const date = new Date(fraOgMed).getTime();

        return {
            dato: new Date(date + oneDayMs * index).toISOString(),
            aktiviteter: []
        }
    }),
    kanSendes: true,
    status: RapporteringsperiodeStatus.TilUtfylling
}

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
            <Kalender periode={dummyPeriode} />
        </div>
    );
};
