type Periode = {
    fraOgMed: string;
    tilOgMed: string;
};

export enum MeldekortStatus {
    TilUtfylling = 'TilUtfylling',
    Innsendt = 'Innsendt',
    Endret = 'Endret',
    Ferdig = 'Ferdig',
    Feilet = 'Feilet',
}

export enum MeldekortDagStatus {
    Sperret = 'SPERRET',
    IkkeUtfylt = 'IKKE_UTFYLT',
    DeltattUtenLønn = 'DELTATT_UTEN_LØNN',
    DeltattMedLønn = 'DELTATT_MED_LØNN',
    IkkeDeltatt = 'IKKE_DELTATT',
    FraværSyk = 'FRAVÆR_SYK',
    FraværSyktBarn = 'FRAVÆR_SYKT_BARN',
    FraværAnnet = 'FRAVÆR_ANNET',
}

export type MeldekortDag = {
    dato: string;
    status: MeldekortDagStatus;
};

export type MeldekortUtfylling = {
    id: string;
    periode: Periode;
    status: MeldekortStatus;
    kanSendes: boolean;
    meldekortDager: MeldekortDag[];
};
