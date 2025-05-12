import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling';
import { Periode } from '@common/typer/periode';

export enum ArenaMeldekortStatus {
    HAR_MELDEKORT = 'HAR_MELDEKORT',
    HAR_IKKE_MELDEKORT = 'HAR_IKKE_MELDEKORT',
    UKJENT = 'UKJENT',
}

export type NesteMeldeperiode = {
    kanSendes: string;
    periode: Periode;
};

export type MeldekortBrukerDTO =
    | {
          harSak: true;
          arenaMeldekortStatus: ArenaMeldekortStatus;
          nesteMeldekort: MeldekortTilBrukerDTO | null;
          forrigeMeldekort: MeldekortTilBrukerDTO | null;
          nesteMeldeperiode: NesteMeldeperiode | null;
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
    nesteMeldeperiode?: NesteMeldeperiode;
};

export type MeldekortBrukerUtenSak = {
    harSak: false;
    arenaMeldekortStatus: ArenaMeldekortStatus;
};

export type MeldekortBruker = MeldekortBrukerMedSak | MeldekortBrukerUtenSak;
