import { MeldekortDagStatus, MeldekortStatus } from './meldekort-utfylling';

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
    status: MeldekortStatus;
    maksAntallDager: number;
    innsendt?: string;
    dager: MeldekortDagTilBrukerDTO[];
    kanSendes?: string;
};

type MeldekortDagTilBrukerDTO = {
    dag: string;
    status: MeldekortDagStatus;
    harRett: boolean;
};
