import { ArenaMeldekortStatus, MeldekortBrukerDTO } from '@meldekort/common/typer/meldekort-bruker';

export const skalRedirecteTilArena = ({ harSak, arenaMeldekortStatus }: MeldekortBrukerDTO) => {
    return arenaMeldekortStatus === ArenaMeldekortStatus.HAR_MELDEKORT && !harSak;
};
