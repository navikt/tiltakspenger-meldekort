type Periode = {
    fraOgMed: string;
    tilOgMed: string;
};

export enum MeldekortDagStatus {
    DELTATT_UTEN_LØNN_I_TILTAKET = 'DELTATT_UTEN_LØNN_I_TILTAKET',
    DELTATT_MED_LØNN_I_TILTAKET = 'DELTATT_MED_LØNN_I_TILTAKET',
    FRAVÆR_SYK = 'FRAVÆR_SYK',
    FRAVÆR_SYKT_BARN = 'FRAVÆR_SYKT_BARN',
    FRAVÆR_VELFERD_GODKJENT_AV_NAV = 'FRAVÆR_VELFERD_GODKJENT_AV_NAV',
    FRAVÆR_VELFERD_IKKE_GODKJENT_AV_NAV = 'FRAVÆR_VELFERD_IKKE_GODKJENT_AV_NAV',
    IKKE_REGISTRERT = 'IKKE_REGISTRERT',
}

export type MeldekortDag = {
    dato: string;
    status: MeldekortDagStatus;
    harRett: boolean;
    index: number;
};

export type MeldekortUtfylling = {
    id: string;
    periode: Periode;
    uke1: number;
    uke2: number;
    maksAntallDager: number;
    innsendt: string | null;
    dager: MeldekortDag[];
};
