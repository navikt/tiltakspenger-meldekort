import {
    ArenaMeldekortStatus,
    MeldekortBrukerMedSak,
} from '../../packages/common/src/typer/meldekort-bruker';

export const nyMeldekortBruker = (
    overrides: Partial<MeldekortBrukerMedSak> = {},
): MeldekortBrukerMedSak => ({
    harSak: true,
    arenaMeldekortStatus: ArenaMeldekortStatus.HAR_IKKE_MELDEKORT,
    harSoknadUnderBehandling: false,
    kanSendeInnHelgForMeldekort: false,
    ...overrides,
});
