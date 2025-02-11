type Periode = {
    fraOgMed: string;
    tilOgMed: string;
};

export enum MeldekortDagStatus {
    Deltatt = 'DELTATT',
    FraværSyk = 'FRAVÆR_SYK',
    FraværSyktBarn = 'FRAVÆR_SYKT_BARN',
    FraværAnnet = 'FRAVÆR_ANNET',
    IkkeDeltatt = 'IKKE_DELTATT',
    IkkeRegistrert = 'IKKE_REGISTRERT',
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
    maksAntallDager: number;
    innsendt: string | null;
    dager: MeldekortDag[];
};
