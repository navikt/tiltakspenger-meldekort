import { Meldekort } from '@common/typer/MeldekortBruker';
import { ArenaMeldekortStatus, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';

export type AlleMeldekortDTO = {
    meldekort: Meldekort[];
    bruker: MeldekortBrukerDTO;
};

export type AlleMeldekortProps = {
    meldekort: Meldekort[];
    arenaMeldekortStatus: ArenaMeldekortStatus;
};
