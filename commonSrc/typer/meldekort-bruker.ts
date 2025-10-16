import { Meldekort } from '@common/typer/MeldekortBruker';

export enum ArenaMeldekortStatus {
    HAR_MELDEKORT = 'HAR_MELDEKORT',
    HAR_IKKE_MELDEKORT = 'HAR_IKKE_MELDEKORT',
    UKJENT = 'UKJENT',
}

export type MeldekortBrukerDTO = MeldekortBrukerMedSak | MeldekortBrukerUtenSak;

export type MeldekortBrukerMedSak = {
    harSak: true;
    arenaMeldekortStatus: ArenaMeldekortStatus;
    nesteMeldekort?: Meldekort;
    forrigeMeldekort?: Meldekort;
    harSoknadUnderBehandling: boolean;
    kanSendeInnHelgForMeldekort: boolean;
};

export type MeldekortBrukerUtenSak = {
    harSak: false;
    arenaMeldekortStatus: ArenaMeldekortStatus;
};

export type MeldekortBruker = MeldekortBrukerMedSak | MeldekortBrukerUtenSak;
