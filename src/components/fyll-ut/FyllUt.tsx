import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@/src/components/tekst/Tekst';
import {
    MeldekortDagStatus,
    MeldekortData,
    MeldekortStatus,
    ReduksjonAvYtelse,
} from '@/src/typer/meldekort';
import { Kalender } from '@/src/components/kalender/Kalender';

const ONE_DAY_MS = 1000 * 3600 * 24;

const fraOgMed = '2024-11-10T23:00:00.000Z';
const tilOgMed = new Date(new Date(fraOgMed).getTime() + ONE_DAY_MS * 14).toISOString();

const dummyPeriode: MeldekortData = {
    id: 'asdf',
    periode: {
        fraOgMed,
        tilOgMed,
    },
    meldekortDager: Array.from({ length: 14 }).map((_, index) => {
        const date = new Date(fraOgMed).getTime();

        return {
            dato: new Date(date + ONE_DAY_MS * index).toISOString(),
            status: MeldekortDagStatus.IkkeUtfylt,
            reduksjonAvYtelsePåGrunnAvFravær: ReduksjonAvYtelse.INGEN_REDUKSJON,
            beregningsdag: { beløp: 285, prosent: 100 },
        };
    }),
    kanSendes: true,
    status: MeldekortStatus.TilUtfylling,
    tiltaksnavn: 'Mitt tiltak',
    totalbeløpTilUtbetaling: 9001
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
            <Kalender periode={dummyPeriode} />
        </div>
    );
};
