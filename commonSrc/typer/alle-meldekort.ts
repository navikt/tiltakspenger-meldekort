import { Meldekort } from '@common/typer/MeldekortBruker';
import { ArenaMeldekortStatus, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';

export type InnsendteMeldekortDTO = {
    meldekort: Meldekort[];
    bruker: MeldekortBrukerDTO;
};

export type InnsendteMeldekortProps = {
    meldekort: Meldekort[];
    arenaMeldekortStatus: ArenaMeldekortStatus;
    kanSendeInnHelgForMeldekort: boolean;
};
