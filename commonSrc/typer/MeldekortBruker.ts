import { Nullable } from './Nullable';

export type Meldekort = {
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
    innsendt: Nullable<string>;
    dager: MeldekortDag[];
    kanSendes: Nullable<string>;
};

export type MeldekortDag = {
    dag: string;
    status: MeldekortDagStatus;
};

export enum MeldekortStatus {
    INNSENDT = 'INNSENDT',
    KAN_UTFYLLES = 'KAN_UTFYLLES',
    IKKE_KLAR = 'IKKE_KLAR',
    DEAKTIVERT = 'DEAKTIVERT',
}

export enum MeldekortDagStatus {
    DELTATT_UTEN_LØNN_I_TILTAKET = 'DELTATT_UTEN_LØNN_I_TILTAKET',
    DELTATT_MED_LØNN_I_TILTAKET = 'DELTATT_MED_LØNN_I_TILTAKET',
    FRAVÆR_SYK = 'FRAVÆR_SYK',
    FRAVÆR_SYKT_BARN = 'FRAVÆR_SYKT_BARN',
    FRAVÆR_GODKJENT_AV_NAV = 'FRAVÆR_GODKJENT_AV_NAV',
    FRAVÆR_ANNET = 'FRAVÆR_ANNET',
    IKKE_BESVART = 'IKKE_BESVART',
    IKKE_TILTAKSDAG = 'IKKE_TILTAKSDAG',
    IKKE_RETT_TIL_TILTAKSPENGER = 'IKKE_RETT_TIL_TILTAKSPENGER',
}
