import { ArenaMeldekortStatus, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';

export const skalRedirecteTilArena = ({ harSak, arenaMeldekortStatus }: MeldekortBrukerDTO) => {
    return arenaMeldekortStatus === ArenaMeldekortStatus.HAR_MELDEKORT && !harSak;
};
