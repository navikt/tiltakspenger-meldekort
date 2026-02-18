import { Meldekort, MeldekortDag } from './MeldekortBruker';
import { Periode } from '@common/typer/periode';
import { TeksterLocale } from '@common/locale.ts';

export interface KorrigerMeldekortRequest {
    meldekortId: string;
    korrigerteDager: MeldekortDag[];
    locale: TeksterLocale;
}

export type MeldekortKorrigeringTilUtfylling = {
    meldeperiodeId: string;
    kjedeId: string;
    dager: MeldekortDag[];
    periode: Periode;
    mottattTidspunktSisteMeldekort: string;
    maksAntallDagerForPeriode: number;
    kanSendeInnHelg: boolean;
};

export type KorrigerMeldekortResponse = {
    forrigeMeldekort: Meldekort;
    tilUtfylling: MeldekortKorrigeringTilUtfylling;
};

export type KorrigeringMeldekortUtfyllingProps = {
    forrigeMeldekort: Meldekort;
    tilUtfylling: MeldekortKorrigeringTilUtfylling;
    kanKorrigeres: boolean;
};

export interface KorrigerMeldekortOppsummeringProps {
    originaleMeldekort: Meldekort;
    kanKorrigeres: boolean;
}
