import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling';

export enum ArenaMeldekortStatus {
    HAR_MELDEKORT = 'HAR_MELDEKORT',
    HAR_IKKE_MELDEKORT = 'HAR_IKKE_MELDEKORT',
    UKJENT = 'UKJENT',
}

export type MeldekortBrukerDTO =
    | {
          harSak: true;
          arenaMeldekortStatus: ArenaMeldekortStatus;
          nesteMeldekort: MeldekortTilBrukerDTO | null;
          forrigeMeldekort: MeldekortTilBrukerDTO | null;
          harSoknadUnderBehandling: boolean;
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
    harSoknadUnderBehandling: boolean;
};

export type MeldekortBrukerUtenSak = {
    harSak: false;
    arenaMeldekortStatus: ArenaMeldekortStatus;
};

export type MeldekortBruker = MeldekortBrukerMedSak | MeldekortBrukerUtenSak;
