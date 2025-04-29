import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { MeldekortFraBrukerDTO } from '@common/typer/meldekort-dto.ts';

export const tilMeldekortInnsending = (meldekort: MeldekortUtfylling): MeldekortFraBrukerDTO => {
    return {
        id: meldekort.id,
        dager: meldekort.dager.map((dag) => ({
            status: dag.status,
            dag: dag.dato,
        })),
    };
};
