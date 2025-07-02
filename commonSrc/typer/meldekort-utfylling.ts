import { Periode } from './periode';

export enum MeldekortDagStatus {
    DELTATT_UTEN_LØNN_I_TILTAKET = 'DELTATT_UTEN_LØNN_I_TILTAKET',
    DELTATT_MED_LØNN_I_TILTAKET = 'DELTATT_MED_LØNN_I_TILTAKET',
    FRAVÆR_SYK = 'FRAVÆR_SYK',
    FRAVÆR_SYKT_BARN = 'FRAVÆR_SYKT_BARN',
    FRAVÆR_GODKJENT_AV_NAV = 'FRAVÆR_GODKJENT_AV_NAV',
    FRAVÆR_ANNET = 'FRAVÆR_ANNET',
    IKKE_BESVART = 'IKKE_BESVART',
}

export type MeldekortDag = {
    dato: string;
    status: MeldekortDagStatus;
    harRett: boolean;
    index: number;
};

export enum MeldekortStatus {
    INNSENDT = 'INNSENDT',
    KAN_UTFYLLES = 'KAN_UTFYLLES',
    IKKE_KLAR = 'IKKE_KLAR',
    DEAKTIVERT = 'DEAKTIVERT',
}

export type MeldekortUtfylling = {
    id: string;
    periode: Periode;
    uke1: number;
    uke2: number;
    maksAntallDager: number;
    innsendt: string | null;
    dager: MeldekortDag[];
    status: MeldekortStatus;
    kanSendes?: string;
};

export type MeldekortSteg = 'fravær' | 'lønn' | 'deltatt' | 'oppsummering' | 'kvittering';

/**
 * Rekkefølgen her er viktig for å vite hvor langt brukeren har kommet i utfyllingen. Brukes for å redirecte
 * brukeren dersom de endrer URLen eller maniuplerer nettleserhistorikken.
 */
export const STEG_REKKEFOLGE: MeldekortSteg[] = [
    'fravær',
    'lønn',
    'deltatt',
    'oppsummering',
] as const;
