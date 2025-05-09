import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto.ts';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { Periode } from '@common/typer/periode.ts';

export enum ArenaMeldekortStatus {
    HAR_MELDEKORT = 'HAR_MELDEKORT',
    HAR_IKKE_MELDEKORT = 'HAR_IKKE_MELDEKORT',
    UKJENT = 'UKJENT',
}

export type NesteInnsending = {
    kanSendesDato: string;
    periode: Periode;
};

export type MeldekortBrukerDTO =
    | {
          harSak: true;
          arenaMeldekortStatus: ArenaMeldekortStatus;
          nesteMeldekort: MeldekortTilBrukerDTO | null;
          sisteMeldekort: MeldekortTilBrukerDTO | null;
          nesteInnsending: NesteInnsending | null;
      }
    | {
          harSak: false;
          arenaMeldekortStatus: ArenaMeldekortStatus;
      };

export type MeldekortBrukerMedSak = {
    harSak: true;
    arenaMeldekortStatus: ArenaMeldekortStatus;
    nesteMeldekort?: MeldekortUtfylling;
    forrigeMeldekort?: MeldekortUtfylling;
    nesteInnsending?: NesteInnsending;
};

export type MeldekortBrukerUtenSak = {
    harSak: false;
    arenaMeldekortStatus: ArenaMeldekortStatus;
};

export type MeldekortBruker = MeldekortBrukerMedSak | MeldekortBrukerUtenSak;
