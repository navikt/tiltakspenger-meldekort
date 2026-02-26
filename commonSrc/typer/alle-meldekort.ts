import { Meldekort } from '@common/typer/MeldekortBruker';
import { ArenaMeldekortStatus, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';
import { Periode } from '@common/typer/periode.ts';

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
