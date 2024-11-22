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
    Deltatt = 'DELTATT',
    FraværSyk = 'FRAVÆR_SYK',
    FraværSyktBarn = 'FRAVÆR_SYKT_BARN',
    FraværAnnet = 'FRAVÆR_ANNET',
    IkkeDeltatt = 'IKKE_DELTATT',
}

export type MeldekortDag = {
    dato: string;
    index: number;
    status: MeldekortDagStatus | null;
};

export type MeldekortUtfylling = {
    id: string;
    periode: Periode;
    status: MeldekortStatus;
    kanSendes: boolean;
    meldekortDager: MeldekortDag[];
};
