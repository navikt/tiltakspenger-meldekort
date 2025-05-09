import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto.ts';
import { ArenaMeldekortStatus, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker.ts';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';

export type AlleMeldekortDTO = {
    meldekort: MeldekortTilBrukerDTO[];
    bruker: MeldekortBrukerDTO;
};

export type AlleMeldekortProps = {
    meldekort: MeldekortUtfylling[];
    arenaMeldekortStatus: ArenaMeldekortStatus;
};
