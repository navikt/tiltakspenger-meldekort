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

export enum MeldekortDeltattUndervalg {
    DeltattUtenLønn = 'DELTATT_UTEN_LØNN',
    DeltattMedLønn = 'DELTATT_MED_LØNN',
}

export enum MeldekortIkkeDeltattUndervalg {
    FraværSyk = 'FRAVÆR_SYK',
    FraværSyktBarn = 'FRAVÆR_SYKT_BARN',
    FraværAnnet = 'FRAVÆR_ANNET',
    IkkeDeltatt = 'IKKE_DELTATT',
}

export type MeldekortDagStatus =
    | { deltattValg: 'ikkeValgt', underValg?: undefined }
    | {
          deltattValg: 'deltatt';
          underValg?: MeldekortDeltattUndervalg;
      }
    | {
          deltattValg: 'ikkeDeltatt';
          underValg?: MeldekortIkkeDeltattUndervalg;
      };

export type MeldekortDag = {
    dato: string;
    index: number;
    status: MeldekortDagStatus;
};

export type MeldekortUtfylling = {
    id: string;
    periode: Periode;
    status: MeldekortStatus;
    kanSendes: boolean;
    meldekortDager: MeldekortDag[];
};
