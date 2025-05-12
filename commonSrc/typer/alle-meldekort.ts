import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';
import { ArenaMeldekortStatus, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling';

export type AlleMeldekortDTO = {
    meldekort: MeldekortTilBrukerDTO[];
    bruker: MeldekortBrukerDTO;
};

export type AlleMeldekortProps = {
    meldekort: MeldekortUtfylling[];
    arenaMeldekortStatus: ArenaMeldekortStatus;
};
