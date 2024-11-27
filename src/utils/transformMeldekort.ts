import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { MeldekortInnsendingDto } from '@typer/meldekort-dto';

export const tilMeldekortInnsending = (meldekort: MeldekortUtfylling): MeldekortInnsendingDto => {
    return {
        id: meldekort.id,
        meldekortDager: meldekort.meldekortDager.map((dag) => ({
            status: dag.status,
            dag: dag.dato,
        })),
    };
};
