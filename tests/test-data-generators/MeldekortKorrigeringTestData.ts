import { Meldekort } from '../../packages/common/src/typer/MeldekortBruker';
import { KorrigeringMeldekortUtfyllingProps } from '../../packages/common/src/typer/KorrigerMeldekort';

export type Korrigering = KorrigeringMeldekortUtfyllingProps;

/**
 * Korrigering av et innsendt meldekort, der dagene til utfylling er de samme som i det innsendte meldekortet
 */
export const nyKorrigering = (forrigeMeldekort: Meldekort, kanKorrigeres = true): Korrigering => ({
    forrigeMeldekort,
    tilUtfylling: {
        meldeperiodeId: forrigeMeldekort.meldeperiodeId,
        kjedeId: forrigeMeldekort.kjedeId,
        dager: forrigeMeldekort.dager,
        periode: { fraOgMed: forrigeMeldekort.fraOgMed, tilOgMed: forrigeMeldekort.tilOgMed },
        mottattTidspunktSisteMeldekort: forrigeMeldekort.innsendt ?? forrigeMeldekort.tilOgMed,
        maksAntallDagerForPeriode: forrigeMeldekort.maksAntallDager,
        kanSendeInnHelg: false,
    },
    kanKorrigeres,
});
