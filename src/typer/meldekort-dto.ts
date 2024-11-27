import { MeldekortDagStatus, MeldekortStatus } from '@typer/meldekort-utfylling';

type MeldekortDagDto = {
    dag: string;
    status: MeldekortDagStatus;
};

export type MeldekortInnsendingDto = {
    id: string;
    meldekortDager: MeldekortDagDto[];
};

export type MeldekortTilUtfyllingDto = {
    id: string,
    fraOgMed: string,
    tilOgMed: string,
    status?: MeldekortStatus;
    meldekortDager: MeldekortDagDto[];
}