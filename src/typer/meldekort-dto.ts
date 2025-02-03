import { MeldekortDagStatus } from '@typer/meldekort-utfylling.ts';

export type MeldekortFraBrukerDTO = {
    id: string;
    dager: MeldekortDagFraBrukerDTO[];
};

type MeldekortDagFraBrukerDTO = {
    dag: string;
    status: MeldekortDagStatus;
};

export type MeldekortTilBrukerDTO = {
    id: string;
    meldeperiodeId: string;
    meldeperiodeKjedeId: string;
    versjon: number;
    fraOgMed: string;
    tilOgMed: string;
    innsendt?: string;
    dager: MeldekortDagTilBrukerDTO[];
};

type MeldekortDagTilBrukerDTO = {
    dag: string;
    status: MeldekortDagStatus;
    harRett: boolean;
};
