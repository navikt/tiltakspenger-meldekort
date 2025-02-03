import { MeldekortUtfylling } from '@typer/meldekort-utfylling.ts';
import { MeldekortFraBrukerDTO } from '@typer/meldekort-dto';

export const tilMeldekortInnsending = (meldekort: MeldekortUtfylling): MeldekortFraBrukerDTO => {
    return {
        id: meldekort.id,
        dager: meldekort.dager.map((dag) => ({
            status: dag.status,
            dag: dag.dato,
        })),
    };
};
