import { MeldekortDagStatus, MeldekortStatus } from '@typer/meldekort-utfylling';

type MeldekortDagDto = {
    dag: string;
    status: MeldekortDagStatus;
};

export type MeldekortInnsendingDto = {
    id: string;
    meldekortDager: MeldekortDagDto[];
};

export type MeldekortMottakDto = {
    id: string,
    meldeperiodeId: string,
    meldeperiodeKjedeId: string,
    versjon: number,
    fraOgMed: string,
    tilOgMed: string,
    innsendt?: string,
    status: MeldekortStatus;
    dager: MeldekortDagDto[];
}