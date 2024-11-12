type Periode = {
    fraOgMed: string;
    tilOgMed: string;
};

export enum RapporteringsperiodeStatus {
    TilUtfylling = 'TilUtfylling',
    Innsendt = 'Innsendt',
    Endret = 'Endret',
    Ferdig = 'Ferdig',
    Feilet = 'Feilet',
}

type Aktivitet = {
    id?: string;
    type: AktivitetType;
    timer?: string;
};

export enum AktivitetType {
    Arbeid = 'Arbeid',
    Syk = 'Syk',
    Fravaer = 'Fravaer',
    Utdanning = 'Utdanning',
}

export type RapporteringsperiodeDag = {
    dato: string;
    aktiviteter: Aktivitet[];
};

export type Rapporteringsperiode = {
    id: string;
    periode: Periode;
    dager: RapporteringsperiodeDag[];
    kanSendes: boolean;
    status: RapporteringsperiodeStatus;
};
