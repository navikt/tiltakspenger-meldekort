import { Meldekort, MeldekortDag } from './MeldekortBruker';
import { Periode } from '@common/typer/periode';

export interface KorrigerMeldekortRequest {
    meldekortId: string;
    korrigerteDager: MeldekortDag[];
}

export type MeldekortTilKorrigeringUtfylling = {
    meldeperiodeId: string;
    kjedeId: string;
    dager: MeldekortDag[];
    periode: Periode;
    mottattTidspunktSisteMeldekort: string;
    maksAntallDagerForPeriode: number;
};

export type KorrigerMeldekortResponse = {
    forrigeMeldekort: Meldekort;
    tilUtfylling: MeldekortTilKorrigeringUtfylling;
};
