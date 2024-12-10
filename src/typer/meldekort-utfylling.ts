type Periode = {
    fraOgMed: string;
    tilOgMed: string;
};

export enum MeldekortStatus {
    TilUtfylling = 'KAN_UTFYLLES',
    KanIkkeUtfylles = 'KAN_IKKE_UTFYLLES',
    Innsendt = 'INNSENDT',
    Godkjent = 'GODKJENT',
}

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
    index: number;
    status: MeldekortDagStatus;
};

export type MeldekortUtfylling = {
    id: string;
    periode: Periode;
    status: MeldekortStatus;
    meldekortDager: MeldekortDag[];
};
