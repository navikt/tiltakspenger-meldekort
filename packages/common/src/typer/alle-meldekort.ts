import { Meldekort } from './MeldekortBruker';
import { ArenaMeldekortStatus, MeldekortBrukerDTO } from './meldekort-bruker';
import { Periode } from './periode.ts';

export type InnsendteMeldekortDTO = {
    bruker: MeldekortBrukerDTO;
    meldekortMedSisteMeldeperiode: MeldekortMedSisteMeldeperiode[];
};

export type MeldekortMedSisteMeldeperiode = {
    meldekort: Meldekort;
    sisteMeldeperiode: Meldeperiode;
};

export type Meldeperiode = {
    meldeperiodeId: string;
    kjedeId: string;
    periode: Periode;
    maksAntallDagerForPeriode: number;
};

export type InnsendteMeldekortProps = {
    arenaMeldekortStatus: ArenaMeldekortStatus;
    kanSendeInnHelgForMeldekort: boolean;
    meldekortMedSisteMeldeperiode: MeldekortMedSisteMeldeperiode[];
};
