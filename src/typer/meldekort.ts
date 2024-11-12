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

export enum ReduksjonAvYtelse {
    INGEN_REDUKSJON = 'INGEN_REDUKSJON',
    DELVIS_REDUKSJON = 'DELVIS_REDUKSJON',
    YTELSEN_FALLER_BORT = 'YTELSEN_FALLER_BORT',
}

export type Beregningsdag = {
    beløp: number;
    prosent: number;
};

export enum MeldekortDagStatus {
    Sperret = 'SPERRET',
    IkkeUtfylt = 'IKKE_UTFYLT',
    DeltattUtenLønnITiltaket = 'DELTATT_UTEN_LØNN_I_TILTAKET',
    DeltattMedLønnITiltaket = 'DELTATT_MED_LØNN_I_TILTAKET',
    IkkeDeltatt = 'IKKE_DELTATT',
    FraværSyk = 'FRAVÆR_SYK',
    FraværSyktBarn = 'FRAVÆR_SYKT_BARN',
    FraværVelferdGodkjentAvNav = 'FRAVÆR_VELFERD_GODKJENT_AV_NAV',
    FraværVelferdIkkeGodkjentAvNav = 'FRAVÆR_VELFERD_IKKE_GODKJENT_AV_NAV',
}

export type MeldekortDag = {
    dato: string;
    status: MeldekortDagStatus;
    reduksjonAvYtelsePåGrunnAvFravær: ReduksjonAvYtelse;
    beregningsdag: Beregningsdag | null;
};

export type MeldekortData = {
    id: string;
    periode: Periode;
    meldekortDager: MeldekortDag[];
    tiltaksnavn: string;
    status: MeldekortStatus;
    totalbeløpTilUtbetaling: number;
    kanSendes?: boolean;
};
