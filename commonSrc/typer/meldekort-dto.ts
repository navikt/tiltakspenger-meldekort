import { MeldekortDagStatus } from './meldekort-utfylling';

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
    kjedeId: string;
    versjon: number;
    fraOgMed: string;
    tilOgMed: string;
    uke1: number;
    uke2: number;
    maksAntallDager: number;
    innsendt?: string;
    dager: MeldekortDagTilBrukerDTO[];
};

type MeldekortDagTilBrukerDTO = {
    dag: string;
    status: MeldekortDagStatus;
    harRett: boolean;
};
