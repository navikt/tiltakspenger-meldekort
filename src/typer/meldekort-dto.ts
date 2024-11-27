import { MeldekortDagStatus } from '@typer/meldekort-utfylling';

type MeldekortDagDto = {
    dag: string;
    status: MeldekortDagStatus;
};

export type MeldekortInnsendingDto = {
    id: string;
    meldekortDager: MeldekortDagDto[];
};
