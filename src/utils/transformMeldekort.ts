import { MeldekortUtfylling } from '../../commonSrc/typer/meldekort-utfylling.ts';
import { MeldekortFraBrukerDTO } from '../../commonSrc/typer/meldekort-dto.ts';

export const tilMeldekortInnsending = (meldekort: MeldekortUtfylling): MeldekortFraBrukerDTO => {
    return {
        id: meldekort.id,
        dager: meldekort.dager.map((dag) => ({
            status: dag.status,
            dag: dag.dato,
        })),
    };
};
