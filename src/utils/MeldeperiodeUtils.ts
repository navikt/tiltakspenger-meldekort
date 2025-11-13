import { MeldekortDagStatus } from '@common/typer/MeldekortBruker';

import { MeldekortKorrigeringTilUtfylling } from '@common/typer/KorrigerMeldekort.ts';

export const harDagerSomIkkeGirRett = (m: MeldekortKorrigeringTilUtfylling) =>
    m.dager.some((dag) => dag.status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER);
